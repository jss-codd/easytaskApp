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
  console.log('response', response.data);
  return response.data;
};
export const resendVerification = async (payload: any) => {
  const response = await api.post('/auth/resend-verification', payload);
  console.log('resend-response', response.data);
  return response.data;
};

export const postForgotPassword = async (payload: any) => {
  const response = await api.post('/auth/forgot-password', payload);
  return response;
};

export const getUserProfile = async () => {
  const response = await api.get('/user');
  return response.data;
};

export const updateUserProfile = async (payload: any) => {
  const response = await api.patch('/user', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log(response.data);
  return response.data;
};

export const updateUserRole = async (role: string) => {
  const response = await api.patch('/user', { role });
  console.log('Role update response:', response.data);
  return response.data;
};

export const changePassword = async (payload: any) => {
  const response = await api.post('/auth/change-password', payload);
  return response.data;
};

export const getTasks = async (search: string,) => {
  const response = await api.get(`/tasks?search=${search}`);
  return response.data;
};

export const getAllBrowseTasks = async (search: string,userId: string) => {
  const response = await api.get(`/tasks/public?search=${search}&userId=${userId}`);
  return response.data;
};
export const getAllTaskById = async (id: string) => {
  const response = await api.get(`/tasks/${id}`);
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

export const updateTask = async (id: string, payload: any) => {
  const response = await api.patch(`/tasks/${id}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const archiveTask = async (id: string, payload: any) => {
  const response = await api.patch(`/tasks/archive/${id}`,{payload});
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

export const updateTaskApplication = async (payload: any, bidId: string) => {
  const response = await api.patch(`/bids/${bidId}`, payload);
  return response.data;
};

export const getChats = async () => {
  const response = await api.get('/chat/list');
  return response.data;
};

export const getChatMessages = async (chatId: string) => {
  const response = await api.get(`/chat/messages/${chatId}`);
  return response.data;
};

export const saveTasks = async (taskId: string) => {
  const response = await api.post(`/tasks/${taskId}/bookmark`);
  console.log(response.data)
  return response.data;
};

export const unsaveTasks = async (taskId: string) => {
  const response = await api.delete(`/tasks/${taskId}/bookmark`);
  return response.data;
};

export const saveFcmToken = async (payload: any) => {
  const response = await api.post('/user/fcm-token', payload);
  return response.data;
};