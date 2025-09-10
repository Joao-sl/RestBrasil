import clsx from 'clsx';
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
    contentLabel?: string;
    content?: React.ReactNode;
  }[];
} & React.ComponentProps<'dl'>;

function DashboardCard({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  return <Card className={className} {...props} />;
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
  return <CardTitle className={className} {...props} />;
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

function DashboardCardDl({ className, fields, ...props }: DashboardDlProps) {
  return (
    <dl className={cn('space-y-4', className)} {...props}>
      {fields &&
        fields.map((v, i) => {
          return (
            <div key={i}>
              <dt className='text-sm text-muted-foreground font-semibold'>
                {v.contentLabel}
              </dt>

              {Array.isArray(v.content) ? (
                v.content.map((item, idx) => {
                  return <dd key={idx}>{item}</dd>;
                })
              ) : (
                <dd className={clsx(!v.content ? 'text-red-500' : '')}>
                  {v.content ?? 'Indisponível'}
                </dd>
              )}
            </div>
          );
        })}
    </dl>
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
};
