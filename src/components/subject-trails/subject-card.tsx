// src/components/subject-trails/subject-card.tsx
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookCopy, ListChecks } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import type { Subject as SubjectType } from '@/types';
import { DynamicIcon } from '@/components/icons/dynamic-icon'; // Import DynamicIcon

export interface SubjectCardProps {
  subject: SubjectType;
}

export function SubjectCard({ subject }: SubjectCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="items-center text-center">
        {/* Use DynamicIcon component */}
        <DynamicIcon 
          name={subject.iconName} 
          className={cn("h-16 w-16 mb-4", subject.iconColor || 'text-primary')} 
        />
        <CardTitle className="text-xl">{subject.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-center min-h-[40px] mb-2">{subject.description}</CardDescription>
        <div className="space-y-1 text-sm text-muted-foreground text-center">
          {typeof subject.lessonsCount === 'number' && (
             <div className="flex items-center justify-center gap-1">
                <BookCopy className="h-4 w-4" /> 
                <span>{subject.lessonsCount} {subject.lessonsCount === 1 ? "lição" : "lições"}</span>
            </div>
          )}
          {typeof subject.exercisesCount === 'number' && (
            <div className="flex items-center justify-center gap-1">
                <ListChecks className="h-4 w-4" />
                <span>{subject.exercisesCount} {subject.exercisesCount === 1 ? "exercício" : "exercícios"}</span>
            </div>
          )}
        </div>
        {typeof subject.progress === 'number' && subject.progress > 0 && (
          <div className="mt-4">
            <Progress value={subject.progress} aria-label={`Progresso em ${subject.name}: ${subject.progress}%`} className="h-2" />
            <p className="text-xs text-muted-foreground text-center mt-1">{subject.progress}% concluído</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-primary hover:bg-primary/90">
          <Link href={subject.href}>
            {subject.progress && subject.progress > 0 && subject.progress < 100 ? 'Continuar Trilha' : 'Iniciar Trilha'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
