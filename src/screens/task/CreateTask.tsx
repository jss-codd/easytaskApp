import React, { useCallback, useRef, useState } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native';
import { Formik, FormikProps } from 'formik';
import { validationSchema } from '../../schemas/createTaskSchema';
import TaskDetails from './taskForms/TaskDetails';
import AddressDetails from './taskForms/AddressDetails';
import BudgetDetails from './taskForms/BudgetDetails';
import Preview from './taskForms/Preview';
import { postTask, updateTask } from '../../service/apiService';
import { postTaskValues } from '../../utils/helper';
import { TaskPayload } from '../../utils/type';
import Header from '../layout/Header';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import CategorySelectionForm from './taskForms/CategorySelectionForm';

const StepperForm = () => {
  const [step, setStep] = useState(0);
  const navigation = useNavigation<any>();
  const formRef = useRef<FormikProps<any>>(null);
  const route = useRoute();
  const { bid } = (route.params as { bid?: any }) || {};
  const isEditMode = !!bid;

  const editInitialValues = isEditMode
    ? {
      title: bid.title || '',
      description: bid.description || '',
      estimateBudget: Number(bid.estimateBudget) || 0,
      selectedCategories: bid.selectedCategories || [],
      mainCategory: bid.mainCategory || '',
      location: bid.location || {},
      media: bid.media || null,
      deadline: bid.deadline ? bid.deadline.split('T')[0] : '',
      note: bid.note || '',
    }
    : postTaskValues;

  useFocusEffect(
    useCallback(() => {
      if (!bid && formRef.current) {
        formRef.current.resetForm();
        setStep(0);
      }
    }, [bid]),
  );

  const initialValues = bid ? editInitialValues : postTaskValues;

  const renderStep = (
    values: any,
    handleChange: any,
    errors: any,
    touched: any,
    setFieldValue: any,
    handleSubmit: any,
    validateForm: any,
    setFieldTouched: any,
  ) => {
    const navigationProps = {
      step,
      setStep,
      handleSubmit,
      validateForm,
      setFieldTouched,
    };

    switch (step) {
      case 0:
        return (
          <TaskDetails
            {...{ values, handleChange, errors, touched, setFieldValue }}
            {...navigationProps}
          />
        );
      case 1:
        return (
          <CategorySelectionForm
            {...{ values, handleChange, errors, touched, setFieldValue }}
            {...navigationProps}
          />
        );
      case 2:
        return (
          <AddressDetails
            {...{ values, handleChange, errors, touched, setFieldValue }}
            {...navigationProps}
          />
        );
      case 3:
        return (
          <BudgetDetails
            {...{ values, handleChange, setFieldValue, errors, touched }}
            {...navigationProps}
          />
        );
      case 4:
        return <Preview values={values} setStep={setStep} handleSubmit={handleSubmit} />;

      default:
        return null;
    }
  };

  const handleSubmitTask = async (
    values: TaskPayload,
    resetForm: () => void,
  ) => {
    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('estimateBudget', Number(values.estimateBudget));
    formData.append('categoryIds', [values.mainCategory, ...values.categories]);
    formData.append(
      'deadline',
      values.deadline instanceof Date
        ? values.deadline.toISOString().split('T')[0]
        : values.deadline,
    );
    formData.append('note', values.note);

    Object.entries(values.location).forEach(([key, val]) => {
      formData.append(`location[${key}]`, val);
    });

    if (Array.isArray(values.media) && values.media.length > 0) {
      values.media.forEach((file: any, index: number) => {
        formData.append('media', {
          uri: file.uri,
          type: file.type || 'application/octet-stream',
          name: file.name || `file_${index}`,
        } as any);
      });
    }

    try {
      const response = isEditMode
        ? await updateTask(bid.id, formData)
        : await postTask(formData);

      Toast.show({
        type: 'success',
        text1: `Task ${isEditMode ? 'updated' : 'created'} successfully!`,
      });
      navigation.navigate('AllJobs');
      resetForm();
      setStep(0);
    } catch (error: any) {
      console.error(
        'Error submitting task:',
        error.response?.data || error.message,
      );

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response?.data?.message || 'Something went wrong',
      });
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={styles.wrapper}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Formik
              innerRef={formRef}
              enableReinitialize={true}
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) =>
                handleSubmitTask(values, resetForm)
              }
            >
              {({
                values,
                handleChange,
                handleSubmit,
                errors,
                touched,
                setFieldValue,
                validateForm,
                setFieldTouched,
              }) => (
                <>
                  <Header title={isEditMode ? 'Edit Task' : 'Post Task'} showBack={true} />
                  {renderStep(
                    values,
                    handleChange,
                    errors,
                    touched,
                    setFieldValue,
                    handleSubmit,
                    validateForm,
                    setFieldTouched,
                  )}
                </>
              )}
            </Formik>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
});

export default StepperForm;
