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

export function shuffle<T>(
  array: T[],
  nextRandom: NextRandom = Math.random
): T[] {
  return array.sort(() => nextRandom() - 0.5);
}

export function chooseAndRemoveN<T>(
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

export function chooseN<T>(
  array: T[],
  n: number,
  nextRandom: NextRandom = Math.random
): T[] {
  // this version avoids copying, by choosing unique indices up front

  const indices = new Set<number>();

  while (indices.size < n) {
    const idx = Math.floor(nextRandom() * array.length);
    indices.add(idx);
  }
  return Array.from(indices).map((idx) => array[idx]);
}
