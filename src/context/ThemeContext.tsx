import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance, useColorScheme as useRNColorScheme } from 'react-native';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  themeMode: ThemeMode;
  colorScheme: 'light' | 'dark';
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  themeMode: 'system',
  colorScheme: 'light',
  setThemeMode: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useRNColorScheme() ?? 'light';
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [activeColorScheme, setActiveColorScheme] = useState<'light' | 'dark'>(
    systemColorScheme === 'dark' ? 'dark' : 'light'
  );

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    if (mode === 'light') {
      Appearance.setColorScheme('light');
      setActiveColorScheme('light');
    } else if (mode === 'dark') {
      Appearance.setColorScheme('dark');
      setActiveColorScheme('dark');
    } else {
      Appearance.setColorScheme(null);
      setActiveColorScheme(systemColorScheme === 'dark' ? 'dark' : 'light');
    }
  };

  useEffect(() => {
    if (themeMode === 'system') {
      setActiveColorScheme(systemColorScheme === 'dark' ? 'dark' : 'light');
    }
  }, [systemColorScheme, themeMode]);

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        colorScheme: activeColorScheme,
        setThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
