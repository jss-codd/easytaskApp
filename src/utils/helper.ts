export const postTaskValues = {
  title: '',
  description: '',
  estimateBudget: '',
  deadline: '',
  note: '',
  categoryIds:[],
  mainCategory:'',
  location: {
    addressLine1: '',
    addressLine2: '',
    pincode: '',
    street: '',
    state: '',
    city: '',
    country: 'India',
    phone: '',
  },
  image: null,
};

export const roles = [
  {
    key: 'POSTER',
    label: 'Poster',
  },
  {
    key: 'TASKER',
    label: 'Tasker',
  },
];

export const stateOptions = [
  {label: 'Andhra Pradesh', value: 'Andhra Pradesh'},
  {label: 'Arunachal Pradesh', value: 'Arunachal Pradesh'},
  {label: 'Assam', value: 'Assam'},
  {label: 'Bihar', value: 'Bihar'},
  {label: 'Chhattisgarh', value: 'Chhattisgarh'},
  {label: 'Goa', value: 'Goa'},
  {label: 'Gujarat', value: 'Gujarat'},
  {label: 'Haryana', value: 'Haryana'},
  {label: 'Himachal Pradesh', value: 'Himachal Pradesh'},
  {label: 'Jammu and Kashmir', value: 'Jammu and Kashmir'},
  {label: 'Jharkhand', value: 'Jharkhand'},
  {label: 'Karnataka', value: 'Karnataka'},
  {label: 'Kerala', value: 'Kerala'},
  {label: 'Madhya Pradesh', value: 'Madhya Pradesh'},
  {label: 'Maharashtra', value: 'Maharashtra'},
  {label: 'Manipur', value: 'Manipur'},
  {label: 'Meghalaya', value: 'Meghalaya'},
  {label: 'Mizoram', value: 'Mizoram'},
  {label: 'Nagaland', value: 'Nagaland'},
  {label: 'Odisha', value: 'Odisha'},
  {label: 'Punjab', value: 'Punjab'},
  {label: 'Rajasthan', value: 'Rajasthan'},
  {label: 'Sikkim', value: 'Sikkim'},
  {label: 'Tamil Nadu', value: 'Tamil Nadu'},
  {label: 'Telangana', value: 'Telangana'},
  {label: 'Tripura', value: 'Tripura'},
  {label: 'Uttar Pradesh', value: 'Uttar Pradesh'},
  {label: 'Uttarakhand', value: 'Uttarakhand'},
  {label: 'West Bengal', value: 'West Bengal'},
  {label: 'Andaman and Nicobar Islands', value: 'Andaman and Nicobar Islands'},
  {label: 'Dadra and Nagar Haveli', value: 'Dadra and Nagar Haveli'},
  {label: 'Daman and Diu', value: 'Daman and Diu'},
  {label: 'Delhi', value: 'Delhi'},
  {label: 'Lakshadweep', value: 'Lakshadweep'},
  {label: 'Puducherry', value: 'Puducherry'},
  {label: 'Chandigarh', value: 'Chandigarh'},
  {label: 'Ladakh', value: 'Ladakh'},
];

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate2 = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  return `${day}/${month}/${year}`;
};

export const formatDate = (date: Date) =>
  `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

export const goNextStep = async (
  step: number,
  setStep: React.Dispatch<React.SetStateAction<number>>,
  stepFields: Record<number, string[]>,
  validateForm: any,
  setFieldTouched: any,
) => {
  const errors = await validateForm();

  const fields = stepFields[step] || [];

  const stepErrors = fields.filter(f => {
    const keys = f.split('.');
    let err = errors;
    for (let key of keys) {
      err = err?.[key];
    }
    return !!err;
  });

  if (stepErrors.length > 0) {
    fields.forEach(f => setFieldTouched(f, true));
    return;
  }

  setStep(step + 1);
};

export const timeAgo = (dateString: string) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime();
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`;

  const day = String(past.getDate()).padStart(2, '0');
  const month = String(past.getMonth() + 1).padStart(2, '0');
  const year = past.getFullYear();
  return `${day}/${month}/${year}`;
};
