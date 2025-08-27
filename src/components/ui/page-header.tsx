import clsx from 'clsx';

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg';
  centralized?: boolean;
};

export function PageHeader({
  title,
  subtitle,
  size = 'md',
  centralized,
}: PageHeaderProps) {
  // TODO: Apply styles to the component

  const titleMap = {
    sm: 'text-3xl',
    md: 'text-4xl',
    lg: 'text-5xl',
  };
  const subtitleMap = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  };

  return (
    <div className={clsx(centralized ? 'text-center' : null, 'space-y-3')}>
      <h1 className={clsx(titleMap[size], 'font-bold')}>{title}</h1>
      <p className={clsx(subtitleMap[size])}>{subtitle}</p>
    </div>
  );
}
