import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import KanbanColumn from './KanbanColumn';
import { Task, TaskStatus } from '@/types/task';

const columns: { id: TaskStatus; title: string }[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'in_progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

interface KanbanBoardProps {
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onAddTask: (status: TaskStatus) => void;
  onEditTask: (task: Task) => void;
  selectedDate?: Date | null;
}

const KanbanBoard = ({ tasks, onUpdateTask, onDeleteTask, onAddTask, onEditTask, selectedDate }: KanbanBoardProps) => {
  const filteredTasks = selectedDate
    ? tasks.filter((t) => t.due_date && new Date(t.due_date).toDateString() === selectedDate.toDateString())
    : tasks;

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const task = filteredTasks.find((t) => t.id === result.draggableId);
    if (!task) return;
    const newStatus = result.destination.droppableId as TaskStatus;
    if (task.status !== newStatus) {
      onUpdateTask({ ...task, status: newStatus, position: result.destination.index });
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((col) => (
          <KanbanColumn
            key={col.id}
            id={col.id}
            title={col.title}
            tasks={filteredTasks.filter((t) => t.status === col.id)}
            onAddTask={() => onAddTask(col.id)}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
