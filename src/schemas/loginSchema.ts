import * as Yup from 'yup';
import { validateEmail, validatePassword } from '../utils/helper';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .test('is-valid-email', 'Enter a valid email', value =>
      validateEmail(value || ''),
    )
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    // .test(
    //   'is-valid-password',
    //   'Password must be at least 6 characters',
    //   value => validatePassword(value || ''),
    // )
    // .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    // .min(2, 'Name must be at least 2 characters')
    // .max(50, 'Name cannot exceed 50 characters')
    .required('Name is required'),
  email: Yup.string()
    .test('is-valid-email', 'Enter a valid email', value =>
      validateEmail(value || ''),
    )
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    // .test(
    //   'is-valid-password',
    //   'Password must be at least 6 characters',
    //   value => validatePassword(value || ''),
    // )
    // .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  role: Yup.string()
    .oneOf(['POSTER', 'TASKER'], 'Please select a role')
    .required('Please select a role'),
});
