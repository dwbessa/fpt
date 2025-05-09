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
      'The mock exam results as a string.  Include the subject and score (e.g., Math: 75, History: 82).'
    ),
  studentGoals: z
    .string()
    .describe(
      'The student goals for the exam, e.g., get above 80 in all subjects.'
    ),
});
export type AnalyzeExamPerformanceInput = z.infer<typeof AnalyzeExamPerformanceInputSchema>;

const AnalyzeExamPerformanceOutputSchema = z.object({
  strengths: z.string().describe('A summary of the student’s strengths based on the exam results.'),
  weaknesses: z.string().describe('A summary of the student’s weaknesses based on the exam results.'),
  recommendations: z
    .string()
    .describe(
      'Personalized study recommendations for the student, focusing on areas for improvement.'
    ),
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
  prompt: `You are an expert academic advisor. A student has provided their mock exam results and their goals for the exam. Analyze their performance and provide personalized feedback.

Exam Results: {{{examResults}}}
Student Goals: {{{studentGoals}}}

Provide a summary of their strengths, weaknesses, and personalized study recommendations to help them achieve their goals.

Strengths:
{{output strengths}}

Weaknesses:
{{output weaknesses}}

Recommendations:
{{output recommendations}}`,
});

const analyzeExamPerformanceFlow = ai.defineFlow(
  {
    name: 'analyzeExamPerformanceFlow',
    inputSchema: AnalyzeExamPerformanceInputSchema,
    outputSchema: AnalyzeExamPerformanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
