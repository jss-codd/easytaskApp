import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../constants/color';
import { Rating } from './CustomComponents';
import { UserRole } from '../utils/enums';
import { updateRole } from '../store/slices/authSlice';
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import { Toast } from './CommonToast';
import { InfoRow } from './CustomComponents';
import metrics from '../constants/metrics';
import { useTranslation } from 'react-i18next';

interface ProfileCardProps {
  profile: any;
  onRoleChange?: (role: string) => void;
}

const ProfileCard=({
  profile,
  onRoleChange,
}: ProfileCardProps) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.authReducer);

  const getStatusColor = (isVerified: boolean) => {
    return isVerified ? Colors.SUCCESS_GREEN : Colors.RED_ERROR;
  };
  const { t } = useTranslation();
  const handleRoleChange = async (newRole: string) => {
    try {
      onRoleChange?.(newRole);

      await dispatch(updateRole(newRole) as any).unwrap();
      Toast.show({
        type: 'success',
        text1: `Role changed to ${newRole} successfully!`,
      });
    } catch (error: any) {

      Toast.show({
        type: 'error',
        text1: error || 'Failed to update role. Please try again.',
      });
    }
  };

  return (
    <View style={styles.container}>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="small" color={Colors.MAIN_COLOR} />
        </View>
      )}
      <StatusBar
        barStyle="dark-content"
      />
      <LinearGradient
        colors={[Colors.MAIN_COLOR, '#4A6CF7', '#6B8AFF', '#8BA5FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.mainCard}
      >
        <View style={styles.headerSection}>
          <View style={styles.avatarContainer}>
            {profile?.profileImage ? (
              <Image 
                source={{ uri: profile.profileImage }} 
                style={styles.avatar}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={{
                  uri: `https://ui-avatars.com/api/?name=${profile?.name}&background=ffffff`,
                }}
                style={styles.avatar}
                resizeMode="cover"
              />
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
                    {t('profile.tasker')}
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
                    {t('profile.poster')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.infoCard}>
        <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{t('profile.contactInformation')}</Text>
          {/* <View style={styles.cardIcon}>📧</View> */}
        </View>
        <InfoRow
          label={t('profile.email')}
          value={profile?.email || 'Not provided'}
        />

        <InfoRow
          label={t('profile.phone')}
          value={profile.phone}
        />

        <InfoRow
          label={t('profile.aadharNumber')}
          value={profile?.aadharNumber || profile?.adharcard_number || 'Not provided'}
        />
      </View>

      <View style={styles.infoCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{t('profile.address')}</Text>
          {/* <View style={styles.cardIcon}>📍</View> */}
        </View>
        <InfoRow
          label={t('profile.addressLine')}
          value={profile?.permanent_address?.addressLine || 'Not provided'}
        />
        <InfoRow
          label={t('profile.street')}
          value={profile?.permanent_address?.street || 'Not provided'}
        />
        <InfoRow
          label={t('profile.city')}
          value={profile?.permanent_address?.city || 'Not provided'}
        />
        <InfoRow
            label={t('profile.state')}
          value={profile?.permanent_address?.state || 'Not provided'}
        />
        {/* <InfoRow
          label="Pincode"
          value={profile?.permanent_address?.pincode || 'Not provided'}
        /> */}
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: metrics.paddingHorizontal(16),
    paddingTop: metrics.paddingTop(16),
  },
  mainCard: {
    borderRadius: metrics.borderRadius(28),
    padding: metrics.padding(24),
    marginBottom: metrics.marginBottom(24),
    shadowColor: Colors.MAIN_COLOR,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    position: 'relative',
    overflow: 'hidden',
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: metrics.marginBottom(20),
  },
  avatarContainer: {
    position: 'relative',
    marginRight: metrics.marginRight(16),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatar: {
      width: metrics.width(48),
    height: metrics.height(48),
    borderRadius: metrics.width(48) / 2,
    backgroundColor: Colors.WHITE,
    borderWidth: metrics.borderWidth(1),
    borderColor: 'rgba(255,255,255,0.6)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarText: {
    fontSize: metrics.fontSize(20),
    fontWeight: '600',
    color: Colors.MAIN_COLOR,
  },
  verificationBadge: {
    position: 'absolute',
    bottom: metrics.bottom(-2),
    right: metrics.right(-2),
    borderRadius: metrics.borderRadius(5),
    padding: metrics.padding(4),
  },
  statusDot: {
    width: metrics.width(12),
    height: metrics.height(12),
    borderRadius: metrics.width(12)/2,
    borderWidth: metrics.borderWidth(1),
    borderColor: Colors.LIGHT_GREY,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',

  },
  userName: {
    fontSize: metrics.fontSize(24),
    fontWeight: '700',
    color: Colors.WHITE,
    marginBottom: metrics.marginBottom(8),
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  userMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: metrics.gap(16),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: metrics.marginLeft(6),
    color: Colors.WHITE,
    fontSize: metrics.fontSize(15),
    fontWeight: '600',
    opacity: 0.95,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  infoCard: {
    backgroundColor: Colors.WHITE,
    borderRadius: metrics.borderRadius(20),
    padding: metrics.padding(20),
    marginBottom: metrics.marginBottom(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: metrics.marginBottom(16),
  },
  cardTitle: {
    fontSize: metrics.fontSize(18),
    fontWeight: 'bold',
    color: Colors.CHARCOAL_GRAY,
    flex: 1,
  },
  cardIcon: {
    fontSize: metrics.fontSize(20),
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
    marginBottom: metrics.marginBottom(5),
    padding: metrics.padding(5),
  },
  toggleBackground: {
    width: metrics.width(120),
    height: metrics.height(30),
    borderRadius: metrics.borderRadius(20),
    backgroundColor: Colors.MAIN_COLOR,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  toggleSlider: {
    position: 'absolute',
    top: metrics.top(2),
    left: metrics.left(3),
    width: metrics.width(56),
    height: metrics.height(25),
    borderRadius: metrics.borderRadius(17),
    padding: metrics.padding(1),
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  toggleLabels: {
    position: 'absolute',
    top: metrics.top(0),
    left: metrics.left(0),
    right: metrics.right(0),
    bottom: metrics.bottom(0),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: metrics.paddingHorizontal(8),
    zIndex: 1,
  },
  toggleHalf: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: metrics.height(100),
  },
  toggleText: {
    fontSize: metrics.fontSize(14),
    fontWeight: '600',
    letterSpacing: 0.5,
    alignItems:'center',
  },
  toggleTextActive: {
    color: Colors.MAIN_COLOR,
   textAlign:'center',
  },
  toggleTextInactive: {
    color: Colors.WHITE,
    textAlign:'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: metrics.top(0),
    left: metrics.left(0),
    right: metrics.right(0),
    bottom: metrics.bottom(0),
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: metrics.borderRadius(18),
    zIndex: 2,
  },
});

export default ProfileCard;
