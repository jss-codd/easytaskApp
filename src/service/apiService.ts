import { api } from './axiosInterceptor';

export const signIn = async (data: { email: string; password: string }) => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

export const signUp = async (payload: any) => {
  try {
    const response = await api.post('/auth/register', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyEmail = async (payload: any) => {
  const response = await api.post('/auth/verify', payload);
  return response.data;
};

export const getTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

export const getTaskById = async (id: string) => {
  const response = await api.get(`/bids/task/${id}`);
  return response.data;
};

export const getMyTasks = async () => {
  const response = await api.get('/my-tasks');
  return response.data;
};

export const getMyBids = async (userId: string) => {
  const response = await api.get(`/bids/client/${userId}`);
  return response.data;
};

export const postTask = async (payload: any) => {
  const response = await api.post('/tasks', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const getSubCategories = async (categoryId: string) => {
  const response = await api.get(`/categories/${categoryId}/subcategories`);
  console.log('response', response.data);
  return response.data;
};

export const setCategories = async (payload: any) => {
  const response = await api.post('/auth/select-categories', payload);
  return response.data;
};

export const createChat = async (payload: any) => {
  const response = await api.post('/chat/create', payload);
  return response.data;
};

export const getTaskerBids = async (userId: string) => {
  const response = await api.get(`/bids/user/${userId}`);
  return response.data;
};

export const applyForTask = async (payload: any) => {
  const response = await api.post('/bids', payload);
  return response.data;
};