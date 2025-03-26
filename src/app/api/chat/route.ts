import { OpenAI } from 'openai';
import { API_ENDPOINTS, MODEL_CONFIGS } from '@/utils/api/apiConfig';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { messages, modelId } = await request.json();
    
    const token = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    
    if (!token) {
      return NextResponse.json(
        { error: 'GitHub token is missing. Please configure a GitHub Personal Access Token with models:read permission.' },
        { status: 401 }
      );
    }

    const client = new OpenAI({
      baseURL: API_ENDPOINTS.GITHUB,
      apiKey: token
    });

    const modelConfig = MODEL_CONFIGS[modelId];

    const response = await client.chat.completions.create({
      messages: messages.map((msg: any) => ({
        role: msg.role as 'system' | 'user' | 'assistant',
        content: msg.content
      })),
      model: modelId,
      temperature: modelConfig?.temperature || 1,
      max_tokens: modelConfig?.maxTokens || 4096,
      top_p: modelConfig?.top_p || 1
    });

    const content = response.choices[0]?.message?.content || '';
    
    if (!content) {
      return NextResponse.json(
        { error: 'Empty response received from GitHub AI API' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      content,
      model: modelId,
      provider: 'GitHub'
    });
  } catch (error: any) {
    console.error('Error in GitHub AI API call:', error);
    return NextResponse.json(
      { error: `GitHub AI API error: ${error.message}` },
      { status: 500 }
    );
  }
} 