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
}

/**
 * Helper function to add a minimum delay to ensure the thinking indicator is visible
 */
const ensureMinimumDelay = async <T>(promise: Promise<T>, minDelay: number = 1000): Promise<T> => {
  const startTime = Date.now();
  const result = await promise;
  const elapsed = Date.now() - startTime;
  
  // If the operation took less than the minimum delay, wait for the remaining time
  if (elapsed < minDelay) {
    await new Promise(resolve => setTimeout(resolve, minDelay - elapsed));
  }
  
  return result;
};

/**
 * Generate simulated response when APIs are unavailable
 */
function generateSimulatedResponse(messages: ChatMessage[], modelId: string): Promise<AIResponse> {
  // Get the last user message
  const lastUserMessage = messages.length > 0 ? messages[messages.length - 1].content : '';
  
  // Get model info from config
  const modelConfig = MODEL_CONFIGS[modelId];
  const modelName = modelConfig?.name || modelId;
  const provider = modelConfig?.provider || 'AI';
  
  // Generate a contextual response based on the user's message
  let response = '';
  
  if (lastUserMessage.toLowerCase().includes('hello') || lastUserMessage.toLowerCase().includes('hi')) {
    response = `Hello! I'm a simulated version of ${modelName}. How can I help you today?`;
  } 
  else if (lastUserMessage.toLowerCase().includes('help')) {
    response = `I'd be happy to help! Please let me know what you need assistance with, and I'll do my best to provide information.`;
  }
  else if (lastUserMessage.toLowerCase().includes('weather')) {
    response = `I don't have access to real-time weather data in demonstration mode. In a real implementation, I could connect to a weather API to provide current conditions and forecasts.`;
  }
  else if (lastUserMessage.toLowerCase().includes('code') || lastUserMessage.toLowerCase().includes('programming')) {
    response = `I can help with programming questions! For example, here's a simple JavaScript function:

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}! Welcome to our AI chat application.\`;
}
\`\`\`

What specific programming topic would you like to explore?`;
  }
  else if (lastUserMessage.length < 10) {
    response = `I noticed your message is quite short. Could you provide more details about what you'd like to discuss or learn about?`;
  }
  else {
    // Look for keywords in the message to create a contextual response
    const keywords = ['what', 'how', 'why', 'when', 'who', 'where', 'is', 'can', 'do', 'will'];
    const foundKeyword = keywords.find(keyword => lastUserMessage.toLowerCase().includes(keyword));
    
    if (foundKeyword) {
      response = `That's an interesting question about ${lastUserMessage.substring(lastUserMessage.toLowerCase().indexOf(foundKeyword) + foundKeyword.length, lastUserMessage.length).trim()}. In a full implementation, I would provide a detailed response based on my training data. This is a simulated response to demonstrate the chat interface functionality.`;
    } else {
      response = `Thank you for your message. This is a simulated response from ${modelName}. In a real implementation with valid API keys, you would receive an actual AI-generated response here. The interface is fully functional, but currently operating in demo mode.`;
    }
  }
  
  // Return the response with a delay to simulate API call
  return ensureMinimumDelay(Promise.resolve({
    content: response,
    model: modelId,
    provider: provider
  }), 1500);
}

/**
 * Find a model with a valid API key
 */
function findAvailableModel(): string | null {
  // Check which models have API keys
  const availableModels = Object.entries(MODEL_CONFIGS)
    .filter(([_, config]) => {
      const apiKey = API_KEYS[config.apiConfigKey];
      return apiKey && apiKey.trim() !== '';
    })
    .map(([id, _]) => id);
  
  // Return the first available model or null if none found
  return availableModels.length > 0 ? availableModels[0] : null;
}

/**
 * Main function to get AI responses - will try different models if one fails
 */
export async function getAIResponse(options: AIRequestOptions): Promise<AIResponse> {
  const { modelId, messages } = options;
  
  try {
    // Get model configuration
    const modelConfig = MODEL_CONFIGS[modelId];
    
    if (!modelConfig) {
      console.warn(`Model configuration not found for ${modelId}`);
      // Try to find a model with an available API key
      const availableModel = findAvailableModel();
      if (availableModel) {
        console.log(`Switching to available model: ${availableModel}`);
        return getAIResponse({...options, modelId: availableModel});
      }
      return generateSimulatedResponse(messages, modelId);
    }
    
    // Check if API key is available
    const apiKey = API_KEYS[modelConfig.apiConfigKey];
    if (!apiKey || apiKey.trim() === '') {
      console.log(`No API key available for ${modelConfig.provider}. Trying to find an alternative model.`);
      
      // Try to find a model with an available API key
      const availableModel = findAvailableModel();
      if (availableModel) {
        console.log(`Switching to available model: ${availableModel}`);
        return getAIResponse({...options, modelId: availableModel});
      }
      
      return generateSimulatedResponse(messages, modelId);
    }
    
    // Route to the appropriate provider's API and ensure minimum delay
    let responsePromise: Promise<AIResponse>;
    
    switch (modelConfig.provider) {
      case 'Google':
        responsePromise = callGeminiAPI(modelId, messages, apiKey);
        break;
      case 'OpenAI':
        responsePromise = callOpenAIAPI(modelId, messages, apiKey);
        break;
      case 'Anthropic':
        responsePromise = callAnthropicAPI(modelId, messages, apiKey);
        break;
      case 'Meta':
        responsePromise = callMetaAPI(modelId, messages, apiKey);
        break;
      case 'Cohere':
        responsePromise = callCohereAPI(modelId, messages, apiKey);
        break;
      default:
        console.warn(`Provider not implemented: ${modelConfig.provider}`);
        
        // Try to find a model with an available API key
        const availableModel = findAvailableModel();
        if (availableModel) {
          console.log(`Switching to available model: ${availableModel}`);
          return getAIResponse({...options, modelId: availableModel});
        }
        
        return generateSimulatedResponse(messages, modelId);
    }
    
    // Ensure a minimum delay to show the thinking indicator
    return await ensureMinimumDelay(responsePromise, 1500);
    
  } catch (error) {
    console.error(`Error in AI response:`, error);
    
    // Try to find a different model with an available API key
    const availableModels = Object.entries(MODEL_CONFIGS)
      .filter(([id, config]) => {
        // Filter out current model and ensure API key exists
        return id !== modelId && API_KEYS[config.apiConfigKey] && API_KEYS[config.apiConfigKey].trim() !== '';
      })
      .map(([id, _]) => id);
    
    if (availableModels.length > 0) {
      // Try another model
      const nextModel = availableModels[0];
      console.log(`Attempting to use alternative model: ${nextModel}`);
      return getAIResponse({...options, modelId: nextModel});
    }
    
    console.log("Falling back to simulated response due to error");
    return generateSimulatedResponse(messages, modelId);
  }
}

