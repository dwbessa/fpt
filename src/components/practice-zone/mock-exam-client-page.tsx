// src/components/practice-zone/mock-exam-client-page.tsx
"use client";
import type { Question, UserAnswer, MockExamSubjectResult, MockExamAttempt } from '@/types';
import { useState, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Lightbulb, ChevronsRight, ChevronsLeft, Send, RotateCcw } from 'lucide-react';
import { useMockExams, useSubjectProgress } from '@/hooks/use-progress';
import { getSubjectById } from '@/lib/mock-data';
import Link from 'next/link';
import { cn } from '@/lib/utils'; 
import { Separator } from '../ui/separator';


interface MockExamClientPageProps {
  questions: Question[];
}

export function MockExamClientPage({ questions: initialQuestions }: MockExamClientPageProps) {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, UserAnswer>>({});
  const [submitted, setSubmitted] = useState(false);
  const [finalResults, setFinalResults] = useState<MockExamAttempt | null>(null);
  
  const { addExamAttempt } = useMockExams();
  const { updateSubjectProgress, getSubjectProgress } = useSubjectProgress();

  useEffect(() => {
    setQuestions(initialQuestions); 
    const initialUserAnswers: Record<string, UserAnswer> = {};
    initialQuestions.forEach(q => {
      initialUserAnswers[q.id] = { questionId: q.id, selectedAnswerId: null };
    });
    setUserAnswers(initialUserAnswers);
    setCurrentQuestionIndex(0);
    setSubmitted(false);
    setFinalResults(null);
  }, [initialQuestions]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerChange = (questionId: string, selectedAnswerId: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: { ...prev[questionId], selectedAnswerId }
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitExam = (event: FormEvent) => {
    event.preventDefault();
    if (submitted) return;

    const subjectScores: Record<string, { correct: number; total: number; name: string }> = {};
    let totalCorrectAnswers = 0;

    questions.forEach(q => {
      const subjectInfo = getSubjectById(q.subjectId);
      if (!subjectScores[q.subjectId]) {
        subjectScores[q.subjectId] = { correct: 0, total: 0, name: subjectInfo?.name || q.subjectId };
      }
      subjectScores[q.subjectId].total++;

      const userAnswer = userAnswers[q.id];
      if (userAnswer && userAnswer.selectedAnswerId === q.correctAnswerId) {
        subjectScores[q.subjectId].correct++;
        totalCorrectAnswers++;
        userAnswers[q.id].isCorrect = true; 
      } else if (userAnswer) {
        userAnswers[q.id].isCorrect = false; 
      }
    });

    const examResults: MockExamSubjectResult[] = Object.entries(subjectScores).map(([subjectId, data]) => ({
      subjectId,
      subjectName: data.name,
      score: data.correct,
      totalQuestions: data.total,
    }));
    
    const overallScorePercentage = questions.length > 0 ? Math.round((totalCorrectAnswers / questions.length) * 100) : 0;

    const formattedResultsForAI = examResults
      .map(res => `${res.subjectName}: ${res.score}/${res.totalQuestions}`)
      .join(', ');

    const attempt: MockExamAttempt = {
      id: `simulado_${new Date().getTime()}`,
      timestamp: new Date().toISOString(),
      subjectResults: examResults,
      overallScore: overallScorePercentage,
      totalCorrect: totalCorrectAnswers,
      totalAttempted: questions.length,
      formattedResultsForAI,
    };

    setFinalResults(attempt);
    addExamAttempt(attempt);
    setSubmitted(true);

    examResults.forEach(res => {
      const subjectProgress = res.totalQuestions > 0 ? Math.round((res.score / res.totalQuestions) * 100) : 0;
      const currentProgress = getSubjectProgress(res.subjectId);
      if (subjectProgress > currentProgress || (currentProgress === 0 && subjectProgress > 10)) {
        updateSubjectProgress(res.subjectId, Math.max(currentProgress, subjectProgress));
      }
    });
  };
  
  const handleResetExam = () => {
    const initialUserAnswers: Record<string, UserAnswer> = {};
    initialQuestions.forEach(q => {
      initialUserAnswers[q.id] = { questionId: q.id, selectedAnswerId: null };
    });
    setUserAnswers(initialUserAnswers);
    setCurrentQuestionIndex(0);
    setSubmitted(false);
    setFinalResults(null);
  }

  if (questions.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardHeader><CardTitle>Simulado</CardTitle></CardHeader>
        <CardContent><p>Nenhuma questão disponível para o simulado no momento.</p></CardContent>
         <CardFooter>
            <Button variant="outline" asChild>
                <Link href="/app/practice-zone"><span>Voltar para Zona de Prática</span></Link>
            </Button>
        </CardFooter>
      </Card>
    );
  }

  if (submitted && finalResults) {
    return (
      <Card className="shadow-xl animate-fadeIn">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Resultado do Simulado</CardTitle>
          <CardDescription>Confira seu desempenho detalhado abaixo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert variant={finalResults.overallScore >= 60 ? "default" : "destructive"} className="bg-card">
            <AlertTitle className="text-xl flex items-center gap-2">
              {finalResults.overallScore >= 60 ? <CheckCircle className="text-green-500 h-6 w-6" /> : <XCircle className="text-red-500 h-6 w-6" />}
              Pontuação Geral: {finalResults.overallScore}%
            </AlertTitle>
            <AlertDescription>
              Você acertou {finalResults.totalCorrect} de {finalResults.totalAttempted} questões.
            </AlertDescription>
          </Alert>

          <div>
            <h3 className="text-xl font-semibold mb-3">Desempenho por Matéria:</h3>
            <div className="space-y-3">
              {finalResults.subjectResults.map(res => (
                <div key={res.subjectId} className="p-3 border rounded-md bg-secondary/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{res.subjectName}</span>
                    <span className="text-sm text-muted-foreground">{res.score}/{res.totalQuestions} questões corretas</span>
                  </div>
                  <Progress value={res.totalQuestions > 0 ? (res.score / res.totalQuestions) * 100 : 0} className="h-2" />
                </div>
              ))}
            </div>
          </div>
          
          <Separator />

          <div>
            <h3 className="text-xl font-semibold mb-3">Gabarito e Explicações:</h3>
            {questions.map((q, idx) => (
              <Card key={q.id} className="mb-4">
                <CardHeader>
                  <CardTitle className="text-md">Questão {idx + 1}: {getSubjectById(q.subjectId)?.name}</CardTitle>
                  <CardDescription>{q.text}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Sua resposta: <span className={cn(userAnswers[q.id]?.isCorrect ? "text-green-600 font-semibold" : "text-red-600 font-semibold")}>
                      {q.choices.find(c => c.id === userAnswers[q.id]?.selectedAnswerId)?.text || "Não respondida"}
                      {userAnswers[q.id]?.isCorrect ? <CheckCircle className="inline ml-1 h-4 w-4" /> : <XCircle className="inline ml-1 h-4 w-4" />}
                    </span>
                  </p>
                  <p className="text-sm">Resposta correta: <span className="text-green-600 font-semibold">
                      {q.choices.find(c => c.id === q.correctAnswerId)?.text}
                    </span>
                  </p>
                  {q.explanation && (
                     <Alert className="mt-2 text-sm bg-secondary">
                        <Lightbulb className="h-4 w-4"/>
                        <AlertTitle>Explicação</AlertTitle>
                        <AlertDescription>{q.explanation}</AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6 flex-wrap">
          <Button onClick={handleResetExam} variant="outline">
            <span className="inline-flex items-center gap-2">
              <RotateCcw className="mr-2 h-4 w-4" /> Fazer Novo Simulado
            </span>
          </Button>
          <Button asChild>
            <Link href="/app/performance-analysis">
              <span className="inline-flex items-center gap-2">
                Analisar meu Desempenho <ChevronsRight className="ml-2 h-4 w-4" />
              </span>
            </Link>
          </Button>
           <Button asChild variant="link">
            <Link href="/app/practice-zone">
              <span>Voltar para Zona de Prática</span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmitExam}>
      <Card className="shadow-lg w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">Simulado - Questão {currentQuestionIndex + 1} de {questions.length}</CardTitle>
            <div className="text-sm text-muted-foreground">
              Matéria: {getSubjectById(currentQuestion.subjectId)?.name || 'Desconhecida'}
            </div>
          </div>
          <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="w-full h-2 mt-2" />
          <CardDescription className="pt-4 text-lg">{currentQuestion.text}</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
            value={userAnswers[currentQuestion.id]?.selectedAnswerId || ""}
            className="space-y-3"
          >
            {currentQuestion.choices.map(choice => (
              <Label
                key={choice.id}
                htmlFor={`${currentQuestion.id}-${choice.id}`}
                className={cn(
                  "flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer",
                  userAnswers[currentQuestion.id]?.selectedAnswerId === choice.id ? "ring-2 ring-primary border-primary bg-muted" : "border-border"
                )}
              >
                <RadioGroupItem value={choice.id} id={`${currentQuestion.id}-${choice.id}`} />
                <span className="text-base">{choice.text}</span>
              </Label>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 sticky bottom-0 bg-background py-4 border-t">
          <Button type="button" variant="outline" onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>
            <span className="inline-flex items-center gap-2">
              <ChevronsLeft className="mr-2 h-4 w-4" /> Anterior
            </span>
          </Button>
          {currentQuestionIndex < questions.length - 1 ? (
            <Button type="button" onClick={goToNextQuestion}>
              <span className="inline-flex items-center gap-2">
                Próxima <ChevronsRight className="ml-2 h-4 w-4" />
              </span>
            </Button>
          ) : (
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
              <span className="inline-flex items-center gap-2">
                <Send className="mr-2 h-4 w-4" /> Finalizar Simulado
              </span>
            </Button>
          )}
        </CardFooter>
      </Card>
    </form>
  );
}

