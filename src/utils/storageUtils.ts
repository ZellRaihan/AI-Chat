/**
 * Utility functions for safely handling localStorage operations
 * Includes error handling for:
 * - Private browsing modes where localStorage is blocked
 * - Quota exceeded errors
 * - JSON parsing errors
 * - Server-side rendering (window not defined)
 */

/**
 * Safely get an item from localStorage with error handling
 * @param key The key to retrieve from localStorage
 * @param defaultValue The default value to return if the key doesn't exist or if there's an error
 * @returns The parsed value from localStorage or the default value
 */
export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage: ${error}`);
    return defaultValue;
  }
};

/**
 * Safely set an item in localStorage with error handling
 * @param key The key to set in localStorage
 * @param value The value to store (will be JSON stringified)
 * @returns true if the operation was successful, false otherwise
 */
export const setToStorage = <T>(key: string, value: T): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage: ${error}`);
    
    // Attempt to handle quota exceeded errors by removing some items
    if (error instanceof DOMException && 
        (error.code === 22 || // Chrome
         error.code === 1014 || // Firefox
         error.name === 'QuotaExceededError' || 
         error.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
      
      // Only attempt cleanup if we have enough items
      if (localStorage.length > 5) {
        try {
          // Find oldest items to remove (example implementation)
          cleanupOldestStorageItems(3); // Remove oldest 3 items
          
          // Try setting the item again
          localStorage.setItem(key, JSON.stringify(value));
          return true;
        } catch (cleanupError) {
          console.error('Failed to clean up localStorage:', cleanupError);
        }
      }
    }
    
    return false;
  }
};

/**
 * Safely remove an item from localStorage with error handling
 * @param key The key to remove from localStorage
 * @returns true if the operation was successful, false otherwise
 */
export const removeFromStorage = (key: string): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage: ${key}`, error);
    return false;
  }
};

/**
 * Check if localStorage is available and working
 * @returns true if localStorage is available, false otherwise
 */
export const isStorageAvailable = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Helper function to clean up oldest items when storage quota is exceeded
 * @param count Number of items to remove
 */
const cleanupOldestStorageItems = (count: number): void => {
  // This is a basic implementation that just removes the first `count` items
  // In a real app, you might want to track timestamps or prioritize what to keep
  const keysToRemove: string[] = [];
  
  for (let i = 0; i < localStorage.length && keysToRemove.length < count; i++) {
    const key = localStorage.key(i);
    if (key) keysToRemove.push(key);
  }
  
  keysToRemove.forEach(key => localStorage.removeItem(key));
};

export const clearStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
}; 