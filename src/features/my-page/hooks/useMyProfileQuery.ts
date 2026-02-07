import { useQuery } from '@tanstack/react-query';

import { getMyProfile } from '@/features/my-page/api/user';

export const MY_PROFILE_QUERY_KEY = ['my-profile'];

export function useMyProfileQuery() {
  return useQuery({
    queryFn: getMyProfile,
    queryKey: MY_PROFILE_QUERY_KEY,
  });
}
