import React, { forwardRef } from 'react';
import { Text, TextInput, View, type TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helper?: string;
  required?: boolean;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, helper, required, className = '', ...rest }, ref) => {
    return (
      <View className="gap-1">
        {label && (
          <Text className="text-sm font-medium text-slate-700 dark:text-zinc-300">
            {label}
            {required && (
              <Text className="text-danger" accessibilityLabel="required">
                {' '}*
              </Text>
            )}
          </Text>
        )}

        <TextInput
          ref={ref}
          accessibilityLabel={label}
          accessibilityHint={helper}
          aria-required={required}
          placeholderTextColor="#71717a"
          className={`min-h-touch bg-white dark:bg-zinc-900 border rounded-xl px-4 py-3 text-base text-slate-900 dark:text-white ${
            error
              ? 'border-danger'
              : 'border-slate-300 dark:border-zinc-800 focus:border-slate-900 dark:focus:border-white'
          } ${className}`}
          {...rest}
        />

        {error && (
          <Text
            className="text-sm text-danger"
            accessibilityRole="alert"
            accessibilityLiveRegion="polite"
          >
            {error}
          </Text>
        )}

        {!error && helper && (
          <Text className="text-sm text-slate-500 dark:text-zinc-400">
            {helper}
          </Text>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';
