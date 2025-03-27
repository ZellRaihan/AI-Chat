import type { Metadata } from 'next';
import { generateMetadata } from '@/utils/metadata';

// Base metadata for the chat page
export const metadata: Metadata = generateMetadata({
  title: 'Free AI Chat - No Signup Required',
  description: 'Chat instantly with our intelligent AI assistant - no account creation, no hassle. Experience natural, helpful conversations that understand your needs.',
  path: '/chat',
});

// Dynamic metadata generation for specific models
export async function generateDynamicMetadata({ searchParams }: { searchParams: { model?: string } }): Promise<Metadata> {
  const model = searchParams.model;
  
  if (!model) {
    return metadata;
  }

  const modelNames: Record<string, string> = {
    'gpt-4o': 'Azure OpenAI GPT-4',
    'deepseek-r1': 'DeepSeek-R1',
    'llama-3.3-70b-instruct': 'Llama-3.3-70B',
  };

  const modelName = modelNames[model] || model;
  
  return generateMetadata({
    title: `Chat with ${modelName} - AI Chat`,
    description: `Experience intelligent conversations with ${modelName}. Get instant, accurate responses powered by advanced AI technology.`,
    path: `/chat?model=${model}`,
  });
}

export const dynamic = 'force-dynamic';
export const revalidate = 0; 