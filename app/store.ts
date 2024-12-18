import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/lib/features/auth/authSlice';
import taskReducer from '@/lib/features/tasks/taskSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
