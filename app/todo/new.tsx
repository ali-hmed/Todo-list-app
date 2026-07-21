import React, { useCallback, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useTodoContext } from '@/src/context/TodoContext';
import { TodoForm } from '@/src/features/todos/components/TodoForm';
import { useTodoForm } from '@/src/features/todos/hooks/useTodoForm';
import type { CreateTodoInput } from '@/src/features/todos/types';

export default function NewTodoScreen() {
  const router = useRouter();
  const { addTodo } = useTodoContext();
  const form = useTodoForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    await form.handleSubmit(async (input: CreateTodoInput) => {
      setIsSubmitting(true);
      const error = await addTodo(input);
      setIsSubmitting(false);

      if (error) {
        Alert.alert('Could Not Save', error, [{ text: 'OK' }]);
        return;
      }

      router.back();
    });
  }, [form, addTodo, router]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
    >
      <TodoForm
        form={form}
        submitLabel="Create Todo"
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </KeyboardAvoidingView>
  );
}
