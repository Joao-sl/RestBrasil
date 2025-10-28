import { cn } from '@/lib/utils';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card';

type DashboardDlProps = {
  fields?: {
    contentLabel?: React.ReactNode;
    content?: React.ReactNode;
  }[];
  ddClasses?: string;
} & React.ComponentProps<'dl'>;

type DashboardFeaturedProps = {
  item: {
    icon?: React.ReactNode;
    label?: React.ReactNode | string;
    value?: string | React.ReactNode;
  };
  className?: string;
};

function DashboardCard({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  return (
    <Card
      className={cn('shadow-lg/5 border-0 dark:border', className)}
      {...props}
    />
  );
}

function DashboardCardHeader({
  className,
  ...props
}: React.ComponentProps<typeof CardHeader>) {
  return <CardHeader className={cn('text-xl', className)} {...props} />;
}

function DashboardCardTitle({
  className,
  ...props
}: React.ComponentProps<typeof CardTitle>) {
  return (
    <CardTitle
      className={cn(
        'flex items-center gap-2',
        '[&_svg]:p-1.5 [&_svg]:w-10 [&_svg]:h-10 [&_svg]:rounded-lg',
        className,
      )}
      {...props}
    />
  );
}

function DashboardCardDescription({
  className,
  ...props
}: React.ComponentProps<typeof CardDescription>) {
  return <CardDescription className={className} {...props} />;
}

function DashboardCardAction({
  className,
  ...props
}: React.ComponentProps<typeof CardAction>) {
  return <CardAction className={className} {...props} />;
}

function DashboardCardContent({
  className,
  ...props
}: React.ComponentProps<typeof CardContent>) {
  return <CardContent className={className} {...props} />;
}

function DashboardCardFooter({
  className,
  ...props
}: React.ComponentProps<typeof CardFooter>) {
  return <CardFooter className={className} {...props} />;
}

function DashboardCardDl({
  className,
  ddClasses,
  fields,
  ...props
}: DashboardDlProps) {
  return (
    <dl className={cn('space-y-4', className)} {...props}>
      {fields &&
        fields.map((v, i) => {
          return (
            <div
              key={i}
              className={cn(
                'flex items-center justify-between gap-2 border p-3 rounded-lg text-sm',
                'border-slate-200 dark:border-input bg-white dark:bg-card',
                Array.isArray(v.content) ? 'flex-col gap-1 items-baseline' : '',
                className,
              )}
            >
              <dt className='text-sm text-muted-foreground font-semibold'>
                {v.contentLabel}
              </dt>

              {Array.isArray(v.content) ? (
                <dl className='flex flex-col max-h-44 overflow-auto w-full'>
                  {v.content.map(item => item)}
                </dl>
              ) : (
                <dd
                  className={cn(
                    !v.content
                      ? 'text-red-500 font-medium'
                      : cn(
                          'bg-slate-500 text-white px-2.5 py-0.5 rounded-md font-medium',
                          ddClasses,
                        ),
                  )}
                >
                  {v.content ? v.content : 'Indisponível'}
                </dd>
              )}
            </div>
          );
        })}
    </dl>
  );
}

function DashboardCardFeatured({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return <div className={cn('grid gap-2 mb-4', className)} {...props} />;
}

function DashboardCardItem({
  className,
  item,
  ...props
}: React.ComponentProps<'div'> & DashboardFeaturedProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-0.5 px-0.5 py-3',
        'w-full rounded-xl dark:bg-card dark:border',
        className,
      )}
      {...props}
    >
      <p>{item.icon}</p>
      <p className='text-sm font-medium text-center'>{item.label}</p>
      <span className='font-medium text-foreground text-center'>
        {item.value || 'Indisponível'}
      </span>
    </div>
  );
}

export {
  DashboardCard,
  DashboardCardHeader,
  DashboardCardTitle,
  DashboardCardDescription,
  DashboardCardAction,
  DashboardCardContent,
  DashboardCardFooter,
  DashboardCardDl,
  DashboardCardFeatured,
  DashboardCardItem,
};
