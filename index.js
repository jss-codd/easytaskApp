/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  await notifee.displayNotification({
    title: remoteMessage.notification?.title || 'New Message',
    body: remoteMessage.notification?.body || 'You have a new notification',
    android: {
      channelId: 'chat-messages',
      pressAction: { id: 'default' },
    },
  });

});

AppRegistry.registerComponent(appName, () => App);
