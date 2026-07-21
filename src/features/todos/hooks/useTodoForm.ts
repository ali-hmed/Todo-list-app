import { useState, useCallback } from 'react';
import type { TodoPriority, CreateTodoInput } from '../types';
import { validateTodoForm, errorsToMap } from '../../../utils/validation';
import { dateToISOString } from '../../../utils/dateUtils';

export interface TodoFormState {
  title: string;
  description: string;
  priority: TodoPriority;
  dueDate: Date | null;
}

export interface TodoFormErrors {
  title?: string;
  description?: string;
}

interface UseTodoFormReturn {
  fields: TodoFormState;
  errors: TodoFormErrors;
  isDirty: boolean;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  setPriority: (value: TodoPriority) => void;
  setDueDate: (value: Date | null) => void;
  handleSubmit: (onValid: (input: CreateTodoInput) => Promise<void>) => Promise<void>;
  reset: () => void;
}

const defaultFields: TodoFormState = {
  title: '',
  description: '',
  priority: 'medium',
  dueDate: null,
};

/**
 * Reusable form state hook for both Create and Edit todo screens.
 * Accepts optional initial values (used by the Edit screen).
 */
export function useTodoForm(initial?: Partial<TodoFormState>): UseTodoFormReturn {
  const [fields, setFields] = useState<TodoFormState>({
    ...defaultFields,
    ...initial,
  });
  const [errors, setErrors] = useState<TodoFormErrors>({});
  const [isDirty, setIsDirty] = useState(false);

  const setTitle = useCallback((value: string) => {
    setFields((prev) => ({ ...prev, title: value }));
    setIsDirty(true);
    // Clear error on change
    setErrors((prev) => ({ ...prev, title: undefined }));
  }, []);

  const setDescription = useCallback((value: string) => {
    setFields((prev) => ({ ...prev, description: value }));
    setIsDirty(true);
    setErrors((prev) => ({ ...prev, description: undefined }));
  }, []);

  const setPriority = useCallback((value: TodoPriority) => {
    setFields((prev) => ({ ...prev, priority: value }));
    setIsDirty(true);
  }, []);

  const setDueDate = useCallback((value: Date | null) => {
    setFields((prev) => ({ ...prev, dueDate: value }));
    setIsDirty(true);
  }, []);

  const handleSubmit = useCallback(
    async (onValid: (input: CreateTodoInput) => Promise<void>) => {
      const validationErrors = validateTodoForm({
        title: fields.title,
        description: fields.description,
      });

      if (validationErrors.length > 0) {
        setErrors(errorsToMap(validationErrors) as TodoFormErrors);
        return;
      }

      const input: CreateTodoInput = {
        title: fields.title.trim(),
        description: fields.description.trim(),
        priority: fields.priority,
        completed: false,
        dueDate: fields.dueDate ? dateToISOString(fields.dueDate) : null,
      };

      await onValid(input);
    },
    [fields]
  );

  const reset = useCallback(() => {
    setFields({ ...defaultFields, ...initial });
    setErrors({});
    setIsDirty(false);
  }, [initial]);

  return {
    fields,
    errors,
    isDirty,
    setTitle,
    setDescription,
    setPriority,
    setDueDate,
    handleSubmit,
    reset,
  };
}
