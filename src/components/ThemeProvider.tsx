'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFromStorage, setToStorage, isStorageAvailable } from '../utils/storageUtils';

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  // Effect for checking localStorage and system preferences
  useEffect(() => {
    // Get theme from localStorage or use dark as default
    const storedTheme = getFromStorage('theme', 'dark');
    setTheme(storedTheme);
    
    // If storage is available, ensure we have a default value
    if (isStorageAvailable() && storedTheme === 'dark') {
      setToStorage('theme', 'dark');
    }
    
    setMounted(true);
  }, []);

  // Effect for applying theme to document
  useEffect(() => {
    if (!mounted) return;
    
    // Remove both theme classes first
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    document.body.classList.remove('light-theme', 'dark-theme');
    
    // Add the current theme class
    document.documentElement.classList.add(`${theme}-theme`);
    document.body.classList.add(`${theme}-theme`);
    
    // Store the theme preference in localStorage safely
    setToStorage('theme', theme);
    
    // Set data-theme attribute for components that use it
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content', 
        theme === 'dark' ? '#121220' : '#ffffff'
      );
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      return newTheme;
    });
  };

  // Return early without the theme context value to avoid hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
} 