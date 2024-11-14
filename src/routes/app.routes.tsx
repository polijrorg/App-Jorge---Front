import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import LoginScreen from '@screens/Login';
import Home from '@screens/Home';
import RegisterScreen from '@screens/Register';
import SettingsScreen from '@screens/Settings';
import MyChildrenScreen from '@screens/MyChildren';
import MedMamaScreen from '@screens/MedMama';
import FeedbackScreen from '@screens/Feedback';
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
