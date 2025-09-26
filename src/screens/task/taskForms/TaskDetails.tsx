import {
  Text,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import CustomInput from '../../../components/CustomInput';
import FormStyles from './taskForm';
import { goNextStep } from '../../../utils/helper';
import { stepFields } from '../../../utils/type';
import { useTranslation } from 'react-i18next';

const TaskDetails = ({
  values,
  handleChange,
  errors,
  touched,
  step,
  setStep,
  validateForm,
  setFieldTouched,
}: any) => {
  const { t } = useTranslation();
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
          <Text style={FormStyles.title}>{t('task.taskDetails')}</Text>
          <CustomInput
            label={
              <Text>
                {t('task.title')}<Text style={{ color: 'red' }}>*</Text>
              </Text>
            }
            placeholder={t('task.title')}
            value={values.title}
            onChangeText={handleChange('title')}
            error={touched.title && errors.title}
          />

          <CustomInput
            multiline
            label={
              <Text>
                {t('task.description')}<Text style={{ color: 'red' }}>*</Text>
              </Text>
            }
            numberOfLines={4}
            height={100}
            placeholder={t('task.description')}
            value={values.description.replace(/<[^>]+>/g, '')}
            onChangeText={handleChange('description')}
            error={touched.description && errors.description}
          />
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

export default TaskDetails;
