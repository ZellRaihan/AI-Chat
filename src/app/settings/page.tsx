'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '@/styles/Settings.module.css';
import { useTheme } from '@/components/ThemeProvider';
import { getFromStorage, setToStorage } from '../../utils/storageUtils';

interface Model {
  id: string;
  name: string;
  provider: string;
  isEnabled: boolean;
  isDefault: boolean;
}

const STORAGE_KEY = 'ai-chat-app-models';

const defaultModels: Model[] = [
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', isEnabled: true, isDefault: true },
  { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', isEnabled: true, isDefault: false },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI', isEnabled: true, isDefault: false },
  { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic', isEnabled: true, isDefault: false },
  { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', provider: 'Anthropic', isEnabled: true, isDefault: false },
  { id: 'claude-3-haiku', name: 'Claude 3 Haiku', provider: 'Anthropic', isEnabled: true, isDefault: false },
  { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google', isEnabled: true, isDefault: false },
  { id: 'llama-3-70b', name: 'Llama 3 70B', provider: 'Meta', isEnabled: true, isDefault: false },
];

export default function SettingsPage() {
  const [models, setModels] = useState<Model[]>([]);
  const [initialized, setInitialized] = useState(false);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  
  // Load models from localStorage on component mount
  useEffect(() => {
    // Use storage utility to safely load models
    const savedModels = getFromStorage<Model[]>(STORAGE_KEY, defaultModels);
    setModels(savedModels);
    setInitialized(true);
  }, []);
  
  // Save models to localStorage when they change
  useEffect(() => {
    if (initialized) {
      // Use storage utility to safely save models
      setToStorage(STORAGE_KEY, models);
    }
  }, [models, initialized]);

  const handleToggleEnabled = (modelId: string) => {
    setModels(prevModels => 
      prevModels.map(model => 
        model.id === modelId 
          ? { ...model, isEnabled: !model.isEnabled } 
          : model
      )
    );
  };

  const handleSetDefault = (modelId: string) => {
    setModels(prevModels => 
      prevModels.map(model => ({
        ...model,
        isDefault: model.id === modelId
      }))
    );
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all model settings to default?')) {
      setModels(defaultModels);
    }
  };

  if (!initialized) {
    return null;
  }

  return (
    <div className={styles.settingsPage}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.backButton}>
            <i className="fa fa-arrow-left"></i>
            <span>Back to Chat</span>
          </Link>
          <h1>Settings</h1>
          <button onClick={toggleTheme} className={styles.themeToggle}>
            {theme === 'dark' ? (
              <i className="fa fa-sun-o"></i>
            ) : (
              <i className="fa fa-moon-o"></i>
            )}
          </button>
        </div>
      </header>

      <main className={styles.content}>
        <section className={styles.section}>
          <h2>AI Models</h2>
          <p className={styles.sectionDescription}>
            Configure which AI models are available in the chat interface and set your default model.
          </p>

          <div className={styles.modelsList}>
            <div className={styles.modelHeader}>
              <div className={styles.modelName}>Model</div>
              <div className={styles.modelProvider}>Provider</div>
              <div className={styles.modelControls}>Enabled</div>
              <div className={styles.modelControls}>Default</div>
            </div>

            {models.map(model => (
              <div key={model.id} className={styles.modelItem}>
                <div className={styles.modelName}>{model.name}</div>
                <div className={styles.modelProvider}>{model.provider}</div>
                <div className={styles.modelControls}>
                  <input
                    type="checkbox"
                    checked={model.isEnabled}
                    onChange={() => handleToggleEnabled(model.id)}
                    id={`toggle-${model.id}`}
                    className={styles.toggleInput}
                  />
                  <label
                    htmlFor={`toggle-${model.id}`}
                    className={styles.toggleLabel}
                  ></label>
                </div>
                <div className={styles.modelControls}>
                  <input
                    type="radio"
                    name="defaultModel"
                    checked={model.isDefault}
                    onChange={() => handleSetDefault(model.id)}
                    id={`default-${model.id}`}
                    className={styles.radioInput}
                    disabled={!model.isEnabled}
                  />
                  <label
                    htmlFor={`default-${model.id}`}
                    className={styles.radioLabel}
                  ></label>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <button onClick={handleReset} className={styles.resetButton}>
              Reset to Defaults
            </button>
          </div>
        </section>
      </main>
    </div>
  );
} 