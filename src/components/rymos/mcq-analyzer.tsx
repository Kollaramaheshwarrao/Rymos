"use client";

import { useActionState, useEffect } from "react";
import { analyzeMCQAction } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { sampleMCQ } from "@/lib/mock-data";
import { FeedbackDisplay } from "./feedback-display";
import type { AnalyzeMCQOutput } from "@/ai/flows/analyze-mcq-and-provide-explanation";
import { SubmitButton } from "./submit-button";

const initialState = {
  data: null as AnalyzeMCQOutput | null,
  error: null as string | null,
};

export function MCQAnalyzer() {
  const [state, formAction] = useActionState(analyzeMCQAction, initialState);
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
            <div className="space-y-6">
                <div className="space-y-2">
                    <h2 className="text-2xl font-headline font-bold">Multiple Choice Question</h2>
                    <p className="text-muted-foreground whitespace-pre-wrap font-code text-sm p-4 bg-muted/50 rounded-xl">
                        {sampleMCQ.question}
                    </p>
                </div>
                
                <RadioGroup name="studentAnswer" required className="space-y-4">
                    {sampleMCQ.choices.map((choice) => (
                        <div key={choice} className="flex items-center space-x-3 p-4 border rounded-xl has-[:checked]:bg-accent/10 has-[:checked]:border-accent transition-colors">
                            <RadioGroupItem value={choice} id={choice} />
                            <Label htmlFor={choice} className="font-code text-base cursor-pointer">
                                {choice}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
        </div>
        <SubmitButton>Check My Answer</SubmitButton>
      </form>
      {state.data && <FeedbackDisplay result={state.data} />}
    </div>
  );
}
