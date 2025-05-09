// src/app/app/subject-trails/[subjectId]/page.tsx
import { PageHeader } from "@/components/layout/page-header";
import { getSubjectById, ALL_SUBJECTS_DATA } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, BookCopy, ListChecks } from "lucide-react";
import { DynamicIcon } from "@/components/icons/dynamic-icon";
import { cn } from "@/lib/utils";

interface SubjectTrailPageParams {
  params: {
    subjectId: string;
  };
}

export default function SubjectTrailPage({ params }: SubjectTrailPageParams) {
  const subject = getSubjectById(params.subjectId);

  if (!subject) {
    notFound();
  }

  return (
    <>
      <PageHeader title={`Trilha de Estudo: ${subject.name}`} />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        <Card className="shadow-lg">
          <CardHeader className="items-center text-center">
             <DynamicIcon 
                name={subject.iconName} 
                className={cn("h-20 w-20 mb-4", subject.iconColor || 'text-primary')} 
            />
            <CardTitle className="text-3xl">{subject.name}</CardTitle>
            <CardDescription className="text-lg">{subject.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left">
                {typeof subject.lessonsCount === 'number' && (
                    <div className="flex items-center justify-center md:justify-start gap-2 p-3 bg-secondary rounded-md">
                        <BookCopy className="h-6 w-6 text-primary" /> 
                        <span className="text-md">{subject.lessonsCount} {subject.lessonsCount === 1 ? "lição planejada" : "lições planejadas"}</span>
                    </div>
                )}
                {typeof subject.exercisesCount === 'number' && (
                    <div className="flex items-center justify-center md:justify-start gap-2 p-3 bg-secondary rounded-md">
                        <ListChecks className="h-6 w-6 text-primary" />
                        <span className="text-md">{subject.exercisesCount} {subject.exercisesCount === 1 ? "exercício proposto" : "exercícios propostos"}</span>
                    </div>
                )}
            </div>
            
            <div className="pt-4">
                <h3 className="text-xl font-semibold mb-2 text-center">Conteúdo da Trilha</h3>
                <p className="text-muted-foreground text-center">
                    Esta trilha de estudo ainda está em desenvolvimento. Em breve, você encontrará aqui lições detalhadas,
                    exemplos práticos e atividades para aprofundar seu conhecimento em {subject.name}.
                </p>
                {/* Placeholder for future content */}
                <div className="mt-6 space-y-3">
                    {[1,2,3].map(i => (
                         <Card key={i} className="bg-muted/50">
                            <CardHeader>
                                <CardTitle className="text-lg">Lição {i}: Tópico em Breve</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Conteúdo da lição {i} sobre {subject.name} será adicionado aqui.</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/app/subject-trails">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para Trilhas de Estudo
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}

// Optional: Generate static paths if you have a fixed set of subjects
export async function generateStaticParams() {
  return ALL_SUBJECTS_DATA.map((subject) => ({
    subjectId: subject.id,
  }));
}
