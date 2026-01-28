type AccountInfoItemProps = {
  label: string;
  value: string;
};

export default function AccountInfoItem({
  label,
  value,
}: AccountInfoItemProps) {
  return (
    <div className="flex flex-col gap-1 py-4">
      <span className="text-sm text-[#c7c9d9]/70">{label}</span>
      <span className="text-sm text-white">{value}</span>
    </div>
  );
}
