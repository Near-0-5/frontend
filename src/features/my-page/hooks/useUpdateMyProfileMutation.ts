import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateMyProfile } from '@/features/my-page/api/user';

import { MY_PROFILE_QUERY_KEY } from './useMyProfileQuery';

export function useUpdateMyProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: MY_PROFILE_QUERY_KEY,
      });
    },
  });
}
