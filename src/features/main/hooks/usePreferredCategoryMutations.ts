import { useMutation, useQueryClient } from '@tanstack/react-query';

import type {
  AddPreferredCategoryRequest,
  AddPreferredCategoryResponse,
  DeletePreferredCategoryParams,
} from '@/features/main/types/preferredCategory';

import {
  createPreferredCategory,
  deletePreferredCategory,
} from '@/features/main/api/preferredCategory';

export const useAddPreferredCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    AddPreferredCategoryResponse,
    Error,
    AddPreferredCategoryRequest
  >({
    mutationFn: createPreferredCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['preferredCategories'],
      });
    },
  });
};

export const useDeletePreferredCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeletePreferredCategoryParams>({
    mutationFn: deletePreferredCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['preferredCategories'],
      });
    },
  });
};
