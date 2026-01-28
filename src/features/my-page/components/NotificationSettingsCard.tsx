import { cn } from '@/utils';

type NotificationSettingItemProps = {
  description: string;
  isEnabled: boolean;
  title: string;
};

type NotificationSettingsCardProps = {
  isLiveStartEnabled: boolean;
  isNewContentEnabled: boolean;
  isNewsletterEnabled: boolean;
};

export default function NotificationSettingsCard({
  isLiveStartEnabled,
  isNewContentEnabled,
  isNewsletterEnabled,
}: NotificationSettingsCardProps) {
  const items: NotificationSettingItemProps[] = [
    {
      description: '팔로우한 아티스트의 새 콘텐츠',
      isEnabled: isNewContentEnabled,
      title: '새 콘텐츠 알림',
    },
    {
      description: '라이브 방송 시작 시',
      isEnabled: isLiveStartEnabled,
      title: '라이브 시작 알림',
    },
    {
      description: '주간 소식 받기',
      isEnabled: isNewsletterEnabled,
      title: '이메일 뉴스레터',
    },
  ];

  return (
    <section>
      <h2 className="mb-6 text-lg font-semibold text-white">알림 설정</h2>

      <div className="flex flex-col gap-6">
        {items.map(item => (
          <NotificationSettingItem key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}

function NotificationSettingItem({
  description,
  isEnabled,
  title,
}: NotificationSettingItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-white">{title}</p>
        <p className="text-xs text-white/40">{description}</p>
      </div>

      <span
        className={cn(
          'text-sm font-medium',
          isEnabled ? 'text-green-400' : 'text-white/30',
        )}
      >
        {isEnabled ? 'ON' : 'OFF'}
      </span>
    </div>
  );
}
