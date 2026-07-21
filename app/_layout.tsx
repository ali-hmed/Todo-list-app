import '../global.css';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { TodoProvider } from '@/src/context/TodoContext';
import { ThemeProvider as AppThemeProvider } from '@/src/context/ThemeContext';
import { InMemoryTodoRepository } from '@/src/repository/InMemoryTodoRepository';

export const unstable_settings = {
  anchor: '(tabs)',
};

const repository = new InMemoryTodoRepository();

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <TodoProvider repository={repository}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="todo/new"
            options={{
              title: 'New Todo',
              presentation: 'modal',
              headerStyle: { backgroundColor: isDark ? '#0f172a' : '#ffffff' },
              headerTintColor: isDark ? '#f8fafc' : '#0f172a',
            }}
          />
          <Stack.Screen
            name="todo/[id]"
            options={{
              title: 'Todo Details',
              headerStyle: { backgroundColor: isDark ? '#0f172a' : '#ffffff' },
              headerTintColor: isDark ? '#f8fafc' : '#0f172a',
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
