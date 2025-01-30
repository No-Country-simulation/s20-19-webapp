import { api } from '@/lib/axios';
import { ApiResponse, Promotion } from '@/types';

export const promotionsApi = {
  getAll: async () => {
    const response = await api.get<ApiResponse<Promotion[]>>('/promotions');
    return response.data;
  },
  
  getById: async (id: number) => {
    const response = await api.get<ApiResponse<Promotion>>(`/promotions/${id}`);
    return response.data;
  },
  
  getByCategory: async (categoryId: number) => {
    const response = await api.get<ApiResponse<Promotion[]>>(`/promotions/category/${categoryId}`);
    return response.data;
  },
};