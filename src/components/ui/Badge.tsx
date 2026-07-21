import React from 'react';
import { Text, View } from 'react-native';
import type { TodoPriority } from '../../features/todos/types';

type BadgeVariant = 'priority' | 'status';

interface PriorityBadgeProps {
  variant: 'priority';
  priority: TodoPriority;
}

interface StatusBadgeProps {
  variant: 'status';
  completed: boolean;
}

type BadgeProps = PriorityBadgeProps | StatusBadgeProps;

const priorityConfig: Record<
  TodoPriority,
  { label: string; container: string; text: string }
> = {
  low: {
    label: 'Low',
    container: 'bg-emerald-100 dark:bg-emerald-900/40',
    text: 'text-emerald-700 dark:text-emerald-400',
  },
  medium: {
    label: 'Medium',
    container: 'bg-amber-100 dark:bg-amber-900/40',
    text: 'text-amber-700 dark:text-amber-400',
  },
  high: {
    label: 'High',
    container: 'bg-red-100 dark:bg-red-900/40',
    text: 'text-red-700 dark:text-red-400',
  },
};

/**
 * Badge component — communicates status/priority via BOTH color and text
 * label to meet accessibility requirements (not color-only).
 */
export function Badge(props: BadgeProps) {
  if (props.variant === 'priority') {
    const config = priorityConfig[props.priority];
    return (
      <View
        className={`px-2 py-0.5 rounded-full ${config.container}`}
        accessibilityLabel={`Priority: ${config.label}`}
      >
        <Text className={`text-xs font-medium ${config.text}`}>
          {config.label}
        </Text>
      </View>
    );
  }

  // Status badge
  const completed = props.completed;
  return (
    <View
      className={`px-2 py-0.5 rounded-full ${
        completed
          ? 'bg-emerald-100 dark:bg-emerald-900/40'
          : 'bg-slate-100 dark:bg-slate-700'
      }`}
      accessibilityLabel={completed ? 'Completed' : 'Active'}
    >
      <Text
        className={`text-xs font-medium ${
          completed
            ? 'text-emerald-700 dark:text-emerald-400'
            : 'text-slate-600 dark:text-slate-300'
        }`}
      >
        {completed ? 'Done' : 'Active'}
      </Text>
    </View>
  );
}
