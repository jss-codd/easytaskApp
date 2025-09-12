import { UserRole } from "./enums";

export const Screen = {
  Login: 'Login',
  Register: 'Register',
  Home: 'Home',
  Job: 'Job',
  AllJobs: 'AllJobs',
  BidDetails: 'BidDetails',
  Profile: 'Profile',
  ForgotPassword: 'ForgotPassword',
  SetPassword: 'reset-password',
};

export interface User {
  role: UserRole,
  isVerified?: boolean,
  verificationToken?: string,
  name: string,
  email: string,
  phone: string,
  password?: string,
  confirmPassword?: string,
  profile: {
    rating: number,
  },
}

export const stepFields: Record<number, string[]> = {
  0: ['title', 'description'],
  1: ['mainCategory', 'categories'],
  2: [
    'location.addressLine1',
    'location.addressLine2',
    'location.street',
    'location.city',
    'location.country',
    'location.phone',
    'location.home',
    'location.state',
  ],
  3: ['estimateBudget', 'deadline', 'note'],
  4: ['image'],
};

export type AxiosErrorMessage = {
  response: {
    data: {
      message: string;
    };
  };
};

export interface Message {
  id?: string;
  chatId: string;
  text: string;
  receiverId: string;
  senderId: string;
  role?: string;
  createdAt?: string;
  status?: string;
}
export interface Location {
  city: string;
  pincode?: string;
  phone?: string;
  state: string;
  street?: string;
  country?: string;
  addressLine1?: string;
  addressLine2?: string;
}
export interface Task {
  id: string;
  title: string;
  description: string;
  location: Location;
  estimateBudget: number;
  deadline: string;
  note: string;
  media: string[];
  archived: boolean;
  paymentStatus: 'INITIATED' | 'COMPLETED' | 'FAILED';
  progressStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TaskResponse {
  data: Task[];
  meta: Meta;
}
export interface FileObject {
  uri: string;
  name: string | null;
  type: string;
  fileSize?: number;
}

export interface TaskPayload {
  title: string;
  description: string;
  estimateBudget: string | number;
  deadline: Date | string;
  note: string;
  location: Location;
  media?: FileObject | null;
  categoryIds: string[];
  mainCategory: string;
  categories: string[];
}

export interface Bid {
  id: string;
  offeredPrice: number;
  offeredEstimatedTime: number;
  comment: string;
  status: string;
  user: {
    name: string;
    email: string;
    profile: { avatar: string | null };
  };
  userId: string,
  taskId: string,
  task: Task;
}

export interface BidResponse {
  data: Bid[];
  meta: Meta;
}

export interface SubCategory {
  id: string;
  name: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
  subCategories: SubCategory[];
}
