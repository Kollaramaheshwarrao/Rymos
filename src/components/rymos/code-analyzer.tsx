"use client";

import { useActionState, useEffect } from "react";
import { analyzeCodeAction } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FeedbackDisplay } from "./feedback-display";
import type { AnalyzeMCQOutput } from "@/ai/flows/analyze-mcq-and-provide-explanation";
import { SubmitButton } from "./submit-button";

const initialState = {
  data: null as AnalyzeMCQOutput | null,
  error: null as string | null,
};

const languages = [
    { value: "python", label: "Python" },
    { value: "javascript", label: "JavaScript" },
    { value: "java", label: "Java" },
    { value: "c++", label: "C++" },
    { value: "c", label: "C" },
];

export function CodeAnalyzer() {
  const [state, formAction] = useActionState(analyzeCodeAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: state.error,
      });
    }
  }, [state.error, toast]);

  return (
    <div className="space-y-8">
      <form action={formAction} className="space-y-6">
        <div className="p-6 border rounded-2xl bg-card shadow-sm">
            <div className="grid gap-4">
                 <h2 className="text-2xl font-headline font-bold">Analyze Code Snippet</h2>
                <p className="text-muted-foreground">
                    Select a language and paste your code below. Rymos will analyze it for errors and provide a detailed explanation.
                </p>
                <Select name="language" defaultValue="python" required>
                    <SelectTrigger className="w-[280px] h-11 rounded-xl">
                        <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                        {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                        </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Textarea
                    name="codeSnippet"
                    placeholder="Your code goes here..."
                    required
                    className="min-h-[250px] font-code text-sm bg-muted/50 rounded-xl"
                />
            </div>
        </div>
        <SubmitButton>Analyze My Code</SubmitButton>
      </form>

      {state.data && <FeedbackDisplay result={state.data} />}
    </div>
  );
}
