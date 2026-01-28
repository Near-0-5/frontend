import { Button } from '@/components';

type WithdrawCardProps = {
  onWithdraw: () => void;
};

export default function WithdrawCard({ onWithdraw }: WithdrawCardProps) {
  return (
    <section className="pt-6">
      <Button className="w-full" onClick={onWithdraw} size="lg" variant="red">
        회원 탈퇴
      </Button>
    </section>
  );
}
