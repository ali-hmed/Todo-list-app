import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { useColorScheme } from '../../../../hooks/use-color-scheme';
import type { Todo } from '../types';
import { formatDueDate, formatTimestamp, isOverdue } from '../../../utils/dateUtils';

interface TodoNoteViewProps {
  todo: Todo;
  onEditPress: () => void;
  onTogglePress: () => void;
  onDeletePress: () => void;
  isToggling: boolean;
  isDeleting: boolean;
}

export function TodoNoteView({
  todo,
  onEditPress,
  onTogglePress,
  onDeletePress,
  isToggling,
  isDeleting,
}: TodoNoteViewProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const dueDateLabel = formatDueDate(todo.dueDate);
  const overdue = !todo.completed && isOverdue(todo.dueDate);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 40 }}
      className="flex-1 bg-slate-50 dark:bg-black p-4"
    >
      {/* Note Document Card */}
      <View className="bg-white dark:bg-zinc-950 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm p-6 gap-6">
        
        {/* Note Header: Badges & Edit Button */}
        <View className="flex-row items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800">
          <View className="flex-row items-center gap-2">
            <Badge variant="status" completed={todo.completed} />
            <Badge variant="priority" priority={todo.priority} />
          </View>

          {/* Edit Note Button */}
          <Pressable
            onPress={onEditPress}
            accessibilityRole="button"
            accessibilityLabel="Edit this todo note"
            className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 active:opacity-75"
          >
            <Ionicons name="create-outline" size={16} color={isDark ? '#ffffff' : '#000000'} />
            <Text className="text-xs font-semibold text-slate-900 dark:text-white">
              Edit Note
            </Text>
          </Pressable>
        </View>

        {/* Note Title */}
        <View className="gap-1">
          <Text className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
            Task Note
          </Text>
          <Text
            className={`text-2xl font-bold ${
              todo.completed
                ? 'line-through text-slate-400 dark:text-zinc-600'
                : 'text-slate-900 dark:text-white'
            }`}
          >
            {todo.title}
          </Text>
        </View>

        {/* Metadata section (Due Date & Created At) */}
        <View className="flex-row flex-wrap gap-4 py-3 px-4 rounded-xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-100 dark:border-zinc-800/80">
          {dueDateLabel ? (
            <View className="flex-row items-center gap-2">
              <Ionicons
                name="calendar"
                size={16}
                color={overdue ? '#ef4444' : isDark ? '#a1a1aa' : '#64748b'}
              />
              <Text
                className={`text-xs font-medium ${
                  overdue ? 'text-danger font-semibold' : 'text-slate-600 dark:text-zinc-300'
                }`}
              >
                {overdue ? 'Overdue: ' : 'Due: '}
                {dueDateLabel} ({todo.dueDate})
              </Text>
            </View>
          ) : (
            <View className="flex-row items-center gap-2">
              <Ionicons name="calendar-outline" size={16} color={isDark ? '#71717a' : '#94a3b8'} />
              <Text className="text-xs text-slate-400 dark:text-zinc-500">
                No due date
              </Text>
            </View>
          )}

          <View className="flex-row items-center gap-2">
            <Ionicons name="time-outline" size={16} color={isDark ? '#71717a' : '#94a3b8'} />
            <Text className="text-xs text-slate-400 dark:text-zinc-500">
              Created {formatTimestamp(todo.createdAt)}
            </Text>
          </View>
        </View>

        {/* Note Body / Writing Area */}
        <View className="gap-2 pt-2">
          <View className="flex-row items-center gap-2">
            <Ionicons name="document-text-outline" size={18} color={isDark ? '#a1a1aa' : '#64748b'} />
            <Text className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              Notes & Details
            </Text>
          </View>

          <View className="min-h-32 p-4 rounded-xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-100 dark:border-zinc-800">
            {todo.description.trim().length > 0 ? (
              <Text className="text-base text-slate-800 dark:text-zinc-200 leading-relaxed">
                {todo.description}
              </Text>
            ) : (
              <Text className="text-sm italic text-slate-400 dark:text-zinc-500">
                No additional notes added for this todo.
              </Text>
            )}
          </View>
        </View>

        {/* Bottom Actions Toolbar */}
        <View className="flex-row items-center gap-3 pt-4 border-t border-slate-100 dark:border-zinc-800">
          <View className="flex-1">
            <Button
              label={todo.completed ? 'Mark Active' : 'Mark Completed'}
              onPress={onTogglePress}
              variant={todo.completed ? 'secondary' : 'primary'}
              size="md"
              loading={isToggling}
            />
          </View>

          <Button
            label="Delete"
            onPress={onDeletePress}
            variant="danger"
            size="md"
            loading={isDeleting}
          />
        </View>
      </View>
    </ScrollView>
  );
}
