import React, { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import { getWalletBalance, logout } from '../store/slices/authSlice';
import { RootState, useAppDispatch } from '../store/store';
import Colors from '../constants/color';
import { UserRole } from '../utils/enums';
import metrics from '../constants/metrics';
import { Screen } from '../utils/type';
import UserIcon from '../Icons/UserIcon';
import JobIcon from '../Icons/JobIcon';
import EyeIcon from '../Icons/EyeIcon';
import WalletIcon from '../Icons/WalletIcon';
import LogoutIcon from '../Icons/Logout';
import { formatCurrency } from '../utils/helper';
import { SaveIcon } from '../Icons/SaveIcon';
import { useTranslation } from 'react-i18next';

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

const DrawerView = (props: DrawerContentComponentProps) => {
  const [loading, setLoading] = useState(false);
  
  const { state } = props;
  const activeRoute = state.routeNames[state.index];
  const { t } = useTranslation();

  const isActive = (routeName: string) => routeName === activeRoute;
  const { user, walletBalance } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getWalletBalance());
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    Alert.alert('Confirm', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: t('auth.logout'),
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
        {/* <TouchableOpacity
          style={styles.closeButton}
          onPress={() => props.navigation.closeDrawer()}
        >
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity> */}
        <View style={styles.userInfo}>
          {/* <View style={styles.appIconContainer}>
            <Text style={styles.appIcon}>📱</Text>
          </View> */}
          <Text style={styles.nameText} numberOfLines={1}>
            Easy Task
          </Text>
          <Text style={styles.subtitleText}>
            Task Management App
          </Text>
        </View>
      </View>

      <View style={styles.menu}>
        {user.role === UserRole.Tasker ? (
          <TouchableOpacity
            style={[
              styles.menuItem,
              isActive('Categories') && styles.activeMenuItem
            ]}
            onPress={() => props.navigation.navigate(Screen.Categories)}
          >
            <View style={styles.menuItemContent}>
              <Text style={styles.menuIcon}><SaveIcon color={Colors.GREY}/></Text>
              <Text style={[
                styles.menuLabel,
                isActive('Categories') && styles.activeMenuLabel
              ]}>
                {t('navigation.categories')}
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}
        
        <TouchableOpacity
          style={[
            styles.menuItem,
            isActive('UpdateProfile') && styles.activeMenuItem
          ]}
          onPress={() => props.navigation.navigate(Screen.UpdateProfile)}
        >
          <View style={styles.menuItemContent}>
            <Text style={styles.menuIcon}><UserIcon size={20} color={Colors.GREY}/></Text>
            <Text style={[
              styles.menuLabel,
              isActive('UpdateProfile') && styles.activeMenuLabel
            ]}>
              {t('navigation.editProfile')}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.menuItem,
            isActive('SavedTask') && styles.activeMenuItem
          ]}
          onPress={() => props.navigation.navigate(Screen.SavedTask)}
        >
          <View style={styles.menuItemContent}>
            <Text style={styles.menuIcon}><JobIcon size={20} color={Colors.GREY}/></Text>
            <Text style={[
              styles.menuLabel,
              isActive('SavedTask') && styles.activeMenuLabel
            ]}>
              {t('navigation.savedTask')}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.menuItem,
            isActive('ChangePassword') && styles.activeMenuItem
          ]}
          onPress={() => props.navigation.navigate(Screen.ChangePassword)}
        >
          <View style={styles.menuItemContent}>
            <Text style={styles.menuIcon}><EyeIcon.EyeIcon color={Colors.GREY}/></Text>
            <Text style={[
              styles.menuLabel,
              isActive('ChangePassword') && styles.activeMenuLabel
            ]}>
              {t('navigation.changePassword')}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.menuItem,
            isActive('Wallet') && styles.activeMenuItem
          ]}
          onPress={() => props.navigation.navigate(Screen.Wallet)}
        >
          <View style={styles.menuItemContent}>
            <Text style={styles.menuIcon}><WalletIcon color={Colors.GREY}/></Text>
            <Text style={[
              styles.menuLabel,
              isActive('Wallet') && styles.activeMenuLabel
            ]}>
              {t('navigation.wallet')}
            </Text>
            <Text style={styles.menuIcon}>{formatCurrency(walletBalance)}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.logoutSection}>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutIcon}><LogoutIcon color='#fff'/></Text>
          <Text style={styles.logoutText}>{t('auth.logout')}</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    marginTop: metrics.margin(20),
    paddingHorizontal: metrics.paddingHorizontal(20),
    paddingBottom: metrics.paddingBottom(20),
    backgroundColor: Colors.MAIN_COLOR,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userInfo: {
    alignItems: 'center',
    marginTop: metrics.margin(15),
  },
  appIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: metrics.marginBottom(10),
  },
  appIcon: {
    fontSize: 30,
  },
  nameText: {
    fontSize: metrics.fontSize(20),
    color: '#ffffff',
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: metrics.fontSize(12),
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    marginTop: metrics.marginTop(4),
    textAlign: 'center',
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
    marginTop: metrics.marginTop(4),
    textTransform: 'capitalize',
  },
  divider: {
    borderBottomColor: Colors.LIGHT_GREY,
    borderBottomWidth: metrics.borderWidth(1),
    marginVertical: metrics.marginVertical(20),
    marginHorizontal: metrics.marginHorizontal(20),
  },
  menu: {
    paddingHorizontal: metrics.paddingHorizontal(15),
    paddingTop: metrics.paddingTop(20),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: metrics.paddingVertical(15),
    paddingHorizontal: metrics.paddingHorizontal(15),
    marginVertical: metrics.marginVertical(3),
    borderRadius: 12,
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 0.5,
  },
  activeMenuItem: {
    backgroundColor: Colors.MAIN_COLOR,
    shadowColor: Colors.MAIN_COLOR,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    fontSize: metrics.fontSize(14),
    marginRight: metrics.marginRight(15),
    color:Colors.GREY
  },
  menuLabel: {
    fontSize: metrics.fontSize(14),
    fontWeight: '600',
    color: Colors.GREY,
    flex: 1,
  },
  activeMenuLabel: {
    color: Colors.WHITE,
  },
  label: {
    fontSize: metrics.fontSize(14),
    fontWeight: '600',
    color: Colors.MAIN_COLOR,
  },
  logoutSection: {
    marginTop: 'auto',
    paddingHorizontal: metrics.paddingHorizontal(20),
    paddingBottom: metrics.paddingBottom(20),
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: metrics.paddingVertical(15),
    paddingHorizontal: metrics.paddingHorizontal(20),
    backgroundColor: '#ff4757',
    borderRadius: 12,
    marginTop: metrics.marginTop(10),
    shadowColor: '#ff4757',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutIcon: {
    fontSize: 18,
    marginRight: metrics.marginRight(8),
  },
  logoutText: {
    color: '#ffffff',
    fontSize: metrics.fontSize(16),
    fontWeight: '600',
  },
  closeButton: {
    position: 'absolute',
    right: metrics.right(15),
    top: metrics.top(15),
    zIndex: 10,
    width: 25,
    height: 25,
    borderRadius: 17.5,
    // backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: metrics.fontSize(12),
    color: Colors.GREY,
    fontWeight: 'bold',
  },
});

export default DrawerView;
