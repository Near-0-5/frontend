import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api';

import type { Profile } from '../types/profile';

export const MY_PROFILE_QUERY_KEY = ['users', 'me'] as const;

type NotificationSettings = Profile['notification_settings'];

type UpdateNotificationSettingsPayload = {
  notification_settings: Partial<NotificationSettings>;
};

export function useUpdateNotificationSettings() {
  const queryClient = useQueryClient();

  return useMutation<
    Profile,
    Error,
    UpdateNotificationSettingsPayload,
    { previousProfile?: Profile }
  >({
    mutationFn: async payload => {
      const { data } = await api.patch<Profile>('/users/me', payload);
      return data;
    },

    onError: (_error, _payload, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(MY_PROFILE_QUERY_KEY, context.previousProfile);
      }
    },

    onMutate: async payload => {
      await queryClient.cancelQueries({
        queryKey: MY_PROFILE_QUERY_KEY,
      });

      const previousProfile =
        queryClient.getQueryData<Profile>(MY_PROFILE_QUERY_KEY);

      if (previousProfile) {
        queryClient.setQueryData<Profile>(MY_PROFILE_QUERY_KEY, {
          ...previousProfile,
          notification_settings: {
            ...previousProfile.notification_settings,
            ...payload.notification_settings,
          },
        });
      }

      return { previousProfile };
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: MY_PROFILE_QUERY_KEY,
      });
    },
  });
}
