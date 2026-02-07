import { Button } from '@/components';
import { cn } from '@/utils';

import type { NotificationSettings } from '../types/profile';

import { useMyProfileQuery } from '../hooks/useMyProfileQuery';
import { useUpdateNotificationSettings } from '../hooks/useUpdateNotificationSettings';

const ITEMS: {
  key: keyof NotificationSettings;
  label: string;
}[] = [
  {
    key: 'new_content_from_favorite_artists',
    label: '새 콘텐츠 알림',
  },
  {
    key: 'live_start',
    label: '라이브 시작 알림',
  },
  {
    key: 'newsletter',
    label: '이메일 뉴스레터',
  },
];

export default function NotificationSettingsCard() {
  const { data: profile } = useMyProfileQuery();
  const { isPending, mutate } = useUpdateNotificationSettings();

  if (!profile || !profile.notification_settings) {
    return null;
  }

  const { notification_settings } = profile;

  const handleToggle = (key: keyof NotificationSettings) => {
    mutate({
      notification_settings: {
        [key]: !notification_settings[key],
      },
    });
  };

  return (
    <section>
      <h2 className="mb-6 text-lg font-semibold text-white">알림 설정</h2>

      <div className="flex flex-col gap-4">
        {ITEMS.map(item => {
          const enabled = notification_settings[item.key];

          return (
            <div className="flex items-center justify-between" key={item.key}>
              <span className="text-sm text-white">{item.label}</span>

              <Button
                className={cn(
                  'px-3 text-sm font-medium',
                  enabled ? 'text-green-400' : 'text-white/40',
                )}
                disabled={isPending}
                onClick={() => handleToggle(item.key)}
                size="sm"
                variant="ghost"
              >
                {enabled ? 'ON' : 'OFF'}
              </Button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
