import { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Marco from '@interfaces/Marco';
import api from './api';
import MarcoDefault from '@interfaces/MarcoDefault';

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

interface IUpsertRequest {
  childrenId: string;
  number: string;
  status: string;
}

interface IUpsertResponse extends Marco {
  idmarcos: string;
  created_at: any;
  updated_at: any;
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

    static async upsert(data: IUpsertRequest): Promise<IUpsertResponse> {
      try {
        const response: AxiosResponse<IUpsertResponse> = await api.post(
          `/marcos/upsert`,
          data
        );
        return response.data; 
      } catch (error) {
        console.log('Erro no upsert dos marcos: ', error);
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

    static async readAllDefault(): Promise<MarcoDefault[]> {
      try {
        const response: AxiosResponse<MarcoDefault[]> = await api.get('/marcosdefault/readAll');
        return response.data;
      } catch (error) {
        console.log(`Erro ao buscar marcos default: ${error}`);
        throw new Error(error);
      }
    }

    static async readAllChildren(childrenId: string): Promise<Marco[]> {
      try {
        const response: AxiosResponse<Marco[]> = await api.get(`/marcos/children/${childrenId}`);
        return response.data;
      } catch (error) {
        console.log(`Erro ao buscar marcos default: ${error}`);
        throw new Error(error);
      }
    }
}
