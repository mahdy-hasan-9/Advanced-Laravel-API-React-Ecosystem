
import { useRef, useCallback } from 'react';

export const useDebounceCallback = (
    callback: (...args: any[]) => void,
    delay = 500
) => {
    const timeoutRef = useRef<number | null>(null);

    const debouncedCallback = useCallback((...args: any[]) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);

    const cancel = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    return [debouncedCallback, cancel];
};