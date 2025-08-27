import * as Yup from 'yup';

export const step2Schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  phone: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Invalid mobile number')
    .required('Mobile number is required'),
});

export const step1Schema = Yup.object().shape({
  role: Yup.string().required('Select your role'),
});

export const step3Schema = Yup.object().shape({
  otp: Yup.string()
    .length(4, 'OTP must be 4 digits')
    .required('OTP is required'),
});
