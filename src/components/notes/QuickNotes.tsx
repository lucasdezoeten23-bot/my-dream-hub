import { useState } from 'react';
import { Plus, Trash2, StickyNote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Note } from '@/types/task';
import { format } from 'date-fns';

interface QuickNotesProps {
  notes: Note[];
  onAddNote: () => void;
  onUpdateNote: (id: string, content: string) => void;
  onDeleteNote: (id: string) => void;
}

const QuickNotes = ({ notes, onAddNote, onUpdateNote, onDeleteNote }: QuickNotesProps) => {
  const [editTimers, setEditTimers] = useState<Record<string, ReturnType<typeof setTimeout>>>({});

  const handleChange = (id: string, content: string) => {
    if (editTimers[id]) clearTimeout(editTimers[id]);
    const timer = setTimeout(() => onUpdateNote(id, content), 800);
    setEditTimers((prev) => ({ ...prev, [id]: timer }));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground font-sans flex items-center gap-2">
          <StickyNote className="h-4 w-4 text-primary" />
          Quick Notes
        </h3>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onAddNote}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {notes.length === 0 && (
          <p className="text-xs text-muted-foreground italic">No notes yet. Click + to add one.</p>
        )}
        {notes.map((note) => (
          <div key={note.id} className="relative group">
            <Textarea
              defaultValue={note.content}
              onChange={(e) => handleChange(note.id, e.target.value)}
              placeholder="Write a note..."
              className="text-xs min-h-[60px] resize-none bg-muted/30 border-border/50"
            />
            <div className="flex items-center justify-between mt-1">
              <span className="text-[10px] text-muted-foreground">
                {format(new Date(note.updated_at), 'MMM d, h:mm a')}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                onClick={() => onDeleteNote(note.id)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickNotes;
