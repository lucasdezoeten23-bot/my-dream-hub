import { CalendarDays, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Task } from '@/types/task';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const priorityStyles: Record<string, string> = {
  high: 'bg-destructive/15 text-destructive border-destructive/30',
  medium: 'bg-warning/15 text-warning border-warning/30',
  low: 'bg-success/15 text-success border-success/30',
};

interface KanbanCardProps {
  task: Task;
  isDragging: boolean;
  onDelete: () => void;
  onEdit: () => void;
}

const KanbanCard = ({ task, isDragging, onDelete, onEdit }: KanbanCardProps) => {
  return (
    <Card
      onClick={onEdit}
      className={cn(
        'p-3 cursor-pointer border border-border/60 bg-card hover:shadow-md transition-all group',
        isDragging && 'shadow-lg ring-2 ring-primary/30 rotate-2'
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-medium text-card-foreground leading-tight">{task.title}</h4>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 opacity-0 group-hover:opacity-100 shrink-0 text-muted-foreground hover:text-destructive"
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      {task.description && (
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{task.description}</p>
      )}

      <div className="flex items-center gap-2 mt-2 flex-wrap">
        <Badge variant="outline" className={cn('text-[10px] px-1.5 py-0', priorityStyles[task.priority])}>
          {task.priority}
        </Badge>
        {task.category && (
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{task.category}</Badge>
        )}
        {task.due_date && (
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground ml-auto">
            <CalendarDays className="h-3 w-3" />
            {format(new Date(task.due_date), 'MMM d')}
          </span>
        )}
      </div>
    </Card>
  );
};

export default KanbanCard;
