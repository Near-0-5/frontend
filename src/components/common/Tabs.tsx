import { cn } from '@/utils';

export type TabOption<T extends string> = {
  key: T;
  label: string;
};

export type TabsProps<T extends string> = {
  className?: string;
  onChange: (value: T) => void;
  options: TabOption<T>[];
  value: T;
};

function Tabs<T extends string>({
  className = '',
  onChange,
  options,
  value,
}: TabsProps<T>) {
  return (
    <div className={cn('border-b border-[#3A3D4F]', className)}>
      <div className="flex gap-8">
        {options.map(option => {
          const isActive = value === option.key;

          return (
            <button
              className={cn(
                'relative flex items-center gap-2 pb-3 text-sm font-medium tracking-[-0.04em] text-[#9CA3AF]',
                isActive && 'text-white',
              )}
              key={option.key}
              onClick={() => onChange(option.key)}
              type="button"
            >
              <span>{option.label}</span>

              {isActive && (
                <span className="absolute right-0 -bottom-px left-0 h-0.5 rounded-full bg-white" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Tabs;
