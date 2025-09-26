import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
  Keyboard,
  Dimensions,
} from 'react-native';
import { validateEmail } from '../../utils/helper';
import Toast from 'react-native-toast-message';
import metrics from '../../constants/metrics';
import Colors from '../../constants/color';
import { AxiosErrorMessage } from '../../utils/type';
import { postForgotPassword } from '../../service/apiService';
import CustomTextInput from '../../components/CustomTextInput';
import { loginStyles } from './style';
import { useTranslation } from 'react-i18next';
const { width } = Dimensions.get('window');
const ForgotPassword = () => {
  const { t } = useTranslation();
  
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState('');
  const [loader, setLoader] = useState(false);
  const [res, setRes] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleForgot = () => {
    handleForgotPassword({ email, source: 'mobile' });
  };

  const handleForgotPassword = async (values: any) => {
    let isValid = true;

    setEmailError('');
    setLoader(true);
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }
    try {
      if (isValid) {
        const res = await postForgotPassword(values);
  
        setRes(true);
        Toast.show({
          type: 'success',
          text1: t('auth.resetLinkSent'),
          text2: 'Please check your email for the reset link.',
        });
      }
    } catch (error) {
      setErrors((error as AxiosErrorMessage).response?.data?.message as string);
      Toast.show({
        type: 'error',
        text1: t('auth.errorSendingResetLink'),
        text2: (error as AxiosErrorMessage).response?.data?.message as string,
      });
    } finally {
      setLoader(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator>
          <View style={styles.container}>
            <View style={styles.formContainer}>
              {/* <Text style={styles.title}>{projectTitle}</Text> */}
              {/* <Text style={styles.title}>Forgot Password</Text> */}
              <Text style={styles.subtitle}>
                {t('auth.enterYourEmailToReceiveResetLink')}
              </Text>
              {/* {error && <Text style={styles.error}>{error}</Text>} */}
              {/* <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, emailError ? styles.inputError : null]}
                  placeholder="Email"
                  placeholderTextColor={Colors.GREY}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
                {emailError ? (
                  <Text style={styles.error}>{emailError}</Text>
                ) : null}
              </View> */}
              <CustomTextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                error={emailError}
                touched={emailError ? true : false}
              />
              <TouchableOpacity style={loginStyles.loginButton} onPress={handleForgot}>
                <Text style={loginStyles.loginButtonText}>{loader ? t('auth.sending') : t('auth.sendResetLink')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: metrics.padding(16),
    paddingBottom: metrics.paddingBottom(80),
    backgroundColor: Colors.BACKGROUND,
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: Math.min(width * 0.9, metrics.width(450)),
    paddingHorizontal: metrics.padding(20),
    paddingVertical: metrics.padding(40),
    justifyContent: 'center',
  },
  title: {
    fontSize: Math.min(width * 0.08, metrics.fontSize(32)),
    fontWeight: 'bold',
    color: Colors.MAIN_COLOR,
    marginBottom: metrics.margin(8),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Math.min(width * 0.04, metrics.fontSize(16)),
    color: '#666',
    marginBottom: metrics.margin(16),
    textAlign: 'center',
  },
  input: {
    height: Math.max(48, metrics.height(48)),
    borderWidth: 1,
    borderColor: Colors.BUTTON_BACKGROUND,
    borderRadius: 8,
    paddingHorizontal: metrics.padding(16),
    fontSize: Math.min(width * 0.04, metrics.fontSize(16)),
    backgroundColor: Colors.WHITE,
    color: Colors.BLACK,
  },
  inputError: {
    borderColor: Colors.RED_ERROR,
  },
  error: {
    color: 'red',
    marginBottom: metrics.margin(8),
    fontSize: metrics.fontSize(13),
  },
  button: {
    width: '100%',
    paddingVertical: metrics.paddingVertical(14),
    borderRadius: metrics.borderRadius(8),
    alignItems: 'center',
    marginTop: metrics.marginTop(15),
    backgroundColor: Colors.MAIN_COLOR,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: metrics.fontSize(16),
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: metrics.paddingHorizontal(15),
  },
  inputContainer: {
    marginBottom: metrics.margin(20),
  },
});

export default ForgotPassword;
