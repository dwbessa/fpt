import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
// import { GeistMono } from 'geist/font/mono'; // Already removed
import '../globals.css'; // Adjusted path for globals.css
import { AppLayout } from '@/components/layout/app-layout';
import { Toaster } from "@/components/ui/toaster"; // Add Toaster here

export const metadata: Metadata = {
  title: 'Faculdade para Todos',
  description: 'Sua plataforma de estudos gamificada para o vestibular.',
};

export default function AuthenticatedAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable}`}>
      <body className="antialiased">
        <AppLayout>
          {children}
        </AppLayout>
        <Toaster /> {/* Toaster for authenticated app sections */}
      </body>
    </html>
  );
}
