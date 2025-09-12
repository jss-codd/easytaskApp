import React, { useState } from 'react';
import CustomInput from '../../../components/CustomInput';
import DateTimePicker from '@react-native-community/datetimepicker';
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
import FormStyles from './taskForm';
import { formatDate, goNextStep } from '../../../utils/helper';
import FileInput from '../../../components/FileInput';
import { stepFields } from '../../../utils/type';
import Colors from '../../../constants/color';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const BudgetDetails = ({
  values,
  handleChange,
  setFieldValue,
  errors,
  touched,
  step,
  setStep,
  validateForm,
  setFieldTouched,
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
            label={
              <Text>
                Estimate Budget<Text style={{color: 'red'}}>*</Text>
              </Text>
            }
            placeholder="Estimate Budget"
            value={String(values.estimateBudget)}
            keyboardType="numeric"
            onChangeText={handleChange('estimateBudget')}
            error={touched.estimateBudget && errors.estimateBudget}
          />
          <CustomInput
            label={
              <Text>
                Deadline<Text style={{color: 'red'}}>*</Text>
              </Text>
            }
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
          {/* <FileInput
            label="Task Image"
            placeholder="Task Image"
            value={values.media}
            onSelectFile={(file: any) => setFieldValue('media', file)}
          /> */}
          <FileInput
            label="Task Files"
            placeholder="images/docs"
            allowMultiSelection={true}
            value={values.media} 
            onSelectFile={(files: any[]) => setFieldValue('media', files)}
          />

          {/* {errors.laSelfieUpload && touched.laSelfieUpload && (
          <Text style={FormStyles.error}>{errors.laSelfieUpload}</Text>
        )} */}
          <View style={FormStyles.row}>
            {step > 0 && (
              <TouchableOpacity
                style={FormStyles.button}
                onPress={() => setStep(step - 1)}
              >
                <Text style={FormStyles.buttonText}>Back</Text>
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
              <Text style={FormStyles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  );
};

export default BudgetDetails;
