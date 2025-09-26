import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TaskResponse } from '../../utils/type';
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
    categories?: string;
    fixedPrice?: string;
  }
>('tasks/fetchTasks', async ({ search, categories = '',fixedPrice = '' }, { rejectWithValue }) => {
  try {
    const response = await getTasks(search || '', categories || '',fixedPrice || '');
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
    categories?: string;
    fixedPrice?: string;
  }
>('tasks/fetchBrowseTasks', async ({ search,userId, categories = '',fixedPrice = '' }, { rejectWithValue }) => {
  try {
    const response = await getAllBrowseTasks(search || '',userId || '', categories || '',fixedPrice || '');
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
        state.tasks = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
        state.tasks = null; 
      })
      .addCase(fetchTasks.pending, state => {
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
