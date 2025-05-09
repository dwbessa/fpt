"use client";
import { PageHeader } from "@/components/layout/page-header";
import { SubjectCard } from "@/components/subject-trails/subject-card";
import type { Subject } from '@/types';
import { ALL_SUBJECTS_DATA } from '@/lib/mock-data';
import { useSubjectProgress } from "@/hooks/use-progress";
import { Skeleton } from "@/components/ui/skeleton";

export default function SubjectTrailsPage() {
  const { getSubjectProgress, isLoadingProgress } = useSubjectProgress();

  const subjectsWithProgress: Subject[] = ALL_SUBJECTS_DATA.map(subject => ({
    ...subject,
    progress: getSubjectProgress(subject.id),
    href: `/subject-trails/${subject.id}` // Ensure href is correctly set for navigation
  }));

  return (
    <>
      <PageHeader title="Trilhas de Estudo" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <p className="mb-6 text-lg text-muted-foreground">
          Escolha uma matéria para iniciar sua jornada de aprendizado ou continuar de onde parou. Cada trilha é desenhada para cobrir os tópicos essenciais de forma progressiva e gamificada.
        </p>
        {isLoadingProgress ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {subjectsWithProgress.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}