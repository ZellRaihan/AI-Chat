// API keys
export const API_KEYS = {
  GEMINI: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '',
  OPENAI: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
  ANTHROPIC: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || '',
  COHERE: process.env.NEXT_PUBLIC_COHERE_API_KEY || '',
  DEEPSEEK: process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY || '',
  META: process.env.NEXT_PUBLIC_META_API_KEY || '',
  ALIBABA: process.env.NEXT_PUBLIC_ALIBABA_API_KEY || '',
  XAI: process.env.NEXT_PUBLIC_XAI_API_KEY || '',
};

// API endpoints
export const API_ENDPOINTS = {
  GEMINI: 'https://generativelanguage.googleapis.com/v1/models',
  OPENAI: 'https://api.openai.com/v1/chat/completions',
  ANTHROPIC: 'https://api.anthropic.com/v1/messages',
  COHERE: 'https://api.cohere.ai/v1/generate',
  DEEPSEEK: 'https://api.deepseek.com/v1/chat/completions',
  META: 'https://llama-api.meta.com/v1/completions',
  ALIBABA: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
  XAI: 'https://api.grok.x.ai/v1/chat/completions',
};

// Provider names
export const PROVIDERS = {
  OPENAI: 'OpenAI',
  ANTHROPIC: 'Anthropic',
  GOOGLE: 'Google',
  META: 'Meta',
  COHERE: 'Cohere',
  DEEPSEEK: 'DeepSeek',
  ALIBABA: 'Alibaba',
  XAI: 'xAI',
};

// Model configurations
export interface ModelConfig {
  id: string;
  name: string;
  provider: string;
  apiConfigKey: keyof typeof API_KEYS;
  maxTokens?: number;
}

// Model configurations mapping
export const MODEL_CONFIGS: Record<string, ModelConfig> = {
  'gpt-4o': { 
    id: 'gpt-4o', 
    name: 'GPT-4o', 
    provider: PROVIDERS.OPENAI, 
    apiConfigKey: 'OPENAI',
    maxTokens: 4096
  },
  'gpt-4': { 
    id: 'gpt-4', 
    name: 'GPT-4', 
    provider: PROVIDERS.OPENAI, 
    apiConfigKey: 'OPENAI',
    maxTokens: 4096
  },
  'gpt-3.5-turbo': { 
    id: 'gpt-3.5-turbo', 
    name: 'GPT-3.5 Turbo', 
    provider: PROVIDERS.OPENAI, 
    apiConfigKey: 'OPENAI',
    maxTokens: 4096
  },
  'claude-3-opus': { 
    id: 'claude-3-opus', 
    name: 'Claude 3 Opus', 
    provider: PROVIDERS.ANTHROPIC, 
    apiConfigKey: 'ANTHROPIC',
    maxTokens: 4096
  },
  'claude-3-sonnet': { 
    id: 'claude-3-sonnet', 
    name: 'Claude 3 Sonnet', 
    provider: PROVIDERS.ANTHROPIC, 
    apiConfigKey: 'ANTHROPIC',
    maxTokens: 4096
  },
  'claude-3-haiku': { 
    id: 'claude-3-haiku', 
    name: 'Claude 3 Haiku', 
    provider: PROVIDERS.ANTHROPIC, 
    apiConfigKey: 'ANTHROPIC',
    maxTokens: 4096
  },
  'gemini-pro': { 
    id: 'gemini-pro', 
    name: 'Gemini Pro', 
    provider: PROVIDERS.GOOGLE, 
    apiConfigKey: 'GEMINI',
    maxTokens: 4096
  },
  'gemini-1.5-flash': { 
    id: 'gemini-1.5-flash', 
    name: 'Gemini 1.5 Flash', 
    provider: PROVIDERS.GOOGLE, 
    apiConfigKey: 'GEMINI',
    maxTokens: 4096
  },
  'llama-3-70b': { 
    id: 'llama-3-70b', 
    name: 'Llama 3 70B', 
    provider: PROVIDERS.META, 
    apiConfigKey: 'META',
    maxTokens: 4096
  },
  'command-r': { 
    id: 'command-r', 
    name: 'Command R', 
    provider: PROVIDERS.COHERE, 
    apiConfigKey: 'COHERE',
    maxTokens: 4096
  },
}; 