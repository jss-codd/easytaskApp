import { Dimensions, StyleSheet } from 'react-native';
import metrics from '../../constants/metrics';
import Colors from '../../constants/color';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: Math.min(metrics.padding(16)),
    paddingBottom: metrics.paddingBottom(200),
    backgroundColor: Colors.BACKGROUND,
    minHeight: '100%',
  },
  listContainer: {
    paddingBottom: Math.min(metrics.padding(20)),
    paddingTop: Math.min(metrics.padding(10)),
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: metrics.padding(12),
    // marginBottom: 5,
    backgroundColor: Colors.CARD_BACKGROUND,
    // borderRadius: Math.min(width * 0.035, metrics.borderRadius(14)),
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
    minHeight: Math.min(height * 0.07, metrics.height(56)),
  },

  iconBtn: {
    height: Math.min(height * 0.05, metrics.height(40)),
    borderRadius: Math.min(width * 0.025, metrics.borderRadius(10)),
    backgroundColor: Colors.WHITE,
    paddingHorizontal: Math.min(width * 0.035, metrics.padding(14)),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: metrics.margin(4),
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },

  searchContainer: {
    flex: 1,
    marginHorizontal: Math.min(width * 0.02, metrics.margin(8)),
  },

  newRequestBtn: {
    backgroundColor: Colors.BUTTON_BACKGROUND,
    paddingVertical: Math.min(height * 0.012, metrics.padding(10)),
    paddingHorizontal: Math.min(width * 0.045, metrics.padding(18)),
    borderRadius: Math.min(width * 0.025, metrics.borderRadius(10)),
    shadowColor: '#499cab',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },

  newRequestText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: Math.min(width * 0.038, metrics.fontSize(15)),
    letterSpacing: 0.2,
  },
  emptyContainer: {
    //   flex: 1,
    //   justifyContent: 'center',
    alignItems: 'center',
    marginTop: metrics.marginTop(40),
    //   padding: RESPONSIVE.padding(20),
  },
});

export default styles;
