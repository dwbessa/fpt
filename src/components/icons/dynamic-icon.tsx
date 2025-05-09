// src/components/icons/dynamic-icon.tsx
"use client";

import type { LucideIcon } from 'lucide-react';
import { Languages, Calculator, Globe2, ScrollText, Atom, FlaskConical, Leaf, HelpCircle } from 'lucide-react';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  Languages,
  Calculator,
  Globe2,
  ScrollText,
  Atom,
  FlaskConical,
  Leaf,
};

interface DynamicIconProps extends Omit<ComponentProps<'svg'>, 'name'> {
  name: string;
  className?: string;
}

export function DynamicIcon({ name, className, ...props }: DynamicIconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    // Fallback to a default icon or null if the name is not found
    console.warn(`DynamicIcon: Icon with name "${name}" not found. Rendering HelpCircle as fallback.`);
    return <HelpCircle className={cn("h-6 w-6 text-muted-foreground", className)} {...props} />;
  }

  return <IconComponent className={className} {...props} />;
}
