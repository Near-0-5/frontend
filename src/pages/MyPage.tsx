import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import type { MyPageMenuKey } from '@/features/my-page/types/menu';

import { api } from '@/api';
import { useAuthStore } from '@/features/auth';
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
  const tabParam = searchParams.get('tab') as MyPageMenuKey | null;

  const clearAccessToken = useAuthStore(state => state.clearAccessToken);

  const handleWithdraw = async () => {
    try {
      await api.delete('/users/me');
      clearAccessToken();
      navigate('/login');
    } catch (error) {
      console.error('회원 탈퇴 실패 :', error);
    }
  };

  const [activeMenu, setActiveMenu] = useState<MyPageMenuKey>(
    tabParam ?? 'interest',
  );

  useEffect(() => {
    if (tabParam && tabParam !== activeMenu) {
      setActiveMenu(tabParam);
    }
  }, [tabParam, activeMenu]);

  const [profile, setProfile] = useState({
    description: '자기소개글이 올 자리입니다',
    followerCount: 4,
    userName: '김지우',
  });

  const [profileImage, setProfileImage] = useState<null | string>(null);

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
      {/* TODO:
          - 유저 정보 API 연동
          - 로딩 상태 skeleton UI 추가
      */}
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
        {/* ================= 관심사 탭 ================= */}
        {activeMenu === 'interest' && (
          <div className="mt-6 flex flex-col gap-10">
            {/* TODO:
                - 관심 아티스트 API 연동
                - 아티스트 클릭 시 상세 페이지 이동
            */}
            <FavoriteArtistsSection artists={favoriteArtistsData} />

            {/* TODO:
                - 관심 장르 API 연동
                - 선택/해제 시 서버 반영
            */}
            <div className="rounded-2xl bg-[#1A1F2E] p-8">
              <FavoriteGenresSection genres={favoriteGenresData} />
            </div>
          </div>
        )}

        {/* ================= 계정 탭 ================= */}
        {activeMenu === 'account' && (
          <div className="mt-6 flex flex-col gap-6">
            {/* TODO:
                - 계정 정보 API 연동
            */}
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

            {/* TODO:
                - 알림 설정 조회 API
                - 토글 클릭 시 optimistic update 적용
            */}
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
