import { api } from '@/api/api';

import type { Profile } from '../types/profile';

export const getMyProfile = async (): Promise<Profile> => {
  const { data } = await api.get<Profile>('/users/me');
  return data;
};

type UpdateMyProfilePayload = {
  bio?: string;
  nickname: string;
  updated_at: string;
};

export const updateMyProfile = async (
  payload: Omit<UpdateMyProfilePayload, 'updated_at'>,
) => {
  const { data } = await api.patch('/users/me', {
    ...payload,
    updated_at: new Date().toISOString(),
  });

  return data;
};
