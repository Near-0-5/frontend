type ProfileSummaryProps = {
  description?: string;
  followerCount: number;
  userName: string;
};

export default function ProfileSummary({
  description,
  followerCount,
  userName,
}: ProfileSummaryProps) {
  return (
    <section className="flex items-center gap-6">
      <div className="h-24 w-24 rounded-full bg-[#2a2f3f]" />

      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold text-white">{userName}</h1>

        {description && <p className="text-sm text-[#c7c9d9]">{description}</p>}

        <div className="flex items-center gap-2 text-sm text-[#c7c9d9]">
          <span aria-label="팔로잉" role="img">
            ❤️
          </span>
          <span>{followerCount} 팔로잉</span>
        </div>
      </div>
    </section>
  );
}
