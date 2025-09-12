import React from 'react';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { StyleSheet } from 'react-native';
import Colors from '../constants/color';
import metrics from '../constants/metrics';

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={[styles.base, styles.success]}
      contentContainerStyle={styles.content}
      text1Style={styles.text1}
      text2Style={styles.text2}
      position="bottom"
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={[styles.base, styles.error]}
      contentContainerStyle={styles.content}
      text1Style={styles.text1}
      text2Style={styles.text2}
      position="bottom"
    />
  ),
};

const styles = StyleSheet.create({
  base: {
    borderLeftWidth: 8,
    borderRadius: metrics.borderRadius(10),
    minHeight: metrics.height(40),
    marginHorizontal: metrics.marginHorizontal(8),
    marginTop: metrics.marginTop(8),
    elevation: 2,
  },
  success: {
    borderLeftColor: Colors.SUCCESS_GREEN,
    backgroundColor: '#e6f9f0',
  },
  error: {
    borderLeftColor: Colors.RED_ERROR,
    backgroundColor: '#fdeaea',
  },
  content: {
    paddingHorizontal: metrics.paddingHorizontal(12),
  },
  text1: {
    fontSize: metrics.fontSize(16),
    fontWeight: 'bold',
    color: Colors.CHARCOAL_GRAY,
  },
  text2: {
    fontSize: metrics.fontSize(14),
    color: Colors.CHARCOAL_GRAY,
  },
});

const CommonToast = () => <Toast config={toastConfig}  position='bottom'/>;

export default CommonToast;
export { Toast };
