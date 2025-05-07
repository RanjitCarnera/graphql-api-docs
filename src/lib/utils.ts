import { useRef } from 'react';
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fragmentIdToRefKey = (fragmentId: string) =>
  fragmentId.replace(/[^a-zA-Z0-9]/g, "_");

export const useFragmentScroll = () => {
  const fragmentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToFragment = (
    fragmentIdArr?: string[],
    options?: { onBeforeScroll?: () => void }
  ) => {
    if (!fragmentIdArr || fragmentIdArr.length === 0) return;
    const fragId = fragmentIdArr[0];
    const refKey = fragmentIdToRefKey(fragId);
    if (options?.onBeforeScroll) {
      options.onBeforeScroll(); // e.g. switch tab
    }
    setTimeout(() => {
      const el = fragmentRefs.current[refKey];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return {
    fragmentRefs,
    scrollToFragment,
    fragmentIdToRefKey
  };
};
