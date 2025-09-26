import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { useField } from 'formik';
import { StyleSheet, Text, View, Platform } from 'react-native';
import Colors from '../constants/color';
import metrics from '../constants/metrics';

type Option = {
  label: string;
  value: string | number;
};

type SelectInputProps = {
  name: string;
  label: string | React.ReactNode;
  height?: number;
  options: Option[];
};

const SelectInput = ({
  name,
  label,
  height,
  options,
}: SelectInputProps) => {
  //   const [field, meta, helpers] = useField<string | number>(name);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View
        style={[
          styles.pickerWrapper,
          //   field.value && field.value !== '' ? styles.selectedWrapper : null,
        ]}
      >
        <Picker
          //   selectedValue={field.value}
          //   onValueChange={val => helpers.setValue(val)}
          style={
            Platform.OS === 'android'
              ? {
                  ...styles.androidPicker,
                  height: height,
                  color: Colors.BLACK,
                  backgroundColor: Colors.WHITE,
                }
              : {
                  ...styles.iosPicker,
                  color: Colors.BLACK,
                  backgroundColor: Colors.WHITE,
                }
          }
          dropdownIconColor={Colors.MAIN_COLOR}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="Select..." value="" color="#999" />
          {options.map(opt => (
            <Picker.Item
              key={opt.value.toString()}
              label={opt.label}
              value={opt.value}
              //   /    color={field.value === opt.value ? Colors.MAIN_COLOR : '#333'}
            />
          ))}
        </Picker>
      </View>

      {/* {meta.touched && meta.error && (
        <Text style={styles.errorText}>{meta.error}</Text>
      )} */}
    </View>
  );
};

export default SelectInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: metrics.marginBottom(20),
  },
  label: {
    marginBottom: metrics.marginBottom(6),
    fontWeight: '600',
    color: '#2E2E2E',
  },
  pickerWrapper: {
    backgroundColor: Colors.MAIN_COLOR,
    borderRadius: metrics.borderRadius(14),
    borderWidth: 1,
    borderColor: Colors.MAIN_COLOR,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  selectedWrapper: {
    borderColor: Colors.MAIN_COLOR,

    backgroundColor: Colors.WHITE,
  },
  androidPicker: {
    color: Colors.BLACK,
    backgroundColor: Colors.WHITE,
    height: metrics.height(50),
    paddingHorizontal: metrics.paddingHorizontal(16),
    fontSize: metrics.fontSize(16),
    fontWeight: '500',
  },
  iosPicker: {
    height: metrics.height(50),
    color: '#333',
    fontSize: metrics.fontSize(16),
    fontWeight: '500',
  },
  pickerItem: {
    fontSize: metrics.fontSize(16),
    fontWeight: '500',
    color: Colors.GREY,
  },
  errorText: {
    marginTop: metrics.marginTop(4),
    fontSize: metrics.fontSize(12),
    color: '#E11D48',
  },
  selectedValueContainer: {
    position: 'absolute',
    right: metrics.marginRight(16),
    top: metrics.marginTop(12),

    // backgroundColor: Colors.,
    padding: metrics.padding(4),
    borderRadius: metrics.borderRadius(4),
  },
  selectedValueText: {
    fontSize: metrics.fontSize(12),
    fontWeight: '500',
    color: '#FFFFFF',
  },
});
