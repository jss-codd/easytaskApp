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
import {
  applyForTask,
  updateTaskApplication,
} from '../../../service/apiService';
import Toast from 'react-native-toast-message';
import { useNavigation, useRoute } from '@react-navigation/native';

const ApplyTaskForm = () => {
  const route = useRoute();
  const { bid } = route.params as {
    bid?: any;
  };
  const { task } = route.params as {
    task?: any;
  };
  const isEditing = !!bid;
  const navigation = useNavigation<any>();
  const initialValues = {
    offeredPrice: bid ? String(bid.offeredPrice) : '',
    offeredEstimatedTime: bid ? String(bid.offeredEstimatedTime) : '',
    comment: bid ? bid.comment : '',
  };

  const handleSubmitForm = async (values: any) => {
    const payload = {
      offeredPrice: Number(values.offeredPrice),
      offeredEstimatedTime: Number(values.offeredEstimatedTime),
      comment: values.comment,
      taskId: isEditing ? bid.task.id : task.id,
      clientId: isEditing ? bid.task.ownerId : task.ownerId,
    };
  
    try {
      if (isEditing) {
        const response = await updateTaskApplication(payload, bid.id);
        Toast.show({
          text1: 'Success',
          text2: 'Application updated successfully',
        });
        navigation.goBack();
      } else {
        const response = await applyForTask(payload);
        Toast.show({
          text1: 'Success',
          text2: 'Task applied successfully',
        });
        navigation.goBack();
      }
    } catch (error: any) {
      Toast.show({
        text1: 'Error',
        text2: error?.response?.data?.message || 'Something went wrong',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={FormStyles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Header
            title={isEditing ? 'Edit Application' : 'Apply Task'}
            showBack={true}
          />
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmitForm}
            enableReinitialize
            contentContainerStyle={FormStyles.container}
          >
            {({ values, errors, touched, handleSubmit, setFieldValue }) => (
              <View style={styles.container}>
                <Text style={styles.title}>
                  {isEditing ? 'Edit Your Application' : 'Apply Task'}
                </Text>
                <CustomInput
                  label={
                    <Text>
                      Offered Price<Text style={{ color: 'red' }}>*</Text>
                    </Text>
                  }

                  placeholder="Enter Offered Price"
                  value={values.offeredPrice}
                  onChangeText={text => setFieldValue('offeredPrice', text)}
                  error={errors.offeredPrice}
                  touched={touched.offeredPrice}
                  keyboardType="numeric"
                />
                <CustomInput
                  label={
                    <Text>
                      Offered Estimated Time<Text style={{ color: 'red' }}>*</Text>
                    </Text>
                  }

                  placeholder="Enter Offered Estimated Time"
                  value={values.offeredEstimatedTime}
                  onChangeText={text =>
                    setFieldValue('offeredEstimatedTime', text)
                  }
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
                  onChangeText={text => setFieldValue('comment', text)}
                // error={errors.comment}
                // touched={touched.comment}
                />

                <TouchableOpacity
                  style={styles.button}
                  onPress={handleSubmit as any}
                >
                  <Text style={styles.buttonText}>
                    {isEditing ? 'Update Application' : 'Apply For Task'}
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
