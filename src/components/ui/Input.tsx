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
    const inputId = label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <View className="gap-1">
        {label && (
          <Text className="text-sm font-medium text-slate-700 dark:text-slate-300">
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
          placeholderTextColor="#94a3b8"
          className={`min-h-touch bg-white dark:bg-slate-800 border rounded-xl px-4 py-3 text-base text-slate-900 dark:text-white ${
            error
              ? 'border-danger'
              : 'border-slate-300 dark:border-slate-600 focus:border-brand'
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
          <Text className="text-sm text-slate-500 dark:text-slate-400">
            {helper}
          </Text>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';
