import React, { useCallback } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTodoContext } from '@/src/context/TodoContext';
import { TodoList } from '@/src/features/todos/components/TodoList';
import { TodoListHeader } from '@/src/features/todos/components/TodoListHeader';

export default function TodosScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const {
    filteredTodos,
    filter,
    isLoading,
    error,
    totalCount,
    activeCount,
    completedCount,
    setFilter,
    clearError,
  } = useTodoContext();

  const handleCreatePress = useCallback(() => {
    router.push('/todo/new');
  }, [router]);

  // Show error banner if context has a persistent error
  const errorBanner = error ? (
    <Pressable
      onPress={clearError}
      accessibilityRole="alert"
      accessibilityLabel={`Error: ${error}. Tap to dismiss.`}
      className="bg-danger px-4 py-3 flex-row items-center gap-2"
    >
      <Ionicons name="warning-outline" size={18} color="white" />
      <Text className="text-white text-sm flex-1">{error}</Text>
      <Ionicons name="close" size={16} color="white" />
    </Pressable>
  ) : null;

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-black">
      {errorBanner}

      <TodoListHeader
        filter={filter}
        totalCount={totalCount}
        activeCount={activeCount}
        completedCount={completedCount}
        onFilterChange={setFilter}
      />

      <TodoList
        todos={filteredTodos}
        filter={filter}
        isLoading={isLoading}
        onCreatePress={handleCreatePress}
      />

      {/* FAB — create new todo */}
      <Pressable
        onPress={handleCreatePress}
        accessibilityRole="button"
        accessibilityLabel="Create new todo"
        accessibilityHint="Opens the create todo screen"
        className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-slate-900 dark:bg-white shadow-xl items-center justify-center active:opacity-90 border border-slate-800 dark:border-slate-200"
        style={{ elevation: 6 }}
      >
        <Ionicons name="add" size={28} color={isDark ? '#000000' : '#ffffff'} />
      </Pressable>
    </SafeAreaView>
  );
}
