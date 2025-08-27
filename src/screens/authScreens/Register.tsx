import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import PersonalDetails from './registerationForms/PersonalDetails';
import RoleDetails from './registerationForms/RoleDetails';
import {
  step1Schema,
  step2Schema,
  step3Schema,
} from '../../schemas/registerSchema';
import Verification from './registerationForms/Verification';
import { signUp, verifyEmail } from '../../service/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../../store/store';
import { UserRole } from '../../utils/enums';
import { User } from '../../utils/type';
import Toast from 'react-native-toast-message';

interface FormValues {
  name: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  verificationToken: number;
  otp: string;
}

const initialValues: FormValues = {
  name: '',
  email: '',
  password: '',
  role: '',
  phone: '',
  verificationToken: 0,
  otp: '',
};

const Register = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [signupUser, setSignupUser] = useState<User | null>(null);

  const navigation = useNavigation<any>();

  console.log('signupUser', signupUser);
  const goNext = async (
    validateForm: any,
    setTouched: any,
    values: FormValues,
  ) => {
    const currentErrors = await validateForm();

    if (Object.keys(currentErrors).length === 0) {
      if (step === 1) {
        console.log('values', values);
        const payload = {
          email: values.email,
          password: values.password,
          name: values.name,
          phone: values.phone,
          role: values.role,
        };
        console.log('payload', payload);
        try {
          setLoading(true);

          const response = await signUp(payload);
          console.log('response', response);
          // setFieldValue('verificationToken', response.verificationToken);
          setSignupUser(response.user);
          Toast.show({
            text1: 'Signup successful! Email verification sent to your email',
            type: 'success',
            
          });
          setStep(step + 1);
          if (response.success) {
          } else {
            Toast.show({
              text1: response.message || 'Email verification failed.',
              type: 'error',
            });
          }
        } catch (error) {
          console.log('error', error);
          Alert.alert('Error', 'Unable to verify email. Try again later.');
        } finally {
          setLoading(false);
        }
      } else {
        setStep(step + 1);
      }
    } else {
    
      Object.keys(currentErrors).forEach(key => setTouched({ [key]: true }));
    }
  };

  const handleSubmitForm = async (values: FormValues, resetForm: any) => {
    console.log('Final Values:', values);
    try {
      const payload = {
        email: values.email,
        verificationToken: values.otp,
      };
      console.log('payload', payload);
      const response = await verifyEmail(payload);
      console.log('response', response);
      const userRole = response.user?.role;
      {
        userRole === UserRole.Poster.toString()
          ? navigation.navigate('Login')
          : navigation.navigate('Categories' as never);
      }

      resetForm();

      Toast.show({
        text1: 'Email verified successfully!',
        type: 'success',
      });
    } catch {
      setLoading(false);
      setStep(0);
      Toast.show({
        text1: 'Email verification failed.',
        type: 'error',
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={
        step === 0 ? step1Schema : step === 1 ? step2Schema : step3Schema
      }
      onSubmit={handleSubmitForm}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldValue,
        handleSubmit,
        validateForm,
        setTouched,
        handleBlur,
        resetForm,
      }) => (
        <ScrollView contentContainerStyle={styles.container}>
          {step === 0 && (
            <RoleDetails
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          )}

          {step === 1 && (
            <PersonalDetails
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
            />
          )}

          {step === 2 && (
            <Verification
              values={values}
              errors={errors}
              touched={touched}
              setFieldValue={setFieldValue}
              // onSubmit={handleSubmitForm}
            />
          )}

          <View style={styles.buttonContainer}>
            {step > 0 && (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setStep(step - 1)}
              >
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
            )}

            {step < 2 ? (
              <TouchableOpacity
                style={styles.nextButton}
                onPress={() => goNext(validateForm, setTouched, values)}
              >
                <Text style={styles.buttonText}>
                  {/* Next */}
                  {loading
                    ? 'Verifying...'
                    : step === 1
                    ? 'Signed Up & Verify'
                    : 'Next'}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => handleSubmitForm(values, resetForm)}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 15,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#6c757d',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

// import { Formik } from 'formik';
// import { useEffect, useState } from 'react';
// import {
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Dimensions,
//   Alert,
// } from 'react-native';
// import * as Yup from 'yup';

// const { width } = Dimensions.get('window');

// interface FormValues {
//   name: string;
//   email: string;
//   password: string;
//   categories: number[];
//   otp: string;
// }

// interface Category {
//   id: number;
//   categoryName: string;
//   subCategories: SubCategory[];
// }

// interface SubCategory {
//   id: number;
//   name: string;
// }

// const Register = () => {
//   const [step, setStep] = useState(0);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(false);

//   const step1Schema = Yup.object().shape({
//     name: Yup.string().required('Name is required'),
//     email: Yup.string().email('Invalid email').required('Email is required'),
//     password: Yup.string()
//       .min(6, 'Min 6 chars')
//       .required('Password is required'),
//   });

//   const step2Schema = Yup.object().shape({
//     categories: Yup.array().min(1, 'Select at least one category'),
//   });

//   const step3Schema = Yup.object().shape({
//     otp: Yup.string()
//       .length(4, 'OTP must be 4 digits')
//       .required('OTP is required'),
//   });

//   const initialValues: FormValues = {
//     name: '',
//     email: '',
//     password: '',
//     categories: [],
//     otp: '',
//   };

//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('http://192.168.0.109:3001/api/categories');
//       const data = await response.json();
//       setCategories(data);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (step === 1) {
//       fetchCategories();
//     }
//   }, [step]);

//   const goNext = async (validateForm: any, setTouched: any) => {
//     const currentErrors = await validateForm();
//     if (Object.keys(currentErrors).length === 0) {
//       setStep(step + 1);
//     } else {
//       Object.keys(currentErrors).forEach(key => setTouched({ [key]: true }));
//     }
//   };

//   const handleSubmitForm = (values: FormValues) => {
//     console.log('Final Values:', values);
//     Alert.alert('Success!', 'Registration completed successfully!');
//   };

//   const renderProgressBar = () => {
//     const progress = ((step + 1) / 3) * 100;
//     return (
//       <View style={styles.progressContainer}>
//         {/* <View style={styles.progressBar}>
//           <View style={[styles.progressFill, { width: `${progress}%` }]} />
//         </View> */}
//         <View style={styles.stepIndicators}>
//           {[0, 1, 2].map((index) => (
//             <View
//               key={index}
//               style={[
//                 styles.stepIndicator,
//                 step >= index && styles.stepIndicatorActive,
//               ]}
//             >
//               <Text style={[
//                 styles.stepNumber,
//                 step >= index && styles.stepNumberActive
//               ]}>
//                 {index + 1}
//               </Text>
//             </View>
//           ))}
//         </View>
//       </View>
//     );
//   };

//   const renderStepTitle = () => {
//     const titles = ['Personal Information', 'Choose Categories', 'Verify OTP'];
//     return (
//       <View style={styles.stepTitleContainer}>
//         <Text style={styles.stepTitle}>{titles[step]}</Text>
//         <Text style={styles.stepSubtitle}>Step {step + 1} of 3</Text>
//       </View>
//     );
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={step === 0 ? step1Schema : step === 1 ? step2Schema : step3Schema}
//       onSubmit={handleSubmitForm}
//     >
//       {({
//         values,
//         handleChange,
//         errors,
//         touched,
//         setFieldValue,
//         handleSubmit,
//         validateForm,
//         setTouched,
//       }) => (
//         <View style={styles.container}>
//           <ScrollView
//             contentContainerStyle={styles.scrollContainer}
//             showsVerticalScrollIndicator={false}
//           >
//             {renderProgressBar()}
//             {renderStepTitle()}

//             {step === 0 && (
//               <View style={styles.formContainer}>
//                 <View style={styles.inputGroup}>
//                   <Text style={styles.inputLabel}>Full Name</Text>
//                   <TextInput
//                     placeholder="Enter your full name"
//                     style={[styles.input, errors.name && touched.name && styles.inputError]}
//                     value={values.name}
//                     onChangeText={handleChange('name')}
//                     placeholderTextColor="#999"
//                   />
//                   {errors.name && touched.name && (
//                     <Text style={styles.errorText}>{errors.name}</Text>
//                   )}
//                 </View>

//                 <View style={styles.inputGroup}>
//                   <Text style={styles.inputLabel}>Email Address</Text>
//                   <TextInput
//                     placeholder="Enter your email"
//                     style={[styles.input, errors.email && touched.email && styles.inputError]}
//                     value={values.email}
//                     onChangeText={handleChange('email')}
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                     placeholderTextColor="#999"
//                   />
//                   {errors.email && touched.email && (
//                     <Text style={styles.errorText}>{errors.email}</Text>
//                   )}
//                 </View>

//                 <View style={styles.inputGroup}>
//                   <Text style={styles.inputLabel}>Password</Text>
//                   <TextInput
//                     placeholder="Create a password"
//                     secureTextEntry
//                     style={[styles.input, errors.password && touched.password && styles.inputError]}
//                     value={values.password}
//                     onChangeText={handleChange('password')}
//                     placeholderTextColor="#999"
//                   />
//                   {errors.password && touched.password && (
//                     <Text style={styles.errorText}>{errors.password}</Text>
//                   )}
//                 </View>
//               </View>
//             )}

//             {step === 1 && (
//               <View style={styles.formContainer}>
//                 <Text style={styles.sectionTitle}>Select your interests</Text>
//                 <Text style={styles.sectionSubtitle}>
//                   Choose categories that match your interests
//                 </Text>

//                 {loading ? (
//                   <View style={styles.loadingContainer}>
//                     <Text style={styles.loadingText}>Loading categories...</Text>
//                   </View>
//                 ) : (
//                   <View style={styles.categoriesContainer}>
//                     {categories.map(category => (
//                       <View key={category.id} style={styles.categoryBlock}>
//                         <Text style={styles.categoryTitle}>
//                           {category.categoryName}
//                         </Text>
//                         <View style={styles.subCategoriesGrid}>
//                           {category.subCategories.map((sub: SubCategory) => (
//                             <TouchableOpacity
//                               key={sub.id}
//                               style={[
//                                 styles.subCategoryItem,
//                                 values.categories.includes(sub.id) &&
//                                   styles.selectedSubCategory,
//                               ]}
//                               onPress={() => {
//                                 if (values.categories.includes(sub.id)) {
//                                   setFieldValue(
//                                     'categories',
//                                     values.categories.filter(c => c !== sub.id),
//                                   );
//                                 } else {
//                                   setFieldValue('categories', [
//                                     ...values.categories,
//                                     sub.id,
//                                   ]);
//                                 }
//                               }}
//                             >
//                               <Text style={[
//                                 styles.subCategoryText,
//                                 values.categories.includes(sub.id) && styles.selectedSubCategoryText
//                               ]}>
//                                 {sub.name}
//                               </Text>
//                             </TouchableOpacity>
//                           ))}
//                         </View>
//                       </View>
//                     ))}
//                   </View>
//                 )}
//                 {errors.categories && touched.categories && (
//                   <Text style={styles.errorText}>{errors.categories}</Text>
//                 )}
//               </View>
//             )}

//             {step === 2 && (
//               <View style={styles.formContainer}>
//                 <View style={styles.otpContainer}>
//                   <Text style={styles.sectionTitle}>Verify Your Account</Text>
//                   <Text style={styles.sectionSubtitle}>
//                     Enter the 6-digit code sent to your email
//                   </Text>

//                   <View style={styles.inputGroup}>
//                     <Text style={styles.inputLabel}>OTP Code</Text>
//                     <TextInput
//                       placeholder="Enter 6-digit OTP"
//                       keyboardType="numeric"
//                       maxLength={6}
//                       style={[styles.input, styles.otpInput, errors.otp && touched.otp && styles.inputError]}
//                       value={values.otp}
//                       onChangeText={handleChange('otp')}
//                       placeholderTextColor="#999"
//                     />
//                     {errors.otp && touched.otp && (
//                       <Text style={styles.errorText}>{errors.otp}</Text>
//                     )}
//                   </View>
//                 </View>
//               </View>
//             )}

//             <View style={styles.buttonContainer}>
//               {step > 0 && (
//                 <TouchableOpacity
//                   style={styles.backButton}
//                   onPress={() => setStep(step - 1)}
//                 >
//                   <Text style={styles.backButtonText}>Back</Text>
//                 </TouchableOpacity>
//               )}

//               {step < 2 ? (
//                 <TouchableOpacity
//                   style={styles.nextButton}
//                   onPress={() => goNext(validateForm, setTouched)}
//                 >
//                   <Text style={styles.nextButtonText}>Next</Text>
//                 </TouchableOpacity>
//               ) : (
//                 <TouchableOpacity
//                   style={styles.submitButton}
//                   onPress={handleSubmit}
//                 >
//                   <Text style={styles.submitButtonText}>Complete Registration</Text>
//                 </TouchableOpacity>
//               )}
//             </View>
//           </ScrollView>
//         </View>
//       )}
//     </Formik>
//   );
// };

// export default Register;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     padding: 20,
//   },
//   progressContainer: {
//     marginBottom: 30,
//   },
//   progressBar: {
//     height: 4,
//     backgroundColor: '#e9ecef',
//     borderRadius: 2,
//     marginBottom: 15,
//   },
//   progressFill: {
//     height: '100%',
//     backgroundColor: '#007bff',
//     borderRadius: 2,
//   },
//   stepIndicators: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//   },
//   stepIndicator: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#e9ecef',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   stepIndicatorActive: {
//     backgroundColor: '#007bff',
//   },
//   stepNumber: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#6c757d',
//   },
//   stepNumberActive: {
//     color: '#fff',
//   },
//   stepTitleContainer: {
//     marginBottom: 30,
//     alignItems: 'center',
//   },
//   stepTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#212529',
//     marginBottom: 5,
//   },
//   stepSubtitle: {
//     fontSize: 16,
//     color: '#6c757d',
//   },
//   formContainer: {
//     marginBottom: 30,
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   inputLabel: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#495057',
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#dee2e6',
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 12,
//     fontSize: 16,
//     color: '#212529',
//   },
//   inputError: {
//     borderColor: '#dc3545',
//   },
//   errorText: {
//     color: '#dc3545',
//     fontSize: 14,
//     marginTop: 5,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#212529',
//     marginBottom: 8,
//   },
//   sectionSubtitle: {
//     fontSize: 16,
//     color: '#6c757d',
//     marginBottom: 20,
//   },
//   loadingContainer: {
//     alignItems: 'center',
//     padding: 40,
//   },
//   loadingText: {
//     fontSize: 16,
//     color: '#6c757d',
//   },
//   categoriesContainer: {
//     marginTop: 10,
//   },
//   categoryBlock: {
//     marginBottom: 25,
//   },
//   categoryTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#212529',
//     marginBottom: 12,
//   },
//   subCategoriesGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 10,
//   },
//   subCategoryItem: {
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: '#dee2e6',
//     backgroundColor: '#fff',
//     marginBottom: 8,
//   },
//   selectedSubCategory: {
//     backgroundColor: '#007bff',
//     borderColor: '#007bff',
//   },
//   subCategoryText: {
//     fontSize: 14,
//     color: '#495057',
//   },
//   selectedSubCategoryText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   otpContainer: {
//     alignItems: 'center',
//   },
//   otpInput: {
//     textAlign: 'center',
//     fontSize: 18,
//     letterSpacing: 2,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//     gap: 15,
//   },
//   backButton: {
//     flex: 1,
//     backgroundColor: '#6c757d',
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   backButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   nextButton: {
//     flex: 1,
//     backgroundColor: '#007bff',
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   nextButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   submitButton: {
//     flex: 1,
//     backgroundColor: '#28a745',
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });
