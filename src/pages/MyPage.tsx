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
  const [searchParams, setSearchParams] = useSearchParams(); // URL 파라미터 관리
  const navigate = useNavigate();
  const clearAccessToken = useAuthStore(state => state.clearAccessToken); //zustand 로그아웃 시 토큰 제거
  const tabParam = searchParams.get('tab') as MyPageMenuKey | null; // URL 에서 tab 파라미터 추출

  const [activeMenu, setActiveMenu] = useState<MyPageMenuKey>(
    tabParam ?? 'interest',
  ); // 현재 활성화된 메뉴 (기본값: interest)

  const [profile, setProfile] = useState({
    description: '자기소개글이 올 자리입니다',
    followerCount: 4,
    userName: '김지우',
  }); // 프로필 정보(임시 데이터)

  const [profileImage, setProfileImage] = useState<null | string>(null); //프로필 이미지 url

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
  }); //react query 사용하여 회원 탈퇴 구현

  useEffect(() => {
    if (tabParam && tabParam !== activeMenu) {
      setActiveMenu(tabParam);
    }
  }, [tabParam, activeMenu]); // url의 tab 파라미터가 변경되면 active 동기화

  const handleWithdraw = () => {
    if (confirm('정말 탈퇴하시겠습니까? 이 작업은 취소할 수 없습니다.')) {
      withdraw();
    }
  }; // 회원 탈퇴 핸들러

  const handleImageChange = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  }; // 프로필 이미지 변경 핸들러

  const handleChangeMenu = (key: MyPageMenuKey) => {
    setActiveMenu(key);
    setSearchParams({ tab: key });
  }; // 메뉴 변경 핸들러

  const handleEditProfile = (next: {
    description?: string;
    userName: string;
  }) => {
    setProfile(prev => ({
      ...prev,
      description: next.description,
      userName: next.userName,
    }));
  }; //프로필 수정 핸들러

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
      {/* 메뉴 탭 (관심사 / 계정 관리) */}
      <section className="mx-auto max-w-7xl px-12">
        <MyPageMenu activeKey={activeMenu} onChange={handleChangeMenu} />
      </section>
      {/* 메뉴별 컨텐츠 */}
      <section className="mx-auto max-w-7xl px-12 pb-20">
        {/* 관심사 탭 */}
        {activeMenu === 'interest' && (
          <div className="mt-6 flex flex-col gap-10">
            {/* 좋아하는 아티스트 섹션 */}
            <FavoriteArtistsSection artists={favoriteArtistsData} />
            {/* 좋아하는 장르 섹션 */}
            <div className="rounded-2xl bg-[#1A1F2E] p-8">
              <FavoriteGenresSection genres={favoriteGenresData} />
            </div>
          </div>
        )}
        {/* 계정 관리 탭 */}
        {activeMenu === 'account' && (
          <div className="mt-6 flex flex-col gap-6">
            {/* 계정 정보 카드 */}
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
            {/* 알림 설정 카드 */}
            <div className="rounded-2xl bg-[#1A1F2E] p-8">
              <NotificationSettingsCard
                isLiveStartEnabled={false}
                isNewContentEnabled
                isNewsletterEnabled
              />
            </div>
            {/* 회원 탈퇴 카드 */}
            <div className="rounded-2xl bg-[#1A1F2E] p-8">
              <WithdrawCard onWithdraw={handleWithdraw} />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
