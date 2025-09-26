import React, { useState } from 'react';
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
import Toast from 'react-native-toast-message';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createContract } from '../../service/apiService';
import Header from '../layout/Header';
import { Formik } from 'formik';
import CustomInput from '../../components/CustomInput';
import FormStyles from '../task/taskForms/taskForm';
import { styles } from '../authScreens/registerationForms/Categories';
import { styles as ProfileCardStyles } from '../../components/ProfileCard';
import { formatDate } from '../../utils/helper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Card } from '../../components/CustomComponents';
import Colors from '../../constants/color';
import { formatCurrency } from '../../utils/helper';
import metrics from '../../constants/metrics';
import { createContractSchema } from '../../schemas/createContractSchema';

const CreateContract = () => {
    const route = useRoute();
    const { bid } = (route.params as { bid?: any }) || {};
    const navigation = useNavigation<any>();
    const [showDatePicker, setShowDatePicker] = useState(false);

    const initialValues = {
        finalPrice: '',
        startDate: '',
        scope: ''
    };

    const handleSubmitForm = async (values: any) => {
        const payload = {
            finalPrice: Number(values.finalPrice),
            startDate: values.startDate,
            scope: values.scope,
            taskId: bid.taskId,
            bidId: bid.id,
            taskerId: bid.userId,
        };

        try {
            const response = await createContract(payload);
            Toast.show({
                text1: 'Success',
                text2: 'Contract created successfully',
            });
            navigation.goBack();
        } catch (error: any) {
            console.log('error', error?.response?.data?.message);
            Toast.show({
                text1: 'Error',
                text2: error?.response?.data?.message || 'Something went wrong',
            });
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <Header title={'Create Contract'} showBack={true} />

                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmitForm}
                        enableReinitialize
                        validationSchema={createContractSchema}
                    >
                        {({ values, errors, touched, handleSubmit, setFieldValue }) => {
                            const handleDateChange = (event: any, selectedDate?: Date) => {
                                setShowDatePicker(false);
                                if (selectedDate) {
                                    setFieldValue('startDate', formatDate(selectedDate));
                                }
                            };
                            return (
                                <ScrollView
                                    contentContainerStyle={[FormStyles.scrollContainer, { paddingBottom: metrics.paddingBottom(130) }]}
                                    keyboardShouldPersistTaps="handled"
                                    showsVerticalScrollIndicator={false}
                                >
                                    <View style={styles.container}>
                                        {/* <Text style={styles.title}>Create Contract</Text> */}
                                        <Card>
                                            <View style={ProfileCardStyles.userInfo}>
                                                <Text style={ProfileCardStyles.userName}>{bid.task.title || 'Task Title'}</Text>
                                                <Text style={{ color: Colors.WHITE, fontSize: metrics.fontSize(12) }}>Quoted Price : {formatCurrency(bid.offeredPrice)}</Text>
                                                <Text style={{ color: Colors.WHITE, fontSize: metrics.fontSize(12) }}> Expected Completion : {bid.offeredEstimatedTime}h</Text>
                                            </View>
                                        </Card>

                                        <CustomInput
                                            label={
                                                <Text>
                                                    Final Price<Text style={{ color: 'red' }}>*</Text>
                                                </Text>
                                            }
                                            placeholder="Enter Final Price"
                                            value={values.finalPrice}
                                            onChangeText={text => setFieldValue('finalPrice', text)}
                                            error={errors.finalPrice}
                                            touched={touched.finalPrice}
                                            keyboardType="numeric"
                                        />

                                        <CustomInput
                                            label={
                                                <Text>
                                                    Start Date<Text style={{ color: 'red' }}>*</Text>
                                                </Text>
                                            }
                                            placeholder="Select Start Date"
                                            value={values.startDate}
                                            onPress={() => setShowDatePicker(true)}
                                            editable={false}
                                            error={errors.startDate}
                                            touched={touched.startDate}
                                        />
                                        {showDatePicker && (
                                            <DateTimePicker
                                                value={values.startDate ? new Date(values.startDate) : new Date()}
                                                mode="date"
                                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                                onChange={handleDateChange}
                                                minimumDate={new Date()}
                                            />
                                        )}

                                        <CustomInput
                                            label={
                                                <Text>
                                                    Scope Summary<Text style={{ color: 'red' }}>*</Text>
                                                </Text>
                                            }
                                            placeholder="Enter Scope Summary"
                                            multiline={true}
                                            numberOfLines={4}
                                            value={values.scope}
                                            onChangeText={text => setFieldValue('scope', text)}
                                            error={errors.scope}
                                            touched={touched.scope}
                                        />

                                        <TouchableOpacity style={styles.button} onPress={handleSubmit as any}>
                                            <Text style={styles.buttonText}>
                                                Create Contract
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            );
                        }}
                    </Formik>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView >
    );
};

export default CreateContract;

