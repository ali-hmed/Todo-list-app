import '../global.css';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { TodoProvider } from '@/src/context/TodoContext';
import { InMemoryTodoRepository } from '@/src/repository/InMemoryTodoRepository';
import { useMemo } from 'react';

export const unstable_settings = {
  anchor: '(tabs)',
};

// Create the repository instance outside the component so it is stable
// across re-renders. In a future phase, this will be replaced with
// an AsyncStorageTodoRepository (or similar) injected here.
const repository = new InMemoryTodoRepository();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <TodoProvider repository={repository}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="todo/new"
            options={{
              title: 'New Todo',
              presentation: 'modal',
              headerStyle: { backgroundColor: colorScheme === 'dark' ? '#0f172a' : '#ffffff' },
              headerTintColor: colorScheme === 'dark' ? '#f8fafc' : '#0f172a',
            }}
          />
          <Stack.Screen
            name="todo/[id]"
            options={{
              title: 'Todo Details',
              headerStyle: { backgroundColor: colorScheme === 'dark' ? '#0f172a' : '#ffffff' },
              headerTintColor: colorScheme === 'dark' ? '#f8fafc' : '#0f172a',
            }}
          />
          <Stack.Screen name="+not-found" options={{ title: 'Not Found' }} />
        </Stack>
        <StatusBar style="auto" />
      </TodoProvider>
    </ThemeProvider>
  );
}
