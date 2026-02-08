import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api';

import type { Profile } from '../types/profile';

export const MY_PROFILE_QUERY_KEY = ['users', 'me'] as const;

export type UpdateNotificationSettingsPayload = {
  live_start_notification?: boolean;
  marketing_consent?: boolean;
  new_content_from_favorite_artists?: boolean;
};

export function useUpdateNotificationSettings() {
  const queryClient = useQueryClient();

  return useMutation<Profile, Error, UpdateNotificationSettingsPayload>({
    mutationFn: async payload => {
      const { data } = await api.patch<Profile>(
        '/users/me/notification-settings',
        payload,
      );
      return data;
    },

    onSuccess: data => {
      queryClient.setQueryData(MY_PROFILE_QUERY_KEY, data);
    },
  });
}
