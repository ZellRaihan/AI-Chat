// API keys
export const API_KEYS = {
  GITHUB: process.env.NEXT_PUBLIC_GITHUB_TOKEN || process.env.GITHUB_TOKEN || '',
};

// API endpoints
export const API_ENDPOINTS = {
  GITHUB: 'https://models.inference.ai.azure.com',
  OPENAI: 'https://api.openai.com/v1/chat/completions',
  ANTHROPIC: 'https://api.anthropic.com/v1/messages',
  COHERE: 'https://api.cohere.ai/v1/generate',
  DEEPSEEK: 'https://api.deepseek.com/v1/chat/completions',
  META: 'https://llama-api.meta.com/v1/completions',
  ALIBABA: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
  XAI: 'https://api.grok.x.ai/v1/chat/completions'
};

// Provider names
export const PROVIDERS = {
  GITHUB: 'GitHub',
};

// Model configurations
export interface ModelConfig {
  id: string;
  name: string;
  provider: string;
  apiConfigKey: keyof typeof API_KEYS;
  maxTokens?: number;
  temperature?: number;
  top_p?: number;
}

// Model configurations mapping
export const MODEL_CONFIGS: Record<string, ModelConfig> = {
  'gpt-4o': { 
    id: 'gpt-4o', 
    name: 'GitHub GPT-4', 
    provider: PROVIDERS.GITHUB, 
    apiConfigKey: 'GITHUB',
    maxTokens: 4096,
    temperature: 1,
    top_p: 1
  },
  'gpt-3.5-turbo': { 
    id: 'gpt-3.5-turbo', 
    name: 'GitHub GPT-3.5', 
    provider: PROVIDERS.GITHUB, 
    apiConfigKey: 'GITHUB',
    maxTokens: 4096
  },
  'claude-3-opus': { 
    id: 'claude-3-opus', 
    name: 'GitHub Claude 3', 
    provider: PROVIDERS.GITHUB, 
    apiConfigKey: 'GITHUB',
    maxTokens: 4096
  },
}; 