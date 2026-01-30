# Calendar Feature

Vistas de agenda y calendario para visualizar tareas por fechas.

## Estructura

```
calendar/
├── components/
│   ├── CalendarView.tsx      # Vista mensual
│   ├── WeekView.tsx           # Vista semanal
│   ├── DayView.tsx            # Vista diaria/agenda
│   └── EventCard.tsx          # Card de evento en calendario
├── hooks/
│   └── useCalendarData.ts     # Hook para datos del calendario
└── utils/
    └── dateHelpers.ts         # Utilidades de fecha
```

## Funcionalidades

- Vista mensual con navegación
- Vista semanal detallada
- Agenda del día con timeline
- Click para crear tarea en fecha específica
- Drag & drop para cambiar fechas
- Código de colores por prioridad

## Librerías Recomendadas

- `date-fns`: Manipulación de fechas
- `react-big-calendar`: Componente de calendario robusto
- O implementación custom con grid CSS
