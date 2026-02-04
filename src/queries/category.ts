import { useQuery } from '@tanstack/react-query';

import { api } from '@/api/api';

export type CategoriesResponse = {
  categories: Category[];
};

export type Category = {
  id: string; // "cat_001"
  name: string; // "K-POP"
};

export const useCategoriesQuery = () =>
  useQuery<CategoriesResponse>({
    queryFn: async () => {
      const { data } = await api.get('/api/v1/categories');
      return data;
    },
    queryKey: ['categories'],
  });
