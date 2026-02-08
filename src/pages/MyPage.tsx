import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import type { MyPageMenuKey } from '@/features/my-page/types/menu';

import CategorySection from '@/features/main/components/CategorySection';
import { uploadProfileImage } from '@/features/my-page/api/profileImage';
import {
  AccountInfoCard,
  FavoriteArtistsSection,
  MyPageMenu,
  ProfileSummary,
  WithdrawCard,
} from '@/features/my-page/components';
import NotificationSettingsCard from '@/features/my-page/components/NotificationSettingsCard';
import { useFavoriteArtistsQuery } from '@/features/my-page/hooks/useFavoriteArtistsQuery';
import { useMyProfileQuery } from '@/features/my-page/hooks/useMyProfileQuery';
import { useUpdateNotificationSettings } from '@/features/my-page/hooks/useUpdateNotificationSettings';

export default function MyPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') as MyPageMenuKey | null;

  const [activeMenu, setActiveMenu] = useState<MyPageMenuKey>(
    tabParam ?? 'interest',
  );

  useEffect(() => {
    if (tabParam && tabParam !== activeMenu) {
      setActiveMenu(tabParam);
    }
  }, [tabParam, activeMenu]);

  const { data: favoriteArtists = [] } = useFavoriteArtistsQuery();
  const { data: profile, refetch } = useMyProfileQuery();
  const { isPending, mutate } = useUpdateNotificationSettings();

  if (!profile) {
    return null;
  }

  const profileImage =
    profile.profile_img_url != null
      ? `${profile.profile_img_url}?t=${Date.now()}`
      : null;

  const handleImageChange = async (file: File) => {
    await uploadProfileImage(file);
    await refetch();
  };

  const notificationSettingsUI = {
    live_start: profile.notification_settings?.live_start_notification ?? false,
    new_content_from_favorite_artists:
      profile.notification_settings?.new_content_from_favorite_artists ?? false,
    newsletter: profile.notification_settings?.marketing_consent ?? false,
  };

  const handleToggleNotification = (
    key: keyof typeof notificationSettingsUI,
  ) => {
    const nextUI = {
      ...notificationSettingsUI,
      [key]: !notificationSettingsUI[key],
    };

    mutate({
      live_start_notification: nextUI.live_start,
      marketing_consent: nextUI.newsletter,
      new_content_from_favorite_artists:
        nextUI.new_content_from_favorite_artists,
    });
  };

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
              <NotificationSettingsCard
                isPending={isPending}
                onToggle={handleToggleNotification}
                settings={notificationSettingsUI}
              />
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
