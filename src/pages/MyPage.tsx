import { MicIcon, MusicIcon, RadioIcon, SettingsIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';

import type { FavoriteGenre } from '@/features/my-page/types/genre';
import type { MyPageMenuKey } from '@/features/my-page/types/menu';

import {
  AccountInfoCard,
  FavoriteArtistsSection,
  FavoriteGenresSection,
  MyPageMenu,
  NotificationSettingsCard,
  ProfileSummary,
  WithdrawCard,
} from '@/features/my-page/components';
import { useMyProfileQuery } from '@/features/my-page/hooks/useMyProfileQuery';

const GENRE_ICON_MAP: Record<string, FavoriteGenre['icon']> = {
  HIPHOP: RadioIcon,
  JAZZ: RadioIcon,
  'K-POP': MicIcon,
  K_POP: MicIcon,
  POP: MusicIcon,
  ROCK: MusicIcon,
  TROT: MusicIcon,
};

export default function MyPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const tabParam = searchParams.get('tab') as MyPageMenuKey | null;
  const [activeMenu, setActiveMenu] = useState<MyPageMenuKey>(
    tabParam ?? 'interest',
  );

  const { data: profile } = useMyProfileQuery();
  const [profileImage, setProfileImage] = useState<null | string>(null);

  useEffect(() => {
    if (tabParam && tabParam !== activeMenu) {
      setActiveMenu(tabParam);
    }
  }, [tabParam, activeMenu]);

  const handleImageChange = (file: File) => {
    setProfileImage(URL.createObjectURL(file));
  };

  const favoriteGenres = useMemo<FavoriteGenre[]>(() => {
    if (!profile || !Array.isArray(profile.preferred_categories)) {
      return [];
    }

    return profile.preferred_categories.map(key => ({
      icon: GENRE_ICON_MAP[key] ?? SettingsIcon,
      id: key,
      name: key,
    }));
  }, [profile]);

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-[#101828]">
      <section className="bg-linear-to-r from-[#DC196D] to-[#63002B]">
        <div className="mx-auto max-w-7xl px-12 py-10">
          <ProfileSummary
            bio={profile.bio}
            favoriteArtistCount={
              Array.isArray(profile.favorite_artists)
                ? profile.favorite_artists.length
                : 0
            }
            nickname={profile.nickname}
            onImageChange={handleImageChange}
            profileImage={profileImage}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-12">
        <MyPageMenu
          activeKey={activeMenu}
          onChange={key => {
            setActiveMenu(key);
            setSearchParams({ tab: key });
          }}
        />
      </section>

      <section className="mx-auto max-w-7xl px-12 pb-20">
        {activeMenu === 'interest' && (
          <div className="mt-6 flex flex-col gap-10">
            <FavoriteArtistsSection artists={profile.favorite_artists ?? []} />

            <div className="rounded-2xl bg-[#1A1F2E] p-8">
              <FavoriteGenresSection genres={favoriteGenres} />
            </div>
          </div>
        )}

        {activeMenu === 'account' && (
          <div className="mt-6 flex flex-col gap-6">
            <div className="rounded-2xl bg-[#1A1F2E] p-8">
              <AccountInfoCard
                accountInfo={{
                  email: profile.email,
                  joinedAt: profile.created_at,
                  nickname: profile.nickname,
                }}
                bio={profile.bio}
              />
            </div>

            <div className="rounded-2xl bg-[#1A1F2E] p-8">
              <NotificationSettingsCard />
            </div>

            <div className="rounded-2xl bg-[#1A1F2E] p-8">
              <WithdrawCard />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
