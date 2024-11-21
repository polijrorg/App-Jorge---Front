import { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import User from '@interfaces/User';
import api from './api';

interface ILoginRequest {
    email: string;
    password: string;
}

interface ILoginResponse {
    token: string;
    user: User;
}

interface ICreateRequest {
    name: string;
    email: string;
    password: string;
}

interface ICreateResponse {
    user: User;
    token: string;
}

interface IRedefinePasswordRequest {
    email: string;
    token: string;
    newPassword: string;
}

export default class UserService {
    static async login(data: ILoginRequest): Promise<ILoginResponse> {
        try {
            const response: AxiosResponse<ILoginResponse> = await api.post(
                '/users/login',
                data
            );

            if (response.status >= 200 && response.status < 300) {
                await AsyncStorage.setItem('@jorge:token', response.data.token);
                await AsyncStorage.setItem('@jorge:userId', response.data.user.id);
                return response.data;
            } else {
                throw new Error('There was a problem with the login');
            }
        } catch (error) {
            console.error('Erro ao fazer login', error.response.data.message);
            throw new Error(error);
        }
    }

    static async logout() {
        await AsyncStorage.removeItem('@jorge:token');
        await AsyncStorage.removeItem('@jorge.userId');
    }

    static async create(data: ICreateRequest): Promise<ICreateResponse | string> {
        try {
            const response: AxiosResponse<ICreateResponse> = await api.post(
                '/users/register',
                data
            );
            if (response.status >= 200 && response.status < 300) {
                return response.data;
            } else {
                throw new Error('There was a problem with the registration');
            }
        } catch (error) {
            console.error('Erro ao registrar o usuário', error.response.data.message);
            throw new Error(error);
        }
    }

    static async update(data: ICreateRequest): Promise<ICreateResponse | string> {
        try {
            const id = await AsyncStorage.getItem('@jorge:userId');
            const response: AxiosResponse<ICreateResponse> = await api.patch(
                `/users/update/${id}`,
                data
            );
            if (response.status >= 200 && response.status < 300) {
                return response.data;
            } else {
                throw new Error('There was a problem with the editing user info');
            }
        } catch (error) {
            console.error('Erro ao editar dados do usuário', error.response.data.message);
            throw new Error(error);
        }
    }

    static async restorePassword(email: string): Promise<ICreateResponse | string> {
        try {
            const response: AxiosResponse<ICreateResponse> = await api.post(
                `/users/restore-password`,
                email
            );
            if (response.status >= 200 && response.status < 300) {
                return response.data;
            } else {
                throw new Error('There was a problem with the restoring the password');
            }
        } catch (error) {
            console.error('Erro ao editar dados do usuário', error.response.data.message);
            throw new Error(error);
        }
    }

    static async redefinePassword(data: IRedefinePasswordRequest): Promise<ICreateResponse | string> {
        try {
            const response: AxiosResponse<ICreateResponse> = await api.patch(
                `/users/new-password`,
                data
            );
            if (response.status >= 200 && response.status < 300) {
                return response.data;
            } else {
                throw new Error('There was a problem with redefining the password');
            }
        } catch (error) {
            console.error('Erro ao editar dados do usuário', error.response.data.message);
            throw new Error(error);
        }
    }
}
