import { useColorScheme as useRNColorScheme } from 'react-native';
import { useTheme } from '@/src/context/ThemeContext';

export function useColorScheme(): 'light' | 'dark' {
  try {
    const theme = useTheme();
    if (theme && theme.colorScheme) {
      return theme.colorScheme;
    }
  } catch {
    // Fallback if rendered outside ThemeProvider
  }
  const rnScheme = useRNColorScheme();
  return rnScheme === 'dark' ? 'dark' : 'light';
}
