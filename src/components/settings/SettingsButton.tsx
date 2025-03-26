'use client';

import React from 'react';
import styles from '@/styles/Settings.module.css';

interface SettingsButtonProps {
  onClick: () => void;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ onClick }) => {
  return (
    <button className={styles.settingsButton} onClick={onClick}>
      <i className="fas fa-cog"></i>
      <span>Settings</span>
    </button>
  );
};

export default SettingsButton; 