export const EVENTS = {
  SHIFT_UPDATED: 'shift:updated',
  SHIFT_CREATED: 'shift:created',
  SHIFT_DELETED: 'shift:deleted',
  STAFF_UPDATED: 'staff:updated',
  STAFF_ADDED: 'staff:added',
  STAFF_REMOVED: 'staff:removed',
  ERROR: 'error',
} as const;

export const RATE_LIMIT = {
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS: 100,
} as const;

export const ERROR_MESSAGES = {
  INVALID_INPUT: 'Invalid input data',
  NOT_FOUND: 'Resource not found',
  UNAUTHORIZED: 'Unauthorized access',
  SERVER_ERROR: 'Internal server error',
  RATE_LIMIT: 'Too many requests',
} as const;