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
    borderRadius: metrics.borderRadius(10),
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
    width: metrics.width(40),
    height: metrics.height(40),
    borderRadius: metrics.borderRadius(100),
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
    color: '#666',
    fontSize: metrics.fontSize(13),
  
  },
  taskTitle: {
    fontSize: metrics.fontSize(16),
    fontWeight: '600',
    marginVertical: metrics.marginVertical(5),
    textTransform: 'capitalize',
  },
  taskDate: {
    fontSize: metrics.fontSize(12),
    color: '#888',
    marginBottom: metrics.marginBottom(10),
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: metrics.marginTop(10),
  },
  comment: {
    color: '#444',
    marginVertical: metrics.marginVertical(5),
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: metrics.marginTop(10),
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: metrics.paddingTop(8),
  },
  footerText: {
    fontWeight: '500',
    color: '#333',
  },
  footerButton: {
    backgroundColor: Colors.BUTTON_BACKGROUND,
    padding: metrics.padding(10),
    borderRadius: metrics.borderRadius(5),
    alignItems: 'center',
    flex: 1,
    marginHorizontal: metrics.marginHorizontal(5),
  },
  footerBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyContainer: {
    //   flex: 1,
    //   justifyContent: 'center',
    alignItems: 'center',
    marginTop: metrics.marginTop(40),
    //   padding: RESPONSIVE.padding(20),
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
});

export default styles;
