'use server';

/**
 * @fileOverview Analyzes a student's multiple-choice question (MCQ) answer,
 * explains why the selected answer is incorrect, and provides the correct
 * answer with reasoning.
 *
 * - analyzeMCQAndProvideExplanation - A function that handles the MCQ analysis and explanation process.
 * - AnalyzeMCQInput - The input type for the analyzeMCQAndProvideExplanation function.
 * - AnalyzeMCQOutput - The return type for the analyzeMCQAndProvideExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeMCQInputSchema = z.object({
  questionText: z.string().describe('The text of the multiple-choice question.'),
  answerChoices: z.array(z.string()).describe('The possible answer choices for the question.'),
  studentAnswer: z.string().describe('The student\'s selected answer.'),
});
export type AnalyzeMCQInput = z.infer<typeof AnalyzeMCQInputSchema>;

const AnalyzeMCQOutputSchema = z.object({
  error_type: z.string().describe('The type of mistake (e.g., Logic flaw, Concept misunderstanding).'),
  explanation: z.string().describe('Step-by-step explanation in simple, human-friendly language of why the student\'s answer is incorrect.'),
  correct_solution: z.string().describe('The correct answer or approach.'),
  pro_tip: z.string().describe('A practical tip or recommendation.'),
});
export type AnalyzeMCQOutput = z.infer<typeof AnalyzeMCQOutputSchema>;

export async function analyzeMCQAndProvideExplanation(
  input: AnalyzeMCQInput
): Promise<AnalyzeMCQOutput> {
  return analyzeMCQFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeMCQPrompt',
  input: {schema: AnalyzeMCQInputSchema},
  output: {schema: AnalyzeMCQOutputSchema},
  prompt: `You are Rymos, an advanced AI mentor that analyzes students’ incorrect answers to multiple-choice questions and provides step-by-step explanations.
Your goal is to turn mistakes into learning opportunities, giving explanations that are clear, human-like, and motivational.

You will receive the question text, the possible answer choices, and the student's answer. You need to:
1. Detect the type of mistake the student made.
2. Generate a detailed step-by-step explanation of why the student’s answer is incorrect.
3. Provide the correct answer and explain why it is the correct answer.
4. Offer a practical tip or recommendation to avoid similar mistakes in the future.

Question: {{{questionText}}}
Answer Choices: {{#each answerChoices}}{{{this}}}\n{{/each}}
Student's Answer: {{{studentAnswer}}}

Format your response as a JSON object with the following keys:
- error_type:  The type of mistake (Logic flaw, Concept misunderstanding, Wrong assumption).
- explanation: Step-by-step explanation in simple, human-friendly language.
- correct_solution: The correct answer or approach.
- pro_tip: A practical tip or recommendation.

Make sure the explanation is concise (5–7 sentences) but thorough. Avoid judgment or negative language. Encourage learning.

OUTPUT FORMAT (JSON for backend integration):
{
   "error_type": "<Logic flaw / Concept misunderstanding / Wrong assumption>",
   "explanation": "<Step-by-step explanation in simple, human-friendly language>",
   "correct_solution": "<Correct answer or approach>",
   "pro_tip": "<Practical tip or recommendation>"
}
`,
});

const analyzeMCQFlow = ai.defineFlow(
  {
    name: 'analyzeMCQFlow',
    inputSchema: AnalyzeMCQInputSchema,
    outputSchema: AnalyzeMCQOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
