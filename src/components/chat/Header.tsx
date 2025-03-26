'use client';

import Link from 'next/link';
import styles from '@/styles/Header.module.css';

interface HeaderProps {
  currentModel: string;
  onToggleModelSelector: () => void;
  onToggleTheme: () => void;
  themeMode: string;
  onToggleSidebar: () => void;
}

const Header = ({
  currentModel,
  onToggleModelSelector,
  onToggleTheme,
  themeMode,
  onToggleSidebar
}: HeaderProps) => {
  // Format model name for display
  const formatModelName = (model: string) => {
    // Remove prefix and convert to title case
    const name = model.split('-').map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join(' ');
    
    // Special cases
    if (name.toLowerCase().includes('gpt')) {
      return name.toUpperCase();
    }
    
    return name;
  };

  // Get model provider for icon selection
  const getModelProvider = (model: string) => {
    const modelLower = model.toLowerCase();
    if (modelLower.includes('gpt')) return 'openai';
    if (modelLower.includes('claude')) return 'anthropic';
    if (modelLower.includes('gemini')) return 'google';
    if (modelLower.includes('llama')) return 'meta';
    if (modelLower.includes('command')) return 'cohere';
    return 'default';
  };

  // Get provider icon
  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'openai':
        return 'fa-bolt';
      case 'anthropic':
        return 'fa-robot';
      case 'google':
        return 'fa-google';
      case 'meta':
        return 'fa-facebook';
      case 'cohere':
        return 'fa-brain';
      default:
        return 'fa-microchip';
    }
  };

  const modelProvider = getModelProvider(currentModel);
  const providerIcon = getProviderIcon(modelProvider);
  const displayName = formatModelName(currentModel);

  return (
    <header className={styles.header}>
      <div className={styles.leftActions}>
        <button 
          onClick={onToggleSidebar}
          className={styles.iconButton}
          aria-label="Toggle sidebar"
        >
          <i className="fas fa-bars"></i>
        </button>
        <h1 className={styles.title}>
          <i className="fas fa-robot"></i>
          <span className={styles.titleText}>AI Chat</span>
        </h1>
      </div>
      
      <div className={styles.modelSelector}>
        <button 
          onClick={onToggleModelSelector}
          className={styles.modelButton}
          aria-label="Change AI model"
        >
          <span>
            <i className={`fas ${providerIcon}`}></i>
            {displayName}
          </span>
          <i className="fas fa-angle-down"></i>
        </button>
      </div>
      
      <div className={styles.rightActions}>
        <Link href="/settings" className={styles.settingsIcon} aria-label="Settings">
          <i className="fas fa-cog"></i>
        </Link>
        <button 
          onClick={onToggleTheme} 
          className={styles.themeToggle}
          aria-label="Toggle theme"
        >
          {themeMode === 'dark' ? (
            <i className={`fas fa-sun ${styles.lightIcon}`}></i>
          ) : (
            <i className={`fas fa-moon ${styles.darkIcon}`}></i>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header; 