import { StyleSheet } from 'react-native';
import Colors from '../../../constants/color';
import metrics from '../../../constants/metrics';

const FormStyles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    // backgroundColor: Colors.LIGHT_BACKGROUND,
    borderRadius: metrics.borderRadius(10),
    paddingBottom: metrics.paddingBottom(60),
  },
  container: {
    flex: 1,
    // padding: metrics.padding(16),
    // backgroundColor: Colors.LIGHT_BACKGROUND,
    borderRadius: metrics.borderRadius(15),
  },
  title: {
    fontSize: metrics.fontSize(18),
    fontWeight: '600',
    marginBottom: metrics.margin(16),
  },
});
export default FormStyles;
