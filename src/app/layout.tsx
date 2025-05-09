import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
// import { GeistMono } from 'geist/font/mono'; // Removed problematic import
import './globals.css';
import { AppLayout } from '@/components/layout/app-layout';

export const metadata: Metadata = {
  title: 'Faculdade para Todos',
  description: 'Sua plataforma de estudos gamificada para o vestibular.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} `/* ${GeistMono.variable} */}>
      <body className="antialiased">
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
