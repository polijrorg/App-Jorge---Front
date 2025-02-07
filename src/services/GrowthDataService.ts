import { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';
import GrowthData from '@interfaces/GrowthData';

interface ICreateRequest {
  childrenId: string,
  weight: number,
  height: number,
  growthDate: string
}

export default class GrowthDataService {
  static async getById({ id, childrenId }: { id: string, childrenId: string }): Promise<GrowthData> {
    try {
      const response: AxiosResponse<GrowthData> = await api.get(
        `/growthdata/${childrenId}/${id}`
      )
      return response.data;
    } catch(error) {
      console.log('Erro ao buscar dados de crescimento por id: ', error);
      throw new Error(error);
    }
  }

  static async getByChild(childrenId: string): Promise<GrowthData[]> {
    try {
      const response: AxiosResponse<GrowthData[]> = await api.get(
        `/growthdata/${childrenId}`
      )
      return response.data;
    } catch(error) {
      console.log('Erro ao buscar dados de crescimento por criança: ', error);
      return [] as GrowthData[];
    }
  }

  static async create(data: ICreateRequest): Promise<GrowthData> {
    try {
      const response: AxiosResponse<GrowthData> = await api.post(
        `/growthdata/create`,
        data
      )
      return response.data;
    } catch(error) {
      console.log('Erro ao criar dados de crescimento: ', error);
      throw new Error(error);
    }
  }

  static async update(data: ICreateRequest, id: string): Promise<GrowthData> {
    try {
      const response: AxiosResponse<GrowthData> = await api.patch(
        `/growthdata/${id}`,
        data
      )
      return response.data;
    } catch(error) {
      console.log('Erro ao atualizar dados de crescimento: ', error);
      throw new Error(error);
    }
  }

  static async deleteById(id: string): Promise<GrowthData> {
    try {
      const response: AxiosResponse<GrowthData> = await api.delete(
        `/growthdata/${id}`
      )
      return response.data;
    } catch(error) {
      console.log('Erro ao deletar dados de crescimento: ', error);
      throw new Error(error);
    }
  }
}
