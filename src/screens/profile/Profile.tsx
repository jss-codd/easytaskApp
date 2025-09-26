import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Colors from '../../constants/color';
import { useAppDispatch, useAppSelector } from '../../store/store';
import ProfileCard from '../../components/ProfileCard';
import { getProfile } from '../../store/slices/authSlice';
import { useFocusEffect } from '@react-navigation/native';

const Profile = () => {
  const { profile } = useAppSelector((state: any) => state.authReducer);
  const dispatch = useAppDispatch();

  const handleRoleChange = (newRole: string) => {
    console.log('Role changed to:', newRole);
  };

  useFocusEffect(() => {
    dispatch(getProfile());
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ProfileCard 
        profile={profile} 
        onRoleChange={handleRoleChange}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
});

export default Profile;


