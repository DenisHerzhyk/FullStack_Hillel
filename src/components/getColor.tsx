export const getIndex = (colors: string[]): number => Math.floor(Math.random() * colors.length);
export const getColor = (colors: string[], index: number): string => colors[index];