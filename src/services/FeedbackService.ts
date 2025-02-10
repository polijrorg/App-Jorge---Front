import { AxiosResponse } from 'axios';
import api from './api'

interface ICreateResponse {
  id: string,
  email: string,
  category: string,
  message: string,
  rating: number,
  createdAt: string,
  userId: string,
}

interface ICreateRequest {
  email: string,
  category: string,
  message: string,
  rating: number,
}

export default class FeedbackService {
    static async create(data: ICreateRequest, userId: string) {
      try {
        const response: AxiosResponse<ICreateResponse> = await api.post(
          `/feedback/create/${userId}`,
          data
        );
        return response.data;
      } catch(error) {
        console.log(error);
        throw new Error;
      }
    }
}
