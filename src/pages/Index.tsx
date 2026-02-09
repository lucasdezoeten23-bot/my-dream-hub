import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import KanbanBoard from '@/components/kanban/KanbanBoard';
import CalendarWidget from '@/components/calendar/CalendarWidget';
import QuickNotes from '@/components/notes/QuickNotes';
import TaskDialog from '@/components/kanban/TaskDialog';
import { useTasks } from '@/hooks/useTasks';
import { useNotes } from '@/hooks/useNotes';
import { Task, TaskStatus } from '@/types/task';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const { tasks, loading, addTask, updateTask, deleteTask } = useTasks();
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<TaskStatus>('todo');

  const handleAddTask = (status: TaskStatus) => {
    setEditingTask(null);
    setDefaultStatus(status);
    setDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleSaveTask = (data: any) => {
    if (editingTask) {
      updateTask({ ...editingTask, ...data });
    } else {
      addTask(data);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex h-full">
        <div className="flex-1 p-6 overflow-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {selectedDate
                ? `Showing tasks for ${selectedDate.toLocaleDateString()}`
                : 'Manage your tasks and stay productive'}
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64 text-muted-foreground">Loading tasks...</div>
          ) : (
            <KanbanBoard
              tasks={tasks}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              selectedDate={selectedDate}
            />
          )}
        </div>

        <aside className="w-72 border-l border-border p-4 space-y-6 overflow-auto hidden lg:block bg-card/50">
          <CalendarWidget tasks={tasks} selectedDate={selectedDate} onSelectDate={setSelectedDate} />
          <Separator />
          <QuickNotes notes={notes} onAddNote={addNote} onUpdateNote={updateNote} onDeleteNote={deleteNote} />
        </aside>
      </div>

      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        task={editingTask}
        defaultStatus={defaultStatus}
        onSave={handleSaveTask}
      />
    </DashboardLayout>
  );
};

export default Index;
