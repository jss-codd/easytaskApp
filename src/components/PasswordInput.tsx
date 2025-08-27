import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from 'react-native';
// import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../constants/color';

interface PasswordInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  touched?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChangeText,
  error,
  touched,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const showError = touched && !!error;

  return (
    <View style={styles.inputContainer}>
      <View
        style={[styles.passwordContainer, showError ? styles.inputError : null]}
      >
        <TextInput
          style={[styles.passwordInput, showError ? styles.inputError : null]}
          placeholderTextColor={Colors.GREY}
          placeholder="Enter your password"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showPassword}
          {...props}
        />
        <TouchableOpacity
          style={styles.showPasswordButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          {/* {showPassword ? (
            <Icon name="eye" size={20} color={Colors.GREY} />
          ) : (
            <Icon name="eyeo" size={20} color={Colors.GREY} />
          )} */}
        </TouchableOpacity>
      </View>
      {showError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.LIGHT_GREY,
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000',
  },
  showPasswordButton: {
    padding: 8,
  },
  showPasswordText: {
    fontSize: 14,
  },
  inputError: {
    borderColor: Colors.RED_ERROR,
  },
  errorText: {
    marginTop: 6,
    color: Colors.RED_ERROR,
    fontSize: 13,
  },
});

export default PasswordInput;
