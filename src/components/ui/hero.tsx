import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import { Input } from './input';
import { Button } from './button';

function Hero({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='hero'
      className={cn(
        'relative flex flex-col items-center justify-center gap-4 min-h-82 py-18 px-4',
        className,
      )}
      {...props}
    />
  );
}

function HeroBanner({ className, ...props }: ImageProps) {
  return (
    <Image
      data-slot='hero-banner'
      src={props.src}
      alt={props.alt}
      fill
      sizes='100vw'
      priority
      className={cn('object-cover', className)}
    ></Image>
  );
}

function HeroOverlay({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='hero-overlay'
      className={cn('absolute inset-0 opacity-88', className)}
      {...props}
    />
  );
}

function HeroHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='hero-header'
      className={cn('relative space-y-4', className)}
      {...props}
    />
  );
}

function HeroTitle({ className, ...props }: React.ComponentProps<'h1'>) {
  return (
    <h1
      data-slot='hero-title'
      className={cn('text-white text-6xl font-bold text-center', className)}
      {...props}
    />
  );
}

function HeroDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot='hero-description'
      className={cn(
        'text-white/80 text-xl text-center max-w-2xl mx-auto leading-relaxed',
        className,
      )}
      {...props}
    />
  );
}

function HeroBadge({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='hero-badge'
      className={cn(
        'relative inline-flex items-center gap-2 bg-white/10 [&_svg]:h-5 [&_svg]:w-5',
        'rounded-full px-4 py-2 text-white/80 text-sm',
        className,
      )}
      {...props}
    />
  );
}

function HeroCard({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className='px-4'>
      <div
        data-slot='hero-card'
        className={cn(
          'relative flex flex-col items-center justify-center mx-auto max-w-5xl',
          'bg-card shadow-2xl dark:shadow-white/25 py-12 px-8 -mt-10 overflow-hidden',
          'rounded-xl dark:border dark:shadow-none w-fit space-y-5',
          className,
        )}
        {...props}
      />
    </div>
  );
}

function HeroCardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='hero-card-header'
      className={cn('text-center space-y-1', className)}
      {...props}
    />
  );
}

function HeroCardTitle({ className, ...props }: React.ComponentProps<'h3'>) {
  return (
    <h3
      data-slot='hero-card-title'
      className={cn('font-bold text-2xl', className)}
      {...props}
    />
  );
}

function HeroCardDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='hero-card-description'
      className={cn('text-muted-foreground', className)}
      {...props}
    />
  );
}

function HeroCardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='hero-card-content'
      className={cn('flex flex-col sm:flex-row items-center gap-2', className)}
      {...props}
    />
  );
}

function HeroInput({
  className,
  icon,
  ...props
}: React.ComponentProps<typeof Input> & {
  icon?: React.ReactNode;
}) {
  return (
    <div className='relative'>
      {icon && (
        <label
          htmlFor={props.id}
          className='absolute top-1/2 -translate-y-1/2 left-4 text-muted-foreground/60 [&_svg]:h-5'
        >
          {icon}
        </label>
      )}

      <Input
        type='text'
        size={55}
        className={cn(
          'p-3 h-[49px] rounded-xl',
          icon ? 'pl-12 pr-6' : 'px-3',
          className,
        )}
        {...props}
      />
    </div>
  );
}

function HeroButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      className={cn(
        'hover:scale-104 h-[49px] hover:shadow-lg w-full sm:w-fit rounded-xl',
        className,
      )}
      {...props}
    />
  );
}

export {
  Hero,
  HeroBanner,
  HeroBadge,
  HeroOverlay,
  HeroHeader,
  HeroTitle,
  HeroDescription,
  HeroCard,
  HeroCardHeader,
  HeroCardTitle,
  HeroCardDescription,
  HeroCardContent,
  HeroInput,
  HeroButton,
};
