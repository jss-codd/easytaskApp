import * as React from 'react';
import RouteNavigation from './src/navigation/RouteNavigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/store/store';
import CommonToast from './src/components/CommonToast';
import Geocoder from 'react-native-geocoding';
import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import { saveFcmToken } from './src/service/apiService';

Geocoder.init('AIzaSyB98s0INvtxhs22OxCOEIjE_--kb54qhlQ', {
  language: 'en',
  region: 'in',
});

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    const initFCM = async () => {
      try {
        // 👇 Android 13+ requires POST_NOTIFICATIONS runtime permission
        if (Platform.OS === 'android' && Platform.Version >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );

          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log('🚫 Notification permission denied');
            return;
          }
        }

        // 👇 Firebase permission (iOS + Android fallback)
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (!enabled) {
          console.log('🚫 User declined notification permissions');
          return;
        }

        console.log('✅ Notification permission granted');

 
        const token = await messaging().getToken();
        console.log('📌 FCM Token:', token);

     
        await saveFcmToken({ fcmToken: token });

        await notifee.createChannel({
          id: 'chat-messages',
          name: 'Chat Messages',
          importance: 4, // HIGH
        });

     
        messaging().onMessage(async remoteMessage => {
          console.log('📩 Foreground message:', remoteMessage);

          await notifee.displayNotification({
            title: remoteMessage.notification?.title || 'New Message',
            body: remoteMessage.notification?.body || 'You have a new notification',
            android: {
              channelId: 'chat-messages',
              pressAction: {
                id: 'default',
              },
            },
          });
        });

     
        messaging()
          .getInitialNotification()
          .then(remoteMessage => {
            if (remoteMessage) {
              console.log('📩 Opened from quit state:', remoteMessage);
            }
          });

        // ✅ App opened from background
        messaging().onNotificationOpenedApp(remoteMessage => {
          console.log('📩 Opened from background:', remoteMessage);
        });

        // ✅ Refresh FCM token
        messaging().onTokenRefresh(newToken => {
          console.log('🔄 New FCM Token:', newToken);
          saveFcmToken({ fcmToken: newToken });
        });
      } catch (error) {
        console.error('❌ Init FCM error:', error);
      }
    };

    initFCM();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouteNavigation />
        <CommonToast />
      </PersistGate>
    </Provider>
  );
}



// import * as React from 'react';
// import RouteNavigation from './src/navigation/RouteNavigation';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistor, store } from './src/store/store';
// import CommonToast from './src/components/CommonToast';
// import Geocoder from 'react-native-geocoding';
// import { useEffect } from 'react';
// import SplashScreen from 'react-native-splash-screen';
// import { Alert, PermissionsAndroid, Platform } from 'react-native';
// import messaging from '@react-native-firebase/messaging';
// import { saveFcmToken } from './src/service/apiService';

// Geocoder.init('AIzaSyB98s0INvtxhs22OxCOEIjE_--kb54qhlQ', {
//   language: 'en',
//   region: 'in',
// });

// export default function App() {

//   useEffect(() => {
//     SplashScreen.hide();
//   }, []);

//   useEffect(() => {
//     const initFCM = async () => {
//       try {
//         // 👇 Android 13+ requires POST_NOTIFICATIONS runtime permission
//         if (Platform.OS === 'android' && Platform.Version >= 33) {
//           const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
//           );

//           if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//             console.log('Notification permission denied');
//             return; // 🚫 Stop here if denied
//           }
//         }

//         // 👇 Request Firebase permission (for both Android & iOS)
//         const authStatus = await messaging().requestPermission();
//         const enabled =
//           authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//           authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//         if (!enabled) {
//           console.log('User declined notification permissions');
//           return;
//         }

//         console.log('✅ Notification permission granted');

//         // ✅ Get FCM token
//         const token = await messaging().getToken();
//         console.log('FCM Token:', token);

//         // 👉 Save token to your backend
//         const response = await saveFcmToken({
//           fcmToken: token,
//         });

//         // ✅ Foreground handler
//         messaging().onMessage(async remoteMessage => {
//           notifee.displayNotification({
//             title: 'New Notification!',
//             message: JSON.stringify(remoteMessage),
//           });
//           Alert.alert('New Notification!', JSON.stringify(remoteMessage));
//         });

//         // ✅ Handle when opened from quit
//         messaging()
//           .getInitialNotification()
//           .then(remoteMessage => {
//             if (remoteMessage) {
//               console.log('Opened from quit state:', remoteMessage);
//             }
//           });

//         // ✅ Handle when opened from background
//         messaging().onNotificationOpenedApp(remoteMessage => {
//           console.log('Opened from background:', remoteMessage);
//         });

//         // ✅ Refresh token
//         messaging().onTokenRefresh(newToken => {
//           console.log('New FCM Token:', newToken);
//         });
//       } catch (error) {
//         console.error('Init FCM error:', error);
//       }
//     };

//     initFCM();
//   }, []);

//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <RouteNavigation />
//         <CommonToast />
//       </PersistGate>
//     </Provider>
//   );
// }
