export const _capitalize = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1);

export const neverLessThanZero = (number: number) => Math.max(0, number);
