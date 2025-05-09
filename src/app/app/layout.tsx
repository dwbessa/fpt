
import type { Metadata } from 'next';
// Removed GeistSans import, it's handled by the root layout
// Removed globals.css import, it's handled by the root layout
import { AppLayout } from '@/components/layout/app-layout';
// Toaster is already included within AppLayout, so it's removed from here.

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
    <AppLayout>
      {children}
    </AppLayout>
    // The <Toaster /> component was removed from here because 
    // it's already present in the AppLayout component (src/components/layout/app-layout.tsx)
  );
}

