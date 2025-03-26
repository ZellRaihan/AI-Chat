'use client';

import React, { useState, useRef, useEffect } from 'react';
import { formatTime } from '../../utils/chatUtils';
import styles from '../../styles/MessageList.module.css';

interface Message {
  id: string;
  role: string;
  content: string;
  timestamp: string;
  provider?: string;
  edited?: boolean;
  originalContent?: string;
}

interface MessageListProps {
  messages: Message[];
  onEditMessage: (content: string, messageId: string) => void;
  thinkingIndicator: boolean;
  onRevertEdit?: (originalContent: string, messageId: string) => void;
}

export default function MessageList({
  messages,
  onEditMessage,
  thinkingIndicator,
  onRevertEdit
}: MessageListProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTouchedMessageId, setActiveTouchedMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  // Scroll to bottom when messages change or thinking indicator appears
  useEffect(() => {
    scrollToBottom();
  }, [messages, thinkingIndicator]);
  
  // Add scroll event listener to show/hide scroll button
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      // Show button when scrolled up more than 300px from bottom
      const isScrolledUp = scrollHeight - scrollTop - clientHeight > 300;
      setShowScrollButton(isScrolledUp);
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Add new useEffect for handling touch on mobile
  useEffect(() => {
    // Only add this effect for mobile devices
    if (window.innerWidth <= 768) {
      const handleClickOutside = (e: MouseEvent) => {
        // If clicked outside a message, clear active touched message
        const messageElements = document.querySelectorAll(`.${styles.message}`);
        let clickedInsideMessage = false;
        
        messageElements.forEach(element => {
          if (element.contains(e.target as Node)) {
            clickedInsideMessage = true;
          }
        });
        
        if (!clickedInsideMessage) {
          setActiveTouchedMessageId(null);
        }
      };
      
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, []);
  
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      
      // Additional scroll for mobile devices that may have virtual keyboards
      if (window.innerWidth <= 768) {
        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  };

  const handleCopy = async (content: string, index: number) => {
    // First check if navigator.clipboard is available and we're in a secure context
    if (navigator.clipboard && window.isSecureContext) {
      try {
        // Try the clipboard writeText API
        await navigator.clipboard.writeText(content);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
        return;
      } catch (err) {
        console.error('Clipboard API failed:', err);
      }
    }
    
    // Fallback to execCommand method
    try {
      // Create and prepare textarea
      const textArea = document.createElement('textarea');
      textArea.value = content;
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
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      } else {
        // If execCommand fails, use the prompt method
        copyWithPrompt(content, index);
      }
      
      // Cleanup
      document.body.removeChild(textArea);
      if (selection) {
        selection.removeAllRanges();
      }
    } catch (err) {
      console.error('Fallback copy method failed:', err);
      copyWithPrompt(content, index);
    }
  };

  const copyWithPrompt = (content: string, index: number) => {
    try {
      // As a last resort, show the text in a prompt for users to manually copy
      window.prompt('Copy this text (Ctrl+C / Cmd+C, then Enter):', content);
      
      // We can't know for sure if the user copied, but we'll assume they did
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (e) {
      console.error('Final fallback copy method failed:', e);
      alert('Copy to clipboard is not supported in this browser. Please manually copy the text from the message.');
    }
  };

  const handleEdit = (message: Message) => {
    if (typeof onEditMessage === 'function') {
      onEditMessage(message.content, message.id);
    } else {
      console.error('Edit function not available');
    }
  };

  const handleRevert = (message: Message) => {
    if (typeof onRevertEdit === 'function' && message.originalContent) {
      onRevertEdit(message.originalContent, message.id);
    } else {
      console.error('Revert function not available or no original content stored');
    }
  };

  const handleMessageTouch = (messageId: string) => {
    if (window.innerWidth <= 768) {
      if (activeTouchedMessageId === messageId) {
        // If already active, deactivate
        setActiveTouchedMessageId(null);
      } else {
        setActiveTouchedMessageId(messageId);
      }
    }
  };

  return (
    <div className={styles.messages} ref={messagesContainerRef}>
      {messages.length === 0 ? (
        <div className={styles.welcomeMessage}>
          <div className={styles.welcomeHeader}>
            <i className="fas fa-robot"></i>
            <h2>Welcome to AI Chat</h2>
          </div>
          <p>Start chatting instantly - no login or signup required! This app automatically uses available AI models with smart fallback if any API has issues.</p>
          <div className={styles.welcomeFeatures}>
            <div className={styles.welcomeFeature}>
              <i className="fas fa-exchange-alt"></i>
              <span>Auto-switches between AI models</span>
            </div>
            <div className={styles.welcomeFeature}>
              <i className="fas fa-history"></i>
              <span>Chat history saved locally</span>
            </div>
            <div className={styles.welcomeFeature}>
              <i className="fas fa-moon"></i>
              <span>Dark and light themes</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message, index) => (
            <div
              key={index}
              id={`message-${message.id}`}
              className={`${styles.message} ${
                message.role === 'user' ? styles.userMessage : styles.aiMessage
              } ${message.edited ? styles.editedMessage : ''}
              ${activeTouchedMessageId === message.id ? styles.touchActive : ''}`}
              onClick={() => handleMessageTouch(message.id)}
            >
              <div className={styles.messageContent}>
                {message.content}
                {message.edited && (
                  <span className={styles.messageEdited}>
                    (edited)
                    {message.originalContent && (
                      <span className={styles.editHint}> • original version available</span>
                    )}
                  </span>
                )}
              </div>
              <div className={styles.messageActions}>
                {message.role === 'user' && (
                  <>
                    <button
                      className={`${styles.messageActionBtn} ${styles.editBtn}`}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the message touch handler
                        handleEdit(message);
                      }}
                      title="Edit this message"
                      aria-label="Edit message"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="14" 
                        height="14" 
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
                      <span className={styles.actionBtnLabel}>Edit</span>
                    </button>
                    
                    {message.edited && message.originalContent && (
                      <button
                        className={`${styles.messageActionBtn} ${styles.revertBtn}`}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering the message touch handler
                          handleRevert(message);
                        }}
                        title="Revert this message to its original version"
                        aria-label="Revert to original"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="14" 
                          height="14" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                          <path d="M3 3v5h5"></path>
                        </svg>
                        <span className={styles.actionBtnLabel}>Revert</span>
                      </button>
                    )}
                  </>
                )}
                <button
                  className={`${styles.messageActionBtn} ${styles.copyBtn}`}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the message touch handler
                    handleCopy(message.content, index);
                  }}
                  title={copiedIndex === index ? "Message copied to clipboard" : "Copy message to clipboard"}
                  aria-label={copiedIndex === index ? "Copied" : "Copy"}
                >
                  {copiedIndex === index ? (
                    <>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="14" 
                        height="14" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                      <span className={styles.actionBtnLabel}>Copied</span>
                    </>
                  ) : (
                    <>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="14" 
                        height="14" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                      <span className={styles.actionBtnLabel}>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className={styles.messageInfo}>
                {message.provider && (
                  <span className={`${styles.providerBadge} ${styles[`provider-${message.provider.toLowerCase().replace(/\./g, '-')}`]}`}>
                    {message.provider}
                  </span>
                )}
                <span className={styles.messageTime}>{formatTime(message.timestamp)}</span>
              </div>
            </div>
          ))}
        </>
      )}
      
      {thinkingIndicator && (
        <div className={`${styles.message} ${styles.aiMessage}`}>
          <div className={styles.thinkingIndicator}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
        </div>
      )}
      
      {/* Scroll to bottom button */}
      {showScrollButton && (
        <button 
          className={styles.scrollToBottomBtn}
          onClick={scrollToBottom}
          aria-label="Scroll to bottom"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      )}
      
      {/* This is the div that we'll scroll to */}
      <div ref={messagesEndRef} className={styles.messagesEnd} />
      
      {/* Extra space at the bottom to prevent action buttons from being hidden */}
      <div className={styles.extraSpace}></div>
    </div>
  );
} 