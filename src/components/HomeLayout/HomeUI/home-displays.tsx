'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { FeaturedPages } from '@/lib';
import { Button, Container } from '@/components/ui';
import { IconArrowNarrowRight, IconArrowNarrowUp } from '@tabler/icons-react';

type HomeDisplaysProps = {
  featuredPages: FeaturedPages[];
};

export function HomeDisplays({ featuredPages }: HomeDisplaysProps) {
  return (
    <Container asChild>
      <section id='display' className='pt-15 md:pt-20 relative'>
        <div className='text-center pb-5 md:pb-10 space-y-2'>
          <h2 className='font-bold text-4xl lg:text-5xl'>
            Explore Nossas <span className='text-primary'>Páginas</span>
          </h2>
          <p
            className={clsx(
              'lg:text-lg text-muted-foreground font-medium',
              'text-pretty max-w-2xl mx-auto',
            )}
          >
            Consultas e exibição dos dados que você precisa em dashboards
            interativos em segundos.
          </p>
        </div>

        <div className='space-y-8 md:space-y-12'>
          {featuredPages.map((item, idx) => {
            return (
              <div
                key={item.href}
                className={clsx(
                  'flex flex-col gap-8 px-5 py-8 md:py-16 rounded-xl even:border',
                  'md:flex-row md:even:flex-row-reverse even:bg-accent',
                )}
              >
                <div className='w-full self-center'>
                  <h3 className='font-bold text-3xl md:text-4xl mb-2'>
                    {item.name}
                  </h3>

                  <p className='text-muted-foreground text-pretty mb-6 max-w-xl'>
                    {item.description}
                  </p>

                  <Button asChild size='lg'>
                    <Link
                      href={item.href}
                      className='[&_svg]:transition hover:[&_svg]:translate-x-0.5 hover:scale-105'
                    >
                      Acessar <IconArrowNarrowRight strokeWidth={2.5} />
                    </Link>
                  </Button>
                </div>

                <div className='w-full'>
                  <div
                    className={`*:size-50 md:*:size-60 *:drop-shadow-[0_0_100px_currentColor] self-center w-fit mx-auto animate-float-${idx}`}
                  >
                    {item.icon}
                  </div>
                </div>
              </div>
            );
          })}
          <div className='flex justify-center'>
            <Button
              size='lg'
              onClick={() => {
                window.scrollTo({ top: 0 });
              }}
              className='hover:scale-105 [&_svg]:transition hover:[&_svg]:-translate-y-0.5'
            >
              Mais páginas disponíveis no menu
              <IconArrowNarrowUp strokeWidth={2.5} />
            </Button>
          </div>
        </div>
      </section>
    </Container>
  );
}
