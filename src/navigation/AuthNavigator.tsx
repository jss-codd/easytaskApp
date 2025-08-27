import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/authScreens/Login';
import Register from '../screens/authScreens/Register';
import Home from '../screens/home/Home.tsx';
import { Screen } from '../utils/type.ts';
import CategoriesForm from '../screens/authScreens/registerationForms/Categories.tsx';

const AuthNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName={Screen.Login}>
      <Stack.Screen
        name={Screen.Login}
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={Screen.Register}
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Categories"
        component={CategoriesForm}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default AuthNavigator;
