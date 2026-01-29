# Hooks

Custom hooks reutilizables que encapsulan lógica compartida.

## Convenciones

- Nombre siempre empieza con `use` (ej. `useLocalStorage.ts`)
- Un hook por archivo
- Documenta parámetros y valores de retorno

## Hooks Comunes

- `useLocalStorage`: Sincronizar estado con localStorage
- `useDebounce`: Retrasar la ejecución de una función
- `useMediaQuery`: Detectar breakpoints responsive
- `useOnClickOutside`: Detectar clicks fuera de un elemento

## Ejemplo

```tsx
// useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
```
