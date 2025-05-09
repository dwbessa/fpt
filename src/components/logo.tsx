import type { SVGProps } from 'react';
import { GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils'; // Import cn from global utils

export function Logo({ className, ...props }: SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <div className="flex items-center gap-2">
      <GraduationCap className={cn("h-8 w-8 text-primary", className)} {...props} />
      <span className="text-xl font-bold text-primary group-data-[collapsible=icon]:hidden">Faculdade para Todos</span>
    </div>
  );
}
