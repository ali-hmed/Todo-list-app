import React, { useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import type { TodoPriority } from '../types';
import type { useTodoForm } from '../hooks/useTodoForm';
import { formatDueDate, dateToISOString } from '../../../utils/dateUtils';
import { Ionicons } from '@expo/vector-icons';

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
 * Shared form used by both Create Todo and Edit Todo screens.
 *
 * Due date UX:
 * - The field shows a human-readable date label (e.g., "Today", "Jul 25")
 * - Tapping it prompts the user to enter a date (YYYY-MM-DD) via Alert on Android,
 *   or a simple text input approach cross-platform.
 * - Internally dates are stored as ISO strings (YYYY-MM-DD).
 * NOTE: A native DateTimePicker (expo-datetime-picker) will be integrated in phase 2
 * to provide a full date-picker UI without manual text entry.
 */
export function TodoForm({ form, submitLabel, onSubmit, isSubmitting }: TodoFormProps) {
  // Raw date text input value (YYYY-MM-DD) for the simple date entry field
  const [dateInput, setDateInput] = useState<string>(
    form.fields.dueDate
      ? dateToISOString(form.fields.dueDate)
      : ''
  );
  const [dateError, setDateError] = useState<string>('');

  const dueDateLabel = form.fields.dueDate
    ? formatDueDate(dateToISOString(form.fields.dueDate))
    : '';

  const handleDateChange = (text: string) => {
    setDateInput(text);
    setDateError('');
    if (text === '') {
      form.setDueDate(null);
      return;
    }
    // Validate YYYY-MM-DD format
    const match = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) {
      setDateError('Use YYYY-MM-DD format, e.g. 2025-07-25');
      return;
    }
    const date = new Date(`${text}T00:00:00`);
    if (isNaN(date.getTime())) {
      setDateError('Invalid date.');
      return;
    }
    form.setDueDate(date);
  };

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

        {/* Due Date */}
        <Input
          label="Due Date"
          value={dateInput}
          onChangeText={handleDateChange}
          placeholder="YYYY-MM-DD (optional)"
          error={dateError}
          helper={dueDateLabel ? `→ ${dueDateLabel}` : undefined}
          keyboardType="numeric"
          maxLength={10}
          returnKeyType="done"
          accessibilityLabel="Due date"
          accessibilityHint="Enter date as year dash month dash day, for example 2025 dash 07 dash 25"
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
