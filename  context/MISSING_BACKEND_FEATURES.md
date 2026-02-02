# Funcionalidades Sin Servicio Backend

## 📋 Resumen Ejecutivo

De la documentación de la API del backend, se identificó que **solo 5 endpoints están implementados**:

✅ **Implementados y Consumidos en Frontend:**
1. `GET /health` - Health check (disponible, no usado en UI)
2. `POST /api/users` - Crear usuario (Implementado en `users.service.ts`)
3. `POST /api/goals` - Crear objetivo (Integrado en `useGoalStore`)
4. `GET /api/goals?userId={userId}` - Obtener objetivos (Integrado en `useGoalStore`)
5. `POST /api/tasks` - Crear tarea (Integrado en `tasks.service.ts`)
6. `GET /api/tasks/goal/:goalId` - Obtener tareas de objetivo (Implementado en `tasks.service.ts`)

El frontend ha comenzado a migrar de **Zustand local** a integración real con API, especialmente en **Auth, Goals y Tasks (lectura/creación)**.

---

## ❌ Funcionalidades Sin Backend

### 1. Autenticación y Usuarios

#### Endpoints Faltantes
- ❌ `POST /auth/login` - Login de usuario
- ❌ `POST /auth/register` - Registro de usuario
- ❌ `POST /auth/logout` - Logout
- ❌ `GET /auth/me` - Obtener usuario actual
- ❌ `GET /api/users/:id` - Obtener usuario por ID
- ❌ `PATCH /api/users/:id` - Actualizar usuario
- ❌ `DELETE /api/users/:id` - Eliminar usuario

#### Impacto en Frontend
- **Media prioridad**: Login sigue usando simulación local (o `/auth/login` específico no estándar), pero **Registro** ya está conectado a `POST /api/users`.
- **Archivos afectados**:
  - `src/services/api/auth.ts`
  - `src/stores/useAuthStore.ts`
  - `src/services/users.service.ts` ✅ (Nuevo)

#### Recomendación
> **IMPORTANTE:** Estandarizar autenticación. Backend necesita JWT para proteger estos nuevos endpoints.

---

### 2. Gestión Completa de Tasks

#### Endpoints Faltantes

**Read:**
- ❌ `GET /api/tasks` - Obtener todas las tareas (con filtros)
- ❌ `GET /api/tasks/:id` - Obtener tarea específica por ID
- ❌ `GET /api/tasks?userId={userId}` - Obtener tareas de usuario
- ❌ `GET /api/tasks?status={status}` - Filtrar por estado
- ❌ `GET /api/tasks?priority={priority}` - Filtrar por prioridad

**Update:**
- ❌ `PATCH /api/tasks/:id` - Actualizar tarea
- ❌ `PATCH /api/tasks/:id/complete` - Marcar como completada
- ❌ `PATCH /api/tasks/:id/status` - Cambiar estado
- ❌ `PATCH /api/tasks/:id/priority` - Cambiar prioridad

**Delete:**
- ❌ `DELETE /api/tasks/:id` - Eliminar tarea

**Planning:**
- ❌ `PATCH /api/tasks/:id/plan` - Añadir a plan diario
- ❌ `PATCH /api/tasks/:id/focus-priority` - Asignar a Big Three

#### Impacto en Frontend
- **Alta prioridad**: El TasksStore maneja todo localmente
- **Funcionalidades afectadas**:
  - Inbox (listar, crear, editar tareas)
  - Plan View (drag & drop, Big Three)
  - TaskCard (toggle complete, edit, delete)
  - QuickAddInput (crear tarea rápida)
  - Filtros y búsqueda

#### Archivos Afectados
```
src/services/api/tasks.ts          ❌ Endpoints incorrectos
src/stores/useTasksStore.ts        ❌ Solo local
src/features/tasks/pages/InboxView.tsx
src/features/plan/pages/PlanView.tsx
src/features/tasks/components/TaskCard.tsx
```

#### Recomendación
> **PRIORIDAD 1:** Implementar CRUD completo de tasks en backend.
> 
> Funcionalidades críticas:
> - GET con filtros (status, priority, userId, goalId)
> - UPDATE (status, title, estimatedMinutes, plannedAt, focusPriority)
> - DELETE
> - PATCH /complete endpoint especializado

---

### 3. Gestión Completa de Goals

#### Endpoints Faltantes

**Read:**
- ❌ `GET /api/goals/:id` - Obtener objetivo específico

