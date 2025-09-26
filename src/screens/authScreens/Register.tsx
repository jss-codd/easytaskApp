import React, { useState } from 'react';
import {
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
import {User } from '../../utils/type';
import { Toast } from '../../components/CommonToast';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  
  const goNext = async (
    validateForm: any,
    setTouched: any,
    values: FormValues,
  ) => {
    const currentErrors = await validateForm();

    if (Object.keys(currentErrors).length === 0) {
      if (step === 1) {
        const payload = {
          email: values.email,
          password: values.password,
          name: values.name,
          phone: values.phone,
          role: values.role,
        };
  
        try {
          setLoading(true);
          const response = await signUp(payload);
         
          setSignupUser(response.user);
          Toast.show({
            type: 'success',
            text1: response.message ,
          });
          setStep(step + 1);
        } catch (error: any) {
       
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
    try {
      const payload = {
        email: values.email,
        verificationToken: values.otp,
      };
      const response = await verifyEmail(payload);

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
            </>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Register;
