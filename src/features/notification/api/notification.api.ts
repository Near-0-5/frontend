import { api } from '@/api/api';

import type { NotificationItem } from '../types/notification';

type GetNotificationsResponse = {
  items: {
    created_at: string;
    id: number;
    kind: NotificationItem['kind'];
    message: string;
    session_id: number;
    title: string;
  }[];
  total: number;
};

export async function deleteNotification(
  notificationId: number,
): Promise<void> {
  await api.delete(`/notifications/${notificationId}`);
}

export async function getNotifications(): Promise<NotificationItem[]> {
  const response = await api.get<GetNotificationsResponse>('/notifications', {
    params: {
      limit: 20,
      status: 'SENT',
    },
  });

  return response.data.items.map(item => ({
    createdAt: item.created_at,
    id: item.id,
    kind: item.kind,
    message: item.message,
    sessionId: item.session_id,
    title: item.title,
  }));
}
