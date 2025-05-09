
"use client";

import { useState, type FormEvent, useEffect } from 'react';
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Lightbulb, TrendingDown, TrendingUp, Sparkles, Info, RefreshCw } from 'lucide-react';
import { analyzeExamPerformance, type AnalyzeExamPerformanceOutput } from '@/ai/flows/analyze-exam-performance';
import { useToast } from "@/hooks/use-toast";
import { useMockExams } from '@/hooks/use-progress';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton'; 

export default function PerformanceAnalysisPage() {
  const [examResults, setExamResults] = useState('');
  const [studentGoals, setStudentGoals] = useState('');
  const [analysis, setAnalysis] = useState<AnalyzeExamPerformanceOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { getLatestExamAttempt, isLoadingExams } = useMockExams();
  const [isAutoLoading, setIsAutoLoading] = useState(true);

  useEffect(() => {
    if (!isLoadingExams) {
      const latestAttempt = getLatestExamAttempt();
      if (latestAttempt && latestAttempt.formattedResultsForAI) {
        setExamResults(latestAttempt.formattedResultsForAI);
        toast({
          title: "Resultados Carregados",
          description: "Os resultados do seu último simulado foram carregados automaticamente.",
        });
      }
      setIsAutoLoading(false);
    }
  }, [isLoadingExams, getLatestExamAttempt, toast]);

  const handleSubmit = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    if (!examResults.trim()) {
      setError("Não foram encontrados resultados de simulados para análise. Por favor, realize um simulado primeiro ou insira os resultados manualmente.");
      setIsLoading(false);
      toast({
        title: "Sem Resultados",
        description: "Realize um simulado ou insira os resultados manualmente.",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await analyzeExamPerformance({ examResults, studentGoals: studentGoals.trim() || undefined });
      setAnalysis(result);
      toast({
        title: "Análise Concluída!",
        description: "Seu feedback personalizado está pronto.",
      });
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : "Ocorreu um erro desconhecido.";
      setError(`Falha ao analisar o desempenho: ${errorMessage}`);
      toast({
        title: "Erro na Análise",
        description: `Não foi possível gerar seu feedback: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRefreshResults = () => {
    setIsAutoLoading(true);
    const latestAttempt = getLatestExamAttempt();
      if (latestAttempt && latestAttempt.formattedResultsForAI) {
        setExamResults(latestAttempt.formattedResultsForAI);
        toast({
          title: "Resultados Atualizados",
          description: "Os resultados do seu último simulado foram recarregados.",
        });
      } else {
         toast({
          title: "Nenhum Simulado Encontrado",
          description: "Não há simulados recentes para carregar.",
          variant: "destructive",
        });
      }
    setIsAutoLoading(false);
  }


  return (
    <>
      <PageHeader title="Análise de Desempenho" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">Feedback Personalizado com IA</CardTitle>
            </div>
            <CardDescription>
              {isAutoLoading ? "Carregando resultados do último simulado..." : 
               examResults ? "Seu último simulado foi carregado. Adicione seus objetivos (opcional) e clique em analisar." :
               "Insira os resultados do seu simulado ou realize um para análise automática."
              }
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {isAutoLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-8 w-1/3" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-8 w-1/3" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="examResults" className="text-base">Resultados do Simulado</Label>
                      <Button type="button" variant="outline" size="sm" onClick={handleRefreshResults} disabled={isLoadingExams}>
                        <RefreshCw className="mr-2 h-4 w-4"/> Recarregar Último Simulado
                      </Button>
                    </div>
                    <Textarea
                      id="examResults"
                      value={examResults}
                      onChange={(e) => setExamResults(e.target.value)}
                      placeholder="Ex: Matemática: 7/10, Português: 5/8..."
                      rows={3}
                      className="text-base"
                      required
                    />
                    <p className="text-sm text-muted-foreground">
                      Formato: Matéria1: Acertos/Total, Matéria2: Acertos/Total. Carregado automaticamente se houver simulados.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentGoals" className="text-base">Seus Objetivos (Opcional)</Label>
                    <Textarea
                      id="studentGoals"
                      value={studentGoals}
                      onChange={(e) => setStudentGoals(e.target.value)}
                      placeholder="Ex: Atingir 80+ em todas as matérias, focar em exatas..."
                      rows={3}
                      className="text-base"
                    />
                    <p className="text-sm text-muted-foreground">
                      Descreva suas metas para esta fase de estudos. Isso ajuda a IA a personalizar o feedback.
                    </p>
                  </div>
                </>
              )}
               {!isAutoLoading && !examResults && !isLoadingExams && (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Nenhum resultado de simulado encontrado!</AlertTitle>
                  <AlertDescription>
                    Parece que você ainda não fez nenhum simulado. <Link href="/app/practice-zone/mock-exams/start" className="underline text-primary hover:text-primary/80">Faça um simulado agora</Link> para obter uma análise automática ou insira seus resultados manualmente acima.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={isLoading || isAutoLoading || !examResults.trim()} className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analisando...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Analisar Desempenho
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {error && (
          <Alert variant="destructive" className="shadow-md">
            <AlertTitle>Erro!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {analysis && (
          <Card className="shadow-lg animate-fadeIn">
            <CardHeader>
              <CardTitle className="text-2xl">Seu Feedback Personalizado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="flex items-center text-xl font-semibold mb-2 text-green-600">
                  <TrendingUp className="mr-2 h-6 w-6" /> Pontos Fortes
                </h3>
                <p className="text-base whitespace-pre-line">{analysis.strengths}</p>
              </div>
              <hr/>
              <div>
                <h3 className="flex items-center text-xl font-semibold mb-2 text-red-600">
                  <TrendingDown className="mr-2 h-6 w-6" /> Pontos a Melhorar
                </h3>
                <p className="text-base whitespace-pre-line">{analysis.weaknesses}</p>
              </div>
              <hr/>
              <div>
                <h3 className="flex items-center text-xl font-semibold mb-2 text-blue-600">
                  <Lightbulb className="mr-2 h-6 w-6" /> Recomendações de Estudo
                </h3>
                <p className="text-base whitespace-pre-line">{analysis.recommendations}</p>
              </div>
              <hr/>
               <div>
                <h3 className="flex items-center text-xl font-semibold mb-2 text-primary">
                  <Sparkles className="mr-2 h-6 w-6" /> Feedback Geral e Próximos Passos
                </h3>
                <p className="text-base whitespace-pre-line">{analysis.generalFeedback}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
}
