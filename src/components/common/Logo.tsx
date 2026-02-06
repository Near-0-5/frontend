import { LogoDark, LogoLight } from '@/assets';

type LogoProps = {
  className?: string;
  theme: 'dark' | 'light';
};

function Logo({ className, theme }: LogoProps) {
  const src = theme === 'dark' ? LogoDark : LogoLight;

  return <img alt="NEAR 0.5 logo" className={className} src={src} />;
}

export default Logo;
