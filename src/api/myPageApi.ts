import { useAuthStore } from '@/features/auth';

export type UserProfile = {
  bio: null | string;
  created_at: string;
  email: string;
  favorite_artists: {
    id: number;
    name: string;
    profile_image: string;
  }[];
  id: number;
  nickname: string;
  notification_settings: {
    live_start_notification: boolean;
    marketing_consent: boolean;
    new_content_from_favorite_artists: boolean;
  };
  preferred_categories: string[];
  profile_img_url: null | string;
  real_name: null | string;
};

type UpdateUserProfileRequest = {
  bio?: null | string;
  nickname?: string;
  notification_settings?: {
    live_start_notification: boolean;
    marketing_consent: boolean;
    new_content_from_favorite_artists: boolean;
  };
  updated_at?: string;
};

const URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const getUserProfile = async (): Promise<UserProfile> => {
  const token = useAuthStore.getState().accessToken;
  const baseURL = `${URL}/users/me`;

  return await fetch(baseURL, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(res => res.json());
};

export const updateUserProfile = async (
  data: UpdateUserProfileRequest,
): Promise<UserProfile> => {
  const token = useAuthStore.getState().accessToken;
  const baseURL = `${URL}/users/me`;

  const formData = new FormData();
  formData.append('nickname', data.nickname!);
  formData.append('bio', data.bio ?? '');
  formData.append('updated_at', data.updated_at!);

  formData.append(
    'notification_settings',
    JSON.stringify({
      live_start_notification: true,
      marketing_consent: true,
      new_content_from_favorite_artists: true,
    }),
  );

  console.log('전송할 데이터:', data);
  // console.log('JSON:', JSON.stringify(data));

  return await fetch(baseURL, {
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'application/json',
    },
    // body: JSON.stringify(data),
    method: 'PATCH',
  }).then(res => res.json());
};
