import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Task, TaskStatus, TaskPriority } from '@/types/task';
import { useAuth } from './useAuth';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchTasks = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('position', { ascending: true });
    if (error) toast.error('Failed to load tasks');
    else setTasks((data as Task[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const addTask = async (data: {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    category: string;
    due_date: string | null;
  }) => {
    if (!user) return;
    const { error } = await supabase.from('tasks').insert({
      ...data,
      user_id: user.id,
      position: tasks.filter((t) => t.status === data.status).length,
    });
    if (error) toast.error('Failed to add task');
    else fetchTasks();
  };

  const updateTask = async (task: Task) => {
    const { error } = await supabase
      .from('tasks')
      .update({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        category: task.category,
        due_date: task.due_date,
        position: task.position,
      })
      .eq('id', task.id);
    if (error) toast.error('Failed to update task');
    else fetchTasks();
  };

  const deleteTask = async (id: string) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) toast.error('Failed to delete task');
    else setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return { tasks, loading, addTask, updateTask, deleteTask };
};
