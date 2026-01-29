# Kairos Web React

Sistema de productividad personal con enfoque en métricas y análisis de rendimiento.

## 🚀 Stack Tecnológico

- **React 18** + **TypeScript**
- **Vite** - Build tool y dev server
- **Styled Components** - CSS-in-JS
- **Zustand** - Estado global
- **Axios** - HTTP client
- **React Router** - Navegación
- **date-fns** - Manipulación de fechas

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables (Button, Input, Modal)
├── context/             # Proveedores de contexto (ThemeProvider)
├── features/            # Features principales de la app
│   ├── tasks/           # Gestión de tareas y kanban
│   ├── calendar/        # Vistas de calendario y agenda
│   ├── timer/           # Pomodoro y tracking de tiempo
│   └── dashboard/       # Analytics y métricas
├── hooks/               # Custom hooks (useLocalStorage, useDebounce)
├── services/            # Servicios API y lógica de negocio
├── store/               # Estados globales con Zustand
├── styles/              # Temas y estilos globales
└── types/               # Definiciones TypeScript
```

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 🔧 Configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000/api
```

## 📝 Convenciones de Código

### Componentes
- Usar **PascalCase** para nombres de componentes
- Un componente por archivo
- Preferir **named exports** sobre default exports
- Definir props con **TypeScript interfaces**

### Imports
- Usar path aliases: `@/components/Button`
- Agrupar imports: externos, internos, relativos

### Types
- Colocar todas las interfaces en `src/types/`
- Usar sufijo `DTO` para objetos de transferencia
- Exportar todo desde `src/types/index.ts`

## 🎨 Theming

El proyecto soporta temas claro y oscuro:

```tsx
import { useTheme } from '@/context/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Cambiar a {theme === 'light' ? 'oscuro' : 'claro'}
    </button>
  );
}
```

## 🔄 Estado Global

Usando Zustand para gestión de estado:

```tsx
// En un componente
import { useTasksStore } from '@/store/useTasksStore';

function TaskList() {
  const { tasks, addTask, deleteTask } = useTasksStore();
  // ...
}
```

## 📦 Features Principales

### 🎯 Tasks
- Lista y kanban de tareas
- Filtros por estado, prioridad, proyecto
- Drag & drop
- MetaScore para priorización

### 📅 Calendar
- Vistas mensual, semanal y diaria
- Asignación de fechas a tareas
- Timeline interactivo

### ⏱️ Timer
- Pomodoro configurable
- Tracking de tiempo real
- Estadísticas de uso

### 📊 Dashboard
- **Velocity**: Minutos completados por día
- **Impact**: % de tareas high-priority completadas
- **Streak**: Días consecutivos cumpliendo objetivo
- Gráficos y visualizaciones

## 🤝 Contribuir

1. Crea una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
2. Commit tus cambios: `git commit -m 'feat: descripción'`
3. Push a la rama: `git push origin feature/nueva-funcionalidad`
4. Abre un Pull Request

## 📄 Licencia

MIT

---

Desarrollado con ❤️ para mejorar tu productividad
