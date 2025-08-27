import { StyleSheet } from 'react-native';
import metrics from '../../constants/metrics';
import Colors from '../../constants/color';

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.CARD_BACKGROUND,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  avatarPlaceholder: {
    backgroundColor: Colors.LIGHT_GREY,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  userEmail: {
    color: '#666',
    fontSize: 13,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 5,
  },
  taskDate: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  comment: {
    color: '#444',
    marginVertical: 5,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  footerText: {
    fontWeight: '500',
    color: '#333',
  },
  footerButton: {
    backgroundColor: Colors.BUTTON_BACKGROUND,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
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
});

export default styles;
