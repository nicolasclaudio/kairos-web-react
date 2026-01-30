import { useState, useEffect } from 'react';

/**
 * Hook para debounce de valores
 * Útil para búsquedas en tiempo real, auto-guardado, etc.
 * @param value - Valor a hacer debounce
 * @param delay - Retraso en milisegundos (default: 500ms)
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Establecer un timer para actualizar el valor después del delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Limpiar el timeout si el valor cambia antes del delay
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
