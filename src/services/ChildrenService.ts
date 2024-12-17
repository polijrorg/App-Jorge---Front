import { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Child from '@interfaces/Child';
import api from './api';

interface ICreateRequest {
    userId: string;
    name: string;
    nascimento: string;
    gender: string;
    nascimentopre: string;
    altura: string;
    peso: string;
    // planosaude: string;
    // cns: string;
}

interface IUpdateRequest {
    name: string;
    nascimento: string;
    gender: string;
    nascimentopre: string;
    altura: string;
    peso: string;
    // planosaude: string;
    // cns: string;
}

export default class ChildrenService {
    static async create(data: ICreateRequest, token: string): Promise<Child> {
        try {
            const response: AxiosResponse<Child> = await api.post(
                '/children/register/',
                data,
                { headers: { Authorization: `Bearer ${token}` }}
            );

            if (response.status >= 200 && response.status < 300) {
                return response.data;
            } else {
                throw new Error('There was a problem with creating the child');
            }
        } catch (error) {
            console.error('Erro ao criar criança', error.response.data.message);
            throw new Error(error);
        }
    }

    static async update(data: IUpdateRequest, id: string): Promise<Child> {
        try {
            const response: AxiosResponse<Child> = await api.patch(
                `/children/update/${id}`,
                data
            );

            if (response.status >= 200 && response.status < 300) {
                return response.data;
            } else {
                throw new Error('There was a problem with updating child');
            }
        } catch (error) {
            console.error('Erro ao atualizar criança', error.response.data.message);
            throw new Error(error);
        }
    }

    static async readAll(): Promise<Child[]> {
        try {
            const response: AxiosResponse<Child[]> = await api.get(
                '/children/readAll'
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

    static async readFromId(id: string): Promise<Child> {
        try {
            const response: AxiosResponse<Child> = await api.get(
                `/children/read/${id}`
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

    static async delete(id: string): Promise<Child> {
        try {
            const response: AxiosResponse<Child> = await api.delete(
                `/children/delete/${id}`
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
