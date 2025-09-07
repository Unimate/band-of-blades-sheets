export function isInEnum<T extends Record<string, string | number>>(enumObj: T, value: unknown): value is T[keyof T] {
  return Object.values(enumObj).includes(value as T[keyof T]);
}

export function isItServiceKey(event: KeyboardEvent): boolean {
  const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];

  if (event.ctrlKey || event.metaKey) return true;

  return allowedKeys.includes(event.key);
}

export function isItDigit (value: string): boolean {
  return /^-?\d*$/.test(value);
}