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

const Stack = createNativeStackNavigator();

export const BrowseJobsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="BrowseJobs"
      component={BrowseTask}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="TaskDetails"
      component={TaskDetails}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="ApplyTask"
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
      name="MyBids"
      component={MyBids}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ApplyTask"
      component={ApplyTaskForm}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const Tab = createBottomTabNavigator();

const TaskerAppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'BrowseTasks') {
            return <HomeIcon size={size} color={color} />;
          } else if (route.name === 'MyBids') {
            return <JobIcon size={size} color={color} />;
          } else if (route.name === 'Profile') {
            return <UserIcon size={size} color={color} />;
          } else if (route.name === 'Chat') {
            return <ChatIcon size={size} color={color} />;
          }
          return null;
        },
        tabBarActiveTintColor: Colors.MAIN_COLOR,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        headerShown: false,
      })}
    >
      <Tab.Screen name="BrowseTasks" component={BrowseJobsStack} />
      <Tab.Screen name="MyBids" component={MyBidsStack} />
      <Tab.Screen name="Chat" component={ChatListStack} />
      <Tab.Screen name="Profile" component={ProfileDrawer} />
    </Tab.Navigator>
  );
};

export default TaskerAppNavigator;
