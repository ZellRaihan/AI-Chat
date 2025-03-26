'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from '../../styles/ChatInput.module.css';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onShareChat?: () => void;
  isProcessing?: boolean;
  editingMessage?: { id: string; content: string } | null;
  onCancelEdit?: () => void;
  onEditMessage?: (id: string, newContent: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onShareChat,
  isProcessing = false,
  editingMessage = null,
  onCancelEdit,
  onEditMessage,
}) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (editingMessage) {
      // Add protection against undefined content
      const content = editingMessage.content || '';
      setMessage(content);
      if (textareaRef.current) {
        textareaRef.current.focus();
        // Auto-resize the textarea when setting content
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
        
        // Place cursor at the end of text
        const length = content.length;
        textareaRef.current.setSelectionRange(length, length);
        
        // Apply a brief highlight animation to the textarea
        textareaRef.current.classList.add(styles.highlightAnimation);
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.classList.remove(styles.highlightAnimation);
          }
        }, 1000);
      }
    } else {
      setMessage('');
    }
  }, [editingMessage]);

  // Focus the input when the component mounts
  useEffect(() => {
    if (textareaRef.current && !editingMessage) {
      textareaRef.current.focus();
    }
  }, []);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  };

  const handleSubmit = () => {
    const trimmedMessage = message.trim();
    
    // Don't submit empty messages or while processing
    if (trimmedMessage === '' || isProcessing) return;
    
    if (editingMessage && onEditMessage) {
      // Log edit submission
      console.log(`Submitting edit for message ${editingMessage.id}:`, trimmedMessage);
      
      // Call the edit handler
      onEditMessage(editingMessage.id, trimmedMessage);
      
      // Clear the editing state on successful submission
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        // Focus on the textarea again for better UX
        setTimeout(() => {
          if (textareaRef.current) textareaRef.current.focus();
        }, 0);
      }
    } else {
      // Handle new message submission
      console.log('Sending new message:', trimmedMessage);
      onSendMessage(trimmedMessage);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        // Re-focus the input after sending
        setTimeout(() => {
          if (textareaRef.current) textareaRef.current.focus();
        }, 0);
      }
      
      // Ensure proper scrolling on mobile devices
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Allow new line with Ctrl+Enter or Shift+Enter
    if (e.key === 'Enter' && (e.ctrlKey || e.shiftKey)) {
      return; // Let the default behavior happen (new line)
    }
    
    // Submit on Enter
    if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
      e.preventDefault();
      handleSubmit();
    }
    
    // Cancel edit on Escape key
    if (e.key === 'Escape' && editingMessage && onCancelEdit) {
      e.preventDefault();
      onCancelEdit();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    // Simulate voice recording (in a real app, this would use the Web Speech API)
    if (!isRecording) {
      // Start recording simulation
      console.log('Started recording...');
    } else {
      // End recording simulation
      console.log('Stopped recording...');
      // Simulate transcribed text
      setTimeout(() => {
        setMessage(prev => prev + (prev ? ' ' : '') + "This is simulated voice input text.");
      }, 500);
    }
  };

  return (
    <div className={styles.inputArea}>
      {editingMessage && (
        <div className={styles.editingIndicator}>
          <div className={styles.editingModeLabel}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
            <span>Editing message</span>
          </div>
          {onCancelEdit && (
            <button 
              className={styles.cancelEditBtn} 
              onClick={onCancelEdit}
              aria-label="Cancel editing"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Cancel editing
            </button>
          )}
        </div>
      )}
      
      <div className={`${styles.inputWrapper} ${isFocused ? styles.focused : ''}`}>
        <textarea
          ref={textareaRef}
          className={`${styles.userInput} ${editingMessage ? styles.editMode : ''}`}
          value={message}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={editingMessage ? "Edit your message..." : "Type your message here..."}
          rows={1}
          aria-label={editingMessage ? "Edit message" : "Type a message"}
        />
        
        <div className={styles.inputButtons}>
          {!editingMessage && (
            <>
              <button
                className={styles.shareChat}
                onClick={onShareChat}
                title="Share this conversation"
                aria-label="Share conversation"
                disabled={isProcessing}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
              </button>
              
              <button
                className={`${styles.pencilButton} ${isRecording ? styles.recording : ''}`}
                onClick={toggleRecording}
                title={isRecording ? "Stop recording" : "Start voice input"}
                aria-label={isRecording ? "Stop voice recording" : "Start voice recording"}
                disabled={isProcessing}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" x2="12" y2="23"></line>
                  <line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
              </button>
            </>
          )}
          
          <button
            className={`${styles.sendButton} ${editingMessage ? styles.editMode : ''}`}
            onClick={handleSubmit}
            disabled={!message.trim() || isProcessing}
            title={editingMessage ? "Save changes" : "Send message"}
            aria-label={editingMessage ? "Save changes" : "Send message"}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {editingMessage ? (
                <>
                  <polyline points="20 6 9 17 4 12"></polyline>
                </>
              ) : (
                <>
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {isRecording && (
        <div className={styles.recordingIndicator}>
          <div className={styles.recordingPulse}></div>
          <span>Recording... Speak now</span>
        </div>
      )}
      
      {message.length > 0 && (
        <div className={styles.characterCount}>
          {message.length} characters
        </div>
      )}
    </div>
  );
};

export default ChatInput; 