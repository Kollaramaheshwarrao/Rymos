"use server";

import { z } from "zod";
import { analyzeCodeAndProvideExplanation } from "@/ai/flows/analyze-code-and-provide-explanation";
import { analyzeMCQAndProvideExplanation } from "@/ai/flows/analyze-mcq-and-provide-explanation";
import { analyzeTextAndProvideExplanation } from "@/ai/flows/analyze-text-and-provide-explanation";
import { sampleMCQ } from "./mock-data";

const codeSchema = z.object({
  codeSnippet: z.string().min(10, "Code snippet must be at least 10 characters."),
  language: z.string(),
});

const mcqSchema = z.object({
    studentAnswer: z.string().min(1, "Please select an answer."),
});

const textSchema = z.object({
  textSnippet: z.string().min(10, "Text snippet must be at least 10 characters."),
});

type FormState = {
  data: any | null;
  error: string | null;
};

export async function analyzeCodeAction(prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    const parsed = codeSchema.safeParse({
      codeSnippet: formData.get("codeSnippet"),
      language: formData.get("language"),
    });

    if (!parsed.success) {
      return { data: null, error: parsed.error.errors.map((e) => e.message).join(", ") };
    }

    const result = await analyzeCodeAndProvideExplanation({
      codeSnippet: parsed.data.codeSnippet,
      programmingLanguage: parsed.data.language,
    });
    
    return { data: result, error: null };
  } catch (e: any) {
    console.error(e);
    return { data: null, error: e.message || "An unexpected error occurred." };
  }
}

export async function analyzeMCQAction(prevState: FormState, formData: FormData): Promise<FormState> {
    try {
        const parsed = mcqSchema.safeParse({
            studentAnswer: formData.get("studentAnswer"),
        });

        if (!parsed.success) {
            return { data: null, error: parsed.error.errors.map((e) => e.message).join(", ") };
        }

        const result = await analyzeMCQAndProvideExplanation({
            questionText: sampleMCQ.question,
            answerChoices: sampleMCQ.choices,
            studentAnswer: parsed.data.studentAnswer,
        });

        return { data: result, error: null };

    } catch (e: any) {
        console.error(e);
        return { data: null, error: e.message || "An unexpected error occurred." };
    }
}

export async function analyzeTextAction(prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    const parsed = textSchema.safeParse({
      textSnippet: formData.get("textSnippet"),
    });

    if (!parsed.success) {
      return { data: null, error: parsed.error.errors.map((e) => e.message).join(", ") };
    }

    const result = await analyzeTextAndProvideExplanation({
      textSnippet: parsed.data.textSnippet,
    });
    
    return { data: result, error: null };
  } catch (e: any) {
    console.error(e);
    return { data: null, error: e.message || "An unexpected error occurred." };
  }
}
