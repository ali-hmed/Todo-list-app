import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { useColorScheme } from '../../../hooks/use-color-scheme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  onPress: () => void;
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  className?: string;
  leftIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, { container: string; text: string }> = {
  primary: {
    container: 'bg-slate-900 dark:bg-white active:opacity-90 shadow-sm border border-slate-900 dark:border-white',
    text: 'text-white dark:text-slate-950 font-bold',
  },
  secondary: {
    container: 'bg-slate-100 dark:bg-zinc-900 active:bg-slate-200 dark:active:bg-zinc-800 border border-slate-200 dark:border-zinc-800',
    text: 'text-slate-900 dark:text-zinc-100 font-semibold',
  },
  ghost: {
    container: 'bg-transparent active:bg-slate-100 dark:active:bg-zinc-800',
    text: 'text-slate-900 dark:text-white font-semibold',
  },
  danger: {
    container: 'bg-red-600 dark:bg-red-500 active:bg-red-700',
    text: 'text-white font-semibold',
  },
};

const sizeStyles: Record<ButtonSize, { container: string; text: string }> = {
  sm: { container: 'px-3 py-2 min-h-touch rounded-lg', text: 'text-sm' },
  md: { container: 'px-4 py-3 min-h-touch rounded-xl', text: 'text-base' },
  lg: { container: 'px-6 py-4 min-h-touch rounded-xl', text: 'text-lg' },
};

export function Button({
  onPress,
  label,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  accessibilityLabel,
  accessibilityHint,
  className = '',
  leftIcon,
}: ButtonProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const isDisabled = disabled || loading;
  const { container, text } = variantStyles[variant];
  const { container: sizeContainer, text: sizeText } = sizeStyles[size];

  const spinnerColor =
    variant === 'primary'
      ? isDark
        ? '#000000'
        : '#ffffff'
      : variant === 'danger'
      ? '#ffffff'
      : isDark
      ? '#ffffff'
      : '#000000';

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      className={`flex-row items-center justify-center gap-2 ${container} ${sizeContainer} ${
        isDisabled ? 'opacity-50' : ''
      } ${className}`}
    >
      {loading ? (
        <ActivityIndicator size="small" color={spinnerColor} />
      ) : (
        leftIcon && <View>{leftIcon}</View>
      )}
      <Text className={`${text} ${sizeText}`}>{label}</Text>
    </Pressable>
  );
}
