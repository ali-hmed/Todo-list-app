import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';
import { useTheme } from '@/src/context/ThemeContext';

export function useColorScheme(): 'light' | 'dark' {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  try {
    const theme = useTheme();
    if (hasHydrated && theme && theme.colorScheme) {
      return theme.colorScheme;
    }
  } catch {
    // Fallback if rendered outside ThemeProvider
  }

  const colorScheme = useRNColorScheme();
  if (hasHydrated) {
    return colorScheme === 'dark' ? 'dark' : 'light';
  }

  return 'light';
}
