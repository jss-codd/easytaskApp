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
import { Toast } from '../../components/CommonToast';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const UpdateProfile = () => {
  const [isEditing, setIsEditing] = useState(true);
  
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state: any) => state.authReducer);

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  const initialValues = {
    name: profile?.name || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    aadharNumber: profile?.
    adharcard_number
     || '',
    permanent_address: {
      addressLine: profile?.permanent_address?.addressLine || '',
      pincode: profile?.permanent_address?.pincode || '',
      street: profile?.permanent_address?.street || '',
      state: profile?.permanent_address?.state || '',
      city: profile?.permanent_address?.city || '',
      latitude: 0,
      longitude: 0,
    },
  };
  
  const handleSubmitForm = async (values: any) => {
    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('aadharNumber', values.aadharNumber);
    Object.entries(values.permanent_address).forEach(([key, val]) => {
      formData.append(`permanent_address[${key}]`, val);
    });
    try {
      const response = await updateUserProfile(formData);
      if(response.status === 200){
      Toast.show({
        text1: 'Profile updated successfully',
        type: 'success',
      });
      navigation.navigate('Profile');
      }else{
        Toast.show({
          text1: response.data.message,
          type: 'error',
        });
      }
      setIsEditing(false);
    } catch (error: any) {
      Toast.show({
        text1: error.response.data.message,
        type: 'error',
      });
    }
  };

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
                <Text style={FormStyles.title}>{t('profile.updateDetails')}</Text>
                <CustomInput
                  label={t('profile.name')}
                  placeholder={t('profile.name')}
                  value={values.name}
                  onChangeText={text => setFieldValue('name', text)}
                  // error={errors.name}
                  // touched={touched.name}
                  keyboardType="default"
                />
                <CustomInput
                  label={t('profile.email')}
                  placeholder={t('profile.email')}
                  value={values.email}
                  onChangeText={text => setFieldValue('email', text)}
                  // error={errors.email}
                  // touched={touched.email}
                  keyboardType="email-address"
                />
                <CustomInput
                  label={t('profile.phone')}
                  placeholder={t('profile.phone')}
                  value={values.phone}
                  onChangeText={text => setFieldValue('phone', text)}
                  // error={errors.phone}
                  // touched={touched.phone}
                  keyboardType="phone-pad"
                />
                <CustomInput
                  label={t('profile.aadharNumber')}
                  placeholder={t('profile.aadharNumber')}
                  value={values.aadharNumber}
                  onChangeText={text => setFieldValue('aadharNumber', text)}
                  // error={errors.aadharNumber}
                  // touched={touched.aadharNumber}
                  keyboardType="numeric"
                />
                <CustomInput
                  label={t('profile.addressLine')}
                  placeholder={t('profile.addressLine')}
                  value={values.permanent_address.addressLine}
                  onChangeText={text =>
                    setFieldValue('permanent_address.addressLine', text)
                  }
                  // error={errors.city}
                  // touched={touched.city}
                  keyboardType="default"
                />
                <CustomInput
                    label={t('profile.street')}
                  placeholder={t('profile.street')}
                  value={values.permanent_address.street}
                  onChangeText={text =>
                    setFieldValue('permanent_address.street', text)
                  }
                  // error={errors.street}
                  // touched={touched.street}
                  keyboardType="default"
                />
                <CustomInput
                  label={t('profile.city')}
                  placeholder={t('profile.city')}
                  value={values.permanent_address.city}
                  onChangeText={text =>
                    setFieldValue('permanent_address.city', text)
                  }
                  // error={errors.city}
                  // touched={touched.city}
                  keyboardType="default"
                />
                <CustomInput
                  label={t('profile.state')}
                  placeholder={t('profile.state')}
                  value={values.permanent_address.state}
                  onChangeText={text =>
                    setFieldValue('permanent_address.state', text)
                  }
                  // error={e/rrors.state}
                  // touched={touched.state}
                  keyboardType="default"
                />
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
                    {t('profile.updateProfile')}
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
