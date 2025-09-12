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

const ChangeLocation = () => {
  const [isEditing, setIsEditing] = useState(true);
  const initialValues = {
    addressLine: '',
    street: '',
    city: '',
    state: '',
  };
  const handleSubmitForm = (values: any) => {
    console.log(values);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // style={FormStyles.container}
      // enabled={!isEditing}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={FormStyles.container}
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
                <Text style={FormStyles.title}>Change Location</Text>
                <CustomInput
                  label="Address Line"
                  placeholder="Enter Address Line"
                  value={values.addressLine}
                  onChangeText={text => setFieldValue('addressLine', text)}
                  // error={errors.name}
                  // touched={touched.name}
                  keyboardType="default"
                />
                <CustomInput
                  label="Street"
                  placeholder="Enter Street"
                  value={values.street}
                  onChangeText={text => setFieldValue('street', text)}
                  // error={errors.name}
                  // touched={touched.name}
                  keyboardType="default"
                />
                <CustomInput
                  label="City"
                  placeholder="Enter City"
                  value={values.city}
                  onChangeText={text => setFieldValue('city', text)}
                  // error={errors.email}
                  // touched={touched.email}
                  keyboardType="email-address"
                />
                <CustomInput
                  label="State"
                  placeholder="Enter State"
                  value={values.state}
                  onChangeText={text => setFieldValue('state', text)}
                  // error={errors.phone}
                  // touched={touched.phone}
                  keyboardType="phone-pad"
                />

                <TouchableOpacity
                  // style={FormStyles.button}
                  onPress={handleSubmit as any}
                >
                  <Text>
                    {isEditing ? 'Update Location' : 'Apply For Task'}
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

export default ChangeLocation;
