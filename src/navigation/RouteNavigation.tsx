import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { navigationRef } from '../service/navigationService.js';
import AppNavigator from './AppNavigator.tsx';
import TaskerNavigator from './TaskerNavigator.tsx';
import PosterNavigator from './PosterNavigator.tsx';
import { UserRole } from '../utils/enums.ts';

const RouteNavigation = () => {

  const { isAuthenticated, loading, user, token } = useSelector(
    (state: RootState) => state.authReducer,
  );
console.log(token, isAuthenticated, user);
 
  return (
    <NavigationContainer ref={navigationRef}>
      {/* <AuthNavigator /> */}
      {/* <AppNavigator /> */}
      {token && (isAuthenticated || user) ? (
        user?.role === UserRole.Tasker ? <TaskerNavigator /> : <PosterNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default RouteNavigation;
