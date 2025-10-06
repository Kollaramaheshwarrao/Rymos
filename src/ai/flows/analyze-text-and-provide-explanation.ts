'use server';
/**
 * @fileOverview Analyzes a text snippet, identifies areas for improvement, and provides explanations.
 *
 * - analyzeTextAndProvideExplanation - A function that handles the text analysis and explanation process.
 * - AnalyzeTextAndProvideExplanationInput - The input type for the analyzeTextAndProvideExplanation function.
 * - AnalyzeTextAndProvideExplanationOutput - The return type for the analyzeTextAndProvideExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeTextAndProvideExplanationInputSchema = z.object({
  textSnippet: z.string().describe('The text snippet to analyze.'),
});
export type AnalyzeTextAndProvideExplanationInput = z.infer<typeof AnalyzeTextAndProvideExplanationInputSchema>;

const AnalyzeTextAndProvideExplanationOutputSchema = z.object({
  error_type: z.string().describe('The type of issue (e.g., Grammatical Error, Clarity, Awkward Phrasing).'),
  explanation: z.string().describe('A step-by-step explanation of the issue and how to improve it.'),
  correct_solution: z.string().describe('The suggested improved text.'),
  pro_tip: z.string().describe('A practical tip or recommendation to improve writing skills.'),
});
export type AnalyzeTextAndProvideExplanationOutput = z.infer<typeof AnalyzeTextAndProvideExplanationOutputSchema>;

export async function analyzeTextAndProvideExplanation(input: AnalyzeTextAndProvideExplanationInput): Promise<AnalyzeTextAndProvideExplanationOutput> {
  return analyzeTextAndProvideExplanationFlow(input);
}

const analyzeTextPrompt = ai.definePrompt({
  name: 'analyzeTextPrompt',
  input: {schema: AnalyzeTextAndProvideExplanationInputSchema},
  output: {schema: AnalyzeTextAndProvideExplanationOutputSchema},
  prompt: `You are Rymos, an advanced AI mentor that analyzes students’ writing and provides constructive feedback.

Your goal is to help users improve their writing by providing explanations that are clear, human-like, and motivational.

Analyze the following text snippet and provide a detailed explanation of any errors or areas for improvement, a corrected version, and a pro tip.

Text Snippet:
{{{
textSnippet
}}}

OUTPUT FORMAT (JSON for backend integration):
{
   "error_type": "<Grammatical Error / Clarity / Awkward Phrasing / Style>",
   "explanation": "<Step-by-step explanation in simple, human-friendly language>",
   "correct_solution": "<Suggested improved text>",
   "pro_tip": "<Practical tip or recommendation for better writing>"
}

Keep explanations concise (5–7 sentences) but thorough. Ensure that the JSON output is valid and contains all the required fields.
`,
});

const analyzeTextAndProvideExplanationFlow = ai.defineFlow(
  {
    name: 'analyzeTextAndProvideExplanationFlow',
    inputSchema: AnalyzeTextAndProvideExplanationInputSchema,
    outputSchema: AnalyzeTextAndProvideExplanationOutputSchema,
  },
  async input => {
    const {output} = await analyzeTextPrompt(input);
    return output!;
  }
);
