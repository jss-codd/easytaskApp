import React, { useEffect, useState } from 'react';
import CustomInput from '../../../components/CustomInput';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import FormStyles from './taskForm';
import metrics from '../../../constants/metrics';
import SelectDropdown from '../../../components/SelectDropdown';
import { goNextStep, stateOptions } from '../../../utils/helper';
import Colors from '../../../constants/color';
import { stepFields } from '../../../utils/type';
import { useTranslation } from 'react-i18next';

const AddressDetails = ({
  values,
  handleChange,
  errors,
  touched,
  setFieldValue,
  step,
  setStep,
  validateForm,
  setFieldTouched,
}: any) => {
  const { t } = useTranslation();
  
  const [region, setRegion] = useState({
    latitude: 28.6139,
    longitude: 77.209,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  useEffect(() => {
    if (values.location.state && values.location.city) {
      const fullAddress = `${values.location.city}, ${values.location.state}`;
      Geocoder.from(fullAddress)
        .then(json => {
          const location = json.results[0].geometry.location;
          setRegion({
            ...region,
            latitude: location.lat,
            longitude: location.lng,
          });
        })
        .catch(err => console.warn('Geocoding error:', err));
    }
  }, [values.location.state, values.location.city]);

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={FormStyles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={FormStyles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={FormStyles.title}>{t('task.addressDetails')}</Text>
          {/* <CustomInput
            label="Phone"
            placeholder="Phone"
            keyboardType="phone-pad"
            value={values.location.phone}
            onChangeText={handleChange('location.phone')}
            error={touched.location?.phone && errors.location?.phone}
          /> */}
          <CustomInput
            label={
              <Text>
                {t('task.addressLine1')}<Text style={{ color: 'red' }}>*</Text>
              </Text>
            }
            placeholder={t('task.addressLine1')}
            value={values.location.addressLine1}
            onChangeText={handleChange('location.addressLine1')}
            error={
              touched.location?.addressLine1 && errors.location?.addressLine1
            }
          />
          <CustomInput
            label={
              <Text>
                {t('task.addressLine2')}
              </Text>
            }
            placeholder={t('task.addressLine2')}
            value={values.location.addressLine2}
            onChangeText={handleChange('location.addressLine2')}
            error={
              touched.location?.addressLine2 && errors.location?.addressLine2
            }
          />
          {/* <CustomInput
            label="Pincode"
            placeholder="Pincode"
            value={values.location.pincode}
            onChangeText={handleChange('location.pincode')}
            error={touched.location?.pincode && errors.location?.pincode}
            keyboardType="numeric"
          /> */}
          <CustomInput
            label={
              <Text>
                {t('task.street')}<Text style={{ color: 'red' }}>*</Text>
              </Text>
            }
            placeholder={t('task.street')}
            value={values.location.street}
            onChangeText={handleChange('location.street')}
            error={touched.location?.street && errors.location?.street}
          />
          <CustomInput
            label={
              <Text>
                {t('task.city')}<Text style={{ color: 'red' }}>*</Text>
              </Text>
            }
            placeholder={t('task.city')}
            value={values.location.city}
            onChangeText={handleChange('location.city')}
            error={touched.location?.city && errors.location?.city}
          />

          <Text style={styles.subtitle}>{t('task.selectState')}<Text style={{ color: 'red' }}>*</Text></Text>
          <SelectDropdown
            label={t('task.state')}
            placeholder={t('task.state')}
            value={values.location.state}
            onSelect={(selectedItem: any, index: number) => {
              setFieldValue('location.state', selectedItem.value);
            }}
            // onChangeText={handleChange('location.state')}
            // setFieldValue={setFieldValue}
            error={touched.location?.state && errors.location?.state}
            data={stateOptions}
          />

          {/* <View
                style={{
                  height: 200,
                  marginTop: 20,
                  borderRadius: metrics.borderRadius(15),
                  overflow: 'hidden',
                  borderWidth: 1,
                  borderColor: Colors.LIGHT_GREY,
                }}
              >
                <MapView
              style={{ flex: 1 }}
              region={region}
              onRegionChangeComplete={setRegion}
            >
              <Marker
                coordinate={{
                  latitude: region.latitude,
                  longitude: region.longitude,
                }}
              />
            </MapView>
              </View> */}
          <View style={FormStyles.row}>
            {step > 0 && (
              <TouchableOpacity
                style={FormStyles.button}
                onPress={() => setStep(step - 1)}
              >
                <Text style={FormStyles.buttonText}>{t('common.back')}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={FormStyles.button}
              onPress={() =>
                goNextStep(
                  step,
                  setStep,
                  stepFields,
                  validateForm,
                  setFieldTouched,
                )
              }
            >
              <Text style={FormStyles.buttonText}>{t('common.next')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: metrics.fontSize(14),
    fontWeight: '600',
    marginBottom: metrics.marginBottom(5),
    color: Colors.DARK_GREY,
  },
});

export default AddressDetails;

