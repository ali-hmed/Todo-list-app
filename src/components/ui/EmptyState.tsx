import React from 'react';
import { Text, View } from 'react-native';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <View
      className="flex-1 items-center justify-center px-8 py-16 gap-4"
      accessibilityRole="none"
    >
      {icon && <View className="mb-2">{icon}</View>}

      <Text className="text-2xl font-bold text-slate-900 dark:text-white text-center">
        {title}
      </Text>

      <Text className="text-base text-slate-500 dark:text-slate-400 text-center leading-6">
        {description}
      </Text>

      {actionLabel && onAction && (
        <View className="mt-4">
          <Button
            label={actionLabel}
            onPress={onAction}
            variant="primary"
            size="md"
          />
        </View>
      )}
    </View>
  );
}
