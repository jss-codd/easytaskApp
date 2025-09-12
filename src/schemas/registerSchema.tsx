import * as Yup from 'yup';
import { noSpaceRegex } from './createTaskSchema';

export const step2Schema = Yup.object().shape({
  name: Yup.string().required('First name is required')
    .matches(noSpaceRegex, 'Name cannot contain spaces')
    .max(20, 'Name cannot be more than 20 characters')
    .min(3, 'Name cannot be less than 3 characters'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
  .oneOf([Yup.ref('password')], 'Passwords must match')
  .required('Confirm Password is required'),

  phone: Yup.string()
  .matches(/^[6-9]\d{9}$/, 'Invalid mobile number')
  .required('Mobile number is required')
  .matches(noSpaceRegex, 'Mobile number cannot contain spaces'),
});

export const step1Schema = Yup.object().shape({
  role: Yup.string().required('Select your role'),
});

export const step3Schema = Yup.object().shape({
  otp: Yup.string()
    .length(4, 'OTP must be 4 digits')
    .required('OTP is required'),
});
