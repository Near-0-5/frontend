import { Button } from '@/components';

export default function HeroBanner() {
  const data = {
    backgroundImageUrl: '', // TODO: image 폴더 추가 후 경로 설정
    primaryActionLabel: '알림 신청하기',
    statusLabel: 'UPCOMING CONCERT',
    subtitle: 'From KickFlip, To WE:Flip',
    title: '2026 KickFlip FAN-CON',
  };

  return (
    <section className="relative w-full overflow-hidden bg-background">
      <div className="absolute inset-0">
        <img
          alt={data.title}
          className="h-full w-full object-cover"
          src={data.backgroundImageUrl}
        />
        <div className="absolute inset-0 bg-linear-to-t from-background/10 via-background/40 to-background/95" />
      </div>
      <div className="relative flex min-h-90 flex-col justify-end px-8 pt-16 pb-10 md:min-h-105">
        <div className="max-w-xl space-y-4 text-left text-primary-foreground">
          <span className="bg-navy-500/90 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase shadow-sm">
            {data.statusLabel}
          </span>
          <div className="space-y-2">
            <h1 className="text-3xl leading-tight font-semibold md:text-4xl lg:text-5xl">
              {data.title}
            </h1>
            <p className="text-sm text-muted-foreground md:text-base">
              {data.subtitle}
            </p>
          </div>
          <div className="mt-4">
            <Button
              className="min-w-37.75"
              rounded="full"
              size="lg"
              variant="navy"
            >
              {data.primaryActionLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
