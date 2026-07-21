import React, { useCallback } from 'react';
import { Alert, Pressable, SafeAreaView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTodoContext } from '@/src/context/TodoContext';
import { TodoList } from '@/src/features/todos/components/TodoList';
import { TodoListHeader } from '@/src/features/todos/components/TodoListHeader';

export default function TodosScreen() {
  const router = useRouter();
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
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950">
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
        className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-brand shadow-lg items-center justify-center active:bg-brand-dark"
        style={{ elevation: 6 }}
      >
        <Ionicons name="add" size={28} color="white" />
      </Pressable>
    </SafeAreaView>
  );
}
