import { api } from './axiosInterceptor';

export const signIn = async (data: { email: string; password: string }) => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

export const signUp = async (payload: any) => {
  const response = await api.post('/auth/register', payload);
  return response.data;
};

export const verifyEmail = async (payload: any) => {
  const response = await api.post('/auth/verify', payload);
  return response.data;
};
export const resendVerification = async (payload: any) => {
  const response = await api.post('/auth/resend-verification', payload);
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
  return response;
};

export const updateUserRole = async (role: string) => {
  const response = await api.patch('/user', { role });
  return response.data;
};

export const changePassword = async (payload: any) => {
  const response = await api.post('/auth/change-password', payload);
  return response.data;
};

export const getTasks = async (search: string, categories: string,fixedPrice: string) => {
  const response = await api.get(`/tasks?search=${search}&categories=${categories}&fixedPrice=${fixedPrice}`);
  return response.data;
};

export const getAllBrowseTasks = async (search: string, userId: string, categories: string,fixedPrice: string) => {
  const response = await api.get(`/tasks/public?search=${search}&userId=${userId}&categories=${categories}&fixedPrice=${fixedPrice}`);
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
  const response = await api.patch(`/tasks/archive/${id}`, payload);
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const getSubCategories = async (categoryId: string) => {
  const response = await api.get(`/categories/${categoryId}/subcategories`);
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

export const createContract = async (payload: any) => {
  const response = await api.post('/tasks/create-contract', payload);
  return response.data;
};

export const acceptContract = async (contractId: string) => {
  const response = await api.post(`/tasks/contract/${contractId}/accept`);
  return response.data;
};

export const rejectContract = async (contractId: string, reason: string) => {
  const response = await api.post(`/tasks/contract/${contractId}/reject`, { reason });
  return response.data;
};

export const closeJob = async (contractId: string) => {
  const response = await api.post(`/tasks/contract/${contractId}/close`);
  return response.data;
};

export const withdrawContract = async (contractId: string) => {
  const response = await api.post(`/tasks/contract/${contractId}/withdraw`);
  return response.data;
};

export const getWallet = async () => {
  const response = await api.get('/wallet/balance');
  return response.data;
};

export const verifyPayment = async (payload: any) => {
  const response = await api.post('/wallet/verify-payment', payload);
  return response.data;
};

export const addWalletBalance = async (payload: any) => {
  const response = await api.post('/wallet/add-funds', payload);
  return response.data;
};

export const releasePayment = async (taskId: string) => {
  const response = await api.post(`/wallet/release-task/${taskId}`);
  return response.data;
};