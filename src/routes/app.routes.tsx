import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import LoginScreen from '@screens/Login';
import RegisterScreen from '@screens/Register';
import BottomTabNav from './BottomTabNav/index';

const { Navigator, Screen } = createNativeStackNavigator();

const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }} >
        <Screen name="Register" component={RegisterScreen} />
        <Screen name="Login" component={LoginScreen} />
        <Screen
            name="Main"
            component={BottomTabNav}
            options={{ header: () => null, gestureEnabled: false }}
        />

    </Navigator>
  );
}

export default AppRoutes;
