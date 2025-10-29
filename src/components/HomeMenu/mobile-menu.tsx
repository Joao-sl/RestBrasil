'use client';

import Link from 'next/link';
import { NavItem } from '@/lib';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IconChevronRight, IconMenu2 } from '@tabler/icons-react';
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Logo,
  ScrollArea,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  ToggleTheme,
} from '@/components/ui';

type MobileMenuProps = {
  navMainLinks: NavItem[];
  sitePages: NavItem[];
};

export function MobileMenu({ navMainLinks, sitePages }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setIsOpen(false);
    setSheetIsOpen(false);
  }, [pathName]);

  const buttonClasses = 'justify-baseline dark:bg-transparent hover:bg-input';
  return (
    <div className='flex items-center justify-between'>
      <Link href={'/'} aria-label='Ir para home do site'>
        <Logo size='lg' />
      </Link>

      <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
        <SheetTrigger asChild>
          <Button variant='ghost'>
            <IconMenu2 /> Menu
          </Button>
        </SheetTrigger>

        <SheetContent side='left' className='flex flex-col gap-0'>
          <SheetHeader className='mb-4 border-b pb-4'>
            <SheetTitle className='text-left'>
              <Logo size='md' />
            </SheetTitle>
            <SheetDescription className='sr-only'>
              Menu de navegação do site
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className='[&>[data-radix-scroll-area-viewport]]:max-h-screen'>
            <div className='flex flex-col text-sm font-medium gap-1'>
              <SheetTitle className='mb-1'>
                <div className='flex items-center justify-between mr-2.5'>
                  <h2>Menu</h2>
                  <ToggleTheme />
                </div>
              </SheetTitle>

              {navMainLinks.map((item, idx) => {
                return (
                  <Button
                    key={idx}
                    asChild
                    variant='ghost'
                    className={buttonClasses}
                  >
                    <Link href={item.href}>{item.name}</Link>
                  </Button>
                );
              })}

              <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger
                  asChild
                  role='button'
                  aria-expanded={isOpen}
                  className='w-full'
                >
                  <Button
                    variant='ghost'
                    className={cn(
                      buttonClasses,
                      'justify-between data-[state=open]:[&_svg]:rotate-90 [&_svg]:transition',
                    )}
                  >
                    Páginas
                    <span aria-hidden='true'>
                      <IconChevronRight />
                    </span>
                  </Button>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <ScrollArea className='w-full [&>[data-radix-scroll-area-viewport]]:max-h-82'>
                    <div className='flex flex-col gap-2.5 ml-8 mt-1'>
                      {sitePages.map((item, idx) => {
                        return (
                          <Link
                            key={idx}
                            href={item.href}
                            aria-label={`${item.name} - ${item.description}`}
                            className='flex items-center gap-2 p-2 rounded-xl transition hover:bg-accent hover:text-primary'
                          >
                            <span aria-hidden='true'>{item.icon}</span>

                            <div>
                              <p>{item.name}</p>
                              <p className='text-muted-foreground font-normal'>
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
