import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState, createContext } from 'react';

import api from '@services/api';

import UserService from '@services/UserService';

import User from '../interfaces/User';

interface ILoginRequest {
    email: string;
    password: string;
}

interface AuthContextData {
    user: User;
    setUser: (data: User) => void;
    login: (data: ILoginRequest) => Promise<User>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children?: React.ReactNode | undefined }> = ({ children }) => {
    const [user, setUser] = useState<User>(undefined);

    const login = async (data: ILoginRequest) => {
        try {
            const response = await UserService.login(data);

            api.defaults.headers.common = {
                Authorization: `Bearer ${response.token}`
            };

            setUser(response.user);
            return response.user;
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        AsyncStorage.removeItem('@app:token');
        AsyncStorage.removeItem('@app:useId');
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);