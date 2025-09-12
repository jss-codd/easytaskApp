import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Toast } from '../../components/CommonToast';
import { BaseUrl } from '../../service/axiosInterceptor';
import axios from 'axios';
import { Screen } from '../../utils/type';
import Colors from '../../constants/color';
import EyeIcon from '../../Icons/EyeIcon';
import metrics from '../../constants/metrics';
import { loginStyles } from './style';
import CustomPasswordInput from '../../components/CustomPasswordInput';

const { width } = Dimensions.get('window');

const SetPassword = () => {
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const route = useRoute();
  const { token } = route.params as { token: string };
  console.log('token from set password', token);
  const handleSetPassword = async () => {
    let isValid = true;

    setNewPasswordError('');
    setConfirmPasswordError('');

    if (!newPassword.trim()) {
      setNewPasswordError('New password is required');
      isValid = false;
    } else if (newPassword.length < 8) {
      setNewPasswordError(
        'Password must be at least 8 characters',
      );
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Confirm password is required');
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }

    if (!token) {
      Toast.show({
        type: 'error',
        text1: 'Missing Token',
        text2: 'Password reset token is missing.',
      });
      return;
    }

    if (isValid) {
      try {
        const response = await axios.post(
          `${BaseUrl}/auth/reset-password`,
          {
            newPassword: newPassword,
            token: token,
            // confirmPassword: confirmPassword,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        Toast.show({
          type: 'success',
          text1: 'Password Updated',
          text2: 'You can now log in with your new password.',
        });

        navigation.navigate(Screen.Login as never);
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: 'Reset Failed',
          text2: error?.response?.data?.message || 'Something went wrong.',
        });
      }
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.formContainer}>
            {/* <Text style={styles.title}>{projectTitle}</Text> */}
            {/* <Text style={styles.title}>Set New Password</Text> */}
            <Text style={styles.subtitle}>
              Create a strong password for your account
            </Text>
            {/* 
            <View style={styles.inputContainer}>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.passwordInput,
                    newPasswordError ? styles.inputError : null,
                  ]}
                  placeholderTextColor={Colors.GREY}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChangeText={text => {
                    setNewPassword(text);
                    setNewPasswordError('');
                  }}
                  secureTextEntry={!showNewPassword}
                />
                <TouchableOpacity
                  style={styles.showPasswordButton}
                  onPress={() => setShowNewPassword(!showNewPassword)}>
                  <Text style={styles.showPasswordText}>
                    {showNewPassword ? (
                      <EyeIcon.EyeIcon color={Colors.GREY} />
                    ) : (
                      <EyeIcon.OpenEyeIcon color={Colors.GREY} />
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
              {newPasswordError && (
                <Text style={styles.errorText}>{newPasswordError}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.passwordInput,
                    confirmPasswordError ? styles.inputError : null,
                  ]}
                  placeholderTextColor={Colors.GREY}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChangeText={text => {
                    setConfirmPassword(text);
                    setConfirmPasswordError('');
                  }}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  style={styles.showPasswordButton}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Text style={styles.showPasswordText}>
                    {showConfirmPassword ? (
                      <EyeIcon.EyeIcon color={Colors.GREY} />
                    ) : (
                      <EyeIcon.OpenEyeIcon color={Colors.GREY} />
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
              {confirmPasswordError && (
                <Text style={styles.errorText}>{confirmPasswordError}</Text>
              )}
            </View> */}
            <CustomPasswordInput
              placeholder="Enter new password"
              value={newPassword}
              onChangeText={setNewPassword}
              error={newPasswordError}
              touched={newPasswordError ? true : false}
            />
            <CustomPasswordInput
              placeholder="Confirm new password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              error={confirmPasswordError}
              touched={confirmPasswordError ? true : false}
            />


            <TouchableOpacity
              style={loginStyles.loginButton}
              onPress={handleSetPassword}>
              <Text style={loginStyles.loginButtonText}>Set Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backToLogin}
              onPress={() => navigation.goBack()}>
              <Text style={loginStyles.link}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: metrics.margin(32),
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: metrics.margin(20),
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.MAIN_COLOR,
    borderRadius: metrics.borderRadius(8),
    backgroundColor: Colors.WHITE,
  },
  passwordInput: {
    flex: 1,
    height: Math.max(48, metrics.height(48)),
    paddingHorizontal: metrics.padding(16),
    fontSize: Math.min(width * 0.04, metrics.fontSize(16)),
    // backgroundColor: Colors.WHITE,
    color: Colors.BLACK,
    borderRadius: metrics.borderRadius(8),
  },
  showPasswordButton: {
    paddingHorizontal: metrics.padding(16),
    paddingVertical: metrics.padding(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  showPasswordText: {
    fontSize: Math.min(width * 0.05, metrics.fontSize(20)),
  },
  inputError: {
    borderColor: Colors.RED_ERROR,
  },
  errorText: {
    color: Colors.RED_ERROR,
    fontSize: Math.min(width * 0.03, metrics.fontSize(12)),
    marginTop: metrics.margin(4),
  },
  setPasswordButton: {
    backgroundColor: Colors.MAIN_COLOR,
    height: Math.max(48, metrics.height(48)),
    borderRadius: metrics.borderRadius(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: metrics.margin(24),
  },
  setPasswordButtonText: {
    color: Colors.WHITE,
    fontSize: Math.min(width * 0.04, metrics.fontSize(16)),
    fontWeight: '600',
  },
  backToLogin: {
    marginTop: metrics.marginTop(20),
    alignSelf: 'center',
  },
  backToLoginText: {
    color: Colors.MAIN_COLOR,
    fontSize: Math.min(width * 0.035, metrics.fontSize(14)),
  },
});

export default SetPassword;
