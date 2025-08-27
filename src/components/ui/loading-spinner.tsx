import clsx from 'clsx';
type LoadingSpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'white' | 'gray';
};
export function LoadingSpinner({
  size = 'sm',
  color = 'default',
}: LoadingSpinnerProps) {
  const spinnerSizeMap = {
    sm: clsx('spinner-base w-5 h-5 [--spinner-width:4px]'),
    md: clsx('spinner-base w-8 h-8 [--spinner-width:6px]'),
    lg: clsx('spinner-base w-11 h-11 [--spinner-width:8px]'),
  };

  const spinnerColorMap = {
    default: 'text-primary',
    white: 'text-white',
    gray: 'text-muted',
  };

  return (
    <div
      className={clsx(
        spinnerSizeMap[size],
        spinnerColorMap[color],
        'flex rounded-full animate-spin',
      )}
    />
  );
}
