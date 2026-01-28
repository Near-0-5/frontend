import AccountInfoItem from './AccountInfoItem';
import ProfileEditDialog from './ProfileEditDialog';

type AccountInfo = {
  email: string;
  joinedAt: string;
  nickname: string;
};

type AccountInfoCardProps = {
  accountInfo: AccountInfo;
  description?: string;
  onEditProfile?: (next: { description?: string; userName: string }) => void;
};

export default function AccountInfoCard({
  accountInfo,
  description,
  onEditProfile,
}: AccountInfoCardProps) {
  const { email, joinedAt, nickname } = accountInfo;

  const accountItems = [
    { label: '이메일', value: email },
    { label: '닉네임', value: nickname },
    { label: '가입일', value: joinedAt },
  ];

  return (
    <section className="rounded-2xl bg-[#1a1f2e] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">계정 정보</h2>

        {/* 프로필 수정 버튼 */}
        {onEditProfile && (
          <ProfileEditDialog
            description={description}
            onSave={onEditProfile}
            userName={nickname}
          />
        )}
      </div>

      <div className="divide-y divide-white/10">
        {accountItems.map(item => (
          <AccountInfoItem
            key={item.label}
            label={item.label}
            value={item.value}
          />
        ))}
      </div>
    </section>
  );
}
