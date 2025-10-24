'use client';

import Link from 'next/link';
import { Container } from '../ui';
import { IconAt } from '@tabler/icons-react';

function BrandLinkedin({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='5 5 22 22' {...props}>
      <path d='M6.227 12.61h4.19v13.48h-4.19zm2.095-6.7a2.43 2.43 0 0 1 0 4.86c-1.344 0-2.428-1.09-2.428-2.43s1.084-2.43 2.428-2.43m4.72 6.7h4.02v1.84h.058c.56-1.058 1.927-2.176 3.965-2.176 4.238 0 5.02 2.792 5.02 6.42v7.395h-4.183v-6.56c0-1.564-.03-3.574-2.178-3.574-2.18 0-2.514 1.7-2.514 3.46v6.668h-4.187z' />
    </svg>
  );
}

function BrandGitHub({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' {...props}>
      <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8' />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className='border-t'>
      <Container className='py-6 sm:py-4 flex flex-col items-center gap-8 sm:justify-between sm:flex-row'>
        <div className='flex flex-col gap-2'>
          <p className='font-bold text-xl'>RESTBRASIL</p>

          <p className='font-medium text-sm text-center sm:text-left'>
            Feito por{' '}
            <Link href='#' className='hover:text-primary'>
              João
            </Link>
          </p>
        </div>

        <div className='flex gap-8 text-sm font-medium *:cursor-pointer'>
          <Link href='/'>Home</Link>
          <Link href='/sobre'>Sobre</Link>
          <button
            onClick={() => {
              window.scrollTo({ top: 0 });
            }}
          >
            Topo da Página
          </button>
        </div>

        <div className='flex items-center gap-4'>
          <a
            href='https://www.linkedin.com/in/joao-sl-dev/'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Link para o linkedin do criador do site.'
          >
            <BrandLinkedin
              aria-hidden='true'
              className='size-5 transition hover:fill-blue-500 dark:fill-foreground'
            />
          </a>

          <a
            href='https://github.com/Joao-sl/'
            target='_blank'
            rel='noopener noreferrer'
            referrerPolicy='no-referrer'
            aria-label='Link para o github do criador do site'
          >
            <BrandGitHub
              aria-hidden='true'
              className='size-4.5 transition hover:fill-slate-400 dark:fill-foreground'
            />
          </a>

          <a
            href='mailto:joaosl.dev@gmail.com'
            className='transition hover:text-green-500'
          >
            <IconAt size={22} strokeWidth={2.5} />
          </a>
        </div>
      </Container>
    </footer>
  );
}
