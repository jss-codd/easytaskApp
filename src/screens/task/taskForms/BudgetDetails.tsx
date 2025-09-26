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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const [showDatePicker, setShowDatePicker] = useState(false);
    
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
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
          <Text style={FormStyles.title}>{t('task.budgetDetails')}</Text>
          <CustomInput
            label={
              <Text>
                {t('task.estimateBudget')}<Text style={{color: 'red'}}>*</Text>
              </Text>
            }
            placeholder={t('task.estimateBudget')}
            value={String(values.estimateBudget)}
            keyboardType="numeric"
            onChangeText={handleChange('estimateBudget')}
            error={touched.estimateBudget && errors.estimateBudget}
          />
          <CustomInput
            label={
              <Text>
                {t('task.deadline')}<Text style={{color: 'red'}}>*</Text>
              </Text>
            }
            placeholder={t('task.deadline')}
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
              minimumDate={new Date()}
              onChange={handleDateChange}
            />
          )}
          <CustomInput
            label={t('task.note')}
            placeholder={t('task.note')}
            value={values.note}
            onChangeText={handleChange('note')}
            multiline
            numberOfLines={10}
            textInputContainerStyle={{ height: 100 }}
          // error={touched.note && errors.note}
          />
         
          <FileInput
            label={t('task.taskFiles')}
            placeholder="images/docs"
            allowMultiSelection={true}
            value={values.media} 
            onSelectFile={(files: any[]) => setFieldValue('media', files)}
          />

          {errors.media&& touched.media && (
          <Text style={FormStyles.error}>{errors.media}</Text>
        )}
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

export default BudgetDetails;
