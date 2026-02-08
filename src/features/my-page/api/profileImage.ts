import { api } from '@/api/api';

export const uploadProfileImage = async (file: File): Promise<void> => {
  const formData = new FormData();
  formData.append('file', file);

  await api.post('/users/me/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
