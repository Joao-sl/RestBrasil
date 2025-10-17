'use client';

import { cn } from '@/lib/utils';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import React from 'react';

const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

function CollapsibleContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<
  typeof CollapsiblePrimitive.CollapsibleContent
>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      className={cn(
        'text-popover-foreground outline-none',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0',
        'data-[state=open]:slide-in-from-top-1',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        'data-[state=closed]:slide-out-to-top-1',
        'data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1',
        'data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1',
        className,
      )}
      {...props}
    >
      {children}
    </CollapsiblePrimitive.CollapsibleContent>
  );
}

CollapsibleContent.displayName = 'CollapsibleContent';

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
