import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Colors from '../../constants/color';
import { useAppSelector } from '../../store/store';
import ProfileCard from '../../components/ProfileCard';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const { profile } = useAppSelector((state: any) => state.authReducer);
  const navigation = useNavigation();

  const handleEditPress = () => {
    navigation.navigate('UpdateProfile' as never);
  };

  const handleRoleChange = (newRole: string) => {
    console.log('Role changed to:', newRole);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ProfileCard 
        profile={profile} 
        onEditPress={handleEditPress}
        showEditButton={true}
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
