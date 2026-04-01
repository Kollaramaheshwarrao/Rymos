'use server';

import { z } from 'zod';

const Judge0SubmissionSchema = z.object({
  token: z.string(),
});

const Judge0SubmissionResultSchema = z.object({
  stdout: z.string().nullable(),
  stderr: z.string().nullable(),
  compile_output: z.string().nullable(),
  message: z.string().nullable(),
  status: z.object({
    id: z.number(),
    description: z.string(),
  }),
});
export type Judge0SubmissionResult = z.infer<typeof Judge0SubmissionResultSchema>;

// Mapping of languages supported by the app to Judge0 language IDs
// https://judge0.com/api/languages
const languageIds: Record<string, number> = {
  'c++': 54,
  'c': 50,
  'java': 62,
  'python': 71,
  'javascript': 63,
};

async function createSubmission(
  code: string,
  language: string
): Promise<string> {
  if (!process.env.JUDGE0_API_HOST || !process.env.JUDGE0_API_KEY) {
      throw new Error("Judge0 API host or key is not configured. Please set JUDGE0_API_HOST and JUDGE0_API_KEY in your .env file.");
  }

  const language_id = languageIds[language.toLowerCase()];
  if (!language_id) {
    throw new Error(`Language '${language}' is not supported for execution.`);
  }

  const response = await fetch(`${process.env.JUDGE0_API_HOST}/submissions?base64_encoded=false&wait=false`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': process.env.JUDGE0_API_KEY!,
      'X-RapidAPI-Host': new URL(process.env.JUDGE0_API_HOST!).host,
    },
    body: JSON.stringify({
      source_code: code,
      language_id: language_id,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create submission: ${response.statusText} - ${errorText}`);
  }

  const result = Judge0SubmissionSchema.parse(await response.json());
  return result.token;
}

async function getSubmissionResult(token: string): Promise<Judge0SubmissionResult> {
  let attempts = 5;
  while (attempts > 0) {
    const response = await fetch(`${process.env.JUDGE0_API_HOST}/submissions/${token}?base64_encoded=false`, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.JUDGE0_API_KEY!,
            'X-RapidAPI-Host': new URL(process.env.JUDGE0_API_HOST!).host,
        },
    });

    if (!response.ok) {
      throw new Error(`Failed to get submission result: ${response.statusText}`);
    }

    const result = await response.json();

    // Status IDs 1 (In Queue) and 2 (Processing) mean we need to wait.
    if (result.status.id > 2) {
      return Judge0SubmissionResultSchema.parse(result);
    }
    
    attempts--;
    if (attempts > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before polling again
    }
  }

  throw new Error('Code execution timed out.');
}


export async function executeCode(code: string, language: string): Promise<Judge0SubmissionResult> {
    const token = await createSubmission(code, language);
    const result = await getSubmissionResult(token);
    return result;
}
