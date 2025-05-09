"use client";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BookOpenText, Gamepad2 } from "lucide-react";
import Link from "next/link";
import { useSubjectProgress } from "@/hooks/use-progress";
import { ALL_SUBJECTS_DATA } from "@/lib/mock-data";
import type { Subject } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { getSubjectProgress, isLoadingProgress } = useSubjectProgress();

  const subjectsToShowOnDashboard: Subject[] = ALL_SUBJECTS_DATA.slice(0, 3); // Show first 3

  const overallProgress = () => {
    if (isLoadingProgress || ALL_SUBJECTS_DATA.length === 0) return 0;
    const totalProgress = ALL_SUBJECTS_DATA.reduce((sum, subject) => sum + (getSubjectProgress(subject.id) || 0), 0);
    return Math.round(totalProgress / ALL_SUBJECTS_DATA.length);
  };
  
  const overallProgressValue = overallProgress();

  return (
    <>
      <PageHeader title="Dashboard" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Bem-vindo(a) de volta!</CardTitle>
            <CardDescription>Continue sua jornada de aprendizado e prepare-se para o sucesso.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Seu progresso geral nas trilhas de estudo:</p>
            {isLoadingProgress ? (
              <Skeleton className="h-6 w-1/2 mb-1" />
            ) : (
              <>
                <Progress value={overallProgressValue} aria-label={`Progresso geral: ${overallProgressValue}%`} className="h-6 mb-1" />
                <p className="text-right text-sm text-muted-foreground">{overallProgressValue}% Concluído</p>
              </>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Resumo do Progresso</CardTitle>
              <CardDescription>Sua evolução em algumas matérias.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingProgress ? (
                <div className="space-y-4">
                  {Array.from({length: 3}).map((_, i) => (
                    <div key={i}>
                      <Skeleton className="h-4 w-1/3 mb-1" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {subjectsToShowOnDashboard.map(subject => {
                    const progress = getSubjectProgress(subject.id);
                    return (
                      <div key={subject.id}>
                        <div className="flex justify-between mb-1">
                          <span>{subject.name}</span>
                          <span className="text-sm text-muted-foreground">{progress || 0}%</span>
                        </div>
                        <Progress value={progress || 0} aria-label={`Progresso em ${subject.name}: ${progress || 0}%`} />
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link href="/app/subject-trails">Ver todas as trilhas <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <BookOpenText className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Trilhas de Estudo</CardTitle>
              <CardDescription>Acesse os conteúdos e siga seu plano de aprendizado.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Explore as matérias disponíveis e avance no seu ritmo.</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link href="/app/subject-trails">Começar a aprender <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <Gamepad2 className="h-10 w-10 text-accent mb-2" />
              <CardTitle>Zona de Prática</CardTitle>
              <CardDescription>Teste seus conhecimentos com exercícios e simulados.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Desafie-se e identifique áreas para melhorar.</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/app/practice-zone">Testar conhecimentos <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </>
  );
}
