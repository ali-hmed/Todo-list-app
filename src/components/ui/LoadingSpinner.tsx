import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useColorScheme } from '../../../hooks/use-color-scheme';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'large';
}

export function LoadingSpinner({ message, size = 'large' }: LoadingSpinnerProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View
      className="flex-1 items-center justify-center gap-4 bg-slate-50 dark:bg-black"
      accessibilityRole="progressbar"
      accessibilityLabel={message ?? 'Loading…'}
    >
      <ActivityIndicator size={size} color={isDark ? '#ffffff' : '#000000'} />
      {message && (
        <Text className="text-base text-slate-500 dark:text-zinc-400">
          {message}
        </Text>
      )}
    </View>
  );
}
