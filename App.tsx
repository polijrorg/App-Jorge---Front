import AppProvider from '@hooks/index';
import { AuthProvider } from '@hooks/useAuth';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Routes } from '@routes/index';
import React from 'react';
import {
    useFonts,
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light as PoppinsLight,
    Poppins_300Light,
    Poppins_400Regular as PoppinsRegular,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold as PoppinsBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black as PoppinsBlack,
    Poppins_900Black
} from "@expo-google-fonts/poppins"
import { ChildProvider } from '@hooks/useChild';

export default function App() {
    let [fontsLoaded] = useFonts({
        Poppins_100Thin,
        Poppins_200ExtraLight,
        Poppins_300Light,
        PoppinsLight,
        Poppins_400Regular,
        PoppinsRegular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
        PoppinsBold,
        Poppins_800ExtraBold,
        PoppinsBlack,
        Poppins_900Black
    });

    if (!fontsLoaded) {
        return <View></View>;
    } else {
        return (
            <NavigationContainer>   
                <AuthProvider>
                    <ChildProvider>
                        <AppProvider>
                            <Routes />
                        </AppProvider>
                    </ChildProvider>
                </AuthProvider>   
            </NavigationContainer>
        );
    }
}