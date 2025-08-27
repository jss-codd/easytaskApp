import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '../../service/axiosInterceptor.ts';

interface AuthState {
  user: any | null;
  signupUser: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  signupUser: null,
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    credentials: {email: string; password: string;},
    {rejectWithValue},
  ) => {
    console.log('Login credentials:', credentials);
    try {
      const response = await api.post('/auth/login', credentials);
      console.log('Login response:', response);
      const {token, user} = response.data;
      await AsyncStorage.setItem('token', token);

      return {token, user};
    } catch (error: any) {
      console.log('Login error:', error);
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  },
);

export const signupUser = createAsyncThunk(
  'auth/signup',

  async (payload: any, {rejectWithValue}: any) => {
    try {
      const response = await api.post('/auth/register', payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  },
);

// export const verifyEmail = createAsyncThunk(

//   async (payload: any, {rejectWithValue}: any) => {
//     try {
//       const response = await api.post('http://192.168.0.109:3001/api/auth/verify', payload);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || 'Verify email failed');
//     }
//   },
// );

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await AsyncStorage.removeItem('token');
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      
    },
    logout: state => {
      AsyncStorage.removeItem('token');

      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: state => {
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.signupUser = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        // console.log('Login successful:', action.payload.user);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.token = null;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const {loginSuccess, logout, clearError, signupSuccess} = authSlice.actions;
export default authSlice.reducer;
