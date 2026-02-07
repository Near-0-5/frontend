export type NotificationSettings = {
  live_start: boolean;
  new_content_from_favorite_artists: boolean;
  newsletter: boolean;
};

export type Profile = {
  bio?: string;
  created_at: string;
  email: null | string;
  favorite_artists: {
    id: number;
    name: string;
    profile_image: null | string;
  }[];
  id: number;
  nickname: string;
  notification_settings: NotificationSettings;
  preferred_categories: string[];
  profile_img_url: null | string;
};
