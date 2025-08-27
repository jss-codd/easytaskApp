import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Colors from '../../../constants/color';
import CustomTextInput from '../../../components/CustomTextInput';
import SelectInput from '../../../components/SelectInput';
import SelDropdown from '../../../components/SelectDropdown';
import MultiSelectDropdown from '../../../components/MultiSelectDropdown';
import { loginStyles } from '../style';

const PersonalDetails = ({
  values,
  handleChange,
  errors,
  touched,
  handleBlur,
  setFieldValue,
}: any) => {
  return (
    <View style={styles.card}>
      <Text style={loginStyles.title}>Personal Information</Text>
      {/* <Text style={styles.subtitle}>Fill in your basic details</Text> */}

      <CustomTextInput
        placeholder="Enter your name"
        value={values.name}
        onChangeText={handleChange('name')}
        onBlur={() => handleBlur('name')}
        touched={touched.name}
        error={errors.name}
        // label="Name"
      />

      <CustomTextInput
        placeholder="Enter your email"
        value={values.email}
        onChangeText={handleChange('email')}
        onBlur={() => handleBlur('email')}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        error={errors.email}
        touched={touched.email}
      />

      <CustomTextInput
        placeholder="Enter your phone"
        value={values.phone}
        onChangeText={handleChange('phone')}
        onBlur={() => handleBlur('phone')}
        keyboardType="phone-pad"
        autoCapitalize="none"
        autoCorrect={false}
        error={errors.phone}
        touched={touched.phone}
      />

      <CustomTextInput
        placeholder="Enter your password"
        secureTextEntry
        value={values.password}
        onChangeText={handleChange('password')}
        onBlur={() => handleBlur('password')}
        error={errors.password}
        touched={touched.password}
        autoCapitalize="none"
      />

      <CustomTextInput
        placeholder="Confirm your password"
        secureTextEntry
        value={values.confirmPassword}
        onChangeText={handleChange('confirmPassword')}
        onBlur={() => handleBlur('confirmPassword')}
        error={errors.confirmPassword}
        touched={touched.confirmPassword}
        autoCapitalize="none"
      />

    </View>
  );
};

export default PersonalDetails;

const styles = StyleSheet.create({
  card: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },

  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#444',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
    color: '#222',
  },
  inputError: {
    borderColor: '#dc3545',
    backgroundColor: '#fff5f5',
  },
  errorText: {
    color: '#dc3545',
    fontSize: 13,
    marginTop: 4,
  },
});
