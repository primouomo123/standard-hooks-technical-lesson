import React, { createContext, useState } from 'react';

// Create a new context with a default value:
export const ThemeContext = createContext('light');

export function ThemeProvider({ children }) {
  // Provide a theme and a function to update it
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
