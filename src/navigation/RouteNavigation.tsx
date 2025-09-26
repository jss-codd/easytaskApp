import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { navigationRef } from '../service/navigationService.js';
import TaskerNavigator from './TaskerNavigator.tsx';
import PosterNavigator from './PosterNavigator.tsx';
import { UserRole } from '../utils/enums.ts';
import { Linking } from 'react-native';
import { useEffect } from 'react';

const linking = {
  prefixes: ['easytaskers://'],

  config: {
    screens: {
      // These need to match screen names in your navigators
      'reset-password': {
        path: 'reset-password',
        parse: {
          token: (token: string) => `${token}`,
        },
      },
    },
  },
};

const RouteNavigation = () => {
  const { isAuthenticated, loading, user, token } = useSelector(
    (state: RootState) => state.authReducer,
  );

  useEffect(() => {
    const checkLink = async () => {
      const initialUrl = await Linking.getInitialURL();
    };
    checkLink();

    const listener = Linking.addEventListener('url', ({url}) => {
    });

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <NavigationContainer ref={navigationRef} linking={linking}>

      {token && (isAuthenticated || user) ? (
        user?.role === UserRole.Tasker ? (
          <TaskerNavigator />
        ) : (
          <PosterNavigator />
        )
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default RouteNavigation;
