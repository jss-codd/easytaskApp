import { StyleSheet } from 'react-native';
import Colors from '../../../constants/color';
import metrics from '../../../constants/metrics';

const FormStyles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    // backgroundColor: Colors.BACKGROUND,
    borderRadius: metrics.borderRadius(10),
    // paddingBottom: metrics.paddingBottom(40),
   
  },
  container: {
    flex: 1,
    padding: metrics.padding(20),
    backgroundColor: Colors.BACKGROUND,
    borderRadius: metrics.borderRadius(15),
  
  },
  title: {
    fontSize: metrics.fontSize(18),
    fontWeight: '600',
    marginBottom: metrics.marginBottom(16),
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: metrics.marginTop(20),
    marginBottom: metrics.marginBottom(70),
    gap: metrics.gap(10),
  },
  button: {
    backgroundColor: Colors.MAIN_COLOR,
    padding: metrics.padding(10),
    borderRadius: metrics.borderRadius(5),
    flex: 1,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
export default FormStyles;
