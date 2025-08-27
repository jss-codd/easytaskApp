import * as React from 'react';
import RouteNavigation from './src/navigation/RouteNavigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/store/store';
import CommonToast from './src/components/CommonToast';
import Geocoder from 'react-native-geocoding';
import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

Geocoder.init('AIzaSyB98s0INvtxhs22OxCOEIjE_--kb54qhlQ', {
  language: 'en',
  region: 'in',
});

export default function App() {
  
  useEffect(() => {
    SplashScreen.hide();
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
