import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
// Toaster will be included in specific layouts like login and app (authenticated)

export const metadata: Metadata = {
  title: 'Faculdade para Todos - Login',
  description: 'Acesse sua plataforma de estudos gamificada para o vestibular.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
