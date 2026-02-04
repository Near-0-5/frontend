import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import type { MyPageMenuKey } from '@/features/my-page/types/menu';

import { ROUTES_PATHS } from '@/constants';
import { useAuthStore } from '@/features/auth';
import { deleteUserAccount } from '@/features/auth/api/authApi';
import {
  AccountInfoCard,
  FavoriteArtistsSection,
  FavoriteGenresSection,
  MyPageMenu,
  NotificationSettingsCard,
  ProfileSummary,
  WithdrawCard,
} from '@/features/my-page/components';
import { favoriteArtistsData } from '@/features/my-page/mocks/favoriteArtistsData';
import { favoriteGenresData } from '@/features/my-page/mocks/favoriteGenresData';

export default function MyPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const clearAccessToken = useAuthStore(state => state.clearAccessToken);
  const tabParam = searchParams.get('tab') as MyPageMenuKey | null;

  const [activeMenu, setActiveMenu] = useState<MyPageMenuKey>(
    tabParam ?? 'interest',
  );

  const [profile, setProfile] = useState({
    description: '자기소개글이 올 자리입니다',
    followerCount: 4,
    userName: '김지우',
  });

  const [profileImage, setProfileImage] = useState<null | string>(null);

  const { mutate: withdraw } = useMutation({
    mutationFn: deleteUserAccount,
    onError: error => {
      console.error('회원 탈퇴 실패: ', error);
      alert('회원탈퇴에 실패했습니다. 다시 시도해주세요.');
    },
    onSuccess: () => {
      clearAccessToken();
      navigate(ROUTES_PATHS.LOGIN);
    },
  });

  useEffect(() => {
    if (tabParam && tabParam !== activeMenu) {
      setActiveMenu(tabParam);
    }
  }, [tabParam, activeMenu]);

  const handleWithdraw = () => {
    if (confirm('정말 탈퇴하시겠습니까? 이 작업은 취소할 수 없습니다.')) {
      withdraw();
    }
  };

  const handleImageChange = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

  const handleChangeMenu = (key: MyPageMenuKey) => {
    setActiveMenu(key);
    setSearchParams({ tab: key });
  };

  const handleEditProfile = (next: {
    description?: string;
    userName: string;
  }) => {
    setProfile(prev => ({
      ...prev,
      description: next.description,
      userName: next.userName,
    }));
  };

  return (
    <div className="min-h-screen bg-[#101828]">
      <section className="bg-linear-to-r from-[#DC196D] to-[#63002B]">
        <div className="mx-auto max-w-7xl px-12 py-10">
          <ProfileSummary
            description={profile.description}
            followerCount={profile.followerCount}
            onImageChange={handleImageChange}
            profileImage={profileImage}
            userName={profile.userName}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-12">
        <MyPageMenu activeKey={activeMenu} onChange={handleChangeMenu} />
      </section>

      <section className="mx-auto max-w-7xl px-12 pb-20">
        {activeMenu === 'interest' && (
          <div className="mt-6 flex flex-col gap-10">
            <FavoriteArtistsSection artists={favoriteArtistsData} />

            <div className="rounded-2xl bg-[#1A1F2E] p-8">
              <FavoriteGenresSection genres={favoriteGenresData} />
            </div>
          </div>
        )}

        {activeMenu === 'account' && (
          <div className="mt-6 flex flex-col gap-6">
            <div className="rounded-2xl bg-[#1A1F2E] p-8">
              <AccountInfoCard
                accountInfo={{
                  email: 'jiwoo.kim@example.com',
                  joinedAt: '2024년 1월 15일',
                  nickname: profile.userName,
                }}
                description={profile.description}
                onEditProfile={handleEditProfile}
              />
            </div>

            <div className="rounded-2xl bg-[#1A1F2E] p-8">
              <NotificationSettingsCard
                isLiveStartEnabled={false}
                isNewContentEnabled
                isNewsletterEnabled
              />
            </div>

            <div className="rounded-2xl bg-[#1A1F2E] p-8">
              <WithdrawCard onWithdraw={handleWithdraw} />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
