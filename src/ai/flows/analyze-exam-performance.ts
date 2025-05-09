// src/ai/flows/analyze-exam-performance.ts
'use server';

/**
 * @fileOverview Analyzes mock exam performance and provides personalized study recommendations.
 *
 * - analyzeExamPerformance - A function that handles the exam performance analysis process.
 * - AnalyzeExamPerformanceInput - The input type for the analyzeExamPerformance function.
 * - AnalyzeExamPerformanceOutput - The return type for the analyzeExamPerformance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeExamPerformanceInputSchema = z.object({
  examResults: z
    .string()
    .describe(
      'The mock exam results as a string. Format: "Matéria1: Acertos/Total, Matéria2: Acertos/Total" (e.g., Matemática: 7/10, Português: 5/8).'
    ),
  studentGoals: z
    .string()
    .optional() // Made studentGoals optional
    .describe(
      '(Opcional) Os objetivos do estudante para o exame, e.g., obter acima de 80 em todas as matérias, focar em exatas.'
    ),
});
export type AnalyzeExamPerformanceInput = z.infer<typeof AnalyzeExamPerformanceInputSchema>;

const AnalyzeExamPerformanceOutputSchema = z.object({
  strengths: z.string().describe('Um resumo dos pontos fortes do estudante com base nos resultados do exame.'),
  weaknesses: z.string().describe('Um resumo dos pontos fracos do estudante com base nos resultados do exame.'),
  recommendations: z
    .string()
    .describe(
      'Recomendações de estudo personalizadas para o estudante, focando nas áreas de melhoria. As recomendações devem ser acionáveis e específicas.'
    ),
  generalFeedback: z.string().describe('Um feedback geral sobre o desempenho e dicas para os próximos passos.')
});
export type AnalyzeExamPerformanceOutput = z.infer<typeof AnalyzeExamPerformanceOutputSchema>;

export async function analyzeExamPerformance(
  input: AnalyzeExamPerformanceInput
): Promise<AnalyzeExamPerformanceOutput> {
  return analyzeExamPerformanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeExamPerformancePrompt',
  input: {schema: AnalyzeExamPerformanceInputSchema},
  output: {schema: AnalyzeExamPerformanceOutputSchema},
  prompt: `Você é um orientador acadêmico especialista em preparação para o vestibular. Um estudante forneceu os resultados do seu simulado. Analise o desempenho e forneça um feedback personalizado e detalhado.

Resultados do Simulado (formato: Matéria: Acertos/Total de Questões):
{{{examResults}}}

{{#if studentGoals}}
Objetivos do Estudante:
{{{studentGoals}}}
{{/if}}

Com base nos resultados:
1.  Identifique os **Pontos Fortes**: matérias ou tópicos onde o estudante demonstrou bom conhecimento.
2.  Identifique os **Pontos a Melhorar**: matérias ou tópicos onde o desempenho foi mais baixo e que necessitam de mais atenção.
3.  Forneça **Recomendações de Estudo Personalizadas**: sugira estratégias de estudo específicas para as áreas de fraqueza, como focar em certos tipos de problemas, revisar conceitos chave, ou utilizar recursos específicos. As recomendações devem ser práticas e úteis.
4.  Forneça um **Feedback Geral**: uma mensagem encorajadora com dicas sobre como manter a motivação e planejar os próximos passos nos estudos.

Seja claro, objetivo e motivador. Formate a saída conforme o schema JSON esperado.
`,
});

const analyzeExamPerformanceFlow = ai.defineFlow(
  {
    name: 'analyzeExamPerformanceFlow',
    inputSchema: AnalyzeExamPerformanceInputSchema,
    outputSchema: AnalyzeExamPerformanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("A IA não conseguiu gerar uma análise. Tente novamente.");
    }
    return output;
  }
);