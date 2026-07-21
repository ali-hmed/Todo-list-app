import type { CreateTodoInput } from '../features/todos/types';

export interface ValidationError {
  field: string;
  message: string;
}

const TITLE_MAX_LENGTH = 200;
const DESCRIPTION_MAX_LENGTH = 1000;

/**
 * Validates the todo title field.
 * Returns a ValidationError if invalid, null if valid.
 */
export function validateTitle(title: string): ValidationError | null {
  const trimmed = title.trim();
  if (trimmed.length === 0) {
    return { field: 'title', message: 'Title is required.' };
  }
  if (trimmed.length > TITLE_MAX_LENGTH) {
    return {
      field: 'title',
      message: `Title must be ${TITLE_MAX_LENGTH} characters or fewer.`,
    };
  }
  return null;
}

/**
 * Validates the todo description field.
 * Returns a ValidationError if invalid, null if valid.
 */
export function validateDescription(description: string): ValidationError | null {
  if (description.length > DESCRIPTION_MAX_LENGTH) {
    return {
      field: 'description',
      message: `Description must be ${DESCRIPTION_MAX_LENGTH} characters or fewer.`,
    };
  }
  return null;
}

/**
 * Validates a full todo form input.
 * Returns an array of all validation errors (empty array = valid).
 */
export function validateTodoForm(
  input: Partial<Pick<CreateTodoInput, 'title' | 'description'>>
): ValidationError[] {
  const errors: ValidationError[] = [];

  const titleError = validateTitle(input.title ?? '');
  if (titleError) errors.push(titleError);

  const descriptionError = validateDescription(input.description ?? '');
  if (descriptionError) errors.push(descriptionError);

  return errors;
}

/**
 * Converts an array of ValidationErrors to a field-keyed map
 * for easy lookup in form components.
 */
export function errorsToMap(
  errors: ValidationError[]
): Record<string, string> {
  return errors.reduce<Record<string, string>>((acc, err) => {
    acc[err.field] = err.message;
    return acc;
  }, {});
}
