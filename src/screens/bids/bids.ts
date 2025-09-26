import { StyleSheet } from 'react-native';
import metrics from '../../constants/metrics';
import Colors from '../../constants/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    padding: metrics.padding(10),
  },
  card: {
    backgroundColor: Colors.CARD_BACKGROUND,
    borderRadius: metrics.borderRadius(12),
    padding: metrics.padding(15),
    marginBottom: metrics.margin(15),
    elevation: 3,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: metrics.marginBottom(10),
  },
  avatar: {
    width: metrics.width(50),
    height: metrics.width(50),
    borderRadius: metrics.borderRadius(50)/2,
    marginRight: metrics.margin(10),
  },
  avatarPlaceholder: {
    backgroundColor: Colors.LIGHT_GREY,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: metrics.fontSize(15),
    // flex: 1,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: metrics.marginVertical(10),
  },
  userEmail: {
    color: Colors.DARK_GREY,
    fontSize: metrics.fontSize(10),
    marginTop: metrics.marginTop(2),
  },
  taskTitle: {
    fontSize: metrics.fontSize(12),
    fontWeight: '500',
    marginVertical: metrics.marginVertical(2),
    textTransform: 'capitalize',
  },
  taskDate: {
    fontSize: metrics.fontSize(10),
    color: '#888',
    marginBottom: metrics.marginBottom(2),
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: metrics.marginTop(10),
  },
  comment: {
    color: Colors.DARK_GREY,
    fontSize: metrics.fontSize(10),
    // marginVertical: metrics.marginVertical(5),
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: metrics.marginTop(5),
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: metrics.paddingTop(1),
  },
  footerText: {
    fontWeight: '500',
    color: Colors.DARK_GREY,
    fontSize: metrics.fontSize(10),
  },
  footerButton: {
    backgroundColor: Colors.BUTTON_BACKGROUND,
    padding: metrics.padding(10),
    borderRadius: metrics.borderRadius(12),
    alignItems: 'center',
    flex: 1,
    marginHorizontal: metrics.marginHorizontal(5),
  },
  footerBtnText: {
    color: '#fff',
    fontWeight: '600',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: metrics.marginTop(40),
  },
  appliedBadge: {
    backgroundColor: Colors.SUCCESS_GREEN,
    paddingHorizontal: metrics.paddingHorizontal(10),
    paddingVertical: metrics.paddingVertical(4),
    borderRadius: metrics.borderRadius(12),
    marginBottom: metrics.marginBottom(10),
  },
  appliedBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  showMore: {
    color: Colors.BUTTON_BACKGROUND,
    fontSize: metrics.fontSize(12),
    fontWeight: '500',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: metrics.padding(10),
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.LIGHT_GREY,
    backgroundColor: Colors.BACKGROUND,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
    minHeight: metrics.height(56),
  },
  iconBtn: {
    height: metrics.height(40),
    borderRadius: metrics.borderRadius(10),
    backgroundColor: Colors.WHITE,
    paddingHorizontal: metrics.padding(14),
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
    marginHorizontal: metrics.margin(8),
  },
  locationText: {
    fontSize: metrics.fontSize(10),
    color: Colors.DARK_GREY,
    marginLeft: metrics.marginLeft(3),
    flexShrink: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: metrics.marginTop(2),
  },
});

export default styles;
