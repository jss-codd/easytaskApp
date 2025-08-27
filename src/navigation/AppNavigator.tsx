import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllJobs from '../screens/task/AllJobs';
import BidDetails from '../screens/task/BidDetails';
import Profile from '../screens/profile/Profile';
import UserIcon from '../Icons/UserIcon';
import HomeIcon from '../Icons/HomeIcon';
import JobIcon from '../Icons/JobIcon';
import AllBids from '../screens/bids/AllBids';
import ChatScreen from '../screens/chat/ChatScreen';
import ChatIcon from '../Icons/ChatIcon';
import ChatList from '../screens/chat/ChatList';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Colors from '../constants/color';
import DrawerView from '../components/DrawerView';
import {
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import MenuIcon from '../Icons/MenuIcon';
import StepperForm from '../screens/task/CreateTask';
import CategoriesForm from '../screens/authScreens/registerationForms/Categories';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator<ChatStackParamList>();
const Drawer = createDrawerNavigator();

export type ChatStackParamList = {
  ChatList: undefined;
  Chat: {
    userId: string;
    userName: string;
    chatId: string;
  };
};


export const JobsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="AllJobs"
      component={AllJobs}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="BidDetails"
      component={BidDetails}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="PostTask"
      component={StepperForm}
      options={{
        headerShown: false,
      }}
    />
    {/* <Stack.Screen
      name="Categories"
      component={CategoriesForm}
      options={{
        headerShown: false,
      }}
    /> */}
  </Stack.Navigator>
);

export const ChatListStack = () => (
  <Stack.Navigator initialRouteName="ChatList">
    <ChatStack.Screen
      name="ChatList"
      component={ChatList}
      options={{ title: 'Chats', headerShown: false }}
    />
    <ChatStack.Screen
      name="Chat"
      component={ChatScreen}
      options={({ route }) => ({ title: route.params.userName })}
    />
  </Stack.Navigator>
);

export const ProfileDrawer = () => {
  const dimensions = useWindowDimensions();
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerView {...props} />}
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
          color: Colors.MAIN_COLOR,
        },
        headerTintColor: Colors.GREY,
        drawerStyle: {
          width: Dimensions.get('screen').width,
          backgroundColor: Colors.WHITE,
          borderRadius: 50,
          // borderBottomEndRadius: 30,
        },
        drawerType: 'front',
        drawerPosition: 'right',
        headerLeft: () => null,
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={{ marginRight: 15 }}
          >
            <MenuIcon color="#27548a" />
          </TouchableOpacity>
        ),
      })}
    >
      <Drawer.Screen name="ProfileHome" component={Profile} />
      <Drawer.Screen name="Categories" component={CategoriesForm} />
    
    </Drawer.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          if (route.name === 'Home') {
            return <HomeIcon size={24} color={Colors.MAIN_COLOR} />;
          } else if (route.name === 'Bids') {
            return <JobIcon size={24} color={Colors.MAIN_COLOR} />;
          } else if (route.name === 'Profile') {
            return <UserIcon size={24} color={Colors.MAIN_COLOR} />;
          } else if (route.name === 'Chat') {
            return <ChatIcon size={24} color={Colors.MAIN_COLOR} />;
          }
          return <ChatIcon size={24} color={Colors.MAIN_COLOR} />;
        },
        headerShown: false,
        tabBarActiveTintColor: Colors.MAIN_COLOR,
        tabBarInactiveTintColor: 'gray',
      })}
    >

      <Tab.Screen name="Home" component={JobsStack} />
      <Tab.Screen name="Bids" component={AllBids} />
      <Tab.Screen name="Chat" component={ChatListStack} />
      <Tab.Screen name="Profile" component={ProfileDrawer} />
    
    </Tab.Navigator>
  );
};

export default AppNavigator;
