import { API_KEYS, API_ENDPOINTS, MODEL_CONFIGS } from './apiConfig';

// Interface for chat message
export interface ChatMessage {
  role: string;
  content: string;
}

// Base interface for AI responses
interface AIResponse {
  content: string;
  model: string;
  provider: string;
  error?: string;
}

// Options for AI requests
interface AIRequestOptions {
  messages: ChatMessage[];
  modelId: string;
  maxTokens?: number;
  temperature?: number;
  top_p?: number;
}

/**
 * Helper function to add a minimum delay to ensure the thinking indicator is visible
 */
const ensureMinimumDelay = async <T>(promise: Promise<T>, minDelay: number = 1000): Promise<T> => {
  const startTime = Date.now();
  const result = await promise;
  const elapsed = Date.now() - startTime;
  
  if (elapsed < minDelay) {
    await new Promise(resolve => setTimeout(resolve, minDelay - elapsed));
  }
  
  return result;
};

/**
 * Generate simulated response when API is unavailable
 */
function generateSimulatedResponse(messages: ChatMessage[], modelId: string): Promise<AIResponse> {
  const modelConfig = MODEL_CONFIGS[modelId];
  const modelName = modelConfig?.name || modelId;
  
  const response = `I'm a simulated version of ${modelName}. The GitHub AI integration requires a valid GitHub Personal Access Token with models:read permission. Please configure your token in the environment variables to access the real AI models.`;
  
  return ensureMinimumDelay(Promise.resolve({
    content: response,
    model: modelId,
    provider: 'GitHub'
  }), 1500);
}

/**
 * Call GitHub AI API through server-side route
 */
async function callGitHubAPI(modelId: string, messages: ChatMessage[]): Promise<AIResponse> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        modelId,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to get response from AI');
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error in GitHub AI API call:', {
      error: {
        message: error.message,
        name: error.name,
        stack: error.stack
      },
      modelId,
      messageCount: messages.length
    });
    throw new Error(`GitHub AI API error: ${error.message}`);
  }
}

/**
 * Main function to get AI responses
 */
export async function getAIResponse(options: AIRequestOptions): Promise<AIResponse> {
  const { modelId, messages } = options;
  
  try {
    const modelConfig = MODEL_CONFIGS[modelId];
    
    if (!modelConfig) {
      console.warn(`Model configuration not found for ${modelId}`);
      return generateSimulatedResponse(messages, modelId);
    }
    
    return await ensureMinimumDelay(callGitHubAPI(modelId, messages));
  } catch (error: any) {
    console.error('Error in getAIResponse:', error);
    return generateSimulatedResponse(messages, modelId);
  }
} 