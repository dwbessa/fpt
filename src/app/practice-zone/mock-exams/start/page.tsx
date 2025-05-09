import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info } from "lucide-react";
import Link from "next/link";
import { getAllExamQuestions } from "@/lib/mock-data"; // To get total questions

export default function StartMockExamPage() {
  const totalQuestions = getAllExamQuestions().length;

  return (
    <>
      <PageHeader title="Iniciar Simulado" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 flex items-center justify-center">
        <Card className="w-full max-w-lg shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Preparado para o Desafio?</CardTitle>
            <CardDescription className="text-lg">
              Este simulado testará seus conhecimentos em diversas matérias, preparando você para o vestibular.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center p-4 bg-secondary rounded-md">
              <Info className="h-6 w-6 mr-3 text-primary" />
              <div>
                <p className="font-semibold">Este simulado contém {totalQuestions} questões.</p>
                <p className="text-sm text-muted-foreground">As questões cobrem todas as principais matérias do vestibular.</p>
              </div>
            </div>
            <p className="text-muted-foreground text-center">
              Reserve um tempo adequado, encontre um local tranquilo e concentre-se. Boa sorte!
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6">
              <Link href="/practice-zone/mock-exams/take">
                Começar Simulado Agora <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}