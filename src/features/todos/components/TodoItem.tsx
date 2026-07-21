import React, { useCallback } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from '../../../components/ui/Badge';
import { useTodoContext } from '../../../context/TodoContext';
import { useColorScheme } from '../../../../hooks/use-color-scheme';
import { formatDueDate, isOverdue } from '../../../utils/dateUtils';
import type { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { toggleTodo, deleteTodo } = useTodoContext();

  const handleToggle = useCallback(async () => {
    const error = await toggleTodo(todo.id);
    if (error) {
      Alert.alert('Error', error);
    }
  }, [todo.id, toggleTodo]);

  const handlePress = useCallback(() => {
    router.push(`/todo/${todo.id}`);
  }, [router, todo.id]);

  const handleDelete = useCallback(() => {
    Alert.alert(
      'Delete Todo',
      `Are you sure you want to delete "${todo.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const error = await deleteTodo(todo.id);
            if (error) {
              Alert.alert('Error', error);
            }
          },
        },
      ]
    );
  }, [todo.id, todo.title, deleteTodo]);

  const dueDateLabel = formatDueDate(todo.dueDate);
  const overdue = !todo.completed && isOverdue(todo.dueDate);

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`Todo: ${todo.title}. ${todo.completed ? 'Completed' : 'Active'}. Priority: ${todo.priority}.${dueDateLabel ? ` Due: ${dueDateLabel}.` : ''}`}
      accessibilityHint="Double tap to view or edit this todo"
      className="active:opacity-80"
    >
      <View className="flex-row items-center gap-3 bg-white dark:bg-black px-4 py-3 border-b border-slate-100 dark:border-zinc-900">
        {/* Checkbox */}
        <Pressable
          onPress={handleToggle}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: todo.completed }}
          accessibilityLabel={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
          hitSlop={8}
          className="items-center justify-center w-11 h-11 -ml-1"
        >
          <View
            className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
              todo.completed
                ? 'bg-slate-900 dark:bg-white border-slate-900 dark:border-white'
                : 'border-slate-300 dark:border-zinc-600 bg-transparent'
            }`}
          >
            {todo.completed && (
              <Ionicons name="checkmark" size={14} color={isDark ? '#000000' : '#ffffff'} />
            )}
          </View>
        </Pressable>

        {/* Content */}
        <View className="flex-1 gap-1">
          <Text
            className={`text-base font-medium ${
              todo.completed
                ? 'line-through text-slate-400 dark:text-zinc-600'
                : 'text-slate-900 dark:text-zinc-100'
            }`}
            numberOfLines={2}
          >
            {todo.title}
          </Text>

          {todo.description.length > 0 && (
            <Text
              className="text-sm text-slate-500 dark:text-zinc-400"
              numberOfLines={1}
            >
              {todo.description}
            </Text>
          )}

          <View className="flex-row items-center gap-2 mt-0.5">
            <Badge variant="priority" priority={todo.priority} />

            {dueDateLabel && (
              <Text
                className={`text-xs font-medium ${
                  overdue
                    ? 'text-danger font-semibold'
                    : 'text-slate-500 dark:text-zinc-400'
                }`}
                accessibilityLabel={overdue ? `Overdue: ${dueDateLabel}` : `Due: ${dueDateLabel}`}
              >
                {overdue ? '⚠ ' : ''}{dueDateLabel}
              </Text>
            )}
          </View>
        </View>

        {/* Delete button */}
        <Pressable
          onPress={handleDelete}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={`Delete "${todo.title}"`}
          className="items-center justify-center w-10 h-10"
        >
          <Ionicons
            name="trash-outline"
            size={18}
            color={isDark ? '#52525b' : '#94a3b8'}
          />
        </Pressable>
      </View>
    </Pressable>
  );
}
