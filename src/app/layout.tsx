import './globals.css';
import type { Metadata } from 'next';
import { MyThemeProvider } from '@/providers/theme-provider';
import { Inter } from 'next/font/google';
import { HomeMenu } from '@/components';

export const metadata: Metadata = {
  title: { default: 'RestBrasil', template: '%s - RestBrasil' },
  description:
    'Acesse dados disponibilizados por diversas APIs ao redor do mundo de forma simples e prática.',
};

const inter = Inter({ subsets: ['latin'] });

type RootLayoutProps = {
  children: Readonly<React.ReactNode>;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang='pt-BR'
      suppressHydrationWarning
      data-scroll-behavior='smooth'
      className={inter.className}
    >
      <body>
        <MyThemeProvider>
          <HomeMenu />
          {children}
        </MyThemeProvider>
      </body>
    </html>
  );
}
