import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LocationIcon from "../Icons/LocationIcon";
import HomeIcon from "../Icons/HomeIcon";
import UserIcon from "../Icons/UserIcon";
import Colors from "../constants/color";
import { ChatListStack, JobsStack, ProfileDrawer } from "./AppNavigator";
import Home from "../screens/home/Home";
import Profile from "../screens/profile/Profile";
import ChatIcon from "../Icons/ChatIcon";
import JobIcon from "../Icons/JobIcon";
import AllBids from "../screens/bids/AllBids";


const Tab = createBottomTabNavigator();

const PosterAppNavigator = () => {
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

export default PosterAppNavigator;
