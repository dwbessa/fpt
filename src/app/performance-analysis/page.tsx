"use client";

import { useState, type FormEvent } from 'react';
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Lightbulb, TrendingDown, TrendingUp, Sparkles } from 'lucide-react';
import { analyzeExamPerformance, type AnalyzeExamPerformanceOutput } from '@/ai/flows/analyze-exam-performance';
import { useToast } from "@/hooks/use-toast";


export default function PerformanceAnalysisPage() {
  const [examResults, setExamResults] = useState('');
  const [studentGoals, setStudentGoals] = useState('');
  const [analysis, setAnalysis] = useState<AnalyzeExamPerformanceOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    if (!examResults.trim() || !studentGoals.trim()) {
      setError("Por favor, preencha os resultados do simulado e seus objetivos.");
      setIsLoading(false);
      toast({
        title: "Erro de Validação",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await analyzeExamPerformance({ examResults, studentGoals });
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
              Insira os resultados do seu último simulado e seus objetivos para receber uma análise detalhada 
              e recomendações de estudo personalizadas pela nossa Inteligência Artificial.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="examResults" className="text-base">Resultados do Simulado</Label>
                <Textarea
                  id="examResults"
                  value={examResults}
                  onChange={(e) => setExamResults(e.target.value)}
                  placeholder="Ex: Matemática: 75, Português: 82, História: 60..."
                  rows={5}
                  className="text-base"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Liste as matérias e suas respectivas notas.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentGoals" className="text-base">Seus Objetivos</Label>
                <Textarea
                  id="studentGoals"
                  value={studentGoals}
                  onChange={(e) => setStudentGoals(e.target.value)}
                  placeholder="Ex: Atingir 80+ em todas as matérias, focar em exatas..."
                  rows={3}
                  className="text-base"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Descreva suas metas para esta fase de estudos.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
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
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
}

// Add fadeIn animation to tailwind.config.js if you want a smooth appearance for results
// keyframes: { 'fadeIn': { '0%': { opacity: 0 }, '100%': { opacity: 1 } } },
// animation: { 'fadeIn': 'fadeIn 0.5s ease-in-out' },
