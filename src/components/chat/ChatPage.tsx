'use client';

import { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import ModelSelector from './ModelSelector';
import { useTheme } from '@/components/ThemeProvider';
import styles from '@/styles/ChatPage.module.css';
import { generateChatId } from '@/utils/chatUtils';
import { getAIResponse, ChatMessage as APIChatMessage } from '@/utils/api/apiService';
import { getFromStorage, setToStorage, clearStorage } from '../../utils/storageUtils';

// Match the Chat interface expected by Sidebar
interface Chat {
  id: string;
  title: string;
  createdAt: string;
  messages: Message[];
}

// Match the Message interface expected by MessageList
interface Message {
  id: string;
  role: string;
  content: string;
  timestamp: string;
  provider?: string;
  edited?: boolean;
  originalContent?: string;
}

interface Model {
  id: string;
  name: string;
  provider: string;
  isEnabled: boolean;
  isDefault: boolean;
}

interface ChatPageProps {
  initialMessage?: string | null;
}

const STORAGE_KEY = 'ai-chat-app-data';
const MODELS_STORAGE_KEY = 'ai-chat-app-models';

// Default models configuration
const defaultModels = [
  { id: 'gpt-4o', name: 'Azure OpenAI GPT-4o', provider: 'OpenAI' },
  { id: 'deepseek-r1', name: 'DeepSeek-R1', provider: 'DeepSeek' },
  { id: 'llama-3.3-70b-instruct', name: 'Llama-3.3-70B-Instruct', provider: 'Meta' }
];

const ChatPage = ({ initialMessage }: ChatPageProps) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [currentModel, setCurrentModel] = useState(defaultModels[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [thinkingIndicator, setThinkingIndicator] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [initialized, setInitialized] = useState(false);
  const [initialMessageProcessed, setInitialMessageProcessed] = useState(false);
  
  // Initialize models if they don't exist
  useEffect(() => {
    // Clear existing models to force reset
    clearStorage(MODELS_STORAGE_KEY);
    
    // Set new models configuration
    setToStorage(MODELS_STORAGE_KEY, defaultModels.map(model => ({
      id: model.id,
      name: model.name,
      provider: model.provider,
      isEnabled: true,
      isDefault: model.id === 'gpt-4o'
    })));
  }, []);
  
  // Load chats from localStorage on component mount
  useEffect(() => {
    // Get chats data from storage with a default empty state
    const savedData = getFromStorage<{chats: Chat[], activeChatId: string | null}>(
      STORAGE_KEY, 
      { chats: [], activeChatId: null }
    );
    
    if (savedData.chats && Array.isArray(savedData.chats)) {
      setChats(savedData.chats);
      
      // Set active chat if one exists
      if (savedData.activeChatId && savedData.chats.find((chat: Chat) => chat.id === savedData.activeChatId)) {
        setActiveChatId(savedData.activeChatId);
        const activeChat = savedData.chats.find((chat: Chat) => chat.id === savedData.activeChatId);
        if (activeChat) {
          setMessages(activeChat.messages || []);
        }
      } else if (savedData.chats.length > 0) {
        // Default to the first chat
        setActiveChatId(savedData.chats[0].id);
        setMessages(savedData.chats[0].messages || []);
      }
    }
    
    // Load default model from settings
    const savedModels = getFromStorage<Model[]>(MODELS_STORAGE_KEY, defaultModels.map(model => ({
      id: model.id,
      name: model.name,
      provider: model.provider,
      isEnabled: true,
      isDefault: model.id === 'gpt-4o'
    })));
    const defaultModel = savedModels.find((model: Model) => model.isDefault && model.isEnabled);
    if (defaultModel) {
      setCurrentModel(defaultModel.id);
    }
    
    setInitialized(true);
  }, []);
  
  // Create initial chat if none exists after initialization
  useEffect(() => {
    if (initialized && chats.length === 0) {
      handleNewChat();
    }
  }, [initialized]);
  
  // Save chats to localStorage when they change
  useEffect(() => {
    if (initialized) {
      setToStorage(STORAGE_KEY, {
        chats,
        activeChatId
      });
    }
  }, [chats, activeChatId, initialized]);
  
  // Add this useEffect to handle virtual keyboard and viewport issues on mobile
  useEffect(() => {
    const handleResize = () => {
      // Fix for mobile virtual keyboard issues
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    // Fix for iOS Safari 100vh issue
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    // Periodically check if we need to resize (handles keyboard appearance)
    const intervalId = setInterval(handleResize, 200);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      clearInterval(intervalId);
    };
  }, []);
  
  // Also add this useEffect to ensure inputs are properly visible when focused
  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if the focused element is an input or textarea
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        // On mobile, ensure the element is visible
        if (window.innerWidth <= 768) {
          // Wait for the virtual keyboard to appear
          setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 300);
        }
      }
    };
    
    document.addEventListener('focusin', handleFocusIn);
    
    return () => {
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, []);
  
  // Process initial message from URL if provided
  useEffect(() => {
    if (initialized && initialMessage && !initialMessageProcessed) {
      // Always create a new chat when we have an initial message from URL
      handleNewChat();
      
      // Use setTimeout to ensure the new chat is fully created before sending the message
      setTimeout(() => {
        handleSendMessage(initialMessage);
        // Mark as processed so we don't reprocess on refresh
        setInitialMessageProcessed(true);
      }, 50);
    }
  }, [initialized, initialMessage, initialMessageProcessed]);
  
  const handleNewChat = () => {
    const newChat: Chat = {
      id: generateChatId(),
      title: 'New Chat',
      createdAt: new Date().toISOString(),
      messages: []
    };
    
    setChats(prevChats => [newChat, ...prevChats]);
    setActiveChatId(newChat.id);
    setMessages([]);
    setIsEditing(false);
    setEditingMessageId(null);
    setThinkingIndicator(false);
    setInitialMessageProcessed(false);
  };

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;
    
    // Handle editing case
    if (isEditing && editingMessageId !== null) {
      // Update the message directly
      handleUpdateMessage(content, editingMessageId);
      return;
    }
    
    // Create new user message
    const userMessage: Message = {
      id: `user-${Date.now().toString()}`,  // Ensure a unique ID format
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    };
    
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    
    // Update chat title if it's the first message
    if (activeChatId && chats.find(c => c.id === activeChatId)?.messages.length === 0) {
      const chatTitle = content.length > 30 ? content.substring(0, 30) + '...' : content;
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === activeChatId 
            ? { ...chat, title: chatTitle, messages: [...chat.messages, userMessage] } 
            : chat
        )
      );
    } else if (activeChatId) {
      // Just update the messages
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === activeChatId 
            ? { ...chat, messages: [...chat.messages, userMessage] } 
            : chat
        )
      );
    }
    
    // Generate AI response
    handleGenerateResponse(content);
  };
  
  const handleGenerateResponse = async (userContent: string) => {
    setThinkingIndicator(true);
    
    // Get current model name and information
    let modelName = currentModel;
    let modelProvider = '';
    
    const savedModels = getFromStorage<Model[]>(MODELS_STORAGE_KEY, defaultModels.map(model => ({
      id: model.id,
      name: model.name,
      provider: model.provider,
      isEnabled: true,
      isDefault: model.id === 'gpt-4o'
    })));
    const selectedModel = savedModels.find((model: Model) => model.id === currentModel);
    if (selectedModel) {
      modelName = selectedModel.name;
      modelProvider = selectedModel.provider;
    }
    
    try {
      // Get the current message state (to capture any edits)
      const currentMessages = [...messages];
      
      // Convert messages to API format
      const apiMessages: APIChatMessage[] = currentMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Check if the last message already contains the user content
      const lastMessage = apiMessages[apiMessages.length - 1];
      if (!lastMessage || lastMessage.role !== 'user' || lastMessage.content !== userContent) {
        // Add the latest user message if it's not already the last one
        apiMessages.push({
          role: 'user',
          content: userContent
        });
      }
      
      // Call API
      const response = await getAIResponse({
        messages: apiMessages,
        modelId: currentModel,
        maxTokens: 1024,
        temperature: 0.7
      });
      
      // Create AI message from response
      const aiMessage: Message = {
        id: `ai-${Date.now().toString()}`,  // Ensure a unique ID format for AI messages
        role: 'assistant',
        content: response.content,
        timestamp: new Date().toISOString(),
        provider: response.model
      };
      
      // Get the latest state to ensure we're not overwriting other changes
      setMessages(prev => [...prev, aiMessage]);
      
      // Update the chat with the AI message
      if (activeChatId) {
        setChats(prevChats => 
          prevChats.map(chat => {
            if (chat.id !== activeChatId) return chat;
            
            // Get the latest messages from the chat
            const latestChatMessages = [...chat.messages];
            
            // Check if we need to add a user message first
            if (latestChatMessages.length === 0 || 
                latestChatMessages[latestChatMessages.length - 1].role !== 'user' ||
                latestChatMessages[latestChatMessages.length - 1].content !== userContent) {
              // Create user message that matches what we sent to the API
              const userMessage: Message = {
                id: `user-${Date.now() - 1}`,  // Ensure unique ID
                role: 'user',
                content: userContent,
                timestamp: new Date(Date.now() - 1).toISOString() // Slightly older timestamp
              };
              return { ...chat, messages: [...latestChatMessages, userMessage, aiMessage] };
            }
            
            // If the user message is already there, just add the AI message
            return { ...chat, messages: [...latestChatMessages, aiMessage] };
          })
        );
      }
      
      setThinkingIndicator(false);
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Create error message if API fails
      const errorMessage: Message = {
        id: `error-${Date.now().toString()}`,  // Unique ID for error messages
        role: 'assistant',
        content: `I'm sorry, I encountered an error while processing your request: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again or select a different model.`,
        timestamp: new Date().toISOString(),
        provider: 'error'
      };
      
      setThinkingIndicator(false);
      setMessages(prev => [...prev, errorMessage]);
      
      // Update the chat with the error message
      if (activeChatId) {
        setChats(prevChats => 
          prevChats.map(chat => 
            chat.id === activeChatId 
              ? { ...chat, messages: [...chat.messages, errorMessage] } 
              : chat
          )
        );
      }
    }
  };

  const handleSelectModel = (modelId: string) => {
    setCurrentModel(modelId);
    setShowModelSelector(false);
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(prevOpen => !prevOpen);
    
    // On mobile, when opening the sidebar, add a touch event listener to close it when clicking outside
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      // Only add listener if sidebar is being opened
      if (!sidebarOpen) {
        // Use timeout to prevent immediate closing
        setTimeout(() => {
          const handleClickOutside = (e: MouseEvent) => {
            // Check if the click is outside the sidebar
            const sidebar = document.querySelector(`.${styles.sidebar}`);
            if (sidebar && !sidebar.contains(e.target as Node)) {
              setSidebarOpen(false);
              document.removeEventListener('click', handleClickOutside);
            }
          };
          
          document.addEventListener('click', handleClickOutside);
        }, 100);
      }
    }
  };
  
  const handleEditMessage = (content: string, messageId: string) => {
    // Find the message by ID
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    if (messageIndex === -1) {
      console.error(`Message with ID ${messageId} not found`);
      return;
    }
    
    const messageToEdit = messages[messageIndex];
    
    // Only allow editing user messages
    if (messageToEdit.role !== 'user') {
      console.error('Can only edit user messages');
      return;
    }
    
    // Store original content if this is the first edit
    if (!messageToEdit.originalContent && !messageToEdit.edited) {
      const updatedMessages = [...messages];
      updatedMessages[messageIndex] = {
        ...updatedMessages[messageIndex],
        originalContent: messageToEdit.content
      };
      setMessages(updatedMessages);
      
      // Update the chat with the originalContent
      if (activeChatId) {
        setChats(prevChats => 
          prevChats.map(chat => 
            chat.id === activeChatId 
              ? { ...chat, messages: updatedMessages } 
              : chat
          )
        );
      }
    }
    
    // Set editing state
    setIsEditing(true);
    setEditingMessageId(messageId);
    
    // Log the edit action
    console.log(`Started editing message: "${messageToEdit.content}"`);
    
    // Scroll to the message being edited after a short delay
    setTimeout(() => {
      const messageElement = document.getElementById(`message-${messageId}`);
      if (messageElement) {
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        messageElement.classList.add(styles.editing);
      }
    }, 100);
  };
  
  const handleUpdateMessage = (updatedContent: string, messageId: string) => {
    const trimmedContent = updatedContent.trim();
    if (!trimmedContent) {
      console.error('Cannot update with empty message');
      handleCancelEdit();
      return;
    }
    
    // Find the message index by ID
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    if (messageIndex === -1) {
      console.error(`Message with ID ${messageId} not found`);
      handleCancelEdit();
      return;
    }
    
    const oldContent = messages[messageIndex].content;
    
    // If content hasn't changed, just cancel the edit
    if (trimmedContent === oldContent) {
      console.log('No changes made, canceling edit');
      handleCancelEdit();
      return;
    }
    
    console.log(`Updating message: "${oldContent}" -> "${trimmedContent}"`);
    
    // Update the message
    const updatedMessages = [...messages];
    updatedMessages[messageIndex] = {
      ...updatedMessages[messageIndex],
      content: trimmedContent,
      edited: true,
      timestamp: new Date().toISOString()
    };
    
    // If there's an AI response that directly follows this message,
    // we'll need to regenerate it
    const shouldRegenerateResponse = 
      messageIndex + 1 < messages.length && 
      messages[messageIndex + 1].role === 'assistant';
    
    // If we need to regenerate, remove all subsequent messages
    const newMessages = shouldRegenerateResponse 
      ? updatedMessages.slice(0, messageIndex + 1) 
      : updatedMessages;
    
    // Update state
    setMessages(newMessages);
    
    // Update the chat in storage
    if (activeChatId) {
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === activeChatId 
            ? { ...chat, messages: newMessages } 
            : chat
        )
      );
    }
    
    // Reset edit state
    setIsEditing(false);
    setEditingMessageId(null);
    
    // If we removed an AI response, regenerate it
    if (shouldRegenerateResponse) {
      console.log('Regenerating AI response...');
      handleGenerateResponse(trimmedContent);
    }
    
    // Visual feedback - highlight the updated message
    setTimeout(() => {
      const messageElement = document.getElementById(`message-${messageId}`);
      if (messageElement) {
        messageElement.classList.add(styles.updated);
        setTimeout(() => {
          messageElement.classList.remove(styles.updated);
        }, 2000);
      }
    }, 100);
  };
  
  const handleCancelEdit = () => {
    const editingId = editingMessageId;
    
    // Reset edit state
    setIsEditing(false);
    setEditingMessageId(null);
    
    console.log('Edit canceled');
    
    // Remove any visual editing indicators
    setTimeout(() => {
      const messageElement = document.getElementById(`message-${editingId}`);
      if (messageElement) {
        messageElement.classList.remove(styles.editing);
      }
    }, 100);
  };
  
  const handleRevertEdit = (originalContent: string, messageId: string) => {
    // Find the message by ID
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    if (messageIndex === -1) {
      console.error(`Message with ID ${messageId} not found`);
      return;
    }
    
    const messageToRevert = messages[messageIndex];
    if (!messageToRevert.originalContent || !messageToRevert.edited) {
      console.error('Message cannot be reverted');
      return;
    }
    
    console.log(`Reverting message to original: "${messageToRevert.originalContent}"`);
    
    // Update the message to revert to original content
    const updatedMessages = [...messages];
    updatedMessages[messageIndex] = {
      ...updatedMessages[messageIndex],
      content: originalContent,
      edited: false,
      originalContent: undefined
    };
    
    // If there's an AI response that directly follows this message,
    // we'll need to regenerate it
    const shouldRegenerateResponse = 
      messageIndex + 1 < messages.length && 
      messages[messageIndex + 1].role === 'assistant';
    
    // If we need to regenerate, remove all subsequent messages
    const newMessages = shouldRegenerateResponse 
      ? updatedMessages.slice(0, messageIndex + 1) 
      : updatedMessages;
    
    // Update state
    setMessages(newMessages);
    
    // Update the chat in storage
    if (activeChatId) {
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === activeChatId 
            ? { ...chat, messages: newMessages } 
            : chat
        )
      );
    }
    
    // If we removed an AI response, regenerate it
    if (shouldRegenerateResponse) {
      console.log('Regenerating AI response after revert...');
      handleGenerateResponse(originalContent);
    }
    
    // Visual feedback - highlight the reverted message
    setTimeout(() => {
      const messageElement = document.getElementById(`message-${messageId}`);
      if (messageElement) {
        messageElement.classList.add(styles.reverted);
        setTimeout(() => {
          messageElement.classList.remove(styles.reverted);
        }, 2000);
      }
    }, 100);
  };
  
  const handleClearChat = () => {
    if (!activeChatId) return;
    
    setMessages([]);
    
    // Update the current chat
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === activeChatId 
          ? { ...chat, messages: [] } 
          : chat
      )
    );
  };
  
  const handleShareChat = async () => {
    // Check if there are messages to share
    if (messages.length === 0) {
      alert('No messages to share');
      return;
    }
    
    // Format the chat content
    const chatText = messages.map(msg => 
      `${msg.role === 'user' ? 'You' : 'AI'}: ${msg.content}`
    ).join('\n\n');
    
    // First check if navigator.clipboard is available and we're in a secure context
    if (navigator.clipboard && window.isSecureContext) {
      try {
        // Try the clipboard writeText API
        await navigator.clipboard.writeText(chatText);
        alert('Chat copied to clipboard');
        return;
      } catch (err) {
        console.error('Clipboard API failed:', err);
      }
    }
    
    // Fallback to execCommand method
    try {
      // Create and prepare textarea
      const textArea = document.createElement('textarea');
      textArea.value = chatText;
      textArea.style.position = 'absolute';
      textArea.style.left = '-9999px'; // Off-screen
      textArea.style.top = '-9999px';
      textArea.readOnly = true;
      document.body.appendChild(textArea);
      
      // Select and copy
      const range = document.createRange();
      range.selectNodeContents(textArea);
      
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
        textArea.select();
      }
      
      const successful = document.execCommand('copy');
      if (successful) {
        alert('Chat copied to clipboard');
      } else {
        // If execCommand fails, use the prompt method
        copyWithPrompt(chatText);
      }
      
      // Cleanup
      document.body.removeChild(textArea);
      if (selection) {
        selection.removeAllRanges();
      }
    } catch (err) {
      console.error('Fallback copy method failed:', err);
      copyWithPrompt(chatText);
    }
    
    // Last resort using prompt
    function copyWithPrompt(text: string) {
      try {
        window.prompt('Copy this chat (Ctrl+C / Cmd+C, then Enter):', text);
        alert('Please copy the text from the prompt');
      } catch (e) {
        console.error('Final fallback copy method failed:', e);
        alert('Could not copy chat. Please try a different browser.');
      }
    }
  };
  
  const handleDeleteChat = (chatId: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    
    const updatedChats = chats.filter(chat => chat.id !== chatId);
    setChats(updatedChats);
    
    if (activeChatId === chatId) {
      if (updatedChats.length > 0) {
        setActiveChatId(updatedChats[0].id);
        setMessages(updatedChats[0].messages);
      } else {
        handleNewChat();
      }
    }
  };
  
  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
    const selectedChat = chats.find(chat => chat.id === chatId);
    if (selectedChat) {
      setMessages(selectedChat.messages);
    }
    setIsEditing(false);
    setEditingMessageId(null);
  };

  // Add this function after handleToggleSidebar or in a similar location
  const handleAnalyzeChats = () => {
    console.log('Analyzing chats...');
    // TODO: Implement chat analysis functionality
    alert('Chat analysis feature is coming soon!');
  };

  // Add this function near the other handlers
  const handleDeleteAllChats = () => {
    if (chats.length === 0) {
      alert('No chats to delete');
      return;
    }
    
    const confirmDelete = window.confirm('Are you sure you want to delete all chats? This action cannot be undone.');
    if (confirmDelete) {
      // Create a new empty chat to replace the deleted ones
      const newChat: Chat = {
        id: generateChatId(),
        title: 'New Chat',
        createdAt: new Date().toISOString(),
        messages: []
      };
      
      // Reset all state
      setChats([newChat]);
      setActiveChatId(newChat.id);
      setMessages([]);
      setIsEditing(false);
      setEditingMessageId(null);
      setThinkingIndicator(false);
      
      console.log('All chats deleted successfully');
    }
  };

  // Save models to storage
  const saveModels = (models: Model[]) => {
    setToStorage(MODELS_STORAGE_KEY, models);
  };

  // Get available models
  const getAvailableModels = () => {
    const savedModels = getFromStorage<Model[]>(MODELS_STORAGE_KEY, defaultModels.map(model => ({
      id: model.id,
      name: model.name,
      provider: model.provider,
      isEnabled: true,
      isDefault: model.id === 'gpt-4o'
    })));
    return savedModels.filter(model => model.isEnabled);
  };

  // Don't render until initialization is complete (to avoid flicker)
  if (!initialized) {
    return null;
  }

  return (
    <div className={styles.chatPage}>
      <Sidebar 
        chats={chats} 
        activeChatId={activeChatId} 
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
        isOpen={sidebarOpen}
        onToggleSidebar={handleToggleSidebar}
        onAnalyzeChats={handleAnalyzeChats}
        onDeleteAllChats={handleDeleteAllChats}
      />
      
      {/* Overlay for mobile - darkens the background when sidebar is open */}
      <div 
        className={`${styles.overlay} ${sidebarOpen ? styles.active : ''}`} 
        onClick={handleToggleSidebar}
      />
      
      <div className={styles.container}>
        <Header 
          currentModel={currentModel}
          onToggleModelSelector={() => setShowModelSelector(!showModelSelector)}
          onToggleTheme={toggleTheme}
          themeMode={theme}
          onToggleSidebar={handleToggleSidebar}
        />
        
        <div className={styles.chatContainer}>
          <MessageList 
            messages={messages} 
            onEditMessage={handleEditMessage}
            thinkingIndicator={thinkingIndicator}
            onRevertEdit={handleRevertEdit}
          />
          
          <ChatInput 
            onSendMessage={handleSendMessage}
            onShareChat={handleShareChat}
            isProcessing={thinkingIndicator}
            editingMessage={isEditing && editingMessageId !== null ? 
              (() => {
                const message = messages.find(msg => msg.id === editingMessageId);
                return message ? { id: message.id, content: message.content } : null;
              })() : null}
            onCancelEdit={handleCancelEdit}
            onEditMessage={(id, newContent) => {
              // Direct call to handleUpdateMessage with the ID
              handleUpdateMessage(newContent, id);
            }}
          />
          
          {showModelSelector && (
            <ModelSelector 
              currentModel={currentModel}
              onSelectModel={handleSelectModel}
              onClose={() => setShowModelSelector(false)}
            />
          )}
        </div>
        
        {/* Mobile-specific thinking indicator */}
        {thinkingIndicator && (
          <div className={styles.mobileThinkingIndicator}>
            AI is thinking...
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;