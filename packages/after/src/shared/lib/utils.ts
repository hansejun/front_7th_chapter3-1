import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** lowercase로 비교 */
export const compareLowerCase = (value: string, target: string) => {
  return value.toLowerCase() === target.toLowerCase();
};
