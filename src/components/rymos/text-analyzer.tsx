"use client";

import { useActionState, useEffect } from "react";
import { analyzeTextAction } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { FeedbackDisplay } from "./feedback-display";
import type { AnalyzeTextAndProvideExplanationOutput } from "@/ai/flows/analyze-text-and-provide-explanation";
import { SubmitButton } from "./submit-button";

const initialState = {
  data: null as AnalyzeTextAndProvideExplanationOutput | null,
  error: null as string | null,
};

export function TextAnalyzer() {
  const [state, formAction] = useActionState(analyzeTextAction, initialState);
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
            <h2 className="text-2xl font-headline font-bold">Analyze Text</h2>
            <p className="text-muted-foreground">
              Paste your text below. Rymos will analyze it for grammar, style, and clarity.
            </p>
            <Textarea
              name="textSnippet"
              placeholder="Your text goes here..."
              required
              className="min-h-[250px] text-base bg-muted/50 rounded-xl"
            />
          </div>
        </div>
        <SubmitButton>Analyze My Text</SubmitButton>
      </form>

      {state.data && <FeedbackDisplay result={state.data} />}
    </div>
  );
}
