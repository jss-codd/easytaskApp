import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '../../service/axiosInterceptor.ts';
import { getUserProfile, updateUserRole } from '../../service/apiService.ts';

interface AuthState {
  user: any | null;
  profile: any | null;
  signupUser: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  signupUser: null,
  profile: null,
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

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (_, {rejectWithValue}: any) => {
    try {
      const response = await getUserProfile();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Profile fetch failed');
    }
  },
);

export const updateRole = createAsyncThunk(
  'auth/updateRole',
  async (role: string, {rejectWithValue}: any) => {
    try {
      const response = await updateUserRole(role);
      return { role, user: response };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Role update failed');
    }
  },
);

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
    getProfileSuccess: (state, action) => {
      state.profile = action.payload;
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
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(updateRole.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          state.profile.role = action.payload.role;
        }
        if (state.user) {
          state.user.role = action.payload.role;
        }
        state.error = null;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {loginSuccess, logout, clearError, signupSuccess} = authSlice.actions;
export default authSlice.reducer;
