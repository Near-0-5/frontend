import { useQuery } from '@tanstack/react-query';

import type { CategoriesResponse } from '@/features/main/types/category';

import {
  CATEGORY_QUERY_KEYS,
  fetchCategories,
} from '@/features/main/api/category';

export const useCategoriesQuery = () =>
  useQuery<CategoriesResponse>({
    queryFn: fetchCategories,
    queryKey: CATEGORY_QUERY_KEYS.LIST,
  });
