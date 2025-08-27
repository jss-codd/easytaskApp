import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Meta, Task, TaskResponse } from '../../utils/type';
import { getMyTasks, getTasks } from '../../service/apiService';

export interface TaskState {
  myTasks: TaskResponse['data'] | null;
  loading?: boolean;
  error?: string | null;
}

const initialState: TaskState = {
  myTasks: null,
  loading: false,
  error: null,
};

export const fetchMyTasks = createAsyncThunk<
  TaskResponse,
  {
    status?: string;
    search?: string;
  }
>('tasks/fetchTasks', async (_, { rejectWithValue }) => {
  try {
    const response = await getMyTasks();
    // console.log('Fetched my tasks:', response);
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to fetch policies',
    );
  }
});

const myTaskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMyTasks.fulfilled, (state, action) => {
        // console.log('Tasks fetched successfully:', action.payload);
        state.myTasks = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchMyTasks.rejected, (state, action) => {
        // console.error('Failed to fetch tasks:', action.error.message);
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
        state.myTasks = null; // Reset tasks on error
      })
      .addCase(fetchMyTasks.pending, state => {
        // console.log('Fetching tasks...');
        state.loading = true;
        state.error = null;
      });
  },
});
export default myTaskSlice.reducer;
