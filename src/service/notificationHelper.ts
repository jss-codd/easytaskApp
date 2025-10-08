import { PermissionsAndroid, Platform } from 'react-native';
import messaging, { onNotificationOpenedApp, onTokenRefresh } from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';

export async function initNotifications(
  onToken: (token: string) => void,
) {
  try {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      console.log(granted);
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        return;
      }
    }

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      return;
    }

    await notifee.createChannel({
      id: 'chat-messages',
      name: 'Chat Messages',
      importance: AndroidImportance.HIGH,
    });

    const token = await messaging().getToken();
    onToken(token);

    // messaging().onNotificationOpenedApp(remoteMessage => {
    //   if (remoteMessage) {
    //     console.log('Opened from background:', remoteMessage);
    //   }
    // });
    onNotificationOpenedApp(messaging(), remoteMessage => {
      if (remoteMessage) {
        console.log('Opened from background:', remoteMessage);
      }
    });

    // App opened from quit state
    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log('Opened from quit state:', remoteMessage);
      }
    });

    // messaging().onTokenRefresh(newToken => {
    //   onToken(newToken);
    // });
    onTokenRefresh(messaging(), newToken => {
      onToken(newToken);
    });
    
  } catch (error) {
    console.error('Notification init error:', error);
  }
}
