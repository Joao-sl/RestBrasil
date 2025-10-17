'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from './loading-spinner';
import { IconMoonFilled, IconSunFilled } from '@tabler/icons-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

export function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <LoadingSpinner />;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={() =>
            theme === 'light' ? setTheme('dark') : setTheme('light')
          }
          className='cursor-pointer'
          aria-label='Mudar esquema de cores do site'
        >
          {theme === 'light' ? (
            <IconMoonFilled
              className='text-slate-800'
              aria-label='Ícone de uma lua'
            />
          ) : (
            <IconSunFilled
              className='text-yellow-500'
              aria-label='Ícone de um sol'
            />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        Mudar tema para {theme === 'light' ? 'escuro' : 'claro'}
      </TooltipContent>
    </Tooltip>
  );
}
