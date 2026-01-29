# Components

Componentes reutilizables de UI que se utilizan en toda la aplicación.

## Estructura

Organiza los componentes por tipo o función:

```
components/
├── common/           # Componentes genéricos (Button, Input, Modal)
├── layout/           # Componentes de layout (Header, Sidebar, Footer)
└── forms/            # Componentes de formularios
```

## Convenciones

- **Un componente por archivo**: Cada componente debe tener su propio archivo
- **Naming**: PascalCase para nombres de componentes (ej. `Button.tsx`)
- **Props**: Usar TypeScript interfaces para definir props
- **Exports**: Usar named exports y crear index.ts para facilitar imports

## Ejemplo

```tsx
// Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', onClick, children }) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};
```
