import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BaseUrl = "https://api.easytaskers.com/api"

export const ImageUrl = "https://easytaskers.s3.us-east-1.amazonaws.com/"

export const SocketUrl = "https://api.easytaskers.com"
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
