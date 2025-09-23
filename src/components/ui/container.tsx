import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

function Container({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp className={cn('container mx-auto px-4 py-8', className)} {...props} />
  );
}

export { Container };
