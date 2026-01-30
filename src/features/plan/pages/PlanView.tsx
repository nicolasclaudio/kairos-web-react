import React, { useMemo } from 'react';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useTaskStore } from '../../../stores/taskStore';
import { DailyLayoutContainer, MainArea, Header, Title, DateDisplay, BigThreeGrid, OtherTasksList, SectionTitle } from '../components/DailyLayout';
import { DailyProgressBar } from '../components/DailyProgressBar';
import { FocusSlot } from '../components/FocusSlot';
import { InboxSource } from '../components/InboxSource';
import { TaskCard } from '../../../components/common/TaskCard';

export const PlanView: React.FC = () => {
    const { tasks, addToDailyPlan, removeFromDailyPlan, toggleTask } = useTaskStore();

    // Filter tasks
    const today = new Date().toISOString().split('T')[0];

    // Tasks NOT planned for today (Inbox Source)
    const inboxTasks = useMemo(() =>
        tasks.filter(t => !t.plannedAt && t.status !== 'DONE'),
        [tasks]);

    // Tasks planned for today
    const dailyTasks = useMemo(() =>
        tasks.filter(t => t.plannedAt === today),
        [tasks, today]);

    // Focus Slots (Big Three)
    const focusTasks = useMemo(() => {
        const slots: { [key: number]: any } = { 1: undefined, 2: undefined, 3: undefined };
        dailyTasks.forEach(t => {
            if (t.focusPriority) slots[t.focusPriority] = t;
        });
        return slots;
    }, [dailyTasks]);

    // Other daily tasks (not in focus slots)
    const otherDailyTasks = useMemo(() =>
        dailyTasks.filter(t => !t.focusPriority),
        [dailyTasks]);

    const [activeId, setActiveId] = React.useState<string | null>(null);
    const activeTask = useMemo(() => tasks.find(t => t.id === activeId), [activeId, tasks]);

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);

        if (!over) return;

        const taskId = active.id as string;
        const overId = over.id as string;

        if (overId.startsWith('slot-')) {
            const priority = parseInt(overId.split('-')[1]);
            addToDailyPlan(taskId, priority);
        } else if (overId === 'daily-list') {
            addToDailyPlan(taskId, undefined); // Add to plan but no priority
        } else if (overId === 'inbox-list') {
            removeFromDailyPlan(taskId); // Remove from plan if dropped back to inbox
        }
    };

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <DailyLayoutContainer>
                <DailyProgressBar tasks={dailyTasks} />
                <MainArea>
                    <Header>
                        <Title>El Ritual del <span>Mañana</span></Title>
                        <DateDisplay>{format(new Date(), "d 'de' MMMM", { locale: es })}</DateDisplay>
                    </Header>

                    <BigThreeGrid>
                        {[1, 2, 3].map(priority => (
                            <FocusSlot key={priority} priority={priority} task={focusTasks[priority]}>
                                {focusTasks[priority] && <TaskCard task={focusTasks[priority]} onToggle={toggleTask} />}
                            </FocusSlot>
                        ))}
                    </BigThreeGrid>

                    <SectionTitle>Otras tareas para hoy</SectionTitle>
                    {/* Simplified Drop Zone for 'Other' tasks could be added here later */}
                    <OtherTasksList>
                        {otherDailyTasks.map(task => (
                            <TaskCard key={task.id} task={task} onToggle={toggleTask} />
                        ))}
                    </OtherTasksList>
                </MainArea>

                <InboxSource tasks={inboxTasks} />
            </DailyLayoutContainer>

            <DragOverlay>
                {activeTask ? (
                    <div style={{
                        padding: '12px',
                        background: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        border: '1px solid #0052FF'
                    }}>
                        {activeTask.title}
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};
