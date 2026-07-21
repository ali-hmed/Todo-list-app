import React, { useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';
import { TodoItem } from './TodoItem';
import { EmptyState } from '../../../components/ui/EmptyState';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import type { Todo, TodoFilter } from '../types';

interface TodoListProps {
  todos: Todo[];
  filter: TodoFilter;
  isLoading: boolean;
  onCreatePress: () => void;
}

function Separator() {
  return <View className="h-px bg-slate-100 dark:bg-slate-700" />;
}

export function TodoList({ todos, filter, isLoading, onCreatePress }: TodoListProps) {
  const renderItem = useCallback(
    ({ item }: { item: Todo }) => <TodoItem todo={item} />,
    []
  );

  const keyExtractor = useCallback((item: Todo) => item.id, []);

  if (isLoading) {
    return <LoadingSpinner message="Loading your todos…" />;
  }

  const emptyTitle =
    filter === 'all'
      ? 'No todos yet'
      : filter === 'active'
      ? 'No active todos'
      : 'No completed todos';

  const emptyDescription =
    filter === 'all'
      ? 'Tap the + button to create your first todo.'
      : filter === 'active'
      ? 'All caught up! Every todo has been completed.'
      : 'Complete a todo and it will appear here.';

  return (
    <FlatList
      data={todos}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={Separator}
      contentContainerStyle={todos.length === 0 ? { flex: 1 } : { paddingBottom: 120 }}
      keyboardShouldPersistTaps="handled"
      ListEmptyComponent={
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          actionLabel={filter === 'all' ? 'Create Todo' : undefined}
          onAction={filter === 'all' ? onCreatePress : undefined}
        />
      }
    />
  );
}
