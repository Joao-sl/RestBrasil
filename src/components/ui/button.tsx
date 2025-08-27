import clsx from 'clsx';

type ButtonProps = React.ComponentPropsWithRef<'button'> & {
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient' | 'ghost' | 'danger';
};

export function Button({
  fullWidth = false,
  size = 'md',
  variant = 'default',
  ...props
}: ButtonProps) {
  const sizeMap = {
    sm: 'text-sm h-9 [&_svg]:w-[18px] min-w-9 px-2',
    md: 'text-md h-10 [&_svg]:w-[22px] min-w-10 px-4',
    lg: 'text-lg h-11 [&_svg]:w-[26px] min-w-11 px-6',
  };

  const variantMap = {
    gradient: clsx(
      'bg-gradient-to-br from-primary to-secondary',
      'bg-origin-border border-transparent text-white',
    ),
    default: clsx(
      'bg-primary border-transparent',
      'hover:bg-primary/80 text-white',
    ),
    danger: clsx(
      'bg-red-600 border-transparent',
      'hover:bg-red-600/80 text-white',
    ),
    ghost: clsx(
      'bg-transparent border-muted hover:bg-muted/50',
      'hover:border-transparent text-foreground',
    ),
  };

  return (
    // TODO: Apply styles to the component

    <button
      {...props}
      className={clsx(
        'flex items-center justify-center gap-1 font-medium',
        'rounded-lg cursor-pointer border w-fit transition',
        'disabled:bg-muted/25 disabled:hover:scale-100',
        fullWidth ? 'w-full hover:scale-102' : 'hover:scale-104',
        sizeMap[size],
        variantMap[variant],
      )}
    ></button>
  );
}
