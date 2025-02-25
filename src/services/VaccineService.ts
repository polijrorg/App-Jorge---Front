import { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Marco from '@interfaces/Marco';
import api from './api';
import Vaccine from '@interfaces/Vaccine';

interface IUpsertRequest {
  vaccineId: string;
  scheduleId: string;
  childrenId: string;
  status: string;
}

interface IUpsertResponse {
  id: string;
  vaccineId: string;
  scheduleId: string;
  childrenId: string;
  status: string;
  date: any;
}

interface IDevelopmentResponse {
  developmentPercentage: string;
  fraction: string;
  totalCompleted: number;
  totalExpected: number;
}

export default class VaccineService {
  static async upsert(data: IUpsertRequest) {
    try {
      const response: AxiosResponse<IUpsertResponse> = await api.post(
        '/vaccines/upsert',
        data
      );
      return response.data;
    } catch(error) {
      console.log('Erro ao dar upsert nas vacinas: ', error);
      throw new Error;
    }
  }

  static async getNext(childrenId: string) {
    try {
      const response: AxiosResponse<Vaccine[]> = await api.get(
        `/vaccines/proximas/${childrenId}`
      );
      return response.data;
    } catch(error) {
      console.log('Erro ao buscar próximas vacinas: ', error);
      throw new Error;
    }
  }

  static async getPast(childrenId: string) {
    try {
      const response: AxiosResponse<Vaccine[]> = await api.get(
        `/vaccines/historico/${childrenId}`
      );
      return response.data;
    } catch(error) {
      console.log('Erro ao buscar histórico de vacinas: ', error);
      throw new Error;
    }
  }

  static async getPastTomou(childrenId: string) {
    try {
      const response: AxiosResponse<Vaccine[]> = await api.get(
        `/vaccines/tomou/${childrenId}`
      );
      return response.data;
    } catch(error) {
      console.log('Erro ao buscar histórico de vacinas tomadas: ', error);
      throw new Error;
    }
  }

  static async getPastNaoTomou(childrenId: string) {
    try {
      const response: AxiosResponse<Vaccine[]> = await api.get(
        `/vaccines/naotomou/${childrenId}`
      );
      return response.data;
    } catch(error) {
      console.log('Erro ao buscar histórico de vacinas não tomadas: ', error);
      throw new Error;
    }
  }

  static async development(childrenId: string) {
    try {
      const response: AxiosResponse<IDevelopmentResponse> = await api.get(
        `/vaccines/desenvolvimento/${childrenId}`
      );
      return response.data;
    } catch(error) {
      console.log('Erro ao buscar desenvolvimento sobre vacinas: ', error);
      throw new Error;
    }
  }
}
