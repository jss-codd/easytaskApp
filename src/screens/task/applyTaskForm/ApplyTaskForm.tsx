import React from 'react';
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
import FormStyles from '../taskForms/taskForm';
import CustomInput from '../../../components/CustomInput';
import { styles } from '../../authScreens/registerationForms/Categories';
import { Formik } from 'formik';
import Header from '../../layout/Header';
import { applyForTask } from '../../../service/apiService';
import Toast from 'react-native-toast-message';
import { useRoute } from '@react-navigation/native';


const ApplyTaskForm = () => {
  const route = useRoute();
  const { task, ownerId } = route.params as { task: any; ownerId: string };
  console.log('task', task);
  console.log('ownerId', ownerId);
  const initialValues = {
    offeredPrice: '',
    offeredEstimatedTime: '',
    comment: '',
  
  };

  const handleSubmitForm = async (values: any) => {
    console.log('values', values);
    const payload = {
      offeredPrice: Number(values.offeredPrice),
      offeredEstimatedTime: Number(values.offeredEstimatedTime),
      comment: values.comment,
      taskId: task.id,
      clientId: ownerId,
    };
    console.log('payload', payload);
    try {
      const response = await applyForTask(payload);
      console.log('response', response);
  
        Toast.show({
          text1: 'Success',
          text2: 'Task applied successfully',
        });
    //   } else {
    //     Toast.show({
    //       text1: 'Error',
    //       text2: response.message || 'Something went wrong',
    //     });
    //   }
    } catch (error: any) {
      console.log('error', error);
      Toast.show({
        text1: 'Error',
        text2: error.response.data.message || 'Something went wrong',
      });
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
          <Header title="Apply Task" showBack={true} />
          <Formik initialValues={initialValues} onSubmit={handleSubmitForm}>
            {({
              values,
              errors,
              touched,
              handleSubmit,
              setFieldValue,
              setFieldTouched,
            }) => (
              <View style={styles.container}>
                <Text style={styles.title}>Apply Task</Text>
                <CustomInput
                  label="Offered Price"                 
                  placeholder="Enter Offered Price"
                  value={values.offeredPrice}
                  onChangeText={(text) => setFieldValue('offeredPrice', text)}
                  error={errors.offeredPrice}
                  touched={touched.offeredPrice}
                  keyboardType="numeric"
                />
                <CustomInput
                  label="Offered Estimated Time"
                  placeholder="Enter Offered Estimated Time"
                  value={values.offeredEstimatedTime}
                  onChangeText={(text) => setFieldValue('offeredEstimatedTime', text)}
                  error={errors.offeredEstimatedTime}
                  touched={touched.offeredEstimatedTime}
                  keyboardType="numeric"
                />
                <CustomInput
                  label="Comment"                  
                  placeholder="Enter Comment"
                  multiline={true}
                  numberOfLines={4}
                 
                  value={values.comment}
                  onChangeText={(text) => setFieldValue('comment', text)}
                  error={errors.comment}
                  touched={touched.comment}
                />

                <TouchableOpacity
                  style={styles.button}
                  onPress={handleSubmit as any}
                >
                  <Text style={styles.buttonText}>
                    Apply For Task
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

export default ApplyTaskForm;
