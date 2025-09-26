import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import metrics from '../../../constants/metrics';
import Colors from '../../../constants/color';
import { Toast } from '../../../components/CommonToast';
import axios from 'axios';
import { resendVerification } from '../../../service/apiService';
import { useTranslation } from 'react-i18next';

interface Props {
  values: any;
  errors: any;
  touched: any;
  setFieldValue: (field: string, value: any) => void;
  handleSubmitForm: (values: any, resetForm: any) => void;
  resetForm: any;
}

const Verification = ({
  values,
  errors,
  touched,
  setFieldValue,
  handleSubmitForm,
  resetForm,
}: Props) => {
  const [resending, setResending] = useState(false);
  
  const { t } = useTranslation();
  const inputs = useRef<any[]>([]);

  const handleResendOtp = async () => {
    try {
      setResending(true);

      const response = await resendVerification(
        { email: values.email }
      );

      Toast.show({
        type: 'success',
        text1: response.message || 'OTP resent successfully',
      });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || 'Failed to resend OTP. Please try again.';

      Toast.show({
        type: 'error',
        text1: errorMessage,
      });
    } finally {
      setResending(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('auth.verifyYourAccount')}</Text>
      <Text style={styles.subtitle}>
        {t('auth.enterThe4DigitCodeSentToYourEmail')}
      </Text>
      <View style={styles.otpBoxContainer}>
        {Array.from({ length: 4 }).map((_, index) => (
          <TextInput
            key={index}
            style={[
              styles.otpBox,
              errors.otp && touched.otp && styles.inputError,
            ]}
            value={values.otp[index] || ''}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={text => {
              const otpArray = values.otp.split('');
              otpArray[index] = text;
              const updatedOtp = otpArray.join('');
              setFieldValue('otp', updatedOtp);

              if (text && index < 3) {
                inputs.current[index + 1].focus(); 
              }
            }}
            onKeyPress={({ nativeEvent }) => {
              if (
                nativeEvent.key === 'Backspace' &&
                !values.otp[index] && 
                index > 0
              ) {
                inputs.current[index - 1].focus(); 
              }
            }}
            ref={(ref: any) => (inputs.current[index] = ref)}
          />
        ))}

      </View>

      {errors.otp && touched.otp && (
        <Text style={styles.errorText}>{errors.otp}</Text>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.resendButton}
          onPress={handleResendOtp}
          disabled={resending}
        >
          {resending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>{t('auth.resendOtp')}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => handleSubmitForm(values, resetForm)}
        >
          <Text style={styles.buttonText}>{t('auth.submit')}</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 20,
  },
  otpBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  otpBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#dc3545',
  },
  errorText: {
    color: '#dc3545',
    fontSize: 14,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: metrics.marginTop(40),
    marginBottom: metrics.marginBottom(40),
    gap: metrics.gap(10),
  },

  submitButton: {
    flex: 1,
    backgroundColor: Colors.BUTTON_BACKGROUND,
    paddingVertical: metrics.paddingVertical(15),
    borderRadius: metrics.borderRadius(12),
    alignItems: 'center',
    justifyContent: 'center',
  },

  resendButton: {
    flex: 1,
    backgroundColor: Colors.GREY,
    paddingVertical: metrics.paddingVertical(15),
    borderRadius: metrics.borderRadius(12),
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: metrics.fontSize(14),
    fontWeight: '600',
    textAlign: 'center',
  },


});
