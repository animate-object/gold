type NextRandom = () => number;

export function array<T>(defaultValue: T, length: number): T[] {
  return Array.from({ length }, () => defaultValue);
}

export function empty<T>(): T[] {
  return [];
}

export function chooseOne<T>(
  array: T[],
  nextRandom: NextRandom = Math.random
): T {
  return array[Math.floor(nextRandom() * array.length)];
}

export function chooseN<T>(
  array: T[],
  n: number,

  nextRandom: NextRandom = Math.random
): [T[], T[]] {
  let remaining = [...array];
  let result = [];
  while (result.length < n) {
    const idx = Math.floor(nextRandom() * remaining.length);
    result.push(remaining[idx]);
    remaining = [...remaining.slice(0, idx), ...remaining.slice(idx + 1)];
  }
  return [result, remaining];
}
