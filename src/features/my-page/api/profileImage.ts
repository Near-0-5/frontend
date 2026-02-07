import type { Profile } from '@/features/my-page/types/profile';

import { api } from '@/api/api';

export const uploadProfileImage = async (file: File): Promise<Profile> => {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await api.post<Profile>('/users/me/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
