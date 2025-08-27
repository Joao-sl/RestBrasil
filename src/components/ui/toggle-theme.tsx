'use client';

import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { IconMoonFilled, IconSunFilled } from '@tabler/icons-react';

export function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => (theme === 'light' ? setTheme('dark') : setTheme('light'))}
      className='cursor-pointer'
      title={clsx(
        `Mudar cores do site para o tema`,
        theme === 'light' ? 'escuro' : 'claro',
      )}
      aria-label='Mudar esquema de cores do site'
    >
      {theme === 'light' ? (
        <IconMoonFilled className='text-slate-800' />
      ) : (
        <IconSunFilled className='text-yellow-500' />
      )}
    </button>
  );
}
