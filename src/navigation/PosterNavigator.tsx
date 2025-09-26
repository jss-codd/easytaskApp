import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeIcon from '../Icons/HomeIcon';
import UserIcon from '../Icons/UserIcon';
import Colors from '../constants/color';
import { ChatListStack, ContractStack, JobsStack, ProfileDrawer } from './AppNavigator';
import ChatIcon from '../Icons/ChatIcon';
import JobIcon from '../Icons/JobIcon';
import AddIcon from '../Icons/AddIcon';
import StepperForm from '../screens/task/CreateTask';
import { Screen } from '../utils/type';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

const PosterAppNavigator = () => {
  const {t} = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === Screen.AllJobs) {
            return <HomeIcon size={24} color={color} />;
          } else if (route.name === Screen.Bids) {
            return <JobIcon size={24} color={color} />;
          } else if (route.name === Screen.Profile) {
            return <UserIcon size={24} color={color} />;
          } else if (route.name === Screen.Chat) {
            return <ChatIcon size={24} color={color} />;
          }else if (route.name === Screen.PostTask) {
            return <AddIcon size={24} color={color} />;
          }
          return <ChatIcon size={24} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: Colors.MAIN_COLOR,
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name={Screen.AllJobs} component={JobsStack} options={{ title: t('navigation.myTasks') }} />
      <Tab.Screen name={Screen.Bids} component={ContractStack} options={{ title: t('navigation.myBids') }} />
      <Tab.Screen name={Screen.PostTask} component={StepperForm} options={{ title: t('navigation.postTask') }} />
      <Tab.Screen name={Screen.Chat} component={ChatListStack} options={{ title: t('navigation.message') }} />
      <Tab.Screen name={Screen.Profile} component={ProfileDrawer} options={{ title: t('navigation.profile') }} />
    </Tab.Navigator>
  );
};

export default PosterAppNavigator;
