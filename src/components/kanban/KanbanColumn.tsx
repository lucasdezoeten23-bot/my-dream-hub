import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Task } from '@/types/task';
import KanbanCard from './KanbanCard';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  onAddTask: () => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (task: Task) => void;
}

const columnColors: Record<string, string> = {
  todo: 'bg-info/10 border-info/30',
  in_progress: 'bg-warning/10 border-warning/30',
  done: 'bg-success/10 border-success/30',
};

const dotColors: Record<string, string> = {
  todo: 'bg-info',
  in_progress: 'bg-warning',
  done: 'bg-success',
};

const KanbanColumn = ({ id, title, tasks, onAddTask, onDeleteTask, onEditTask }: KanbanColumnProps) => {
  return (
    <div className={cn('rounded-xl border-2 border-dashed p-3', columnColors[id] || 'bg-muted/50')}>
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className={cn('h-2.5 w-2.5 rounded-full', dotColors[id])} />
          <h3 className="font-semibold text-sm text-foreground font-sans">{title}</h3>
          <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">{tasks.length}</span>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onAddTask}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              'space-y-2 min-h-[120px] rounded-lg transition-colors p-1',
              snapshot.isDraggingOver && 'bg-primary/5'
            )}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <KanbanCard
                      task={task}
                      isDragging={snapshot.isDragging}
                      onDelete={() => onDeleteTask(task.id)}
                      onEdit={() => onEditTask(task)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn;
