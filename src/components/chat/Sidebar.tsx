'use client';

import React from 'react';
import styles from '@/styles/Sidebar.module.css';
import { formatDate } from '@/utils/chatUtils';
import { setToStorage } from '../../utils/storageUtils';

// Add the storage key constant
const STORAGE_KEY = 'ai-chat-app-data';

interface Chat {
  id: string;
  title: string;
  createdAt: string;
  messages: any[]; // Using any[] for simplicity
}

interface SidebarProps {
  chats: Chat[];
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string, event?: React.MouseEvent) => void;
  isOpen: boolean;
  onToggleSidebar: () => void;
  onImportChats?: () => void;
  onExportChats?: () => void;
  onAnalyzeChats?: () => void;
  onDeleteAllChats?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  isOpen,
  onToggleSidebar,
  onImportChats,
  onExportChats,
  onAnalyzeChats,
  onDeleteAllChats
}) => {
  // Handle analyze chats button click
  const handleAnalyzeChats = () => {
    if (onAnalyzeChats) {
      onAnalyzeChats();
    } else {
      alert('Chat analysis coming soon!');
    }
  };
  
  // Handle import chats button click
  const handleImportChats = () => {
    if (onImportChats) {
      onImportChats();
    } else {
      // Create a file input element
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.json';
      
      // Handle file selection
      fileInput.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            try {
              const importedChats = JSON.parse(event.target?.result as string);
              // Save to local storage using our safe utility
              setToStorage('chats', importedChats);
              alert('Chats imported successfully! Refresh the page to see them.');
              window.location.reload();
            } catch (error) {
              alert('Failed to import chats. Invalid file format.');
              console.error('Import error:', error);
            }
          };
          reader.readAsText(file);
        }
      };
      
      // Trigger file selection dialog
      fileInput.click();
    }
  };
  
  // Handle export chats button click
  const handleExportChats = () => {
    if (onExportChats) {
      onExportChats();
    } else if (chats.length === 0) {
      alert('No chats to export');
    } else {
      // Create a download link
      const dataStr = JSON.stringify(chats, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      
      const exportFileDefaultName = `ai-chat-export-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  };
  
  // Handle delete all chats button click
  const handleDeleteAllChats = () => {
    if (onDeleteAllChats) {
      onDeleteAllChats();
    } else if (chats.length === 0) {
      alert('No chats to delete');
    } else {
      const confirmDelete = window.confirm('Are you sure you want to delete all chats? This action cannot be undone.');
      if (confirmDelete) {
        // Clear the chats using our safe utility
        setToStorage('chats', []);
        // Clear activeChatId in localStorage data
        setToStorage(STORAGE_KEY, { chats: [], activeChatId: null });
        // Force page reload to reset the app state
        window.location.reload();
      }
    }
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? '' : styles.collapsed}`}>
      <div className={styles.sidebarHeader}>
        <h2>
          <i className="fas fa-comments"></i> 
          {isOpen && <span>Chat History</span>}
        </h2>
        <button className={styles.newChatBtn} onClick={onNewChat}>
          <i className="fas fa-plus"></i> {isOpen && <span>New Chat</span>}
        </button>
      </div>
      
      <div className={styles.chatList}>
        {chats.length === 0 ? (
          <div className={styles.emptyState}>
            <i className="fas fa-inbox"></i>
            <p>No chat history yet</p>
          </div>
        ) : (
          chats.map(chat => (
            <div
              key={chat.id}
              className={`${styles.chatItem} ${activeChatId === chat.id ? styles.active : ''}`}
              onClick={() => onSelectChat(chat.id)}
            >
              <div className={styles.chatIcon}>
                <i className="fas fa-comment-dots"></i>
              </div>
              <div className={styles.chatInfo}>
                <div className={styles.chatTitle}>{chat.title || 'New Chat'}</div>
                <div className={styles.chatDate}>{formatDate(chat.createdAt)}</div>
                <div className={styles.chatPreview}>
                  {chat.messages.length > 0 
                    ? (chat.messages[chat.messages.length - 1].content.length > 60 
                      ? chat.messages[chat.messages.length - 1].content.substring(0, 60) + '...' 
                      : chat.messages[chat.messages.length - 1].content)
                    : 'No messages yet'}
                </div>
              </div>
              <button 
                className={styles.deleteBtn} 
                onClick={(e) => onDeleteChat(chat.id, e)}
                title="Delete chat"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))
        )}
      </div>
      
      <div className={styles.sidebarFooter}>
        <button 
          className={styles.toggleSidebarBtn} 
          onClick={onToggleSidebar}
          title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <i className={`fas ${isOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
        </button>
        
        <button 
          className={styles.actionBtn} 
          onClick={handleAnalyzeChats}
          title="Analyze chats"
        >
          <i className="fas fa-chart-bar"></i>
        </button>
        
        <button 
          className={styles.actionBtn} 
          onClick={handleImportChats}
          title="Import chats"
        >
          <i className="fas fa-file-import"></i>
        </button>
        
        <button 
          className={styles.actionBtn} 
          onClick={handleExportChats}
          title="Export chats"
        >
          <i className="fas fa-file-export"></i>
        </button>
        
        <button 
          className={styles.actionBtn} 
          onClick={handleDeleteAllChats}
          title="Delete all chats"
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 