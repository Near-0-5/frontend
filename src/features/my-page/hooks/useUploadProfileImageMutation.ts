import { useMutation, useQueryClient } from '@tanstack/react-query';

import { uploadProfileImage } from '@/features/my-page/api/profileImage';
import { MY_PROFILE_QUERY_KEY } from '@/features/my-page/hooks/useMyProfileQuery';

export function useUploadProfileImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: MY_PROFILE_QUERY_KEY,
      });
    },
  });
}
