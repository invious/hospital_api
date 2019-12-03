import React, { useState, useEffect } from 'react';

// Our hook
export default function useDebounce(keyword, category, delay) {
    // State and setters for debounced value
    const [debouncedKeywordTerm, setDebouncedKeywordTerm] = useState(keyword);
    const [debouncedCategoryTerm, setDebouncedCategoryTerm] = useState(category);

    useEffect(
        () => {
            const handler = setTimeout(() => {
                setDebouncedKeywordTerm(keyword);
                setDebouncedCategoryTerm(category);
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        },
        // Only re-call effect if value changes
        // You could also add the "delay" var to inputs array if you ...
        // ... need to be able to change that dynamically.
        [keyword, category]
    );

    return [debouncedKeywordTerm, debouncedCategoryTerm];
}
