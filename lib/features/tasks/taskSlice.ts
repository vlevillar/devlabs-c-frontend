import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Task {
  id: string;
  title: string;
  userId: string;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | undefined;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: undefined,
};

// Async Thunks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (userId: string) => {
    const response = await axios.get(
      `https://devlabs-c-backend.onrender.com/api/todos?userId=${userId}`,
    );
    return response.data;
  },
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (task: Partial<Task>) => {
    const response = await axios.post('https://devlabs-c-backend.onrender.com/api/todos', task);
    return response.data;
  },
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (task: Task) => {
    const response = await axios.put(
      `https://devlabs-c-backend.onrender.com/api/todos/${task.id}`,
      task,
    );
    return response.data;
  },
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: string) => {
    await axios.delete(`https://devlabs-c-backend.onrender.com/api/todos/${id}`);
    return id;
  },
);

// Slice
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id,
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
