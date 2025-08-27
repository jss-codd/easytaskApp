import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { logout } from '../../store/slices/authSlice';
import Colors from '../../constants/color';
import { useAppDispatch } from '../../store/store';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '../../utils/type';

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigation= useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the Profile Screen</Text>
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

export default Profile;
