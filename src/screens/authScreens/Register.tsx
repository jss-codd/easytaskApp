import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
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
import { useNavigation } from '@react-navigation/native';
import { UserRole } from '../../utils/enums';
import { AxiosErrorMessage, User } from '../../utils/type';
// import Toast from 'react-native-toast-message';
import metrics from '../../constants/metrics';
import Colors from '../../constants/color';
import { Toast } from '../../components/CommonToast';

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
  //   {
  //     "message": "Invalid verification code",
  //     "error": "Bad Request",
  //     "statusCode": 400
  // }
  // {
  //   "message": "Verification token has expired",
  //   "error": "Bad Request",
  //   "statusCode": 400
  // }
  // {
  //   "message": "Email verified successfully",
  //   "user": {
  //       "id": "cmfcko1fw000env07emjr7acy",
  //       "email": "poster@yopmail.com",
  //       "name": "Poster",
  //       "role": "POSTER",
  //       "isVerified": true
  //   },
  //   "requiresCategorySelection": false,
  //   "redirectTo": "login"
  // }

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
         
          setSignupUser(response.user);
          Toast.show({
            type: 'success',
            text1: response.message ,
          });
          setStep(step + 1);
          // if (response.success) {
          // } else {
          //   Toast.show({
          //     text1: response.message || 'Email verification failed.',
          //     type: 'error',
          //   });
          // }
        } catch (error: any) {
          console.log('error', error);
       
          Toast.show({
            text1: error?.response?.data?.message || 'Email verification failed.',
            type: 'error',
          });
        } finally {
          setLoading(false);
        }
      } else {
        setStep(step + 1);
      }
    } else {

      setTouched(
        Object.keys(currentErrors).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {} as Record<string, boolean>)
      );

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

      if (response.user?.isVerified) {
        Toast.show({
          text1: response.message || 'Email verified successfully!',
          type: 'success',
        });

        resetForm();
        navigation.navigate('Login');
      } else {
        Toast.show({
          text1: 'Your email is not verified. Please verify to continue.',
          type: 'error',
        });
      }
    } catch (err: any) {
      console.error('verifyEmail error:', err);

      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Email verification failed.';

      Toast.show({
        text1: errorMessage,
        type: 'error',
      });

      setLoading(false);

    }
  };


  // const handleSubmitForm = async (values: FormValues, resetForm: any) => {
  //   console.log('Final Values:', values);
  //   try {
  //     const payload = {
  //       email: values.email,
  //       verificationToken: values.otp,
  //     };
  //     console.log('payload', payload);
  //     const response = await verifyEmail(payload);
  //     console.log('response', response);
  //     const userRole = response.user?.role;
  //     {
  //       userRole === UserRole.Poster.toString()
  //         ? navigation.navigate('Login')
  //         : navigation.navigate('Categories' as never);
  //     }

  //     resetForm();

  //     Toast.show({
  //       text1: 'Email verified successfully!',
  //       type: 'success',
  //     });
  //   } catch {
  //     setLoading(false);
  //     setStep(0);
  //     Toast.show({
  //       text1: 'Email verification failed.',
  //       type: 'error',
  //     });
  //   }
  // };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
            <>
              {step === 0 && (
                <RoleDetails
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  step={step}
                  goNext={() => goNext(validateForm, setTouched, values)}
                  goBack={() => setStep(step - 1)}
                  loading={loading}
                />
              )}

              {/* {step === 1 && (
                <PersonalDetails
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                />
              )} */}
              {step === 1 && (
                <PersonalDetails
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                  step={step}
                  loading={loading}
                  goNext={() => goNext(validateForm, setTouched, values)}
                  goBack={() => setStep(step - 1)}
                />
              )}


              {step === 2 && (
                <Verification
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  handleSubmitForm={handleSubmitForm}
                  resetForm={resetForm}

                />
              )}

              {/* <View style={styles.buttonContainer}>
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
              </View> */}
            </>

          )}
        </Formik>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: metrics.marginTop(20),
    marginBottom: metrics.marginBottom(60),
    gap: metrics.gap(15),
    backgroundColor: Colors.BACKGROUND,
  },
  backButton: {
    flex: 1,
    backgroundColor: Colors.GREY,
    padding: metrics.padding(10),
    borderRadius: metrics.borderRadius(12),
    alignItems: 'center',
  },
  nextButton: {
    flex: 1,
    backgroundColor: Colors.BUTTON_BACKGROUND,
    padding: metrics.padding(10),
    borderRadius: metrics.borderRadius(12),
    alignItems: 'center',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#28a745',
    padding: metrics.padding(16),
    borderRadius: metrics.borderRadius(12),
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: metrics.fontSize(16),
    fontWeight: '600',
  },
});

