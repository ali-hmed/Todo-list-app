import React from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { DateSelector } from '../../../components/ui/DateSelector';
import type { TodoPriority } from '../types';
import type { useTodoForm } from '../hooks/useTodoForm';

type FormHook = ReturnType<typeof useTodoForm>;

interface TodoFormProps {
  form: FormHook;
  submitLabel: string;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
}

const priorities: { value: TodoPriority; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

const priorityUnselectedStyle: Record<TodoPriority, string> = {
  low: 'bg-emerald-100 dark:bg-emerald-900/40 border-emerald-300 dark:border-emerald-700',
  medium: 'bg-amber-100 dark:bg-amber-900/40 border-amber-300 dark:border-amber-700',
  high: 'bg-red-100 dark:bg-red-900/40 border-red-300 dark:border-red-700',
};

const prioritySelectedStyle: Record<TodoPriority, string> = {
  low: 'bg-emerald-500 border-emerald-600',
  medium: 'bg-amber-500 border-amber-600',
  high: 'bg-red-500 border-red-600',
};

const priorityUnselectedText: Record<TodoPriority, string> = {
  low: 'text-emerald-700 dark:text-emerald-300',
  medium: 'text-amber-700 dark:text-amber-300',
  high: 'text-red-700 dark:text-red-300',
};

/**
 * Shared form used for creating and editing Todos.
 * Uses DateSelector for date picking instead of text input.
 */
export function TodoForm({ form, submitLabel, onSubmit, isSubmitting }: TodoFormProps) {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: 40 }}
      className="flex-1 bg-slate-50 dark:bg-slate-950"
    >
      <View className="gap-5 p-4">
        {/* Title */}
        <Input
          label="Title"
          value={form.fields.title}
          onChangeText={form.setTitle}
          placeholder="What needs to be done?"
          error={form.errors.title}
          required
          maxLength={200}
          returnKeyType="next"
          autoFocus
          autoCapitalize="sentences"
        />

        {/* Description */}
        <Input
          label="Description"
          value={form.fields.description}
          onChangeText={form.setDescription}
          placeholder="Add details (optional)"
          error={form.errors.description}
          multiline
          numberOfLines={3}
          maxLength={1000}
          textAlignVertical="top"
          className="min-h-24"
          returnKeyType="done"
          blurOnSubmit
        />

        {/* Priority selector */}
        <View className="gap-2">
          <Text className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Priority
          </Text>
          <View className="flex-row gap-2">
            {priorities.map(({ value, label }) => {
              const isSelected = form.fields.priority === value;
              return (
                <Pressable
                  key={value}
                  onPress={() => form.setPriority(value)}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: isSelected }}
                  accessibilityLabel={`Priority: ${label}`}
                  className={`flex-1 items-center py-2.5 px-3 rounded-xl border-2 ${
                    isSelected
                      ? prioritySelectedStyle[value]
                      : priorityUnselectedStyle[value]
                  }`}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      isSelected ? 'text-white' : priorityUnselectedText[value]
                    }`}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Due Date Selector */}
        <DateSelector
          label="Due Date"
          value={form.fields.dueDate}
          onChange={form.setDueDate}
        />

        {/* Submit */}
        <Button
          label={submitLabel}
          onPress={onSubmit}
          variant="primary"
          size="lg"
          loading={isSubmitting}
          disabled={isSubmitting}
        />
      </View>
    </ScrollView>
  );
}
