import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

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
import { favoriteArtistsData } from '@/features/my-page/mocks/favoriteArtistsData';
import { favoriteGenresData } from '@/features/my-page/mocks/favoriteGenresData';

export default function MyPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * URL query 기준 탭 값
   * 기본값: interest
   */
  const tabParam = searchParams.get('tab') as MyPageMenuKey | null;

  /**
   * 현재 활성 탭
   */
  const [activeMenu, setActiveMenu] = useState<MyPageMenuKey>(
    tabParam ?? 'interest',
  );

  /**
   * URL → state 동기화
   *
   * TODO:
   * - 유효하지 않은 tab 값 들어왔을 때 기본값 처리
   */
  useEffect(() => {
    if (tabParam && tabParam !== activeMenu) {
      setActiveMenu(tabParam);
    }
  }, [tabParam, activeMenu]);

  /**
   * TODO:
   * - 유저 정보 API 연동
   * - 프로필 수정 API 성공 시 서버 응답 기준으로 갱신
   */
  const [profile, setProfile] = useState({
    description: '자기소개글이 올 자리입니다',
    followerCount: 4,
    userName: '김지우',
  });

  /**
   * TODO:
   * - 회원 탈퇴 API 연동
   * - 탈퇴 전 확인 모달 추가
   * - 탈퇴 성공 시 로그아웃 처리 후 메인 페이지 이동
   */
  const handleWithdraw = () => {
    // TODO: withdraw API 연결
  };

  /**
   * 탭 변경 핸들러
   *
   * TODO:
   * - URL query (?tab=interest | account)로 동기화
   * - 새로고침 시 이전 탭 유지
   */
  const handleChangeMenu = (key: MyPageMenuKey) => {
    setActiveMenu(key);
    setSearchParams({ tab: key });
  };

  /**
   * 프로필 수정 핸들러
   *
   * TODO:
   * - 프로필 수정 API 연동
   * - 닉네임 중복 시 에러 처리
   */
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
