export type CategoryItem = {
  id: string;
  label: string;
};
export type CategorySectionProps = SectionProps;

export type ConcertCardProps = BaseCardProps & {
  dateLabel: string;
  locationLabel: string;
  timeLabel: string;
};

export type OngoingLiveCardProps = BaseCardProps & {
  durationLabel: string;
  isLive?: boolean;
};

export type OngoingStreamingSectionProps = SectionProps;

export type SectionProps = {
  title: string;
};
export type UpcomingStreamingSectionProps = SectionProps;
type BaseCardProps = {
  thumbnailUrl: string;
  title: string;
};
