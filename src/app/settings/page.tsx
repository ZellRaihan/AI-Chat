'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '@/styles/Settings.module.css';
import { useTheme } from '@/components/ThemeProvider';
import { getFromStorage, setToStorage, clearStorage } from '../../utils/storageUtils';
import MainLayout from '@/components/MainLayout';

interface Model {
  id: string;
  name: string;
  provider: string;
  isEnabled: boolean;
  isDefault: boolean;
}

const STORAGE_KEY = 'ai-chat-app-models';

const defaultModels: Model[] = [
  { id: 'gpt-4o', name: 'Azure OpenAI GPT-4o', provider: 'OpenAI', isEnabled: true, isDefault: true },
  { id: 'deepseek-r1', name: 'DeepSeek-R1', provider: 'DeepSeek', isEnabled: true, isDefault: false },
  { id: 'llama-3.3-70b-instruct', name: 'Llama-3.3-70B-Instruct', provider: 'Meta', isEnabled: true, isDefault: false }
];

export default function SettingsPage() {
  const [models, setModels] = useState<Model[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [hasChanges, setHasChanges] = useState(false);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  
  // Load models from localStorage on component mount
  useEffect(() => {
    const savedModels = getFromStorage<Model[]>(STORAGE_KEY, defaultModels);
    setModels(savedModels);
    setInitialized(true);
  }, []);
  
  // Track changes
  useEffect(() => {
    if (initialized) {
      const savedModels = getFromStorage<Model[]>(STORAGE_KEY, defaultModels);
      const hasModelChanges = JSON.stringify(models) !== JSON.stringify(savedModels);
      setHasChanges(hasModelChanges);
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

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setSaveStatus('idle');
      
      // Validate that at least one model is enabled
      const enabledModels = models.filter(model => model.isEnabled);
      if (enabledModels.length === 0) {
        throw new Error('At least one model must be enabled');
      }

      // Validate that exactly one model is set as default
      const defaultModels = models.filter(model => model.isDefault);
      if (defaultModels.length !== 1) {
        throw new Error('Exactly one model must be set as default');
      }

      // Save to storage
      const success = setToStorage<Model[]>(STORAGE_KEY, models);
      if (!success) {
        throw new Error('Failed to save settings');
      }
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } finally {
      setIsSaving(false);
    }
  };

  if (!initialized) {
    return null;
  }

  return (
    <MainLayout>
      <div className={styles.settingsPage}>
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
              <button 
                onClick={handleSave} 
                className={`${styles.saveButton} ${isSaving ? styles.saving : ''} ${saveStatus === 'success' ? styles.success : ''} ${saveStatus === 'error' ? styles.error : ''}`}
                disabled={!hasChanges || isSaving}
              >
                {isSaving ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    <span>Saving...</span>
                  </>
                ) : saveStatus === 'success' ? (
                  <>
                    <i className="fas fa-check"></i>
                    <span>Saved!</span>
                  </>
                ) : saveStatus === 'error' ? (
                  <>
                    <i className="fas fa-exclamation-circle"></i>
                    <span>Error</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-save"></i>
                    <span>Save Changes</span>
                  </>
                )}
              </button>
              <button onClick={handleReset} className={styles.resetButton}>
                Reset to Defaults
              </button>
            </div>
          </section>
        </main>
      </div>
    </MainLayout>
  );
} 