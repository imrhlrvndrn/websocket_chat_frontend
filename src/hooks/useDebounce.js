import { useEffect, useState } from 'react';

// Hook
export const useDebounce = (value, delayInMs) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            setDebouncedValue(value);
        }, delayInMs);

        return () => {
            clearTimeout(debounceTimer);
        };
    }, [value, delayInMs]);

    return debouncedValue;
};
