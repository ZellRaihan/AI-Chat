// API keys
export const API_KEYS = {
  GITHUB: process.env.NEXT_PUBLIC_GITHUB_TOKEN || process.env.GITHUB_TOKEN || '',
};

// API endpoints
export const API_ENDPOINTS = {
  GITHUB: 'https://models.inference.ai.azure.com',
};

// Provider names
export const PROVIDERS = {
  GITHUB: 'GitHub',
  OPENAI: 'OpenAI',
  DEEPSEEK: 'DeepSeek',
  META: 'Meta'
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
  contextWindow?: number;
  capabilities?: string[];
}

// Model configurations mapping
export const MODEL_CONFIGS: Record<string, ModelConfig> = {
  // OpenAI GPT-4o Model
  'gpt-4o': { 
    id: 'gpt-4o', 
    name: 'Azure OpenAI GPT-4o', 
    provider: PROVIDERS.OPENAI, 
    apiConfigKey: 'GITHUB',
    maxTokens: 4096,
    temperature: 1,
    top_p: 1,
    contextWindow: 8192,
    capabilities: ['chat', 'completion', 'function-calling', 'vision']
  },

  // DeepSeek-R1 Model
  'deepseek-r1': {
    id: 'deepseek-r1',
    name: 'DeepSeek-R1',
    provider: PROVIDERS.DEEPSEEK,
    apiConfigKey: 'GITHUB',
    maxTokens: 4096,
    contextWindow: 4096,
    capabilities: ['chat', 'completion', 'reasoning', 'code-generation']
  },

  // Llama-3.3-70B-Instruct Model
  'llama-3.3-70b-instruct': {
    id: 'llama-3.3-70b-instruct',
    name: 'Llama-3.3-70B-Instruct',
    provider: PROVIDERS.META,
    apiConfigKey: 'GITHUB',
    maxTokens: 4096,
    contextWindow: 4096,
    capabilities: ['chat', 'completion', 'reasoning', 'math', 'instruction-following']
  }
}; 