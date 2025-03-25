import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedbackScreen from '@screens/Feedback';
import HomeScreen from '@screens/Home';
import MedMamaScreen from '@screens/MedMama';
import SettingsScreen from '@screens/Settings';
import React from 'react';
import { View, Image, Text } from 'react-native';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export type BottomTabParamList = {
    Settings: undefined;
    MyChildren: undefined;
    Home: undefined;
    MedMama: undefined;
    Feedback: undefined;
};

const renderIcon = (source: any, label: string, focused: boolean) => {
    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 8,
            borderRadius: 8,
            backgroundColor: focused ? '#D7E3F6' : '',
        }}>
            <Image
                source={source}
                style={{ width: 24, height: 24, tintColor: focused ? 'blue' : 'gray' }}
            />

            <Text style={{
                width: 54,
                textAlign: 'center',
                color: focused ? 'blue' : 'gray',
                fontSize: 10,
            }}
            >
                {label}
            </Text>
        </View>
    );
}


const BottomTabNav = () => {
    return (
        <Tab.Navigator
            id={undefined}
            backBehavior={'history'}
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    height: 60,
                    width: '100%',
                    borderTopLeftRadius: 32,
                    borderTopRightRadius: 32,
                    paddingHorizontal: 8,
                    position: 'absolute',
                    paddingTop: 10,
                },
        }}>
            {/* <Tab.Screen
                name="MyChildren"
                component={MyChildrenScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                      renderIcon(
                        require('@assets/icons/Bebe.png'),
                        'Filhos',
                        focused
                      ),
                }}
            /> */}
            <Tab.Screen
                name="MedMama"
                component={MedMamaScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                      renderIcon(
                        require('@assets/icons/Mamadeira.png'),
                        'MedMama',
                        focused
                      ),
                }}
            />
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                      renderIcon(
                        require('@assets/icons/Home.png'),
                        'Home',
                        focused
                      ),
                }}
            />
            <Tab.Screen
                name="Feedback"
                component={FeedbackScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                      renderIcon(
                        require('@assets/icons/Feedback.png'),
                        'Feedback',
                        focused
                      ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                      renderIcon(
                        require('@assets/icons/Config.png'),
                        'Configurar',
                        focused
                      ),
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNav;