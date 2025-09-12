import React, { useEffect, useState } from 'react';
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
import Colors from '../../constants/color';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Formik } from 'formik';
import FormStyles from '../task/taskForms/taskForm';
import CustomInput from '../../components/CustomInput';
import { getProfile } from '../../store/slices/authSlice';
import { updateUserProfile } from '../../service/apiService';
import metrics from '../../constants/metrics';

const UpdateProfile = () => {
  const [isEditing, setIsEditing] = useState(true);

  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state: any) => state.authReducer);
  console.log('profile', profile);
  useEffect(() => {
    dispatch(getProfile());
  }, []);

  const initialValues = {
    name: profile?.name || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    aadharNumber: profile?.aadharNumber || '',
    permanent_address: {
      addressLine: profile?.permanent_address?.addressLine || '',
      pincode: profile?.permanent_address?.pincode || '',
      street: profile?.permanent_address?.street || '',
      state: profile?.permanent_address?.state || '',
      city: profile?.permanent_address?.city || '',
      // country: 'India',
      latitude: 0,
      longitude: 0,
    },
  };
  
  const handleSubmitForm = async (values: any) => {
    console.log(values);
    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('aadharNumber', values.aadharNumber);
    Object.entries(values.permanent_address).forEach(([key, val]) => {
      formData.append(`permanent_address[${key}]`, val);
    });
    console.log(formData);
    try {
      const response = await updateUserProfile(formData);
      console.log(response);
      setIsEditing(false);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  console.log(profile);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled={!isEditing}
      style={FormStyles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            ...FormStyles.scrollContainer,
            // padding: metrics.padding(20),
            // marginBottom: metrics.marginBottom(50),
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmitForm}
            enableReinitialize
          >
            {({ values, errors, touched, handleSubmit, setFieldValue }) => (
              <View>
                <Text style={FormStyles.title}>Edit Your Profile</Text>
                <CustomInput
                  label="Name"
                  placeholder="Enter Name"
                  value={values.name}
                  onChangeText={text => setFieldValue('name', text)}
                  // error={errors.name}
                  // touched={touched.name}
                  keyboardType="default"
                />
                <CustomInput
                  label="Email"
                  placeholder="Enter Email"
                  value={values.email}
                  onChangeText={text => setFieldValue('email', text)}
                  // error={errors.email}
                  // touched={touched.email}
                  keyboardType="email-address"
                />
                <CustomInput
                  label="Phone"
                  placeholder="Enter Phone"
                  value={values.phone}
                  onChangeText={text => setFieldValue('phone', text)}
                  // error={errors.phone}
                  // touched={touched.phone}
                  keyboardType="phone-pad"
                />
                <CustomInput
                  label="Aadhar Number"
                  placeholder="Enter Aadhar Number"
                  value={values.aadharNumber}
                  onChangeText={text => setFieldValue('aadharNumber', text)}
                  // error={errors.aadharNumber}
                  // touched={touched.aadharNumber}
                  keyboardType="numeric"
                />

                <CustomInput
                  label="Pincode"
                  placeholder="Enter Pincode"
                  value={values.permanent_address.pincode||''}
                  editable={false}
                  onChangeText={text =>
                    setFieldValue('permanent_address.pincode', text)
                  }
                  // error={errors.pincode}
                  // touched={touched.pincode}
                  keyboardType="numeric"
                />
                <CustomInput
                  label="Address Line"
                  placeholder="Enter Address Line"
                  value={values.permanent_address.addressLine}
                  onChangeText={text =>
                    setFieldValue('permanent_address.addressLine', text)
                  }
                  // error={errors.city}
                  // touched={touched.city}
                  keyboardType="default"
                />
                <CustomInput
                  label="Street"
                  placeholder="Enter Street"
                  value={values.permanent_address.street}
                  onChangeText={text =>
                    setFieldValue('permanent_address.street', text)
                  }
                  // error={errors.street}
                  // touched={touched.street}
                  keyboardType="default"
                />
                <CustomInput
                  label="City"
                  placeholder="Enter City"
                  value={values.permanent_address.city}
                  onChangeText={text =>
                    setFieldValue('permanent_address.city', text)
                  }
                  // error={errors.city}
                  // touched={touched.city}
                  keyboardType="default"
                />
                <CustomInput
                  label="State"
                  placeholder="Enter State"
                  value={values.permanent_address.state}
                  onChangeText={text =>
                    setFieldValue('permanent_address.state', text)
                  }
                  // error={e/rrors.state}
                  // touched={touched.state}
                  keyboardType="default"
                />
                {/* <CustomInput
                    label="Country"
                    placeholder="Enter Country"
                    value={values.country}
                    onChangeText={text => setFieldValue('country', text)}
                    error={errors.country}
                    touched={touched.country}
                  /> */}
                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.BUTTON_BACKGROUND,
                    paddingVertical: metrics.paddingVertical(10),
                    borderRadius: metrics.borderRadius(12),
                    marginTop: metrics.marginTop(20)  ,
                    marginBottom: metrics.marginBottom(200),
                  }}
                  onPress={handleSubmit as any}
                >
                  <Text style={{ color: Colors.WHITE, textAlign: 'center',fontSize:metrics.fontSize(14) }}>
                    Update Profile
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

export default UpdateProfile;
