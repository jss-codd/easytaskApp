import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Category } from '../../utils/type';
import { getCategories } from '../../service/apiService';

export interface BidState {
  categories: Category[] | null;
  loading?: boolean;
  error?: string | null;
}

const initialState: BidState = {
  categories: null,
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>('categories/fetchCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await getCategories();
    console.log('Fetched categories:', response);
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to fetch bids',
    );
  }
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        // console.log('Tasks fetched successfully:', action.payload);
        state.categories = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        // console.error('Failed to fetch tasks:', action.error.message);
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
        state.categories = null; // Reset tasks on error
      })
      .addCase(fetchCategories.pending, state => {
        // console.log('Fetching tasks...');
        state.loading = true;
        state.error = null;
      });
  },
});
export default categoriesSlice.reducer;
