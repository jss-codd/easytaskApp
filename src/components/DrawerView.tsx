import React, { useCallback, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { RootState, useAppDispatch } from '../store/store';
import Colors from '../constants/color';
import { UserRole } from '../utils/enums';
import metrics from '../constants/metrics';

const Loader = ({
  isVisible,
  color,
}: {
  isVisible: boolean;
  color: string;
}) => {
  if (!isVisible) return null;
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#00000099',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ color, fontSize: 16 }}>Loading...</Text>
    </View>
  );
};

const DrawerView: React.FC<DrawerContentComponentProps> = props => {
  const { state } = props;
  const activeRoute = state.routeNames[state.index];

  const isActive = (routeName: string) => routeName === activeRoute;
  const { user } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogout = useCallback(() => {
    Alert.alert('Confirm', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          setLoading(true);
          dispatch(logout());
          setLoading(false);
        },
      },
    ]);
  }, [dispatch]);

  return (
    <DrawerContentScrollView contentContainerStyle={styles.container}>
      <Loader isVisible={loading} color="#fff" />

      <View style={styles.header}>
        <Pressable
          style={styles.closeButton}
          onPress={() => props.navigation.closeDrawer()}
        >
          <Text style={styles.closeText}>✕</Text>
        </Pressable>
        <View style={styles.userInfo}>
          <Text style={styles.nameText} numberOfLines={1}>
            Easy Task
          </Text>

        </View>
      </View>

      {/* <View style={styles.divider} /> */}

      <View style={styles.menu}>
        {user.role === UserRole.Tasker ? (
          <DrawerItem
            label="Add Category"
            // icon={() => (
            //   <Icon name="view-dashboard-outline" size={28} color={Colors.GREY} />
            // )}
            labelStyle={styles.label}
            onPress={() => props.navigation.navigate('Categories')}
            style={
              isActive('Categories')
                ? { backgroundColor: Colors.LIGHT_GREY, borderRadius: 30 }
                : {}
            }
          />
        ) : (
          <></>
        )}
        <DrawerItem
          label="Edit Profile"
          onPress={() => props.navigation.navigate('UpdateProfile')}
          labelStyle={styles.label}
          style={
            isActive('UpdateProfile')
              ? { backgroundColor: Colors.LIGHT_GREY, borderRadius: 30 }
              : {}
          }
        />
        <DrawerItem
          label="Saved Task"
          onPress={() => props.navigation.navigate('SavedTask')}
          labelStyle={styles.label}
          style={
            isActive('SavedTask')
              ? { backgroundColor: Colors.LIGHT_GREY, borderRadius: 30 }
              : {}
          }
        />

        <DrawerItem
          label="Change Password"
          // icon={() => (
          //   <Icon name="view-dashboard-outline" size={28} color={Colors.GREY} />
          // )}
          labelStyle={styles.label}
          onPress={() => props.navigation.navigate('ChangePassword')}
          style={
            isActive('ChangePassword')
              ? { backgroundColor: Colors.LIGHT_GREY, borderRadius: 30 }
              : {}
          }
        />
      </View>

      <View style={styles.logoutSection}>
        <View style={styles.divider} />
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          {/* <Icon name="logout" size={28} color={Colors.GREY} /> */}
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginTop: metrics.margin(30),
  },

  userInfo: {
    marginTop: metrics.margin(25),
    alignItems: 'center',
  },
  nameText: {
    fontSize: metrics.fontSize(18),
    color: Colors.MAIN_COLOR,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  emailText: {
    fontSize: metrics.fontSize(12),
    fontWeight: '700',
    color: 'black',
    marginTop: metrics.marginTop(4),
    textTransform: 'capitalize',
  },
  roleText: {
    fontSize: metrics.fontSize(10),
    fontWeight: '700',
    color: Colors.GREY,
    marginTop: metrics.marginTop(4) ,
    textTransform: 'capitalize',
  },
  divider: {
    borderBottomColor: '#444',
    borderBottomWidth: metrics.borderWidth(1),
    marginVertical: metrics.marginVertical(20),
    marginHorizontal: metrics.marginHorizontal(30),
  },
  menu: {
    paddingHorizontal: metrics.paddingHorizontal(10),
  },
  label: {
    fontSize: metrics.fontSize(14),
    fontWeight: '600',
    color: Colors.MAIN_COLOR,
  },
  logoutSection: {
    marginTop: 'auto',
    paddingHorizontal: metrics.paddingHorizontal(20),
    marginBottom: metrics.marginBottom(20),
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: metrics.marginTop(15),
  },
  logoutText: {
    color: Colors.MAIN_COLOR,
    fontSize: metrics.fontSize(18),
    fontWeight: '600',
    marginLeft: metrics.marginLeft(10),
  },
  closeButton: {
    position: 'absolute',
    right: metrics.right(20),
    top: metrics.top(10),
    zIndex: 10,
  },
  closeText: {
    fontSize: metrics.fontSize(15),
    color: Colors.MAIN_COLOR,
    fontWeight: 'bold',
  },
});

export default DrawerView;
