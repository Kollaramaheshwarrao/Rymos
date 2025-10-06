"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Check, Copy, Lightbulb, Pilcrow, TestTube } from "lucide-react";
import type { AnalyzeMCQOutput } from "@/ai/flows/analyze-mcq-and-provide-explanation";

export function FeedbackDisplay({ result }: { result: AnalyzeMCQOutput }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.correct_solution);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="rounded-2xl shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">AI Analysis Complete</CardTitle>
        <CardDescription>
          Here's a breakdown of your submission. Use it to learn and improve!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="explanation" className="w-full">
          <TabsList className="grid w-full grid-cols-4 rounded-xl h-auto p-1.5">
            <TabsTrigger value="error_type" className="rounded-lg flex items-center gap-2"><TestTube className="w-4 h-4 hidden sm:inline-block"/>Error Type</TabsTrigger>
            <TabsTrigger value="explanation" className="rounded-lg flex items-center gap-2"><Pilcrow className="w-4 h-4 hidden sm:inline-block"/>Explanation</TabsTrigger>
            <TabsTrigger value="solution" className="rounded-lg flex items-center gap-2"><Check className="w-4 h-4 hidden sm:inline-block"/>Solution</TabsTrigger>
            <TabsTrigger value="pro_tip" className="rounded-lg flex items-center gap-2"><Lightbulb className="w-4 h-4 hidden sm:inline-block"/>Pro Tip</TabsTrigger>
          </TabsList>
          <div className="mt-4 p-6 bg-secondary/50 rounded-xl min-h-[150px] flex items-center">
            <TabsContent value="error_type">
                <p className="text-lg font-semibold text-destructive">{result.error_type}</p>
            </TabsContent>
            <TabsContent value="explanation">
                <p className="text-base leading-relaxed">{result.explanation}</p>
            </TabsContent>
            <TabsContent value="solution" className="w-full">
              <div className="relative">
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 h-7 w-7"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <pre className="p-4 bg-background rounded-lg overflow-x-auto">
                  <code className="font-code text-sm">{result.correct_solution}</code>
                </pre>
              </div>
            </TabsContent>
            <TabsContent value="pro_tip">
                <p className="text-base leading-relaxed">{result.pro_tip}</p>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
