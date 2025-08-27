import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { Formik } from 'formik';
import CustomTextInput from '../../components/CustomTextInput';
import { loginSchema } from '../../schemas/loginSchema';
import { useNavigation } from '@react-navigation/native';
import { RootState, useAppDispatch } from '../../store/store';
import { loginUser } from '../../store/slices/authSlice';
import { Screen } from '../../utils/type';
import { loginStyles } from './style';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const { error, loading, isAuthenticated } = useSelector(
    (state: RootState) => state.authReducer,
  );

  const navigateToSignup = () => {
    navigation.navigate(Screen.Register as never);
  };

  useEffect(() => {
    if (isAuthenticated) {
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'Welcome back!',
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error,
      });
    }
  }, [error]);

  return (
    <View style={loginStyles.container}>
      <Text style={loginStyles.title}>Login to Your Account</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={values => {
          const { email, password } = values;
          if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
          }
          dispatch(loginUser({ email, password }));

          // console.log('Login attempt with:', { email, password });
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <CustomTextInput
              placeholder="Enter your email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              error={errors.email}
              touched={touched.email}
            />

            <CustomTextInput
              placeholder="Enter your password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry
              autoCapitalize="none"
              error={errors.password}
              touched={touched.password}
            />

            <TouchableOpacity
              style={loginStyles.forgotPassword}
              onPress={() =>
                Alert.alert(
                  'Forgot Password',
                  'Reset password functionality not implemented yet',
                )
              }
            >
              <Text style={loginStyles.forgotPasswordText}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                loading
                  ? loginStyles.loginButtonLoading
                  : loginStyles.loginButton
              }
              onPress={handleSubmit}
            >
              <Text style={loginStyles.loginButtonText}>
                {loading ? 'Logging in...' : 'Login'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <View style={loginStyles.footer}>
        <Text style={loginStyles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={navigateToSignup}>
          <Text style={loginStyles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
