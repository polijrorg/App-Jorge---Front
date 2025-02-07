import { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Marco from '@interfaces/Marco';
import api from './api'

interface ICreateResponse {

}

interface ICreateRequest {
  userId: string,
  email: string,
  category: string,
  message: string,
  rating: number,
}

export default class FeedbackService {
    static async create(data: ICreateRequest) {
      const response: AxiosResponse<ICreateResponse> = await api.post(
        'feedback/create',
        data
      );
      return response.data;
    }
}
