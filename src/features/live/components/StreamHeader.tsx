import {
  Button,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '@/components';

export default function StreamHeader() {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold">스트리밍 제목</h1>
        <p className="text-sm text-gray-500">LIVE · 시청자 수</p>
      </div>

      <Dropdown>
        <DropdownTrigger>
          <Button size="sm" variant="transparent">
            옵션
          </Button>
        </DropdownTrigger>

        <DropdownContent>
          <DropdownItem>공유</DropdownItem>
          <DropdownItem>신고</DropdownItem>
        </DropdownContent>
      </Dropdown>
    </header>
  );
}
