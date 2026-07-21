import '../global.css';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { TodoProvider } from '@/src/context/TodoContext';
import { ThemeProvider as AppThemeProvider } from '@/src/context/ThemeContext';
import { AsyncStorageTodoRepository } from '@/src/repository/AsyncStorageTodoRepository';

export const unstable_settings = {
  anchor: '(tabs)',
};

// Persistent on-device storage instance
const repository = new AsyncStorageTodoRepository();

// Custom Dark navigation theme with true pitch black background
const PitchDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#000000',
    card: '#000000',
    border: '#18181b',
    text: '#ffffff',
  },
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ThemeProvider value={isDark ? PitchDarkTheme : DefaultTheme}>
      <TodoProvider repository={repository}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="todo/new"
            options={{
              title: 'New Todo',
              presentation: 'modal',
              headerStyle: { backgroundColor: isDark ? '#000000' : '#ffffff' },
              headerTintColor: isDark ? '#ffffff' : '#000000',
            }}
          />
          <Stack.Screen
            name="todo/[id]"
            options={{
              title: 'Todo Details',
              headerStyle: { backgroundColor: isDark ? '#000000' : '#ffffff' },
              headerTintColor: isDark ? '#ffffff' : '#000000',
            }}
          />
          <Stack.Screen name="+not-found" options={{ title: 'Not Found' }} />
        </Stack>
        <StatusBar style={isDark ? 'light' : 'dark'} />
      </TodoProvider>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <RootLayoutNav />
    </AppThemeProvider>
  );
}
