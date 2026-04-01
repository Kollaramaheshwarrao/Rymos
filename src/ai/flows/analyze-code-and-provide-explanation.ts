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
import { executeCode } from '@/services/judge0';

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

const executeCodeTool = ai.defineTool(
  {
    name: 'executeCode',
    description: 'Executes a code snippet in a secure sandbox to detect runtime or syntax errors. Use this if you suspect the code has an error that can only be found by running it.',
    inputSchema: z.object({
      codeSnippet: z.string().describe('The code to execute.'),
      programmingLanguage: z.string().describe('The programming language of the code.'),
    }),
    outputSchema: z.object({
      stdout: z.string().nullable(),
      stderr: z.string().nullable(),
      compile_output: z.string().nullable(),
      message: z.string().nullable(),
      status: z.object({
        description: z.string(),
      }),
    })
  },
  async ({ codeSnippet, programmingLanguage }) => {
    try {
        return await executeCode(codeSnippet, programmingLanguage);
    } catch (e: any) {
        console.error("Error executing code:", e.message);
        // Provide a structured error back to the LLM
        return {
            stdout: null,
            stderr: `Tool execution failed: ${e.message}`,
            compile_output: null,
            message: "The code execution tool failed. This might be due to a configuration issue (like a missing API key) or a problem with the execution service. Analyze the code without execution output.",
            status: { description: 'Error' },
        };
    }
  }
);


export async function analyzeCodeAndProvideExplanation(input: AnalyzeCodeAndProvideExplanationInput): Promise<AnalyzeCodeAndProvideExplanationOutput> {
  return analyzeCodeAndProvideExplanationFlow(input);
}

const analyzeCodePrompt = ai.definePrompt({
  name: 'analyzeCodePrompt',
  input: {schema: AnalyzeCodeAndProvideExplanationInputSchema},
  output: {schema: AnalyzeCodeAndProvideExplanationOutputSchema},
  tools: [executeCodeTool],
  prompt: `You are Rymos, an advanced AI mentor that analyzes students’ incorrect code snippets and provides step-by-step explanations.

Your goal is to turn mistakes into learning opportunities, giving explanations that are clear, human-like, and motivational.

Analyze the following code snippet and provide a detailed explanation of any errors, a correct solution, and a pro tip.

If you suspect the code has a runtime or syntax error, use the 'executeCode' tool to run it. The tool's output (stdout, stderr, etc.) will help you provide a more accurate analysis. Do not guess the output of the code; use the tool to be certain. If the tool fails, note the failure and analyze the code based on your own knowledge.

Programming Language: {{{programmingLanguage}}}
Code Snippet:
{{{
codeSnippet
}}}

OUTPUT FORMAT (JSON for backend integration):
{
   "error_type": "<Logic flaw / Concept misunderstanding / Wrong assumption / Syntax error / Runtime error>",
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
