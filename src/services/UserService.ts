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
    id: string;
    password: string;
    name: string;
    email: string;
	created_at: Date;
    updated_at: Date;
}

interface IUpdateResponse {
    id: string;
    name: string;
    email: string;
	created_at: Date;
    updated_at: Date;
}

interface IRedefinePasswordRequest {
    email: string;
    token: string;
    newPassword: string;
}

interface ILogoutRequest {
    userId: string;
    refreshToken: string;
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
                api.defaults.headers.common = {
                    Authorization: `Bearer ${response.data.token}`,
                  }; 
                return response.data;
            } else {
                throw new Error('There was a problem with the login');
            }
        } catch (error) {
            console.error('Erro ao fazer login', error.response.data.message);
            throw new Error(error);
        }
    }

    static async delete(token: string) {        
        try {
            const response: AxiosResponse<ILoginResponse> = await api.delete(`/users/delete/${token}`);
            if (response.status >= 200 && response.status < 300) {
                return response.data;
            } else {
                throw new Error('There was a problem with deleting the user');
            }
        } catch (error) {
            console.error('Erro ao fazer deletar o usuário', error.response.data.message);
            throw new Error(error);
        }
    }

    static async create(data: ICreateRequest): Promise<ICreateResponse | string> {
        try {
            const response: AxiosResponse<ICreateResponse> = await api.post(
                '/users/register',
                data
            );
            if (response.status >= 200 && response.status < 300) {
                const temp = response.data;
                UserService.login({email: temp.email, password: temp.password});
                return temp;
            } else {
                throw new Error('There was a problem with the registration');
            }
        } catch (error) {
            console.error('Erro ao registrar o usuário', error.response.data.message);
            throw new Error(error);
        }
    }

    static async update(data: ICreateRequest): Promise<IUpdateResponse | string> {
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

    static async readFromId(id: string): Promise<User> {
        try {
            const response: AxiosResponse<User> = await api.get(
                `/users/read/${id}`
            );

            if (response.status >= 200 && response.status < 300) {
                return response.data;
            } else {
                throw new Error('There was a problem with parsing child data');
            }
        } catch (error) {
            console.error('Erro ao buscar dados da criança', error.response.data.message);
            throw new Error(error);
        }
    }

    static async restorePassword(email: string): Promise<void | string> {
        try {
            const response: AxiosResponse = await api.post(`/users/restore-password`, { email });
            if (!(response.status >= 200 && response.status < 300)) {
                throw new Error('There was a problem with restoring the password');
            }
        } catch (error) {
            console.error('Erro ao enviar o email para restaurar a senha:', error.response?.data?.message || error.message);
            throw new Error('Failed to send restore password email');
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
