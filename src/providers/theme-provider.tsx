'use client';

import { ThemeProvider } from 'next-themes';

type MyThemeProviderProps = {
  children: React.ReactNode;
};

export function MyThemeProvider({ children }: MyThemeProviderProps) {
  return (
    <ThemeProvider attribute='class' defaultTheme='light'>
      {children}
    </ThemeProvider>
  );
}
