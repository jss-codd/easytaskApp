import * as Yup from 'yup';

export const noSpaceRegex = /^[^\s]/;

export const createContractSchema = Yup.object().shape({
  finalPrice: Yup.number().required('Final price is required'),
  startDate: Yup.date().required('Start date is required'),
  scope: Yup.string().required('Scope is required').matches(noSpaceRegex, 'Scope cannot contain spaces'),
});