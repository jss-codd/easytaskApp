import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Meta, Task, TaskResponse } from '../../utils/type';
import { getAllBrowseTasks, getTasks } from '../../service/apiService';

export interface TaskState {
  tasks: TaskResponse['data'] | null;
  browseTasks: TaskResponse['data'] | null;
  loading?: boolean;
  error?: string | null;
}

const initialState: TaskState = {
  tasks: null,
  browseTasks: null,
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk<
  TaskResponse,
  {
    status?: string;
    search?: string;
   
  }
>('tasks/fetchTasks', async ({ search }, { rejectWithValue }) => {
  try {
    const response = await getTasks(search || '');
 
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to fetch policies',
    );
  }
});

export const fetchBrowseTasks = createAsyncThunk<
  TaskResponse,
  {
    search?: string;
    userId?: string;
  }
>('tasks/fetchBrowseTasks', async ({ search,userId }, { rejectWithValue }) => {
  try {
    const response = await getAllBrowseTasks(search || '',userId || '');
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to fetch tasks',
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
      })
      .addCase(fetchBrowseTasks.fulfilled, (state, action) => {
        state.browseTasks = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchBrowseTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
        state.browseTasks = null;
      })
      .addCase(fetchBrowseTasks.pending, state => {
        state.loading = true;
        state.error = null;
      });
  },
});
export default taskSlice.reducer;
