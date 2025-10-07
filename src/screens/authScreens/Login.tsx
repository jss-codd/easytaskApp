import React, { useCallback, useEffect, useRef} from 'react';
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
  Image,
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
import { useTranslation } from 'react-i18next';
import Logo from '../../assets/logo.png';

const Login = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const formRef = useRef<FormikProps<any>>(null);
  const { error, loading, isAuthenticated } = useSelector(
    (state: RootState) => state.authReducer,
  );

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
        text1: t('auth.loginSuccessful'),
        text2: 'Welcome back!',
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: t('auth.loginFailed'),
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
            <Image source={Logo} style={loginStyles.logo} />
            <Text style={loginStyles.title}>{t('auth.loginYourAccount')}</Text>
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
                    placeholder={t('auth.enterYourEmail')}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    error={errors.email as string}
                    touched={touched.email as boolean}
                  />
                  <CustomPasswordInput
                    placeholder={t('auth.enterYourPassword')}
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
                      {t('auth.forgotPassword')}
                    </Text>
                  </TouchableOpacity> 

                  <TouchableOpacity
                    style={
                      loading
                        ? loginStyles.loginButtonLoading
                        : 
                        loginStyles.loginButton
                    }
                    onPress={handleSubmit}
                  >
                    <Text style={loginStyles.loginButtonText}>
                      {loading ? t('auth.loggingIn') : t('auth.login')}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>

            <View style={loginStyles.footer}>
              <Text style={loginStyles.footerText}>
                {t('auth.notAMember')}
              </Text>
              <TouchableOpacity onPress={navigateToSignup}>
                <Text style={loginStyles.signupLink}>{t('auth.signUp')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Login;
