import { cn } from '@/utils';

import type { MyPageMenuKey } from '../types/menu';

import { MENU_ITEMS } from '../constants/myPageMenu';

type MyPageMenuProps = {
  activeKey: MyPageMenuKey;
  onChange: (key: MyPageMenuKey) => void;
};

export default function MyPageMenu({ activeKey, onChange }: MyPageMenuProps) {
  return (
    <nav className="mt-8 border-b border-white/10">
      <ul className="flex gap-8">
        {MENU_ITEMS.map(({ key, label }) => {
          const isActive = key === activeKey;

          return (
            <li key={key}>
              <button
                className={cn(
                  'pb-4 text-sm font-medium text-[#c7c9d9]',
                  isActive && 'border-b-2 border-white text-white',
                )}
                onClick={() => onChange(key)}
                type="button"
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
