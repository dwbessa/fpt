import type { SVGProps } from 'react';
import { GraduationCap } from 'lucide-react';

export function Logo({ className, ...props }: SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <div className="flex items-center gap-2">
      <GraduationCap className={cn("h-8 w-8 text-primary", className)} {...props} />
      <span className="text-xl font-bold text-primary">Faculdade para Todos</span>
    </div>
  );
}

// Helper cn function if not globally available (though it should be from utils)
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');
