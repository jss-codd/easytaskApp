import * as React from 'react';
import RouteNavigation from './src/navigation/RouteNavigation';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, RootState, store } from './src/store/store';
import CommonToast from './src/components/CommonToast';
import { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { saveFcmToken } from './src/service/apiService';
import { initNotifications } from './src/service/notificationHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from './src/service/i18n';
import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyB38d-7W8gKUE6z_i4mUQYRZgKz4qHtH8A', { language: 'en' }); 

function AppWrapper() {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const { isAuthenticated } = useSelector((state: RootState) => state.authReducer);

  useEffect(() => {
    SplashScreen.hide();
    initNotifications(token => setFcmToken(token));
  }, []);

  useEffect(() => {
    (async () => {
      const savedLang = await AsyncStorage.getItem("language");
      if (savedLang) {
        i18n.changeLanguage(savedLang);
      }
    })();
  }, []);

  useEffect(() => {
    if (fcmToken && isAuthenticated) {
      saveFcmToken({ fcmToken })
    }
  }, [fcmToken, isAuthenticated]);

  return (
    <>
      <RouteNavigation />
      <CommonToast />
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppWrapper />
      </PersistGate>
    </Provider>
  );
}

