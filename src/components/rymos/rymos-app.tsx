import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeAnalyzer } from "./code-analyzer";
import { MCQAnalyzer } from "./mcq-analyzer";
import { Code, TestTube } from "lucide-react";

export function RymosApp() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="code" className="w-full">
        <TabsList className="grid w-full grid-cols-2 rounded-2xl h-14 p-2">
          <TabsTrigger value="code" className="text-base font-semibold rounded-xl flex items-center gap-2">
            <Code className="w-5 h-5" /> Code Analyzer
          </TabsTrigger>
          <TabsTrigger value="mcq" className="text-base font-semibold rounded-xl flex items-center gap-2">
            <TestTube className="w-5 h-5" /> MCQ Practice
          </TabsTrigger>
        </TabsList>
        <TabsContent value="code" className="mt-6">
          <CodeAnalyzer />
        </TabsContent>
        <TabsContent value="mcq" className="mt-6">
          <MCQAnalyzer />
        </TabsContent>
      </Tabs>
    </div>
  );
}
