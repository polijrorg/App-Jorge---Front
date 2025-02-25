import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState, createContext, useEffect } from 'react';

import api from '@services/api';
import UserService from '@services/UserService';
import User from '../interfaces/User';
import { View, Text } from 'react-native';

interface ILoginRequest {
    email: string;
    password: string;
}

interface AuthContextData {
    user: User | undefined;
    setUser: (data: User) => void;
    login: (data: ILoginRequest) => Promise<User | undefined>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
      const loadStorageData = async (): Promise<void> => {
          try {
              const token = await AsyncStorage.getItem('@jorge:token');
              const userId = await AsyncStorage.getItem('@jorge:userId');
  
              if (token && userId) {
                  api.defaults.headers.common = { Authorization: `Bearer ${token}` };
                  
                  const user = await UserService.readFromId(userId);
                  if (user) {
                      setUser(user);
                  } else {
                      console.warn("Usuário não encontrado.");
                  }
              }
          } catch (error) {
              console.error("Erro ao carregar usuário:", error);
          } finally {
              setIsLoading(false);
          }
      };
  
      loadStorageData();
  }, []);
  

    const login = async (data: ILoginRequest): Promise<User | undefined> => {
        try {
            const response = await UserService.login(data);
            api.defaults.headers.common = { Authorization: `Bearer ${response.token}` };
            await AsyncStorage.setItem('@jorge:token', response.token);
            await AsyncStorage.setItem('@jorge:userId', response.user.id);

            setUser(response.user);
            return response.user;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    };

    const logout = (): void => {
        AsyncStorage.removeItem('@jorge:token');
        AsyncStorage.removeItem('@jorge:userId');
        setUser(undefined);
    };

    if (isLoading) {
        return <View><Text>Loading...</Text></View>;
    }

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = (): AuthContextData => useContext(AuthContext);