**Update:**
- ❌ `PATCH /api/goals/:id` - Actualizar objetivo
- ❌ `PATCH /api/goals/:id/status` - Cambiar estado (active/achieved/paused/dropped)
- ❌ `PATCH /api/goals/:id/progress` - Actualizar progreso

**Delete:**
- ❌ `DELETE /api/goals/:id` - Eliminar objetivo (soft delete)

#### Impacto en Frontend
- **Media prioridad**: `GoalStore` ahora está **CONECTADO** al backend para crear y leer objetivos. Update y Delete siguen siendo locales o fallarán si se intentan via API.
- **Funcionalidades afectadas**:
  - GoalsView (Lectura y Creación funcionando con API)
  - GoalCard (Edición/Borrado requieren endpoints faltantes)
  - Vision Board

#### Archivos Afectados
```
src/stores/useGoalStore.ts         ✅ Híbrido/Conectado
src/services/goals.service.ts      ✅ Implementado
src/features/goals/pages/GoalsView.tsx
src/features/goals/components/GoalCard.tsx
```

#### Recomendación
> **PRIORIDAD 2:** Implementar UPDATE y DELETE de goals en backend.

---

### 4. Projects (Completo)

#### Endpoints Faltantes
- ❌ `POST /api/projects` - Crear proyecto
- ❌ `GET /api/projects` - Listar proyectos
- ❌ `GET /api/projects/:id` - Obtener proyecto
- ❌ `PATCH /api/projects/:id` - Actualizar proyecto
- ❌ `DELETE /api/projects/:id` - Eliminar proyecto
- ❌ `GET /api/projects/:id/tasks` - Tareas de un proyecto

#### Impacto en Frontend
- **Baja prioridad** (no implementado en frontend actual)
- El campo `projectId` existe en Task pero no se usa

#### Recomendación
> **PRIORIDAD 3:** Implementar cuando se necesite organización por proyectos.

---

### 5. Analytics y Metrics

#### Endpoints Faltantes
- ❌ `GET /api/analytics/velocity` - Velocidad promedio diaria
- ❌ `GET /api/analytics/impact` - % de tareas de alto impacto completadas
- ❌ `GET /api/analytics/streak` - Racha de días productivos
- ❌ `GET /api/analytics/dashboard` - Métricas del dashboard
- ❌ `GET /api/analytics/heatmap` - Datos para heatmap

#### Impacto en Frontend
- **Media-Alta prioridad**: InsightsView usa `analyticsUtils` local
- **Funcionalidades afectadas**:
  - Insights Dashboard (todas las métricas)
  - MetricCard components
  - ActivityHeatmap
  - PriorityDonutChart

#### Archivos Afectados
```
src/utils/analyticsUtils.ts        ❌ Cálculos locales
src/services/analytics.service.ts  ❌ Mock service
src/features/insights/pages/InsightsView.tsx
src/features/insights/components/*
```

#### Recomendación
> **PRIORIDAD 2:** Implementar analytics en backend.
> 
> El backend debería calcular:
> - Velocity (completed_at timestamps)
> - Impact (metaScore > 7)
> - Streak (consecutive productive days)
> - Aggregate statistics

---

### 6. Timer / Focus Sessions

#### Endpoints Faltantes
- ❌ `POST /api/focus-sessions` - Crear sesión de enfoque
- ❌ `GET /api/focus-sessions` - Obtener sesiones
- ❌ `PATCH /api/focus-sessions/:id/complete` - Completar sesión
- ❌ `GET /api/focus-sessions/stats` - Estadísticas de focus

#### Impacto en Frontend
- **Baja-Media prioridad**: TimerStore es completamente local
- **Funcionalidades afectadas**:
  - Timer component (Pomodoro)
  - Focus tracking
  - Estadísticas de tiempo de enfoque

#### Archivos Afectados
```
src/stores/useTimerStore.ts        ❌ Solo local
src/components/common/Timer.tsx
```

#### Recomendación
> **PRIORIDAD 3:** Implementar cuando se necesite tracking de sesiones de enfoque.

---

### 7. Notifications

#### Endpoints Faltantes
- ❌ `GET /api/notifications` - Obtener notificaciones
- ❌ `PATCH /api/notifications/:id/read` - Marcar como leída
- ❌ `POST /api/notifications/settings` - Configurar preferencias

