import React, { useCallback, useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTodoContext } from '@/src/context/TodoContext';
import { TodoForm } from '@/src/features/todos/components/TodoForm';
import { TodoNoteView } from '@/src/features/todos/components/TodoNoteView';
import { useTodoForm } from '@/src/features/todos/hooks/useTodoForm';
import { Button } from '@/src/components/ui/Button';
import type { CreateTodoInput, UpdateTodoInput } from '@/src/features/todos/types';

export default function TodoDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const navigation = useNavigation();
  const { getTodoById, updateTodo, deleteTodo, toggleTodo } = useTodoContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const todo = getTodoById(id);

  // Initialize form with existing todo data
  const form = useTodoForm(
    todo
      ? {
          title: todo.title,
          description: todo.description,
          priority: todo.priority,
          dueDate: todo.dueDate ? new Date(todo.dueDate + 'T00:00:00') : null,
        }
      : undefined
  );

  // Update navigation title dynamically
  useEffect(() => {
    if (todo) {
      navigation.setOptions({
        title: isEditing
          ? 'Edit Note'
          : todo.title.length > 30
          ? todo.title.slice(0, 30) + '…'
          : todo.title,
      });
    }
  }, [todo?.title, navigation, isEditing]);

  const handleSave = useCallback(async () => {
    if (!todo) return;
    await form.handleSubmit(async (input: CreateTodoInput) => {
      setIsSubmitting(true);
      const updateInput: UpdateTodoInput = {
        title: input.title,
        description: input.description,
        priority: input.priority,
        dueDate: input.dueDate,
      };
      const error = await updateTodo(todo.id, updateInput);
      setIsSubmitting(false);

      if (error) {
        Alert.alert('Could Not Save', error, [{ text: 'OK' }]);
        return;
      }

      setIsEditing(false);
    });
  }, [todo, form, updateTodo]);

  const handleToggle = useCallback(async () => {
    if (!todo) return;
    setIsToggling(true);
    const error = await toggleTodo(todo.id);
    setIsToggling(false);
    if (error) {
      Alert.alert('Error', error);
    }
  }, [todo, toggleTodo]);

  const handleDelete = useCallback(() => {
    if (!todo) return;
    Alert.alert(
      'Delete Todo',
      `Are you sure you want to delete "${todo.title}"? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setIsDeleting(true);
            const error = await deleteTodo(todo.id);
            setIsDeleting(false);
            if (error) {
              Alert.alert('Error', error);
              return;
            }
            router.back();
          },
        },
      ]
    );
  }, [todo, deleteTodo, router]);

  if (!todo) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50 dark:bg-slate-950 p-8">
        <Text className="text-lg font-medium text-slate-900 dark:text-white text-center">
          This todo no longer exists.
        </Text>
        <View className="mt-4">
          <Button label="Go Back" onPress={() => router.back()} variant="secondary" />
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
    >
      {isEditing ? (
        <View className="flex-1 bg-slate-50 dark:bg-slate-950">
          <View className="flex-row items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
            <Pressable
              onPress={() => setIsEditing(false)}
              className="flex-row items-center gap-1.5"
            >
              <Ionicons name="arrow-back" size={18} color="#64748b" />
              <Text className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Cancel Editing
              </Text>
            </Pressable>

            <Text className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Edit Mode
            </Text>
          </View>

          <TodoForm
            form={form}
            submitLabel="Save Note Changes"
            onSubmit={handleSave}
            isSubmitting={isSubmitting}
          />
        </View>
      ) : (
        <TodoNoteView
          todo={todo}
          onEditPress={() => setIsEditing(true)}
          onTogglePress={handleToggle}
          onDeletePress={handleDelete}
          isToggling={isToggling}
          isDeleting={isDeleting}
        />
      )}
    </KeyboardAvoidingView>
  );
}
