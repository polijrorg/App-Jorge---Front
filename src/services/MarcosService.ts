import { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Marco from '@interfaces/Marco';
import api from './api';

interface ICreateRequest {
    childrenId: string;
    idade: string;
    titulo: string;
    status: string;
}

interface IUpdateRequest {
    idade: string;
    titulo: string;
    status: string;
}

export default class MarcosService {
    static async create(data: ICreateRequest): Promise<Marco> {
        try {
            const response: AxiosResponse<Marco> = await api.post(
                '/marcos/register',
                data
            );

            if (response.status >= 200 && response.status < 300) {
                return response.data;
            } else {
                throw new Error('There was a problem with creating marco');
            }
        } catch (error) {
            console.error('Erro ao criar marco', error.response.data.message);
            throw new Error(error);
        }
    }

    static async update(data: IUpdateRequest, token: string): Promise<Marco> {
        try {
            const response: AxiosResponse<Marco> = await api.patch(
                `/marcos/update/${token}`,
                data
            );

            if (response.status >= 200 && response.status < 300) {
                return response.data;
            } else {
                throw new Error('There was a problem with updating marco');
            }
        } catch (error) {
            console.error('Erro ao atualizar marco', error.response.data.message);
            throw new Error(error);
        }
    }

    static async readAll(): Promise<Marco[]> {
        try {
            const response: AxiosResponse<Marco[]> = await api.get(
                '/marcos/readAll'
            );

            if (response.status >= 200 && response.status < 300) {
                return response.data;
            } else {
                throw new Error('There was a problem with parsing children data');
            }
        } catch (error) {
            console.error('Erro ao recuperar todas as crianças', error.response.data.message);
            throw new Error(error);
        }
    }

    static async readFromId(id: string): Promise<Marco> {
        try {
            const response: AxiosResponse<Marco> = await api.get(
                `/marcos/read/${id}`
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

    static async delete(id: string): Promise<Marco> {
        try {
            const response: AxiosResponse<Marco> = await api.delete(
                `/marcos/delete/${id}`
            );

            if (response.status >= 200 && response.status < 300) {
                return response.data;
            } else {
                throw new Error('There was a problem with deleting the child');
            }
        } catch (error) {
            console.error('Erro ao deletar criança', error.response.data.message);
            throw new Error(error);
        }
    }
}
