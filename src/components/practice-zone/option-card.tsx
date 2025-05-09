import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PracticeOption {
  id: string;
  title: string;
  description: string;
  IconComponent: LucideIcon;
  href: string;
  buttonText: string;
  iconColor?: string;
  buttonVariant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";
  buttonClassName?: string;
}

interface OptionCardProps {
  option: PracticeOption;
}

export function OptionCard({ option }: OptionCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="items-center text-center">
        <option.IconComponent className={cn("h-16 w-16 mb-4", option.iconColor || 'text-accent')} />
        <CardTitle className="text-xl">{option.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-center min-h-[60px]">{option.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild className={cn("w-full", option.buttonClassName)} variant={option.buttonVariant || 'default'}>
          <Link href={option.href}>
            {option.buttonText} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
