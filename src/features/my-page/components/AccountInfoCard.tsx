import AccountInfoItem from './AccountInfoItem';
import ProfileEditDialog from './ProfileEditDialog';

type AccountInfoCardProps = {
  accountInfo: {
    email: null | string;
    joinedAt: string;
    nickname: string;
  };
  bio?: string;
};

export default function AccountInfoCard({
  accountInfo,
  bio,
}: AccountInfoCardProps) {
  const { email, joinedAt, nickname } = accountInfo;

  return (
    <section className="rounded-2xl bg-[#1a1f2e] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">계정 정보</h2>
        <ProfileEditDialog bio={bio} nickname={nickname} />
      </div>

      <div className="divide-y divide-white/10">
        <AccountInfoItem label="이메일" value={email ?? '-'} />
        <AccountInfoItem label="닉네임" value={nickname} />
        <AccountInfoItem label="가입일" value={joinedAt} />
      </div>
    </section>
  );
}
