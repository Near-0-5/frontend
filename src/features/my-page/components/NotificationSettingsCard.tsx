import { Button } from '@/components';
import { cn } from '@/utils';

export type NotificationSettingsCardProps = {
  isPending?: boolean;
  onToggle: (key: keyof NotificationSettingsUI) => void;
  settings: NotificationSettingsUI;
};

type NotificationSettingsUI = {
  live_start: boolean;
  new_content_from_favorite_artists: boolean;
  newsletter: boolean;
};

const ITEMS: {
  key: keyof NotificationSettingsUI;
  label: string;
}[] = [
  { key: 'new_content_from_favorite_artists', label: '새 콘텐츠 알림' },
  { key: 'live_start', label: '라이브 시작 알림' },
  { key: 'newsletter', label: '이메일 뉴스레터' },
];

export default function NotificationSettingsCard({
  isPending = false,
  onToggle,
  settings,
}: NotificationSettingsCardProps) {
  return (
    <section>
      <h2 className="mb-6 text-lg font-semibold text-white">알림 설정</h2>

      <div className="flex flex-col gap-4">
        {ITEMS.map(item => {
          const enabled = settings[item.key];

          return (
            <div className="flex items-center justify-between" key={item.key}>
              <span className="text-sm text-white">{item.label}</span>

              <Button
                className={cn(
                  'px-3 text-sm font-medium',
                  enabled ? 'text-green-400' : 'text-white/40',
                )}
                disabled={isPending}
                onClick={() => onToggle(item.key)}
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
