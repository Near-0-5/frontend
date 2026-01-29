export const isTransformable = (
  value: unknown,
): value is Record<string, unknown> | unknown[] => {
  if (Array.isArray(value)) {
    return true;
  }

  if (typeof value !== 'object' || value === null) {
    return false;
  }

  if (typeof FormData !== 'undefined' && value instanceof FormData) {
    return false;
  }

  if (typeof Blob !== 'undefined' && value instanceof Blob) {
    return false;
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return false;
  }

  if (
    typeof URLSearchParams !== 'undefined' &&
    value instanceof URLSearchParams
  ) {
    return false;
  }

  return true;
};
