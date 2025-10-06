'use server';
/**
 * @fileOverview An AI agent that provides feedback on student submissions,
 * displaying the error type, explanation, correct solution, and a pro tip.
 *
 * - displayErrorTypeExplanationSolutionAndTip - A function that processes student submissions and returns AI feedback.
 * - DisplayErrorTypeExplanationSolutionAndTipInput - The input type for the displayErrorTypeExplanationSolutionAndTip function.
 * - DisplayErrorTypeExplanationSolutionAndTipOutput - The return type for the displayErrorTypeExplanationSolutionAndTip function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DisplayErrorTypeExplanationSolutionAndTipInputSchema = z.object({
  submission: z.string().describe('The student submission (code or MCQ answer).'),
  submissionType: z.enum(['code', 'mcq']).describe('The type of submission.'),
  question: z.string().optional().describe('The question for MCQ submissions.'),
  language: z.string().optional().describe('The programming language of the code submission.'),
});
export type DisplayErrorTypeExplanationSolutionAndTipInput = z.infer<typeof DisplayErrorTypeExplanationSolutionAndTipInputSchema>;

const DisplayErrorTypeExplanationSolutionAndTipOutputSchema = z.object({
  error_type: z.string().describe('The type of error (e.g., Logic flaw, Concept misunderstanding).'),
  explanation: z.string().describe('A detailed, step-by-step explanation of the error.'),
  correct_solution: z.string().describe('The correct solution or approach.'),
  pro_tip: z.string().describe('A practical tip to avoid similar mistakes in the future.'),
});
export type DisplayErrorTypeExplanationSolutionAndTipOutput = z.infer<typeof DisplayErrorTypeExplanationSolutionAndTipOutputSchema>;

export async function displayErrorTypeExplanationSolutionAndTip(input: DisplayErrorTypeExplanationSolutionAndTipInput): Promise<DisplayErrorTypeExplanationSolutionAndTipOutput> {
  return displayErrorTypeExplanationSolutionAndTipFlow(input);
}

const prompt = ai.definePrompt({
  name: 'displayErrorTypeExplanationSolutionAndTipPrompt',
  input: {schema: DisplayErrorTypeExplanationSolutionAndTipInputSchema},
  output: {schema: DisplayErrorTypeExplanationSolutionAndTipOutputSchema},
  prompt: `You are Rymos, an advanced AI mentor that analyzes student submissions and provides step-by-step explanations.
  Your goal is to turn mistakes into learning opportunities, giving explanations that are clear, human-like, and motivational.

  You will receive a student submission (code snippet or MCQ response) and its type (code or mcq). For code submissions, you will also receive the programming language.
  For MCQ submissions, you will also receive the question text.

  Detect the type of mistake:
   - Logic flaw (algorithmic or reasoning error)
   - Concept misunderstanding
   - Wrong assumption or misinterpretation
   - Syntax/runtime error (for code)

  Generate a detailed step-by-step explanation:
   - Why the student’s answer is incorrect
   - Correct approach or answer
   - Concept clarification
   - Optional tip or practical example to avoid similar mistakes

  Maintain a friendly, mentor-like tone:
   - Encourage learning
   - Avoid judgment or negative language

  Here's the student submission: {{{submission}}}
  {{#if question}}
  Here's the question for the MCQ:
  {{question}}
  {{/if}}
  Here's the submission type: {{{submissionType}}}
  {{#if language}}
  Here's the language: {{{language}}}
  {{/if}}

  Format your response as a JSON object with the following keys:
   - error_type: The type of error (e.g., Logic flaw, Concept misunderstanding).
   - explanation: A detailed, step-by-step explanation of the error.
   - correct_solution: The correct solution or approach.
   - pro_tip: A practical tip to avoid similar mistakes in the future.`,
});

const displayErrorTypeExplanationSolutionAndTipFlow = ai.defineFlow(
  {
    name: 'displayErrorTypeExplanationSolutionAndTipFlow',
    inputSchema: DisplayErrorTypeExplanationSolutionAndTipInputSchema,
    outputSchema: DisplayErrorTypeExplanationSolutionAndTipOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
