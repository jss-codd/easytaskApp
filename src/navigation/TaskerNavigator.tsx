import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserIcon from '../Icons/UserIcon';
import HomeIcon from '../Icons/HomeIcon';
import Colors from '../constants/color';
import { ChatListStack, ProfileDrawer } from './AppNavigator';
import ChatIcon from '../Icons/ChatIcon';
import JobIcon from '../Icons/JobIcon';
import BrowseTask from '../screens/task/BrowseTask';
import MyBids from '../screens/bids/MyBids';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskDetails from '../screens/task/TaskDetails';
import ApplyTaskForm from '../screens/task/applyTaskForm/ApplyTaskForm';
import { Screen } from '../utils/type';
import metrics from '../constants/metrics';
import { useTranslation } from 'react-i18next';

const Stack = createNativeStackNavigator();

export const BrowseJobsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Screen.BrowseJobs}
      component={BrowseTask}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={Screen.TaskDetails}
      component={TaskDetails}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={Screen.ApplyTask}
      component={ApplyTaskForm}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);
export const MyBidsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Screen.MyBids}
      component={MyBids}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={Screen.ApplyTask}
      component={ApplyTaskForm}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const Tab = createBottomTabNavigator();

const TaskerAppNavigator = () => {
  const {t} = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === Screen.BrowseTask) {
            return <HomeIcon size={size} color={color} />;
          } else if (route.name === Screen.Bids) {
            return <JobIcon size={size} color={color} />;
          } else if (route.name === Screen.Profile) {
            return <UserIcon size={size} color={color} />;
          } else if (route.name === Screen.Chat) {
            return <ChatIcon size={size} color={color} />;
          }
          return null;
        },
        tabBarActiveTintColor: Colors.MAIN_COLOR,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: metrics.fontSize(12), fontWeight: '600' },
        headerShown: false,
      })}
    >
      <Tab.Screen name={Screen.BrowseTask} component={BrowseJobsStack} options={{ title: t('navigation.browseTasks') }} />
      <Tab.Screen name={Screen.Bids} component={MyBidsStack} options={{ title: t('navigation.myBids') }} />
      <Tab.Screen name={Screen.Chat} component={ChatListStack} options={{ title: t('navigation.message') }} />
      <Tab.Screen name={Screen.Profile} component={ProfileDrawer} options={{ title: t('navigation.profile') }} />
    </Tab.Navigator>
  );
};

export default TaskerAppNavigator;
