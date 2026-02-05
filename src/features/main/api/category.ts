import type { CategoriesResponse } from '@/features/main/types/category';

import { api } from '@/api/api';

export const CATEGORY_QUERY_KEYS = {
  LIST: ['categories'] as const,
};

export const fetchCategories = async (): Promise<CategoriesResponse> => {
  const { data } = await api.get<CategoriesResponse>('/categories');
  return data;
};