#### Impacto en Frontend
- **Baja prioridad**: NotificationStore es local
- **Funcionalidades afectadas**:
  - NotificationCenter (US#9)
  - Toast notifications
  - Daily briefing

#### Archivos Afectados
```
src/features/notifications/stores/useNotificationStore.ts  ❌ Local
src/features/notifications/components/*
```

#### Recomendación
> **PRIORIDAD 4:** Las notificaciones pueden ser generadas por el bot de Telegram.

---

### 8. Batch Operations

#### Endpoints Faltantes
- ❌ `POST /api/tasks/batch` - Crear múltiples tareas
- ❌ `PATCH /api/tasks/batch/complete` - Completar múltiples tareas
- ❌ `DELETE /api/tasks/batch` - Eliminar múltiples tareas
- ❌ `PATCH /api/tasks/batch/move` - Mover tareas a otro goal

#### Impacto en Frontend
- **Baja prioridad**: No implementado en frontend actual

#### Recomendación
> **PRIORIDAD 5:** Implementar cuando se agregue selección múltiple.

---

## 📊 Matriz de Prioridades

| Funcionalidad | Prioridad | Complejidad | Impacto | Estado Frontend |
|--------------|-----------|-------------|---------|-----------------|
| **Auth Completo** | 🔴 Alta | Media | Alto | ✅ Implementado |
| **Tasks CRUD** | 🔴 Alta | Media | Alto | ✅ Implementado |
| **Tasks Filters** | 🔴 Alta | Baja | Alto | ✅ Implementado |
| **Analytics** | 🟡 Media-Alta | Alta | Alto | ✅ Implementado |
| **Goals UPDATE/DELETE** | 🟡 Media | Baja | Medio | ✅ Implementado |
| **Focus Sessions** | 🟡 Media | Media | Medio | ✅ Implementado |
| **Projects CRUD** | 🟢 Baja | Media | Bajo | ❌ No implementado |
| **Notifications** | 🟢 Baja | Baja | Bajo | ✅ Implementado |
| **Batch Ops** | ⚪ Muy Baja | Media | Bajo | ❌ No implementado |

---

## 🎯 Roadmap Recomendado

### Phase 1: Core Functionality (Semana 1-2)
1. ✅ Auth endpoints (login, register, me)
2. ✅ Tasks CRUD completo
3. ✅ Tasks filters & search
4. ✅ Goals UPDATE/DELETE

### Phase 2: Analytics & Insights (Semana 3-4)
1. ✅ Analytics endpoints
2. ✅ Stats calculations  
3. ✅ Completed_at tracking
4. ✅ Velocity/Impact/Streak

### Phase 3: Enhanced Features (Semana 5-6)
1. ✅ Focus sessions tracking
2. ✅ Projects module
3. ✅ Notifications (if not via Telegram)

### Phase 4: Optimizations (Semana 7+)
1. ✅ Batch operations
2. ✅ Real-time updates (WebSocket?)
3. ✅ Caching strategies

---

## 🔧 Soluciones Temporales

Mientras se implementa el backend completo:

### Opción A: Hybrid Approach (Recomendado)
- ✅ Usar backend para CREATE operations
- ✅ Mantener store local para READ operations (con sync periódica)
- ✅ Enviar UPDATEs/DELETEs cuando estén disponibles

```typescript
// Ejemplo: createTask
const createTask = async (task: CreateTaskDTO) => {
  // 1. Guardar en backend
  const backendTask = await api.createTask(task);
  
  // 2. Actualizar store local
  tasksStore.addTask(mapBackendToFrontend(backendTask));
  
  return backendTask;
};
```

### Opción B: Queue System
- Encolar operaciones que requieren backend
- Sincronizar cuando endpoints estén disponibles
- Usar IndexedDB para persistencia offline

### Opción C: Mock Services
- Mantener servicios mock hasta que backend esté listo
- Fácil switch cuando se implemente
- Permite desarrollo paralelo

---

## 📝 Notas Importantes

### ⚠️ Security Issues
- El backend actual **NO tiene autenticación**
- Cualquier cliente puede crear/leer datos de cualquier usuario
- **CRÍTICO para producción**: Implementar JWT/OAuth

### ⚠️ Data Consistency
- Frontend y backend tienen modelos de datos ligeramente diferentes
- Necesitarás mappers entre `BackendTask` ↔ `Task`
- Campos como `priority` vs `priorityOverride`

### 💡 Development Strategy
- Implementa backend endpoints incrementalmente
- Usa feature flags para habilitar backend integration
- Mantén fallback a datos locales durante transición

---

## 📞 Contacto

Para coordinar implementación de endpoints faltantes:
- **Backend Repo**: https://github.com/nicolasclaudio/kairos-backend-typescript
- **Frontend Repo**: https://github.com/nicolasclaudio/kairos-web-react

---

**Última actualización:** 2026-01-29  
**Frontend Version:** 0.1.0  
**Backend API Version:** 1.0.0
