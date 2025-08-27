import React, { useState } from 'react';
import CustomInput from '../../../components/CustomInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import FormStyles from './taskForm';
import { formatDate } from '../../../utils/helper';
import FileInput from '../../../components/FileInput';

const BudgetDetails = ({
  values,
  handleChange,
  setFieldValue,
  errors,
  touched,
}: any) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    console.log('selectedDate', selectedDate);
    if (selectedDate) {
      setFieldValue('deadline', formatDate(selectedDate));
    }
  };
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
          <Text style={FormStyles.title}>Budget Details</Text>
          <CustomInput
            label="Estimate Budget"
            placeholder="Estimate Budget"
            value={values.estimateBudget}
            keyboardType="numeric"
            onChangeText={handleChange('estimateBudget')}
            error={touched.estimateBudget && errors.estimateBudget}
          />
          <CustomInput
            label="Deadline"
            placeholder="Deadline"
            value={values.deadline}
            onChangeText={handleChange('deadline')}
            onPress={() => setShowDatePicker(true)}
            disabled={true}
            // showChevron={true}
            error={touched.deadline && errors.deadline}
          />
          {showDatePicker && (
            <DateTimePicker
              value={values.deadline ? new Date(values.deadline) : new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              maximumDate={new Date()}
              onChange={handleDateChange}
            />
          )}
          <CustomInput
            label="Note"
            placeholder="Note"
            value={values.note}
            onChangeText={handleChange('note')}
            multiline
            numberOfLines={10}
            textInputContainerStyle={{ height: 100 }}
            // error={touched.note && errors.note}
          />
          <FileInput
            label="Task Image"
            placeholder="Task Image"
            value={values.image}
            onSelectFile={(file: any) => setFieldValue('image', file)}
          />
          {/* {errors.laSelfieUpload && touched.laSelfieUpload && (
          <Text style={FormStyles.error}>{errors.laSelfieUpload}</Text>
        )} */}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default BudgetDetails;
