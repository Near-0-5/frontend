import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import type { MyPageMenuKey } from '@/features/my-page/types/menu';

import CategorySection from '@/features/main/components/CategorySection';
import {
  AccountInfoCard,
  FavoriteArtistsSection,
  MyPageMenu,
  NotificationSettingsCard,
  ProfileSummary,
  WithdrawCard,
} from '@/features/my-page/components';
import { useFavoriteArtistsQuery } from '@/features/my-page/hooks/useFavoriteArtistsQuery';
import { useMyProfileQuery } from '@/features/my-page/hooks/useMyProfileQuery';

export default function MyPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const tabParam = searchParams.get('tab') as MyPageMenuKey | null;
  const [activeMenu, setActiveMenu] = useState<MyPageMenuKey>(
    tabParam ?? 'interest',
  );

  const { data: profile } = useMyProfileQuery();
  const { data: favoriteArtists = [] } = useFavoriteArtistsQuery();
  const [profileImage, setProfileImage] = useState<null | string>(null);

  useEffect(() => {
    if (tabParam && tabParam !== activeMenu) {
      setActiveMenu(tabParam);
    }
  }, [tabParam, activeMenu]);

  const handleImageChange = (file: File) => {
    setProfileImage(URL.createObjectURL(file));
  };

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-[#101828]">
      <section className="bg-linear-to-r from-[#DC196D] to-[#63002B]">
        <div className="mx-auto max-w-7xl px-12 py-10">
          <ProfileSummary
            bio={profile.bio}
            favoriteArtistCount={favoriteArtists.length}
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
            <FavoriteArtistsSection artists={favoriteArtists} />
            <CategorySection title="선호 장르" />
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
