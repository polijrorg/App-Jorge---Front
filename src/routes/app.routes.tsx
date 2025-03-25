import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import LoginScreen from '@screens/Login';
import RegisterScreen from '@screens/Register';
import BottomTabNav from './BottomTabNav/index';
import PasswordRecover from '@screens/PasswordRecover';
import RegisterChildren from '@screens/RegisterChildren';
import MarcosScreen from '@screens/MarcosDeDesenvolvimento';
import EditChildren from '@screens/EditChildren';
import FollowUpScreen from '@screens/ChildFollowUp';
import GrowthCurveScreen from '@screens/CurvaDeCrescimento';
import EditCurveScreen from '@screens/EditCurve';
import VacinasScreen from '@screens/Vacinas';
import { useAuthContext } from '@hooks/useAuth';
import EditProfileScreen from '@screens/EditProfile';
import SourcesScreen from '@screens/Sources';

const { Navigator, Screen } = createNativeStackNavigator();

export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  PasswordRecover: { code?: string, email?: string };
  Main: undefined;
  RegisterChildren: undefined;
  EditChildren: undefined;
  FollowUp: undefined;
  Marcos: undefined;
  Curva: undefined;
  EditCurve: undefined;
};


const AppRoutes = () => {
  const { user } = useAuthContext();
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={
        user ? 'Main' : 'Login'
      }
    >
        <Screen name="Login" component={LoginScreen} />
        <Screen name="Register" component={RegisterScreen} />
        <Screen name="PasswordRecover" component={PasswordRecover} />
        <Screen name="RegisterChildren" component={RegisterChildren} />
        <Screen name="EditChildren" component={EditChildren} />
        <Screen name="FollowUp" component={FollowUpScreen} />
        <Screen name="Marcos" component={MarcosScreen} />
        <Screen name="Curva" component={GrowthCurveScreen} />
        <Screen name="EditCurve" component={EditCurveScreen} />
        <Screen name="Vacinas" component={VacinasScreen} />
        <Screen name="EditProfile" component={EditProfileScreen} />
        <Screen name="Sources" component={SourcesScreen} />

        <Screen
            name="Main"
            component={BottomTabNav}
            options={{ header: () => null, gestureEnabled: false }}
        />

    </Navigator>
  );
}

export default AppRoutes;
