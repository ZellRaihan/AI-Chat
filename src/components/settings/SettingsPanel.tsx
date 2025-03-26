'use client';

import React from 'react';
import styles from '@/styles/Settings.module.css';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: {
    theme: string;
    fontSize: string;
    language: string;
    notifications: boolean;
  };
  onSettingsChange: (settings: any) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
}) => {
  if (!isOpen) return null;

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSettingsChange({ ...settings, theme: e.target.value });
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSettingsChange({ ...settings, fontSize: e.target.value });
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSettingsChange({ ...settings, language: e.target.value });
  };

  const handleNotificationsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({ ...settings, notifications: e.target.checked });
  };

  return (
    <div className={styles.settingsPanel}>
      <div className={styles.settingsHeader}>
        <h2>Settings</h2>
        <button onClick={onClose} className={styles.closeButton}>
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className={styles.settingsContent}>
        <div className={styles.settingGroup}>
          <label>Theme</label>
          <select value={settings.theme} onChange={handleThemeChange}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>

        <div className={styles.settingGroup}>
          <label>Font Size</label>
          <select value={settings.fontSize} onChange={handleFontSizeChange}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div className={styles.settingGroup}>
          <label>Language</label>
          <select value={settings.language} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
          </select>
        </div>

        <div className={styles.settingGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={handleNotificationsChange}
            />
            Enable Notifications
          </label>
        </div>
      </div>

      <div className={styles.settingsFooter}>
        <button className={styles.saveButton}>Save Changes</button>
        <button className={styles.resetButton}>Reset to Default</button>
      </div>
    </div>
  );
};

export default SettingsPanel; 