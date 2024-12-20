import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import LoginScreen from '@screens/Login';
import RegisterScreen from '@screens/Register';
import BottomTabNav from './BottomTabNav/index';
import PasswordRecover from '@screens/Register';
import RegisterChildren from '@screens/RegisterChildren';
import MarcosScreen from '@screens/MarcosDeDesenvolvimento';
import EditChildren from '@screens/EditChildren';
import FollowUpScreen from '@screens/ChildFollowUp';
import GrowthCurveScreen from '@screens/CurvaDeCrescimento';

const { Navigator, Screen } = createNativeStackNavigator();

export type RootStackParamList = {
    Register: undefined;
    Login: undefined;
    PasswordRecover: { code? : string };
    Main: undefined;
};

const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }} >
        <Screen name="Login" component={LoginScreen} />
        <Screen name="Register" component={RegisterScreen} />
        <Screen name="PasswordRecover" component={PasswordRecover} />
        <Screen name="RegisterChildren" component={RegisterChildren} />
        <Screen name="EditChildren" component={EditChildren} />
        <Screen name="FollowUp" component={FollowUpScreen} />
        <Screen name="Marcos" component={MarcosScreen} />
        <Screen name="Curva" component={GrowthCurveScreen} />

        <Screen
            name="Main"
            component={BottomTabNav}
            options={{ header: () => null, gestureEnabled: false }}
        />

    </Navigator>
  );
}

export default AppRoutes;
