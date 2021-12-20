export function normalizePath(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}

export function toArray<T>(val: T): T[] {
  return Array.isArray(val) ? val : [val];
}
