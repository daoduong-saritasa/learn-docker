/**
 * Type-assertion for non-nullable types.
 * @param value Value to assert.
 */
export function assertNonNull<T>(value: T): asserts value is NonNullable<T> {
  if (value == null) {
    throw new Error('Unexpected null.');
  }
}

/**
 * Asserts that value is non nullable, otherwise @throws an `AppError`.
 * @param value Value to assert.
 */
// polyfill for assertion return https://github.com/microsoft/TypeScript/issues/40562
export function assertNonNullWithReturn<T>(
  value: T | null | undefined,
): NonNullable<T> {
  assertNonNull(value);
  return value;
}
