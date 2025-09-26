import * as Yup from 'yup';
export const noSpaceRegex = /^[^\s]/;

export const validationSchema = Yup.object().shape({
  title: Yup.string().required('Task title is required') .matches(noSpaceRegex, 'Task title cannot contain spaces')
  .max(50, 'Task title cannot be more than 50 characters')
  .min(3, 'Task title cannot be less than 3 characters'),
  description: Yup.string().required('Task description is required'),
  estimateBudget: Yup.number().required('Task budget is required'),
  deadline: Yup.date().required('Task deadline is required'),
  mainCategory: Yup.array().of(Yup.string()).required('Select atleast one category is required'),
  categories: Yup.array().of(Yup.string()).required('Select atleast one sub category is required'),
  location: Yup.object().shape({
    addressLine1: Yup.string().required('Address is required').matches(noSpaceRegex, 'Address cannot contain spaces')
    .max(50, 'Address cannot be more than 50 characters')
    .min(3, 'Address cannot be less than 3 characters'),
    city: Yup.string().required('City is required').matches(noSpaceRegex, 'City cannot contain spaces')
    .max(20, 'City cannot be more than 20 characters')
    .min(3, 'City cannot be less than 3 characters'),
    // pincode: Yup.string().required('Pincode is required').matches(/^\d{6}$/, 'Invalid pincode'),
    country: Yup.string().required('Country is required').matches(noSpaceRegex, 'Country cannot contain spaces')
    .max(20, 'Country cannot be more than 20 characters')
    .min(3, 'Country cannot be less than 3 characters'),
    // phone: Yup.string()
    // .matches(/^[6-9]\d{9}$/, 'Invalid mobile number')
    // .required('Mobile number is required')
    // .matches(noSpaceRegex, 'Mobile number cannot contain spaces'),
    home: Yup.string().notRequired(),
    street: Yup.string().required('Street is required').matches(noSpaceRegex, 'Street cannot contain spaces')
    .max(20, 'Street cannot be more than 20 characters')
    .min(3, 'Street cannot be less than 3 characters'),
    state: Yup.string().required('State is required'),
    addressLine2: Yup.string().notRequired(),
    media: Yup.array().of(Yup.string()).notRequired()
    .test('file-type', 'File must be a Image', (value: any) => {
      if (!value) return true;
      return value.type === 'image/jpeg' || value.type === 'image/png' || value.type === 'image/jpg';
    })
    .test('file-size', 'File size must be less than 5MB', (value: any) => {
      if (!value) return true;

      return value.size <1* 1024 * 1024; // 1MB in bytes
    }),
    
  }),
});
