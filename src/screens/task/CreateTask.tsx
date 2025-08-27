import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
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
import UploadMedia from './taskForms/UploadMedia';
import Preview from './taskForms/Preview';
import { postTask } from '../../service/apiService';
import { goNextStep, postTaskValues } from '../../utils/helper';
import { stepFields, TaskPayload } from '../../utils/type';
import Header from '../layout/Header';
import metrics from '../../constants/metrics';
import Colors from '../../constants/color';
import { useFocusEffect } from '@react-navigation/native';

const StepperForm = () => {
  const [step, setStep] = useState(0);
  const formRef = useRef<FormikProps<any>>(null);

  useFocusEffect(
    useCallback(() => {
      if (formRef.current) {
        formRef.current.resetForm();
        setStep(0);
      }
    }, []),
  );

  const initialValues = postTaskValues;

  const renderStep = (
    values: any,
    handleChange: any,
    errors: any,
    touched: any,
    setFieldValue: any,
  ) => {
    switch (step) {
      case 0:
        return (
          <TaskDetails
            {...{ values, handleChange, errors, touched, setFieldValue }}
          />
        );
      case 1:
        return (
          <AddressDetails
            {...{ values, handleChange, errors, touched, setFieldValue }}
          />
        );
      case 2:
        return (
          <BudgetDetails
            {...{ values, handleChange, setFieldValue, errors, touched }}
          />
        );
      // http://13.55.253.18:3003
 
      case 3:
        return <Preview values={values} setStep={setStep} />;
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
    formData.append('categoryIds',  [values.mainCategory, ...values.categories]);
    formData.append(
      'deadline',
      values.deadline instanceof Date
        ? values.deadline.toISOString().split('T')[0]
        : String(values.deadline),
    );
    formData.append('note', values.note);

    Object.entries(values.location).forEach(([key, val]) => {
      formData.append(`location[${key}]`, val);
    });

    if (values.image) {
      formData.append('image', {
        uri: values.image,
        type: 'image/jpeg', // adjust based on picker
        name: 'task-image.jpg',
      } as any);
    }
    try {
      console.log('Submitting payload:', values);
      const response = await postTask(formData);
      console.log('API Response:', response);

      Alert.alert('Success', 'Task created successfully!');
      resetForm();
      setStep(0); // go back to first step
    } catch (error: any) {
      console.error(
        'Error submitting task:',
        error.response?.data || error.message,
      );
      Alert.alert('Error', 'Failed to create task. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Formik
          innerRef={formRef}
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
              <Header title="Post Task" showBack />
              <ScrollView contentContainerStyle={styles.container}>
                {renderStep(
                  values,
                  handleChange,
                  errors,
                  touched,
                  setFieldValue,
                )}
                <View
                  style={[
                    styles.row,
                    step === 0 && { justifyContent: 'flex-end' },
                  ]}
                >
                  {step > 0 && (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => setStep(step - 1)}
                    >
                      <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                  )}
                  {step < 3 ? (
                    <TouchableOpacity
                      style={[
                        styles.button,
                        step === 0 && { justifyContent: 'flex-end' },
                      ]}
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
                      <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleSubmit}
                    >
                      <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </ScrollView>
            </>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.BACKGROUND,
    gap: 20,
    paddingBottom: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: metrics.marginTop(10),
    // marginBottom: metrics.marginBottom(240),
    gap: metrics.gap(20),
  },
  button: {
    backgroundColor: Colors.MAIN_COLOR,
    padding: metrics.padding(10),
    borderRadius: metrics.borderRadius(5),
    flex: 1,
    alignItems: 'center',
    marginHorizontal: metrics.marginHorizontal(5),
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  progress: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default StepperForm;
