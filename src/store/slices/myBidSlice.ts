import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BidResponse } from '../../utils/type';
import { getMyBids } from '../../service/apiService';

export interface BidState {
  myBids: BidResponse['data'] | null;
  loading?: boolean;
  error?: string | null;
}

const initialState: BidState = {
  myBids: null,
  loading: false,
  error: null,
};

export const fetchmyBids = createAsyncThunk<
  BidResponse,
  string,
  { rejectValue: string }
>('bids/fetchMyBids', async (userId, { rejectWithValue }) => {
  try {
    const response = await getMyBids(userId);
    // console.log('Fetched my bids:', response);
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to fetch bids',
    );
  }
});

const myBidslice = createSlice({
  name: 'bids',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchmyBids.fulfilled, (state, action) => {
        // console.log('Tasks fetched successfully:', action.payload);
        state.myBids = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchmyBids.rejected, (state, action) => {
        // console.error('Failed to fetch tasks:', action.error.message);
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
        state.myBids = null; // Reset tasks on error
      })
      .addCase(fetchmyBids.pending, state => {
        // console.log('Fetching tasks...');
        state.loading = true;
        state.error = null;
      });
  },
});
export default myBidslice.reducer;
