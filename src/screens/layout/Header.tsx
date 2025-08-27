import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../../Icons/BackIcon';
import metrics from '../../constants/metrics';
import Colors from '../../constants/color';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  title: string;
  showBack?: boolean;
  rightIcon?: React.ReactNode;
  onRightPress?: () => void;
};

const Header: React.FC<Props> = ({
  title,
  showBack = false,
  rightIcon,
  onRightPress,
}) => {
  const navigation = useNavigation();

  return (
    // <LinearGradient
    //   colors={['#82A5FF', '#A1BBFE', '#BCCBFE']}
    //   style={styles.container}
    // >
      <View style={styles.container}>
        <View style={styles.left}>
          {showBack ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon size={25} color={Colors.WHITE} />
            </TouchableOpacity>
          ) : null}
        </View>

        <Text style={styles.title}>{title}</Text>

        {/* <View style={styles.right}>
        {rightIcon ? (
          <TouchableOpacity onPress={onRightPress}>
            {rightIcon}
          </TouchableOpacity>
        ) : null}
      </View> */}
      </View>
    // </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor:  Colors.BUTTON_BACKGROUND,
    paddingHorizontal: metrics.paddingHorizontal(16),
    borderBottomWidth: 1,
    borderBottomColor: Colors.LIGHT_BACKGROUND,
    // elevation: 3,
  },
  left: {
    width: 40,
    alignItems: 'flex-start',
  },
  right: {
    width: 40,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.WHITE,
  },
});

export default Header;
