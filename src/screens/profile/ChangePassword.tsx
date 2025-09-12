import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FormStyles from '../task/taskForms/taskForm';
import CustomInput from '../../components/CustomInput';
import { changePassword } from '../../service/apiService';
import Toast from 'react-native-toast-message';
import Colors from '../../constants/color';
import CustomPasswordInput from '../../components/CustomPasswordInput';

const ChangePassword = () => {

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
  const handleSubmitForm = async (values: any) => {
    console.log(values);
    const payload = {
      currentPassword: values.oldPassword,
      newPassword: values.newPassword,
    };
    try {
      const response = await changePassword(payload);
      console.log(response);
      Toast.show({
        text1: 'Password changed successfully',
        type: 'success',
      });
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={FormStyles.container}
      // enabled={!isEditing}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={FormStyles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmitForm}
            enableReinitialize
            // contentContainerStyle={FormStyles.container}
          >
            {({ values, errors, touched, handleSubmit, setFieldValue }) => (
              <View>
                <Text style={FormStyles.title}>Change Password</Text>
                <CustomPasswordInput
                  label="Old Password"
                  placeholder="Enter Old Password"
                  value={values.oldPassword}
                  onChangeText={text => setFieldValue('oldPassword', text)}
                  // error={errors.oldPassword}
                  // touched={touched.oldPassword}
                />
                <CustomPasswordInput
                  label="New Password"
                  placeholder="Enter New Password"
                  value={values.newPassword}
                  onChangeText={text => setFieldValue('newPassword', text)}
                  // error={errors.newPassword}
                  // touched={touched.newPassword}
                />
                <CustomPasswordInput
                  label="Confirm Password"
                  placeholder="Enter Confirm Password"
                  value={values.confirmPassword}
                  onChangeText={text => setFieldValue('confirmPassword', text)}
                  // error={errors.confirmPassword}
                  // touched={touched.confirmPassword}
                />
                {/* <CustomInput
                  label="Old Password"
                  placeholder="Enter Old Password"
                  value={values.oldPassword}
                  onChangeText={text => setFieldValue('oldPassword', text)}
                  secureTextEntry={true}
                  // error={errors.name}
                  // touched={touched.name}
                  keyboardType="default"
                />
                <CustomInput
                  label="New Password"
                  placeholder="Enter New Password"
                  value={values.newPassword}
                  onChangeText={text => setFieldValue('newPassword', text)}
                  secureTextEntry={true}
                  // error={errors.email}
                  // touched={touched.email}
                  keyboardType="default"
                />
                <CustomInput
                  label="Confirm Password"
                  placeholder="Enter Confirm Password"
                  value={values.confirmPassword}
                  onChangeText={text => setFieldValue('confirmPassword', text)}
                  secureTextEntry={true}
                  // error={errors.phone}
                  // touched={touched.phone}
                  keyboardType="default"
                /> */}

                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.BUTTON_BACKGROUND,
                    padding: 10,
                    borderRadius: 5,
                    marginTop: 10,
                  }}
                  onPress={handleSubmit as any}
                >
                  <Text style={{ color: Colors.WHITE, textAlign: 'center' }}>
                    Change Password
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;
