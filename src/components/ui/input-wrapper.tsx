import { cn } from '@/lib/utils';

function InputWrapper({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('space-y-2', className)} {...props} />;
}

export { InputWrapper };
