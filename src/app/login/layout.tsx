// src/app/login/layout.tsx
import type { ReactNode } from 'react';
import { Toaster } from "@/components/ui/toaster";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-background p-6 selection:bg-primary/20">
        {children}
      </main>
      <Toaster />
    </>
  );
}
