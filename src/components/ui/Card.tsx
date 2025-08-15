import clsx from 'clsx';

type CardProps = React.ComponentPropsWithRef<'div'> & {
  variant?: 'default' | 'gradient';
};

export function Card({ variant = 'default', children, ...props }: CardProps) {
  // TODO: Apply styles to the component

  return (
    <div
      {...props}
      className={clsx(
        `flex flex-col gap-6 rounded-radius shadow-lg p-6`,
        variant === 'default'
          ? 'bg-card'
          : 'bg-gradient-to-br from-primary/15 to-tertiary/15 dark:bg-none dark:bg-card',
      )}
    >
      {children}
    </div>
  );
}
