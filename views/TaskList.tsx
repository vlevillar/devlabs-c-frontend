'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '@/lib/features/tasks/taskSlice';
import { RootState, AppDispatch } from '@/app/store';
import TaskItem from '@/components/TaskItem';

export default function TaskList() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks } = useSelector(
    (state: RootState) => state.tasks,
  );
  const userId = useSelector((state: RootState) => state.auth.user?.userId);

  useEffect(() => {
    if (userId) {
      dispatch(fetchTasks(userId));
    }
  }, [userId, dispatch]);

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} title={task.title} id={task.id} />
      ))}
    </div>
  );
}
