import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BaseUrl = "https://api.easytaskers.com/api"
// 'http://13.55.253.18:3002/api'
// 'http://192.168.0.112:3001/api';
// 'http://192.168.0.109:3001';
// 'http://3.107.86.95:3002/api';

export const api = axios.create({
  baseURL: BaseUrl,
});

api.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Token expired or unauthorized
      await AsyncStorage.removeItem('token');
      //   Toast.show({
      //     text1: 'Session expired',
      //     type: 'error',
      //   });
      //   navigate(Screen.Login); // Replace with your Login screen name
    }

    return Promise.reject(error);
  },
);
