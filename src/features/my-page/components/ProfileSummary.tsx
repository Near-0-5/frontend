import { useRef } from 'react';

import { Button } from '@/components';

type ProfileSummaryProps = {
  bio?: string;
  favoriteArtistCount: number;
  nickname: string;
  onImageChange?: (file: File) => void;
  profileImage?: null | string;
};

export default function ProfileSummary({
  bio,
  favoriteArtistCount,
  nickname,
  onImageChange,
  profileImage,
}: ProfileSummaryProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="flex items-center gap-6">
      <Button
        className="h-24 w-24 rounded-full bg-[#2a2f3f]"
        onClick={() => fileInputRef.current?.click()}
        style={{
          backgroundImage: profileImage ? `url(${profileImage})` : undefined,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
        variant="ghost"
      />

      <input
        accept="image/*"
        className="hidden"
        onChange={e => {
          const file = e.target.files?.[0];
          if (file && onImageChange) {
            onImageChange(file);
          }
        }}
        ref={fileInputRef}
        type="file"
      />

      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold text-white">{nickname}</h1>
        {bio && <p className="text-sm text-[#c7c9d9]">{bio}</p>}
        <p className="text-sm text-[#c7c9d9]">
          ❤️ {favoriteArtistCount} 팔로잉
        </p>
      </div>
    </section>
  );
}
