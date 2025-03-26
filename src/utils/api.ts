export interface APIChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface AIResponseOptions {
  messages: APIChatMessage[];
  modelId: string;
  maxTokens?: number;
  temperature?: number;
}

interface AIResponse {
  content: string;
  model: string;
}

export async function getAIResponse(options: AIResponseOptions): Promise<AIResponse> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: options.messages,
      model: options.modelId,
      max_tokens: options.maxTokens,
      temperature: options.temperature,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate AI response');
  }

  const data = await response.json();
  return {
    content: data.content,
    model: data.model,
  };
} 