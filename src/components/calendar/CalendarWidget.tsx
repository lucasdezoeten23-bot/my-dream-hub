import { Calendar } from '@/components/ui/calendar';
import { Task } from '@/types/task';
import { format } from 'date-fns';
import { CalendarDays } from 'lucide-react';

interface CalendarWidgetProps {
  tasks: Task[];
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
}

const CalendarWidget = ({ tasks, selectedDate, onSelectDate }: CalendarWidgetProps) => {
  const taskDates = tasks
    .filter((t) => t.due_date)
    .map((t) => new Date(t.due_date!).toDateString());

  const tasksForDate = selectedDate
    ? tasks.filter((t) => t.due_date && new Date(t.due_date).toDateString() === selectedDate.toDateString())
    : [];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground font-sans flex items-center gap-2">
        <CalendarDays className="h-4 w-4 text-primary" />
        Calendar
      </h3>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onSelectDate}
        modifiers={{ hasTask: (date) => taskDates.includes(date.toDateString()) }}
        modifiersClassNames={{ hasTask: 'bg-primary/20 font-bold text-primary' }}
        className="rounded-lg border border-border p-2"
      />

      {selectedDate && (
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">
            {format(selectedDate, 'MMM d, yyyy')}
          </p>
          {tasksForDate.length === 0 ? (
            <p className="text-xs text-muted-foreground italic">No tasks due</p>
          ) : (
            tasksForDate.map((t) => (
              <div key={t.id} className="text-xs p-2 rounded bg-muted/50 text-foreground">{t.title}</div>
            ))
          )}
          <button onClick={() => onSelectDate(undefined)} className="text-xs text-primary hover:underline">
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
};

export default CalendarWidget;
