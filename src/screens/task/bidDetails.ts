import { StyleSheet } from 'react-native';
import metrics from '../../constants/metrics';
import Colors from '../../constants/color';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: Math.min(metrics.padding(16)),
    backgroundColor: Colors.LIGHT_BACKGROUND,
    minHeight: '100%',
  },
  card: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    padding: 15,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 6,
    // elevation: 3,
  },
  taskerCard: {
    // flex: 1,
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 8,
    shadowColor: '#27548a',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.13,
    shadowRadius: 18,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#e3e8ee',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedIcon: {
    color: 'green',
    fontWeight: 'bold',
  },
  verifiedText: {
    color: 'green',
    marginLeft: 5,
    fontSize: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    marginVertical: 5,
    // marginBottom: 10,
  },
  star: {
    color: '#f4c430',
    fontSize: 16,
  },
  starEmpty: {
    color: '#ccc',
    fontSize: 16,
  },
  row: {
    flexDirection: 'column',
    marginTop: 3,
  },
  textBold: {
    fontWeight: 'bold',
    // marginTop: 3,
  },
  textMuted: {
    color: 'gray',
    // marginTop: 3,
    justifyContent: 'center',
    marginBottom: 10,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  chipIcon: {
    color: 'green',
    marginRight: 5,
    fontSize: 12,
  },
  chipText: {
    fontSize: 14,
  },
  button: {
    backgroundColor: Colors.MAIN_COLOR,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
