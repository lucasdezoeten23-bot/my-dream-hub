import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Note } from '@/types/task';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const { user } = useAuth();

  const fetchNotes = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) toast.error('Failed to load notes');
    else setNotes((data as Note[]) || []);
  };

  useEffect(() => {
    fetchNotes();
  }, [user]);

  const addNote = async () => {
    if (!user) return;
    const { error } = await supabase.from('notes').insert({ user_id: user.id, content: '' });
    if (error) toast.error('Failed to add note');
    else fetchNotes();
  };

  const updateNote = async (id: string, content: string) => {
    const { error } = await supabase.from('notes').update({ content }).eq('id', id);
    if (error) toast.error('Failed to update note');
  };

  const deleteNote = async (id: string) => {
    const { error } = await supabase.from('notes').delete().eq('id', id);
    if (error) toast.error('Failed to delete note');
    else setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return { notes, addNote, updateNote, deleteNote };
};
