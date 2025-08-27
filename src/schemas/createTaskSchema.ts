import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  title: Yup.string().required('Task title is required'),
  description: Yup.string().required('Task description is required'),
  estimateBudget: Yup.number().required('Task budget is required'),
  deadline: Yup.date().required('Task deadline is required'),
  location: Yup.object().shape({
    addressLine1: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    country: Yup.string().required('Country is required'),
    phone: Yup.string().required('Phone is required'),
    home: Yup.string().notRequired(),
    street: Yup.string().required('Street is required'),
    state: Yup.string().required('State is required'),
    addressLine2: Yup.string().notRequired(),
  }),
});
