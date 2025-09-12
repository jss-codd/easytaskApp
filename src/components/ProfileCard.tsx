import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../constants/color';
import { Rating } from './CustomComponents';
import { UserRole } from '../utils/enums';
import { updateRole } from '../store/slices/authSlice';
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import { Toast } from './CommonToast';


interface ProfileCardProps {
  profile: any;
  onEditPress?: () => void;
  showEditButton?: boolean;
  onRoleChange?: (role: string) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onEditPress,
  showEditButton = true,
  onRoleChange,
}) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state: RootState) => state.authReducer);
  const getInitials = (name: string) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusColor = (isVerified: boolean) => {
    return isVerified ? Colors.SUCCESS_GREEN : Colors.RED_ERROR;
  };

  const handleRoleChange = async (newRole: string) => {
    try {

      onRoleChange?.(newRole);


      await dispatch(updateRole(newRole) as any).unwrap();
      Toast.show({
        type: 'success',
        text1: `Role changed to ${newRole} successfully!`,
      });

      // Alert.alert('Success', `Role changed to ${newRole} successfully!`);
    } catch (error: any) {

      Toast.show({
        type: 'error',
        text1: error || 'Failed to update role. Please try again.',
      });
      // Alert.alert('Error', error || 'Failed to update role. Please try again.');
    }
  };

  return (
    <View style={styles.container}>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="small" color={Colors.MAIN_COLOR} />
        </View>
      )}

      <LinearGradient
        colors={[Colors.MAIN_COLOR, '#5B7BFF', '#7A9AFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.mainCard}
      >
        <View style={styles.headerSection}>
          <View style={styles.avatarContainer}>
            {profile?.profileImage ? (
              <Image source={{ uri: profile.profileImage }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>
                  {getInitials(profile?.name || 'User')}
                </Text>
              </View>
            )}
            <View style={styles.verificationBadge}>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: getStatusColor(profile?.isVerified) },
                ]}
              />
            </View>
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.userName}>{profile?.name || 'User Name'}</Text>
            <View style={styles.userMeta}>
              <View style={styles.ratingContainer}>
                <Rating stars={profile?.aggrRating || 0} />
                <Text style={styles.ratingText}>
                  {`${profile?.aggrRating || 0}`}
                </Text>
              </View>

            </View>
          </View>

          <View style={styles.toggleContainer}>
            <View style={styles.toggleBackground}>
              <View
                style={[
                  styles.toggleSlider,
                  {
                    transform: [
                      { translateX: profile?.role === UserRole.Tasker ? 0 : 60 },
                    ],
                  },
                ]}
              />



              <View style={styles.toggleLabels}>
                <TouchableOpacity
                  style={styles.toggleHalf}
                  onPress={() => handleRoleChange(UserRole.Tasker)}
                  activeOpacity={0.8}
                  disabled={loading}
                >
                  <Text
                    style={[
                      styles.toggleText,
                      profile?.role === UserRole.Tasker
                        ? styles.toggleTextActive
                        : styles.toggleTextInactive,
                    ]}
                  >
                    Tasker
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.toggleHalf}
                  onPress={() => handleRoleChange(UserRole.Poster)}
                  activeOpacity={0.8}
                  disabled={loading}
                >
                  <Text
                    style={[
                      styles.toggleText,
                      profile?.role === UserRole.Poster
                        ? styles.toggleTextActive
                        : styles.toggleTextInactive,
                    ]}
                  >
                    Poster
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.infoCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Contact Information</Text>
          {/* <View style={styles.cardIcon}>📧</View> */}
        </View>

        <View style={styles.infoRow}>
          {/* <View style={styles.infoIcon}>📧</View> */}
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{profile?.email || 'Not provided'}</Text>
          </View>
        </View>

        {profile?.phone && (
          <View style={styles.infoRow}>
            {/* <View style={styles.infoIcon}>📞</View> */}
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{profile.phone}</Text>
            </View>
          </View>
        )}

        <View style={styles.infoRow}>
          {/* <View style={styles.infoIcon}>🆔</View> */}
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Aadhaar</Text>
            <Text style={styles.infoValue}>
              {profile?.aadharNumber || profile?.adharcard_number || 'Not provided'}
            </Text>
          </View>
        </View>
      </View>

      {/* Address Information Card */}
      <View style={styles.infoCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Address</Text>
          {/* <View style={styles.cardIcon}>📍</View> */}
        </View>

        <View style={styles.infoRow}>
          {/* <View style={styles.infoIcon}>🏠</View> */}
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Address Line</Text>
            <Text style={styles.infoValue}>
              {profile?.permanent_address?.addressLine || 'Not provided'}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          {/* <View style={styles.infoIcon}>🏘️</View> */}
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Street</Text>
            <Text style={styles.infoValue}>
              {profile?.permanent_address?.street || 'Not provided'}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          {/* <View style={styles.infoIcon}>🏙️</View> */}
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>City</Text>
            <Text style={styles.infoValue}>
              {profile?.permanent_address?.city || 'Not provided'}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          {/* <View style={styles.infoIcon}>🗺️</View> */}
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>State</Text>
            <Text style={styles.infoValue}>
              {profile?.permanent_address?.state || 'Not provided'}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          {/* <View style={styles.infoIcon}>📮</View> */}
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Pincode</Text>
            <Text style={styles.infoValue}>
              {profile?.permanent_address?.pincode || 'Not provided'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  mainCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    shadowColor: Colors.MAIN_COLOR,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  avatarPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.MAIN_COLOR,
  },
  verificationBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    borderRadius: 10,
    padding: 4,
  },
  statusDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.WHITE,
    marginBottom: 6,
  },
  userMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 6,
    color: Colors.WHITE,
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.9,
  },
  infoCard: {
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.CHARCOAL_GRAY,
    flex: 1,
  },
  cardIcon: {
    fontSize: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  infoIcon: {
    fontSize: 18,
    marginRight: 12,
    marginTop: 2,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.DARK_GREY,
    marginBottom: 4,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    color: Colors.CHARCOAL_GRAY,
    fontWeight: '500',
    lineHeight: 22,
  },
  toggleTextLeft: {
    textAlign: 'left',
  },
  toggleTextRight: {
    textAlign: 'right',
  },
  toggleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 35,
    // marginTop: 12,
  },
  toggleBackground: {
    width: 120,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.MAIN_COLOR,
    position: 'relative',
    overflow: 'hidden',
  },
  toggleSlider: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 56,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  toggleLabels: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    zIndex: 1,
  },
  toggleHalf: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  toggleText: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  toggleTextActive: {
    color: Colors.MAIN_COLOR,
  },
  toggleTextInactive: {
    color: Colors.WHITE,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    zIndex: 2,
  },
});

export default ProfileCard;
