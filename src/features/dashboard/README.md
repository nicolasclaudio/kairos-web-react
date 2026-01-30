# Dashboard Feature

Vista resumen de Kairos con analytics y estadísticas principales.

## Estructura

```
dashboard/
├── components/
│   ├── DashboardLayout.tsx
│   ├── VelocityCard.tsx       # Métrica de velocidad
│   ├── ImpactCard.tsx         # Métrica de impacto
│   ├── StreakCard.tsx         # Racha de días
│   ├── TasksOverview.tsx      # Resumen de tareas
│   ├── WeeklyChart.tsx        # Gráfico semanal
│   └── QuickActions.tsx       # Acciones rápidas
├── hooks/
│   └── useAnalytics.ts        # Hook para analytics
└── index.tsx
```

## Métricas Principales

### Velocity
- Minutos completados promedio por día
- Tendencia vs semana anterior
- Gráfico de evolución

### Impact
- % de tareas high-priority completadas
- MetaScore promedio
- Distribución por prioridad

### Streak
- Días consecutivos cumpliendo objetivo
- Best streak histórico
- Objetivo diario configurable

## Widgets

### Tasks Overview
- Total de tareas: TODO, IN_PROGRESS, DONE
- Tareas vencidas
- Tareas para hoy

### Weekly Chart
- Gráfico de barras con minutos por día
- Comparación con objetivo
- Interactivo (click para ver detalle)

### Quick Actions
- Nueva tarea
- Iniciar pomodoro
- Ver agenda del día
- Planning semanal

## Datos

```tsx
interface AnalyticsData {
  velocity: {
    current: number;
    trend: 'up' | 'down' | 'stable';
    change: number; // porcentaje
  };
  impact: {
    highPriorityCompleted: number;
    totalCompleted: number;
    percentage: number;
  };
  streak: {
    current: number;
    best: number;
  };
  weeklyData: Array<{
    date: Date;
    minutes: number;
    goal: number;
  }>;
}
```
