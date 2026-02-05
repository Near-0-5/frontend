import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import type { MyPageMenuKey } from '@/features/my-page/types/menu';

import {
  getUserProfile,
  updateUserProfile,
  type UserProfile,
} from '@/api/myPageApi';
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

  const [profile, setProfile] = useState<null | UserProfile>(null);
  const navigate = useNavigate();
  const clearAccessToken = useAuthStore(state => state.clearAccessToken);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
      } catch (error) {
        console.error('에러 :', error);
      }
    };
    fetchData();
  }, []);

  /**
   * TODO:
   * - 유저 정보 API 연동
   * - 프로필 수정 API 성공 시 서버 응답 기준으로 갱신
   */

  //프로필 이미지 url

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
  }, [tabParam, activeMenu]); // url의 tab 파라미터가 변경되면 active 동기화

  /**
   * TODO:
   * - 회원 탈퇴 API 연동
   * - 탈퇴 전 확인 모달 추가
   * - 탈퇴 성공 시 로그아웃 처리 후 메인 페이지 이동
   */
  const handleWithdraw = () => {
    // TODO: withdraw API 연결
    if (confirm('정말 탈퇴하시겠습니까? 이 작업은 취소할 수 없습니다.')) {
      withdraw();
    }
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
  const handleEditProfile = async (next: {
    description?: string;
    userName: string;
  }) => {
    // console.log('수정 시작:', next);
    try {
      const updatedProfile = await updateUserProfile({
        bio: next.description,
        nickname: next.userName,
        notification_settings: profile?.notification_settings,
        updated_at: new Date().toISOString(),
      });
      // console.log('수정 성공:', updatedProfile);
      setProfile(updatedProfile);
    } catch (error) {
      console.error('프로필 수정 실패: ', error);
    }
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
            description={profile?.bio}
            followerCount={4}
            profileImage={profile?.profile_img_url}
            userName={profile?.nickname}
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
        {/* ================= 관심사 탭 ================= */}
        {activeMenu === 'account' && (
          <div className="mt-6 flex flex-col gap-6">
            {/* TODO:
                - 계정 정보 API 연동
            */}
            <div className="rounded-2xl bg-[#1A1F2E] p-8">
              {profile && (
                <AccountInfoCard
                  accountInfo={{
                    email: profile.email,
                    joinedAt: profile.created_at,
                    nickname: profile.nickname,
                  }}
                  description={profile.bio}
                  onEditProfile={handleEditProfile}
                />
              )}
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
