import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api';

type AddPreferredCategoryRequest = {
  category_id: string;
};

type AddPreferredCategoryResponse = {
  added_at: string;
  category_id: string;
  category_name: string;
  user_id: string;
};

export const useAddPreferredCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    AddPreferredCategoryResponse,
    Error,
    AddPreferredCategoryRequest
  >({
    mutationFn: async body => {
      const { data } = await api.post(
        '/api/v1/users/me/preferred-categories',
        body,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['preferredCategories'],
      });
    },
  });
};

type DeletePreferredCategoryParams = {
  categoryId: string;
};

export const useDeletePreferredCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeletePreferredCategoryParams>({
    mutationFn: async ({ categoryId }) => {
      await api.delete(`/api/v1/users/me/preferred-categories/${categoryId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['preferredCategories'],
      });
    },
  });
};
