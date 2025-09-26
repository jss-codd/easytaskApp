import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../../Icons/BackIcon';
import metrics from '../../constants/metrics';
import Colors from '../../constants/color';
import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import { getProfile, getWalletBalance } from '../../store/slices/authSlice';
import WalletIcon from '../../Icons/WalletIcon';
import { formatCurrency } from '../../utils/helper';
import LanguageSwitcher from '../../components/LangSwitcher';
import FONT_FAMILY from '../../constants/FontFamily';

type Props = {
  title: string;
  showBack?: boolean;
};

const Header = ({
  title,
  showBack = false,
}: Props) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { user: authUser, walletBalance } = useAppSelector((state: RootState) => state.authReducer);

  useEffect(() => {
    getWalletBalance();
  }, [authUser?.id]);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {showBack && (
        <TouchableOpacity
          style={styles.left}
          onPress={() => navigation.goBack()}
        >
          <BackIcon size={25} color={'#fff'} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>

      <View style={styles.rightContainer}>
        <LanguageSwitcher />
        <View style={styles.right}>
          <WalletIcon color={Colors.WHITE} size={15} />
          <Text style={styles.rightText}>{formatCurrency(walletBalance)}</Text>
        </View>
      </View>
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  container: {
    height: metrics.height(55),
    backgroundColor: Colors.MAIN_COLOR,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LIGHT_BACKGROUND,
    justifyContent: 'center',
  },
  left: {
    position: 'absolute',
    left: metrics.paddingHorizontal(16),
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  rightContainer: {
    position: 'absolute',
    right: metrics.paddingHorizontal(11),
    flexDirection: 'row',
    alignItems: 'center',
    gap: metrics.gap(5),
    backgroundColor: Colors.MAIN_COLOR,
  },
  right: {
    display: 'flex',
    flexDirection: 'row',
    padding: metrics.padding(5),
    height: metrics.height(30),
    borderRadius: metrics.borderRadius(10),
    alignItems: 'center',
    gap: metrics.gap(5),
    backgroundColor: Colors.BUTTON_BACKGROUND,
    borderWidth: 1,
    borderColor: Colors.MAIN_COLOR,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  title: {
    fontSize: metrics.fontSize(18),
    fontWeight: '600',
    color: Colors.WHITE,
    textAlign: 'left',
    marginLeft: metrics.marginLeft(45),
  },
  profileImage: {
    width: metrics.width(35),
    height: metrics.width(35),
    borderRadius: metrics.width(18),
    borderWidth: 1,
    borderColor: Colors.WHITE,
  },
  rightText: {
    fontSize: metrics.fontSize(14),
    fontWeight: '500',
    color: Colors.WHITE,
    fontFamily: FONT_FAMILY.MEDIUM,
  },
});