"use client";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ALL_SUBJECTS_DATA } from "@/lib/mock-data";
import type { Subject } from "@/types";
import { cn } from "@/lib/utils";

export default function ExercisesSubjectsPage() {
  return (
    <>
      <PageHeader title="Exercícios por Matéria" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Escolha uma Matéria</CardTitle>
            <CardDescription>Selecione uma matéria abaixo para começar a resolver exercícios específicos e fortalecer seu conhecimento.</CardDescription>
          </CardHeader>
        </Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ALL_SUBJECTS_DATA.map((subject: Subject) => (
            <Card key={subject.id} className="shadow-md hover:shadow-lg transition-shadow flex flex-col">
              <CardHeader className="items-center text-center">
                <subject.IconComponent className={cn("h-12 w-12 mb-3", subject.iconColor || 'text-primary')} />
                <CardTitle className="text-lg">{subject.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-center text-sm">
                  {subject.questionsForPractice && subject.questionsForPractice.length > 0 
                    ? `Disponíveis ${subject.questionsForPractice.length} ${subject.questionsForPractice.length === 1 ? "exercício" : "exercícios"} para praticar.`
                    : "Nenhum exercício disponível no momento."}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button 
                  asChild 
                  className="w-full" 
                  disabled={!subject.questionsForPractice || subject.questionsForPractice.length === 0}
                >
                  <Link href={`/practice-zone/exercises/${subject.id}`}>
                    Praticar {subject.name} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}