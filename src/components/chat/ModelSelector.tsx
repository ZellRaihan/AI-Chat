'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from '@/styles/ModelSelector.module.css';
import { getFromStorage } from '../../utils/storageUtils';

interface Model {
  id: string;
  name: string;
  provider: string;
  isEnabled: boolean;
  isDefault: boolean;
}

interface ModelSelectorProps {
  currentModel: string;
  onSelectModel: (modelId: string) => void;
  onClose: () => void;
}

const STORAGE_KEY = 'ai-chat-app-models';

const defaultModels: Model[] = [
  { id: 'gpt-4o', name: 'Azure OpenAI GPT-4o', provider: 'OpenAI', isEnabled: true, isDefault: true },
  { id: 'deepseek-r1', name: 'DeepSeek-R1', provider: 'DeepSeek', isEnabled: true, isDefault: false },
  { id: 'llama-3.3-70b-instruct', name: 'Llama-3.3-70B-Instruct', provider: 'Meta', isEnabled: true, isDefault: false }
];

const ModelSelector = ({ currentModel, onSelectModel, onClose }: ModelSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [models, setModels] = useState<Model[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load models from localStorage using our safe storage utility
    const savedModels = getFromStorage<Model[]>(STORAGE_KEY, defaultModels);
    setModels(savedModels);

    // Focus search input when component mounts
    if (searchRef.current) {
      searchRef.current.focus();
    }

    // Add click outside listener
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Add escape key listener
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  // Filter models based on search term and only show enabled ones
  const filteredModels = models
    .filter(model => model.isEnabled)
    .filter(model => 
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Group models by provider
  const modelsByProvider: Record<string, Model[]> = {};
  filteredModels.forEach(model => {
    if (!modelsByProvider[model.provider]) {
      modelsByProvider[model.provider] = [];
    }
    modelsByProvider[model.provider].push(model);
  });

  // Handle model selection
  const handleSelectModel = (modelId: string) => {
    onSelectModel(modelId);
  };

  // Get provider icon class
  const getProviderIcon = (provider: string) => {
    switch (provider.toLowerCase()) {
      case 'openai':
        return 'fa-bolt';
      case 'deepseek':
        return 'fa-brain';
      case 'meta':
        return 'fa-facebook';
      default:
        return 'fa-microchip';
    }
  };

  return (
    <div className={styles.modelSelector} ref={modalRef}>
      <div className={styles.modelSelectorHeader}>
        <h3><i className="fas fa-exchange-alt"></i> Select AI Model</h3>
        <button onClick={onClose} className={styles.closeButton} aria-label="Close model selector">
          <i className="fas fa-times"></i>
        </button>
      </div>
      
      <div className={styles.modelSearch}>
        <i className="fas fa-search"></i>
        <input
          ref={searchRef}
          type="text"
          placeholder="Search models..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
          aria-label="Search models"
        />
      </div>
      
      <div className={styles.modelList}>
        {Object.entries(modelsByProvider).map(([provider, providerModels]) => (
          <div key={provider} className={styles.modelGroup}>
            <div className={styles.providerLabel}>
              <i className={`fas ${getProviderIcon(provider)}`}></i> {provider}
            </div>
            {providerModels.map(model => (
              <div
                key={model.id}
                className={`${styles.modelItem} ${model.id === currentModel ? styles.selectedModel : ''}`}
                onClick={() => handleSelectModel(model.id)}
              >
                <div className={styles.modelName}>{model.name}</div>
                {model.id === currentModel && (
                  <div className={styles.modelSelected}>
                    <i className="fas fa-check"></i>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
        
        {filteredModels.length === 0 && (
          <div className={styles.noResults}>
            No models found matching "{searchTerm}"
          </div>
        )}
      </div>
      
      <div className={styles.settingsLink}>
        <Link href="/settings">
          <i className="fas fa-cog"></i>
          <span>Manage Model Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default ModelSelector; 