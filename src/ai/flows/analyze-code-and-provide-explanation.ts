'use server';
/**
 * @fileOverview Analyzes student code, identifies errors, and provides step-by-step explanations.
 *
 * - analyzeCodeAndProvideExplanation - A function that handles the code analysis and explanation process.
 * - AnalyzeCodeAndProvideExplanationInput - The input type for the analyzeCodeAndProvideExplanation function.
 * - AnalyzeCodeAndProvideExplanationOutput - The return type for the analyzeCodeAndProvideExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeCodeAndProvideExplanationInputSchema = z.object({
  codeSnippet: z.string().describe('The code snippet to analyze.'),
  programmingLanguage: z.string().describe('The programming language of the code snippet.'),
});
export type AnalyzeCodeAndProvideExplanationInput = z.infer<typeof AnalyzeCodeAndProvideExplanationInputSchema>;

const AnalyzeCodeAndProvideExplanationOutputSchema = z.object({
  error_type: z.string().describe('The type of error found in the code.'),
  explanation: z.string().describe('A step-by-step explanation of the error and how to fix it.'),
  correct_solution: z.string().describe('The correct code or approach to solve the problem.'),
  pro_tip: z.string().describe('A practical tip or recommendation to avoid similar mistakes.'),
});
export type AnalyzeCodeAndProvideExplanationOutput = z.infer<typeof AnalyzeCodeAndProvideExplanationOutputSchema>;

export async function analyzeCodeAndProvideExplanation(input: AnalyzeCodeAndProvideExplanationInput): Promise<AnalyzeCodeAndProvideExplanationOutput> {
  return analyzeCodeAndProvideExplanationFlow(input);
}

const analyzeCodePrompt = ai.definePrompt({
  name: 'analyzeCodePrompt',
  input: {schema: AnalyzeCodeAndProvideExplanationInputSchema},
  output: {schema: AnalyzeCodeAndProvideExplanationOutputSchema},
  prompt: `You are Rymos, an advanced AI mentor that analyzes students’ incorrect code snippets and provides step-by-step explanations.

Your goal is to turn mistakes into learning opportunities, giving explanations that are clear, human-like, and motivational.

Analyze the following code snippet and provide a detailed explanation of any errors, a correct solution, and a pro tip.

Programming Language: {{{programmingLanguage}}}
Code Snippet:
{{{
codeSnippet
}}}

OUTPUT FORMAT (JSON for backend integration):
{
   "error_type": "<Logic flaw / Concept misunderstanding / Wrong assumption / Syntax error>",
   "explanation": "<Step-by-step explanation in simple, human-friendly language>",
   "correct_solution": "<Correct answer or approach>",
   "pro_tip": "<Practical tip or recommendation>"
}

Keep explanations concise (5–7 sentences) but thorough.  Ensure that the JSON output is valid and contains all the required fields.
`,
});

const analyzeCodeAndProvideExplanationFlow = ai.defineFlow(
  {
    name: 'analyzeCodeAndProvideExplanationFlow',
    inputSchema: AnalyzeCodeAndProvideExplanationInputSchema,
    outputSchema: AnalyzeCodeAndProvideExplanationOutputSchema,
  },
  async input => {
    const {output} = await analyzeCodePrompt(input);
    return output!;
  }
);
