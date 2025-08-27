import React, { useRef } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface Props {
  values: any;
  errors: any;
  touched: any;
  setFieldValue: (field: string, value: any) => void;
}

const Verification: React.FC<Props> = ({
  values,
  errors,
  touched,
  setFieldValue,
}) => {
  const inputs = useRef<any[]>([]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Account</Text>
      <Text style={styles.subtitle}>
        Enter the 4-digit code sent to your email
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
              console.log('Updated OTP:', updatedOtp);
            
              if (text && index < 3) {
                inputs.current[index + 1].focus();
              }
            }}
            ref={(ref: any) => (inputs.current[index] = ref)}
          />
        ))}
      </View>

      {errors.otp && touched.otp && (
        <Text style={styles.errorText}>{errors.otp}</Text>
      )}
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
});
