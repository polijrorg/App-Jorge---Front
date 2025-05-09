import { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';
import Medicine from '@interfaces/Medicine';

interface ISearchRequest {
  name: string;
}

export default class MedicinesService {
    static async readAll(): Promise<Medicine[]> {
        try {
            const response: AxiosResponse<Medicine[]> = await api.get('/medicinesdefault/readAll');

            if (response.status >= 200 && response.status < 300) {
                return response.data;
            } else {
                throw new Error('There was a problem with reading all medicines');
            }
        } catch (error) {
            // console.error('Erro ao ler medicamentos', error.response.data.message);
            throw new Error(error);
        }
    }

    static async search(data: ISearchRequest): Promise<Medicine[]> {
      try {
        const response: AxiosResponse<Medicine[]> = await api.post(
          '/medicinesdefault/search',
          data
        );

        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            throw new Error('There was a problem with searching for medicines');
        }
    } catch (error) {
        // console.error('Erro ao pesquisar medicamentos', error.response.data.message);
        throw new Error(error);
    }
    }
}
