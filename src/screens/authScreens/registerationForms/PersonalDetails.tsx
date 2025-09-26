import React from 'react';
import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import CustomTextInput from '../../../components/CustomTextInput';
import { loginStyles } from '../style';
import CustomPasswordInput from '../../../components/CustomPasswordInput';
import metrics from '../../../constants/metrics';
import Colors from '../../../constants/color';
import { useTranslation } from 'react-i18next';

const PersonalDetails = ({
  values,
  handleChange,
  errors,
  touched,
  handleBlur,
  step,
  goNext,
  goBack,
  loading,
}: any) => {
  const { t } = useTranslation();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
              <Text style={loginStyles.title}>{t('auth.personalInformation')}</Text>
              <CustomTextInput
              placeholder={t('auth.enterYourName')}
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={() => handleBlur('name')}
              error={errors.name}
              touched={touched.name}
            />
            <CustomTextInput
              placeholder={t('auth.enterYourEmail')}
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={() => handleBlur('email')}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              error={errors.email}
              touched={touched.email}
            />
            <CustomTextInput
              placeholder={t('auth.enterYourPhoneNumber')}
              value={values.phone}
              onChangeText={handleChange('phone')}
              onBlur={() => handleBlur('phone')}
              keyboardType="phone-pad"
              autoCapitalize="none"
              autoCorrect={false}
              error={errors.phone}
              touched={touched.phone}
            />
            <CustomPasswordInput
              placeholder={t('auth.enterYourPassword')}
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={() => handleBlur('password')}
              error={errors.password}
              touched={touched.password}
            />
            <CustomPasswordInput
              placeholder={t('auth.confirmPassword')}
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={() => handleBlur('confirmPassword')}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />
            <View style={styles.buttonContainer}>
              {step > 0 && (
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={goBack}
                >
                  <Text style={styles.buttonText}>{t('common.back')}</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.nextButton}
                onPress={goNext}
              >
                <Text style={styles.buttonText}>
                  {loading ? t('auth.verifying') : t('auth.signedUpAndVerify')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default PersonalDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.BACKGROUND,
    borderRadius: metrics.borderRadius(15),
  },
  scrollContainer: {
    flexGrow: 1,
    borderRadius: metrics.borderRadius(10),
  },
  card: {
    padding: 16,
    justifyContent: 'center',
    flex: 1,
  },

  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#444',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
    color: '#222',
  },
  inputError: {
    borderColor: '#dc3545',
    backgroundColor: '#fff5f5',
  },
  errorText: {
    color: '#dc3545',
    fontSize: 13,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: metrics.marginTop(20),
    marginBottom: metrics.marginBottom(40),
    gap: metrics.gap(10),
  },
  backButton: {
    flex: 1,
    backgroundColor: Colors.GREY,

    paddingVertical: metrics.paddingVertical(15),
    borderRadius: metrics.borderRadius(12),
    alignItems: 'center',
  },
  nextButton: {
    flex: 1,
    backgroundColor: Colors.BUTTON_BACKGROUND,
    padding: metrics.padding(10),
    paddingHorizontal: metrics.paddingHorizontal(15),
    borderRadius: metrics.borderRadius(12),
    alignItems: 'center',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#28a745',
    padding: metrics.padding(5),
    borderRadius: metrics.borderRadius(12),
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: metrics.fontSize(14),
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: metrics.paddingHorizontal(15),
  },
});
