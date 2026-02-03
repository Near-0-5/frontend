import { useRef } from 'react';

type ProfileSummaryProps = {
  description?: string;
  followerCount: number;
  onImageChange?: (file: File) => void;
  profileImage?: null | string;
  userName: string;
};

export default function ProfileSummary({
  description,
  followerCount,
  onImageChange,
  profileImage,
  userName,
}: ProfileSummaryProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="flex items-center gap-6">
      <button
        className="h-24 w-24 cursor-pointer rounded-full border-0 bg-[#2a2f3f] p-0"
        onClick={() => fileInputRef.current?.click()}
        style={{
          backgroundImage: profileImage ? `url(${profileImage})` : 'none',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
        type="button"
      />

      <div className="flex flex-col gap-2">
        <input
          accept="image/*"
          onChange={e => {
            const file = e.target.files?.[0];
            if (file && onImageChange) {
              onImageChange(file);
            }
          }}
          ref={fileInputRef}
          style={{ display: 'none' }}
          type="file"
        />
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
