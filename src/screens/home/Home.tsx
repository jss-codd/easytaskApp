import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/color';
import { useAppDispatch } from '../../store/store';
import { logout } from '../../store/slices/authSlice';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '../../utils/type';

const Home = () => {
  const dispatch = useAppDispatch();
  const navigation= useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the Home Screen</Text>
      <TouchableOpacity>
        <Text
          style={{
            justifyContent: 'center',
            backgroundColor: Colors.CHARCOAL_GRAY,
            padding: 10,
            color: Colors.WHITE,
            borderRadius: 5,
            fontSize: 16,
          }}
          onPress={() => {
            dispatch(logout());
            navigation.navigate(Screen.Login as never); 
          }}
        >
          LOGOUT
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
