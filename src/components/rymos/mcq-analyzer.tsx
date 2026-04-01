"use client";

import { useActionState, useEffect, useState } from "react";
import { analyzeMCQAction } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Edit, Save, Plus, Trash2 } from "lucide-react";
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
  const [isEditing, setIsEditing] = useState(false);
  const [question, setQuestion] = useState(sampleMCQ.question);
  const [choices, setChoices] = useState(sampleMCQ.choices);
  const [correctAnswer, setCorrectAnswer] = useState(sampleMCQ.correctAnswer);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: state.error,
      });
    }
  }, [state.error, toast]);

  const addChoice = () => {
    setChoices([...choices, ""]);
  };

  const removeChoice = (index: number) => {
    if (choices.length > 2) {
      setChoices(choices.filter((_, i) => i !== index));
    }
  };

  const updateChoice = (index: number, value: string) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  const saveChanges = () => {
    setIsEditing(false);
    toast({
      title: "Changes Saved",
      description: "Your MCQ has been updated successfully.",
    });
  };

  return (
    <div className="space-y-8">
      <form action={formAction} className="space-y-6">
        <input type="hidden" name="question" value={question} />
        <input type="hidden" name="choices" value={JSON.stringify(choices)} />
        <input type="hidden" name="correctAnswer" value={correctAnswer} />
        
        <div className="p-6 border rounded-2xl bg-card shadow-sm">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-headline font-bold">Multiple Choice Question</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => isEditing ? saveChanges() : setIsEditing(true)}
                className="flex items-center gap-2"
              >
                {isEditing ? (
                  <><Save className="w-4 h-4" />Save</>
                ) : (
                  <><Edit className="w-4 h-4" />Edit MCQ</>
                )}
              </Button>
            </div>
            
            <div className="space-y-2">
              {isEditing ? (
                <Textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Enter your question here..."
                  className="min-h-[120px] font-code text-sm"
                />
              ) : (
                <p className="text-muted-foreground whitespace-pre-wrap font-code text-sm p-4 bg-muted/50 rounded-xl min-h-[120px]">
                  {question}
                </p>
              )}
            </div>
            
            {isEditing ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Answer Choices:</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addChoice}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />Add Choice
                  </Button>
                </div>
                {choices.map((choice, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Input
                      value={choice}
                      onChange={(e) => updateChoice(index, e.target.value)}
                      placeholder={`Choice ${index + 1}`}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setCorrectAnswer(choice)}
                      className={correctAnswer === choice ? "bg-green-100 border-green-300" : ""}
                    >
                      {correctAnswer === choice ? "Correct" : "Set Correct"}
                    </Button>
                    {choices.length > 2 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeChoice(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <RadioGroup name="studentAnswer" required className="space-y-4">
                {choices.map((choice, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 border rounded-xl has-[:checked]:bg-accent/10 has-[:checked]:border-accent transition-colors">
                    <RadioGroupItem value={choice} id={choice} />
                    <Label htmlFor={choice} className="font-code text-base cursor-pointer">
                      {choice}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </div>
        </div>
        {!isEditing && <SubmitButton>Check My Answer</SubmitButton>}
      </form>
      {state.data && <FeedbackDisplay result={state.data} />}
    </div>
  );
}
