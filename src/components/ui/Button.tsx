import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

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
    container: 'bg-brand active:bg-brand-dark',
    text: 'text-white font-semibold',
  },
  secondary: {
    container: 'bg-slate-100 dark:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-600 border border-slate-300 dark:border-slate-600',
    text: 'text-slate-900 dark:text-white font-semibold',
  },
  ghost: {
    container: 'bg-transparent active:bg-slate-100 dark:active:bg-slate-800',
    text: 'text-brand dark:text-brand-light font-semibold',
  },
  danger: {
    container: 'bg-danger active:bg-red-600',
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
  const isDisabled = disabled || loading;
  const { container, text } = variantStyles[variant];
  const { container: sizeContainer, text: sizeText } = sizeStyles[size];

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
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'danger' ? '#fff' : '#7c3aed'}
        />
      ) : (
        leftIcon && <View>{leftIcon}</View>
      )}
      <Text className={`${text} ${sizeText}`}>{label}</Text>
    </Pressable>
  );
}
