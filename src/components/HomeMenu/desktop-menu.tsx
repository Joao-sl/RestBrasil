import Image from 'next/image';
import Link from 'next/link';
import { NavItem } from '@/lib';
import { IconChevronDown } from '@tabler/icons-react';
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
} from '@radix-ui/react-navigation-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuLink,
  NavigationMenuList,
  ScrollArea,
  ToggleTheme,
} from '@/components/ui';

type DesktopMenuProps = {
  navMainLinks: NavItem[];
  sitePages: NavItem[];
  logoUrl: string;
};

export function DesktopMenu({
  navMainLinks,
  sitePages,
  logoUrl,
}: DesktopMenuProps) {
  return (
    <div>
      <div className='flex justify-between'>
        <Link href='/' aria-label='Voltar para pagina inicial'>
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt='Logo do site'
              width={200}
              height={200}
              aria-hidden='true'
              className='h-auto w-36 hover:brightness-110 transition'
            />
          ) : (
            <div className='text-xl font-bold'>REST BRASIL</div>
          )}
        </Link>

        <div className='flex items-center gap-6 text-sm font-medium'>
          {navMainLinks.map((item, idx) => {
            return (
              <Link key={idx} href={item.href}>
                {item.name}
              </Link>
            );
          })}

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className='flex items-center gap-1 data-[state=open]:[&_svg]:rotate-180 [&_svg]:transition'>
                  Páginas
                  <span aria-hidden='true'>
                    <IconChevronDown
                      size={12}
                      strokeWidth={4}
                      className='text-foreground/85'
                    />
                  </span>
                </NavigationMenuTrigger>

                <NavigationMenuContent className='p-4'>
                  <h3 className='pb-4 text-sm text-muted-foreground'>
                    Páginas do site
                  </h3>
                  <ScrollArea className='h-[200px]'>
                    <ul className='grid grid-cols-2 gap-3 w-auto min-w-[480px]'>
                      {sitePages.map((item, idx) => {
                        return (
                          <NavigationMenuLink key={idx} asChild>
                            <Link
                              href={item.href}
                              aria-label={`${item.name} - ${item.description}`}
                              className='flex gap-3 items-center p-3 rounded-lg transition hover:bg-input border border-border/80'
                            >
                              <span aria-hidden='true'>{item.icon}</span>
                              <div>
                                <p>{item.name}</p>
                                <p className='text-muted-foreground text-sm font-normal'>
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        );
                      })}
                    </ul>
                  </ScrollArea>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuIndicator />
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <ToggleTheme />
      </div>
    </div>
  );
}