/**
 * Call Gemini API 
 */
async function callGeminiAPI(modelId: string, messages: ChatMessage[], apiKey: string): Promise<AIResponse> {
  try {
    // Specific model to use (gemini-pro is default)
    const geminiModel = modelId === 'gemini-1.5-flash' ? 'gemini-1.5-flash' : 'gemini-pro';
    
    // Format messages for Gemini API
    const formattedMessages = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : msg.role,
      parts: [{ text: msg.content }]
    }));
    
    const response = await fetch(
      `${API_ENDPOINTS.GEMINI}/${geminiModel}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: formattedMessages,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        }),
      }
    );
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gemini API error: ${error}`);
    }
    
    const data = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response from Gemini API');
    }
    
    const content = data.candidates[0]?.content?.parts?.[0]?.text || '';
    
    return {
      content,
      model: geminiModel,
      provider: 'Google',
    };
  } catch (error) {
    console.error("Error in Gemini API call:", error);
    throw error; // Rethrow to allow main function to handle fallback
  }
}

/**
 * Call OpenAI API
 */
async function callOpenAIAPI(modelId: string, messages: ChatMessage[], apiKey: string): Promise<AIResponse> {
  try {
    // OpenAI expects the messages in the format {role: 'user'/'assistant'/'system', content: '...'}
    // which matches our ChatMessage interface
    
    const response = await fetch(API_ENDPOINTS.OPENAI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: modelId,
        messages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${error}`);
    }
    
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';
    
    return {
      content,
      model: modelId,
      provider: 'OpenAI',
    };
  } catch (error) {
    console.error("Error in OpenAI API call:", error);
    throw error; // Rethrow to allow main function to handle fallback
  }
}

/**
 * Call Anthropic API
 */
async function callAnthropicAPI(modelId: string, messages: ChatMessage[], apiKey: string): Promise<AIResponse> {
  try {
    // Format messages for Anthropic API
    
    const response = await fetch(API_ENDPOINTS.ANTHROPIC, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: modelId,
        messages,
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Anthropic API error: ${error}`);
    }
    
    const data = await response.json();
    const content = data.content?.[0]?.text || '';
    
    return {
      content,
      model: modelId,
      provider: 'Anthropic',
    };
  } catch (error) {
    console.error("Error in Anthropic API call:", error);
    throw error; // Rethrow to allow main function to handle fallback
  }
}

/**
 * Call Meta API
 */
async function callMetaAPI(modelId: string, messages: ChatMessage[], apiKey: string): Promise<AIResponse> {
  try {
    // Format the messages for Llama - needs specific formatting
    const formattedMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content,
    }));
    
    const response = await fetch(API_ENDPOINTS.META, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: modelId,
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Meta API error: ${error}`);
    }
    
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';
    
    return {
      content,
      model: modelId,
      provider: 'Meta',
    };
  } catch (error) {
    console.error("Error in Meta API call:", error);
    throw error; // Rethrow to allow main function to handle fallback
  }
}

/**
 * Call Cohere API
 */
async function callCohereAPI(modelId: string, messages: ChatMessage[], apiKey: string): Promise<AIResponse> {
  try {
    // Format messages for Cohere - chat history needs specific formatting
    const chatHistory = messages.slice(0, -1).map(msg => ({
      role: msg.role,
      message: msg.content,
    }));
    
    const message = messages[messages.length - 1].content;
    
    const response = await fetch(API_ENDPOINTS.COHERE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: modelId,
        message,
        chat_history: chatHistory,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Cohere API error: ${error}`);
    }
    
    const data = await response.json();
    const content = data.text || '';
    
    return {
      content,
      model: modelId,
      provider: 'Cohere',
    };
  } catch (error) {
    console.error("Error in Cohere API call:", error);
    throw error; // Rethrow to allow main function to handle fallback
  }
} 