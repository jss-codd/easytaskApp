import React, { useEffect, useState } from 'react';
import CustomInput from '../../../components/CustomInput';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import FormStyles from './taskForm';
import metrics from '../../../constants/metrics';
import SelectDropdown from '../../../components/SelectDropdown';
import { stateOptions } from '../../../utils/helper';
import Colors from '../../../constants/color';

const AddressDetails = ({
  values,
  handleChange,
  errors,
  touched,
  setFieldValue,
}: any) => {
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
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={FormStyles.title}>Address Details</Text>
          <CustomInput
            label="Phone"
            placeholder="Phone"
            keyboardType="phone-pad"
            value={values.location.phone}
            onChangeText={handleChange('location.phone')}
            error={touched.location?.phone && errors.location?.phone}
          />
          <CustomInput
            label="Address Line 1"
            placeholder="Address Line 1"
            value={values.location.addressLine1}
            onChangeText={handleChange('location.addressLine1')}
            error={
              touched.location?.addressLine1 && errors.location?.addressLine1
            }
          />
          <CustomInput
            label="Address Line 2"
            placeholder="Address Line 2"
            value={values.location.addressLine2}
            onChangeText={handleChange('location.addressLine2')}
            error={
              touched.location?.addressLine2 && errors.location?.addressLine2
            }
          />
          <CustomInput
            label="Pincode"
            placeholder="Pincode"
            value={values.location.pincode}
            onChangeText={handleChange('location.pincode')}
            error={touched.location?.pincode && errors.location?.pincode}
            keyboardType="numeric"
          />
          <CustomInput
            label="Street"
            placeholder="Street"
            value={values.location.street}
            onChangeText={handleChange('location.street')}
            error={touched.location?.street && errors.location?.street}
          />
          <CustomInput
            label="City"
            placeholder="City"
            value={values.location.city}
            onChangeText={handleChange('location.city')}
            error={touched.location?.city && errors.location?.city}
          />
          {/* <CustomInput
            label="State"
            placeholder="State"
            value={values.location.state}
            onChangeText={handleChange('location.state')}
            error={touched.location?.state && errors.location?.state}
            // type="select"
          /> */}
          <Text style={styles.subtitle}>Select State</Text>
          <SelectDropdown
            label="State"
            placeholder="State"
            value={values.location.state}
            onSelect={(selectedItem: any, index: number) => {
              setFieldValue('location.state', selectedItem.value);
            }}
            // onChangeText={handleChange('location.state')}
            // setFieldValue={setFieldValue}
            error={touched.location?.state && errors.location?.state}
            data={stateOptions}
          />
          {/* <CustomInput
            label="Country"
            placeholder="Country"
            value={values.location.country}
            onChangeText={handleChange('location.country')}
            error={touched.location?.country && errors.location?.country}
          /> */}

          <View
            style={{
              height: 200,
              marginTop: 20,
              borderRadius: metrics.borderRadius(15),
              overflow: 'hidden',
              borderWidth: 1,
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
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    height: 'auto',
    // backgroundColor: Colors.LIGHT_BACKGROUND,
    borderRadius: metrics.borderRadius(10),
    paddingBottom: metrics.paddingBottom(50),
  },
  container: {
    flex: 1,
    // padding: metrics.padding(16),
    // backgroundColor: Colors.LIGHT_BACKGROUND,
    borderRadius: metrics.borderRadius(15),
  },
  subtitle: {
    fontSize: metrics.fontSize(14),
    fontWeight: '600',
    marginBottom: metrics.marginBottom(5),
    color: Colors.DARK_GREY,
  },
});

export default AddressDetails;

// import React from 'react';
// import CustomInput from '../../../components/CustomInput';
// import {
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Text,
//   TouchableWithoutFeedback,
// } from 'react-native';
// import FormStyles from './taskForm';

// const AddressDetails = ({ values, handleChange, errors, touched }: any) => {
//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={FormStyles.container}
//     >
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <ScrollView
//           contentContainerStyle={FormStyles.scrollContainer}
//           keyboardShouldPersistTaps="handled"
//           showsVerticalScrollIndicator={false}
//         >
//           <Text style={FormStyles.title}>Address Details</Text>
//           <CustomInput
//             placeholder="Address Line 1"
//             value={values.location.addressLine1}
//             onChangeText={handleChange('location.addressLine1')}
//             error={
//               touched.location?.addressLine1 && errors.location?.addressLine1
//             }
//           />
//           <CustomInput
//             placeholder="Address Line 2"
//             value={values.location.addressLine2}
//             onChangeText={handleChange('location.addressLine2')}
//             error={
//               touched.location?.addressLine2 && errors.location?.addressLine2
//             }
//           />
//           <CustomInput
//             placeholder="Home"
//             value={values.location.home}
//             onChangeText={handleChange('location.home')}
//             error={touched.location?.home && errors.location?.home}
//           />
//           <CustomInput
//             placeholder="Street"
//             value={values.location.street}
//             onChangeText={handleChange('location.street')}
//             error={touched.location?.street && errors.location?.street}
//           />
//           <CustomInput
//             placeholder="State"
//             value={values.location.state}
//             onChangeText={handleChange('location.state')}
//             error={touched.location?.state && errors.location?.state}
//           />
//           <CustomInput
//             placeholder="City"
//             value={values.location.city}
//             onChangeText={handleChange('location.city')}
//             error={touched.location?.city && errors.location?.city}
//           />
//           <CustomInput
//             placeholder="Country"
//             value={values.location.country}
//             onChangeText={handleChange('location.country')}
//             error={touched.location?.country && errors.location?.country}
//           />
//           <CustomInput
//             placeholder="Phone"
//             keyboardType="phone-pad"
//             value={values.location.phone}
//             onChangeText={handleChange('location.phone')}
//             error={touched.location?.phone && errors.location?.phone}
//           />
//         </ScrollView>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// };

// export default AddressDetails;
