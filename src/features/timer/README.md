# Timer Feature

Pomodoro timer y tracking de tiempo para tareas.

## Estructura

```
timer/
├── components/
│   ├── PomodoroTimer.tsx      # Timer principal
│   ├── TimerControls.tsx      # Play, pause, stop
│   ├── TimerDisplay.tsx       # Display circular del timer
│   └── TimeLogger.tsx         # Log manual de tiempo
├── hooks/
│   ├── usePomodoro.ts         # Lógica del pomodoro
│   └── useTimeTracking.ts     # Tracking de tiempo
└── store/
    └── useTimerStore.ts       # Estado del timer
```

## Funcionalidades

### Pomodoro Timer
- 25 minutos de trabajo / 5 minutos de descanso
- Descanso largo cada 4 pomodoros
- Notificaciones cuando termina
- Sonido opcional
- Personalizable desde preferencias

### Time Tracking
- Start/stop timer en tarea específica
- Log manual de tiempo
- Historial de tiempo trabajado
- Estimado vs real

## Store

```tsx
interface TimerState {
  isRunning: boolean;
  isPaused: boolean;
  timeRemaining: number; // segundos
  currentTaskId: string | null;
  mode: 'work' | 'shortBreak' | 'longBreak';
  pomodorosCompleted: number;
}
```
