import type {
  AddPreferredCategoryRequest,
  AddPreferredCategoryResponse,
  DeletePreferredCategoryParams,
} from '@/features/main/types/preferredCategory';

import { api } from '@/api/api';

export const createPreferredCategory = async (
  params: AddPreferredCategoryRequest,
): Promise<AddPreferredCategoryResponse> => {
  const { data } = await api.post<AddPreferredCategoryResponse>(
    '/users/me/preferred-categories',
    params,
  );

  return data;
};

export const deletePreferredCategory = async ({
  categoryId,
}: DeletePreferredCategoryParams): Promise<void> => {
  await api.delete(`/users/me/preferred-categories/${categoryId}`);
};
