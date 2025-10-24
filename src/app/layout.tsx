import './globals.css';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { Footer, HomeMenu } from '@/components';
import { MyThemeProvider } from '@/providers/theme-provider';

export const metadata: Metadata = {
  title: { default: 'RestBrasil', template: '%s - RestBrasil' },
  description:
    'Acesse dados disponibilizados por diversas APIs ao redor do mundo de forma simples e prática.',
};

type RootLayoutProps = {
  children: Readonly<React.ReactNode>;
};

const geist = Geist({ subsets: ['latin'] });

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang='pt-BR'
      suppressHydrationWarning
      data-scroll-behavior='smooth'
      className={geist.className}
    >
      <body>
        <MyThemeProvider>
          <HomeMenu />
          {children}
          <Footer />
        </MyThemeProvider>
      </body>
    </html>
  );
}
