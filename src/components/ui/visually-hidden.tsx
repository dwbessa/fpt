// src/components/ui/visually-hidden.tsx
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface VisuallyHiddenProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements; // Allow specifying the HTML element type
}

export function VisuallyHidden({ children, className, as: Component = 'span', ...props }: VisuallyHiddenProps) {
  return (
    <Component
      className={cn(
        "absolute w-[1px] h-[1px] p-0 m-[-1px] overflow-hidden clip-[rect(0,0,0,0)] whitespace-nowrap border-0",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
