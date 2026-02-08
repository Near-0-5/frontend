export type NotificationSettings = {
  live_start_notification: boolean;
  marketing_consent: boolean;
  new_content_from_favorite_artists: boolean;
};

export type Profile = {
  bio: null | string;
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
  real_name: null | string;
};
