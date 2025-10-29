import { cn } from '@/lib/utils';
import { Work_Sans } from 'next/font/google';

const work_sans = Work_Sans({
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

const sizeMap = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
  '7xl': 'text-7xl',
  '8xl': 'text-8xl',
  '9xl': 'text-9xl',
};

type LogoProps = {
  size?: keyof typeof sizeMap;
  className?: string;
};

export function Logo({ size = 'sm', className }: LogoProps) {
  return (
    <span
      className={cn(
        work_sans.className,
        sizeMap[size],
        'font-black italic transition leading-none',
        className,
      )}
    >
      RESTBRASIL
    </span>
  );
}
