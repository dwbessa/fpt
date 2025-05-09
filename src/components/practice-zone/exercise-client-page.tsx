// src/components/practice-zone/exercise-client-page.tsx
"use client";
import type { Question, UserAnswer, Subject } from '@/types';
import { useState, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle, RotateCcw, Send, Lightbulb } from 'lucide-react';
import { useSubjectProgress } from '@/hooks/use-progress';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Skeleton } from '../ui/skeleton';
import { cn } from '@/lib/utils';

interface ExerciseClientPageProps {
  subject: Subject | null;
  questions: Question[];
}

export function ExerciseClientPage({ subject, questions: initialQuestions }: ExerciseClientPageProps) {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [userAnswers, setUserAnswers] = useState<Record<string, UserAnswer>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const { updateSubjectProgress, getSubjectProgress } = useSubjectProgress();

  useEffect(() => {
    setQuestions(initialQuestions);
    const initialUserAnswers: Record<string, UserAnswer> = {};
    initialQuestions.forEach(q => {
      initialUserAnswers[q.id] = { questionId: q.id, selectedAnswerId: null };
    });
    setUserAnswers(initialUserAnswers);
    setSubmitted(false);
    setScore(0);
  }, [initialQuestions]);


  if (!subject) {
    return <div className="p-4 md:p-6">Matéria não encontrada.</div>;
  }

  const handleAnswerChange = (questionId: string, selectedAnswerId: string) => {
    if (submitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: { ...prev[questionId], selectedAnswerId }
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (submitted) return;

    let correctCount = 0;
    const updatedAnswers = { ...userAnswers };

    questions.forEach(q => {
      const userAnswer = updatedAnswers[q.id];
      if (userAnswer && userAnswer.selectedAnswerId === q.correctAnswerId) {
        correctCount++;
        updatedAnswers[q.id].isCorrect = true;
      } else if (userAnswer) {
        updatedAnswers[q.id].isCorrect = false;
      }
    });

    setUserAnswers(updatedAnswers);
    const newScore = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
    setScore(newScore);
    setSubmitted(true);

    const currentProgress = getSubjectProgress(subject.id);
    if (newScore > currentProgress || (currentProgress === 0 && newScore > 10) ) {
       updateSubjectProgress(subject.id, Math.max(currentProgress, newScore));
    } else if (currentProgress < 100 && newScore > 0) {
      updateSubjectProgress(subject.id, Math.min(100, currentProgress + 5));
    }
  };

  const handleReset = () => {
    const initialUserAnswers: Record<string, UserAnswer> = {};
    questions.forEach(q => {
      initialUserAnswers[q.id] = { questionId: q.id, selectedAnswerId: null };
    });
    setUserAnswers(initialUserAnswers);
    setSubmitted(false);
    setScore(0);
  };
  
  if (!questions || questions.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Exercícios de {subject.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Nenhum exercício disponível para esta matéria no momento.</p>
        </CardContent>
        <CardFooter>
            <Button variant="outline" asChild>
                <Link href="/app/practice-zone/exercises">Voltar para Matérias</Link> {/* Updated link */}
            </Button>
        </CardFooter>
      </Card>
    );
  }


  return (
    <form onSubmit={handleSubmit}>
      {submitted && (
        <Alert variant={score >= 70 ? "default" : "destructive"} className="mb-6 shadow-md bg-card">
          <AlertTitle className="text-lg flex items-center gap-2">
            {score >= 70 ? <CheckCircle className="text-green-500" /> : <XCircle className="text-red-500" />}
            Resultado dos Exercícios
          </AlertTitle>
          <AlertDescription>
            Você acertou {score}% das questões ({Object.values(userAnswers).filter(a => a.isCorrect).length} de {questions.length}).
            {subject.id && <p>Seu progresso em {subject.name} foi atualizado para {getSubjectProgress(subject.id)}%.</p>}
          </AlertDescription>
        </Alert>
      )}

      {questions.map((question, index) => (
        <Card key={question.id} className="mb-6 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Questão {index + 1}</CardTitle>
            <CardDescription>{question.text}</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              onValueChange={(value) => handleAnswerChange(question.id, value)}
              value={userAnswers[question.id]?.selectedAnswerId || ""}
              disabled={submitted}
            >
              {question.choices.map(choice => {
                const isSelected = userAnswers[question.id]?.selectedAnswerId === choice.id;
                const isCorrect = choice.id === question.correctAnswerId;
                let choiceClass = "border-border";

                if (submitted) {
                  if (isCorrect) {
                    choiceClass = "border-green-500 ring-2 ring-green-500";
                  } else if (isSelected && !isCorrect) {
                    choiceClass = "border-red-500 ring-2 ring-red-500";
                  }
                }

                return (
                  <Label
                    key={choice.id}
                    htmlFor={`${question.id}-${choice.id}`}
                    className={cn(
                      "flex items-center space-x-3 p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer",
                      choiceClass,
                       isSelected && !submitted ? "bg-muted" : ""
                    )}
                  >
                    <RadioGroupItem value={choice.id} id={`${question.id}-${choice.id}`} disabled={submitted} />
                    <span>{choice.text}</span>
                    {submitted && isSelected && isCorrect && <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />}
                    {submitted && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-500 ml-auto" />}
                    {submitted && !isSelected && isCorrect && <CheckCircle className="h-5 w-5 text-green-500 ml-auto opacity-50" />}
                  </Label>
                );
              })}
            </RadioGroup>
            {submitted && question.explanation && (userAnswers[question.id]?.isCorrect === false || userAnswers[question.id]?.isCorrect === true) && (
              <Alert className="mt-4 bg-secondary">
                 <Lightbulb className="h-4 w-4" />
                <AlertTitle>Explicação</AlertTitle>
                <AlertDescription>{question.explanation}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      ))}

      <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 sticky bottom-0 bg-background py-4 border-t">
        <Button type="button" variant="outline" onClick={handleReset} disabled={!submitted && Object.values(userAnswers).every(a => a.selectedAnswerId === null)}>
          <RotateCcw className="mr-2 h-4 w-4" />
          {submitted ? "Tentar Novamente" : "Limpar Respostas"}
        </Button>
        <Button type="submit" disabled={submitted || Object.values(userAnswers).some(a => a.selectedAnswerId === null)} className="bg-primary hover:bg-primary/90">
           <Send className="mr-2 h-4 w-4" />
          {submitted ? "Resultados Enviados" : "Corrigir Exercícios"}
        </Button>
      </CardFooter>
       {submitted && (
        <div className="mt-6 text-center">
          <Button asChild variant="link">
            <Link href="/app/practice-zone/exercises">Voltar para seleção de matérias</Link> {/* Updated link */}
          </Button>
        </div>
      )}
    </form>
  );
}
