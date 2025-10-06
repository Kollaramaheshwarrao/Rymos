import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeAnalyzer } from "./code-analyzer";
import { MCQAnalyzer } from "./mcq-analyzer";
import { TextAnalyzer } from "./text-analyzer";
import { Code, TestTube, FileText } from "lucide-react";

export function RymosApp() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="code" className="w-full">
        <TabsList className="grid w-full grid-cols-3 rounded-2xl h-14 p-2">
          <TabsTrigger value="code" className="text-base font-semibold rounded-xl flex items-center gap-2">
            <Code className="w-5 h-5" /> Code Analyzer
          </TabsTrigger>
          <TabsTrigger value="mcq" className="text-base font-semibold rounded-xl flex items-center gap-2">
            <TestTube className="w-5 h-5" /> MCQ Practice
          </TabsTrigger>
          <TabsTrigger value="text" className="text-base font-semibold rounded-xl flex items-center gap-2">
            <FileText className="w-5 h-5" /> Text Analyzer
          </TabsTrigger>
        </TabsList>
        <TabsContent value="code" className="mt-6">
          <CodeAnalyzer />
        </TabsContent>
        <TabsContent value="mcq" className="mt-6">
          <MCQAnalyzer />
        </TabsContent>
        <TabsContent value="text" className="mt-6">
          <TextAnalyzer />
        </TabsContent>
      </Tabs>
    </div>
  );
}
