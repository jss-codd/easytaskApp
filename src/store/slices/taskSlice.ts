import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Meta, Task, TaskResponse } from '../../utils/type';
import { getTasks } from '../../service/apiService';

export interface TaskState {
  tasks: TaskResponse['data'] | null; // Changed to allow null for initial state
  loading?: boolean;
  error?: string | null;
}

const initialState: TaskState = {
  tasks: null,
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk<
  TaskResponse,
  {
    status?: string;
    search?: string;
  }
>('tasks/fetchTasks', async (_, { rejectWithValue }) => {
  try {
    const response = await getTasks();
    // console.log('Fetched tasks:', response);
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to fetch policies',
    );
  }
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        // console.log('Tasks fetched successfully:', action.payload);
        state.tasks = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
        state.tasks = null; // Reset tasks on error
        // console.error('Failed to fetch tasks:', action.error.message);
      })
      .addCase(fetchTasks.pending, state => {
        // console.log('Fetching tasks...');
        state.loading = true;
        state.error = null;
      });
  },
});
export default taskSlice.reducer;
