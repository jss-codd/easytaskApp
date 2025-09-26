import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllJobs from '../screens/task/AllJobs';
import BidDetails from '../screens/task/BidDetails';
import UpdateProfile from '../screens/profile/UpdateProfile';
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
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MenuIcon from '../Icons/MenuIcon';
import CategoriesForm from '../screens/authScreens/registerationForms/Categories';
import ChangePassword from '../screens/profile/ChangePassword';
import ChangeLocation from '../screens/profile/ChangeLocation';
import Profile from '../screens/profile/Profile';
import SavedTask from '../screens/task/SavedTask';
import { Screen } from '../utils/type';
import CreateContract from '../screens/contract/CreateContract';
import Wallet from '../screens/wallet/Wallet';
import metrics from '../constants/metrics';
import LanguageSwitcher from '../components/LangSwitcher';
import WalletIcon from '../Icons/WalletIcon';
import { formatCurrency } from '../utils/helper';
import { RootState, useAppSelector } from '../store/store';
import { useTranslation } from 'react-i18next';

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
    recieverId: string;
  };
};

export const JobsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Screen.AllJobs}
      component={AllJobs}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={Screen.BidDetails}
      component={BidDetails}
      options={{
        headerShown: false,
      }}
    />

  </Stack.Navigator>
);

export const ChatListStack = () => {
  const { t } = useTranslation();
  return (
  <Stack.Navigator initialRouteName="ChatList">
    <ChatStack.Screen
      name="Chat"
      component={ChatScreen}
      options={({ route }) => ({ title: route.params.userName, headerShown: false })}
    />
    <ChatStack.Screen
      name="ChatList"
      component={ChatList}
      options={{ title: t('navigation.message'), headerShown: false }}
    />
  </Stack.Navigator>
);
};

export const ProfileDrawer = () => {
  const { walletBalance } = useAppSelector((state: RootState) => state.authReducer);
  const { t } = useTranslation();
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerView {...props} />}
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
          color: Colors.WHITE,
          marginLeft: metrics.marginLeft(5),
        },
        headerTintColor: Colors.WHITE,
        headerStyle: {
          backgroundColor: Colors.MAIN_COLOR,
        },
        headerTitleAlign: 'left',
        drawerStyle: {
          width: Dimensions.get('screen').width * 0.8,
          backgroundColor: Colors.BACKGROUND,
          borderTopLeftRadius: 25,
          borderBottomLeftRadius: 25,
          shadowColor: Colors.MAIN_COLOR,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
        drawerType: 'front',
        drawerPosition: 'right',
        headerLeft: () => <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={{ marginLeft: metrics.marginLeft(16)}}
        >
          <MenuIcon color={Colors.WHITE} />
        </TouchableOpacity>,
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: metrics.gap(20) }}>
            <LanguageSwitcher />
            <View
              style={styles.right}
            >
              <WalletIcon color={Colors.WHITE} size={15} />
              <Text style={styles.rightText}>{formatCurrency(walletBalance)}</Text>
            </View>
          </View>
        ),
      })}
    >
      <Drawer.Screen name={Screen.Profile} component={Profile} options={{ title: t('navigation.profile') }} />
      <Drawer.Screen name={Screen.UpdateProfile} component={UpdateProfile} options={{ title: t('navigation.updateProfile') }}   />
      <Drawer.Screen name={Screen.Categories} component={CategoriesForm} options={{ title: t('navigation.categories') }} />
      <Drawer.Screen name={Screen.ChangePassword} component={ChangePassword} options={{ title: t('navigation.changePassword') }} />
      <Drawer.Screen name={Screen.ChangeLocation} component={ChangeLocation} options={{ title: t('navigation.changeLocation') }} />
      <Drawer.Screen name={Screen.SavedTask} component={SavedTask} options={{ title: t('navigation.savedTask') }} />
      <Drawer.Screen name={Screen.Wallet} component={Wallet} options={{ title: t('navigation.wallet') }} />
    </Drawer.Navigator>
  );
};

export const ContractStack = () => (
  <Stack.Navigator>
    <Stack.Screen name={Screen.Bids} component={AllBids} options={{ headerShown: false }} />
    <Stack.Screen name={Screen.CreateContract} component={CreateContract} options={{ headerShown: false }} />
  </Stack.Navigator>
);

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

const styles = StyleSheet.create({
  right: {
    // position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    right: metrics.paddingHorizontal(16),
    padding: metrics.padding(5),
    height: metrics.height(30),
    borderRadius: metrics.borderRadius(10),
    alignItems: 'center',
    gap: metrics.gap(5),
    backgroundColor: Colors.BUTTON_BACKGROUND,
    borderWidth: 1,
    borderColor: Colors.MAIN_COLOR,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  rightText: {
    fontSize: metrics.fontSize(14),
    fontWeight: '500',
    color: Colors.WHITE,
  },
});

export default AppNavigator;
