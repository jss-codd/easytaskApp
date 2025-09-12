import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import { Formik, FormikProps } from 'formik';
import CustomTextInput from '../../components/CustomTextInput';
import { loginSchema } from '../../schemas/loginSchema';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { RootState, useAppDispatch } from '../../store/store';
import { loginUser } from '../../store/slices/authSlice';
import { Screen } from '../../utils/type';
import { loginStyles } from './style';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import CustomPasswordInput from '../../components/CustomPasswordInput';
import Colors from '../../constants/color';

const Login = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useAppDispatch();

  const formRef = useRef<FormikProps<any>>(null);
  const { error, loading, isAuthenticated } = useSelector(
    (state: RootState) => state.authReducer,
  );

  const [showPassword, setShowPassword] = useState(false);
  const navigateToSignup = () => {
    navigation.navigate(Screen.Register as never);
  };

  useFocusEffect(
    useCallback(() => {
      if (formRef.current) {
        formRef.current.resetForm();
      }
    }, [])
  );

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
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={loginStyles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={loginStyles.formContainer}>
            <StatusBar backgroundColor={Colors.MAIN_COLOR} barStyle="dark-content" />
            <Text style={loginStyles.title}>Login to Your Account</Text>
            <Formik
              innerRef={formRef}
              initialValues={{ email: '', password: '' }}
              validationSchema={loginSchema}
              onSubmit={values => {
                const { email, password } = values;
                if (!email || !password) {
                  Alert.alert('Error', 'Please fill in all fields');
                  return;
                }
                dispatch(loginUser({ email, password }));
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
                    error={errors.email as string}
                    touched={touched.email as boolean}
                  />

                  {/* <CustomTextInput
                    placeholder="Enter your password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    secureTextEntry
                    autoCapitalize="none"
                    error={errors.password as string}
                    touched={touched.password as boolean}
                  /> */}
                  <CustomPasswordInput
                    placeholder='Enter your password'
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    error={errors.password as string}
                    touched={touched.password as boolean}
                  />


                 <TouchableOpacity
                    style={loginStyles.forgotPassword}
                    onPress={() =>
                      navigation.navigate(Screen.ForgotPassword)
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
              <Text style={loginStyles.footerText}>
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity onPress={navigateToSignup}>
                <Text style={loginStyles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Login;
