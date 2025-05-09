import AsyncStorage from "@react-native-async-storage/async-storage"
import React from "react"
import { useContext, useState, createContext, useEffect } from "react"
import api from "@services/api"
import UserService from "@services/UserService"
import type User from "../interfaces/User"
import { View, Text } from "react-native"

interface ILoginRequest {
  email: string
  password: string
  keepLoggedIn: boolean
}

interface AuthContextData {
  user: User | undefined
  setUser: (data: User) => void
  login: (data: ILoginRequest) => Promise<User | undefined>
  logout: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadStorageData = async (): Promise<void> => {
      try {
        const token = await AsyncStorage.getItem("@jorge:token")
        const userId = await AsyncStorage.getItem("@jorge:userId")
        const keepLoggedIn = await AsyncStorage.getItem("@jorge:keepLoggedIn")

        if (token && userId) {
          if (keepLoggedIn === "true") {
            api.defaults.headers.common = { Authorization: `Bearer ${token}` }
            const user = await UserService.readFromId(userId)
            if (user) {
              setUser(user)
              // console.log("temos um usuário setado: ", user);
            } else {
              // console.warn("Usuário não encontrado.")
              await AsyncStorage.clear()
            }
          } else {
            await AsyncStorage.clear()
          }
        }        
      } catch (error) {
        // console.error("Erro ao carregar usuário:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadStorageData()
  }, [])

  const login = async (data: ILoginRequest): Promise<User | undefined> => {
    try {
      const response = await UserService.login(data)
      api.defaults.headers.common = { Authorization: `Bearer ${response.token}` }
      await AsyncStorage.setItem("@jorge:token", response.token)
      await AsyncStorage.setItem("@jorge:userId", response.user.id)
      await AsyncStorage.setItem("@jorge:keepLoggedIn", data.keepLoggedIn ? "true" : "false")

      setUser(response.user)
      return response.user
    } catch (error) {
      // console.error(error)
      return undefined
    }
  }

  const logout = async (): Promise<void> => {
    await AsyncStorage.removeItem("@jorge:token");
    await AsyncStorage.removeItem("@jorge:userId");
    await AsyncStorage.removeItem('@jorge:keepLoggedIn');
    setUser(undefined);
  }

  if (isLoading) {
    return (
      <View style={{ alignSelf: 'center', justifyContent: 'center', width: '100%' }}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return <AuthContext.Provider value={{ user, setUser, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export const useAuthContext = (): AuthContextData => useContext(AuthContext)

