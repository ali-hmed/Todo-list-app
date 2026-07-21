import React, { type ReactNode } from 'react';
import { Pressable, View } from 'react-native';

interface CardProps {
  children: ReactNode;
  className?: string;
  onPress?: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export function Card({
  children,
  className = '',
  onPress,
  accessibilityLabel,
  accessibilityHint,
}: CardProps) {
  const base =
    'bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700';

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityRole="button"
        className={`${base} active:opacity-80 ${className}`}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View className={`${base} ${className}`}>
      {children}
    </View>
  );
}
