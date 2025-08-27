

import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import Colors from '../constants/color';
import metrics from '../constants/metrics';

interface AppTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  touched?: boolean;
}

const CustomTextInput: React.FC<AppTextInputProps> = ({ label, error, touched, ...props }) => {
  const showError = touched && error;
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, showError && styles.inputError]}
        placeholderTextColor="#999"
        {...props}
      />
      {showError ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: metrics.marginBottom(5),
  },
  label: {
    fontSize: metrics.fontSize(16),
    fontWeight: '600',
    color: '#1a1a1a',
  
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: metrics.borderWidth(1),
    borderColor: '#e1e5e9',
    borderRadius: metrics.borderRadius(12),
    paddingHorizontal: metrics.paddingHorizontal(16),
    paddingVertical: metrics.paddingVertical(16),
    fontSize: metrics.fontSize(16),
    color: '#1a1a1a',
  },
  inputError: {
    borderColor: Colors.RED_ERROR,
  },
  errorText: {
    marginTop: metrics.marginTop(6),
    fontSize: metrics.fontSize(13),
    color: Colors.RED_ERROR,
  },
});

export default CustomTextInput;
