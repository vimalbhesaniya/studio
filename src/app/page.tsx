'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import PromptForm from '@/components/document-ai/prompt-form';
import Editor from '@/components/document-ai/editor';
import {
  generateDocumentFromPrompt,
  GenerateDocumentFromPromptOutput,
} from '@/ai/flows/generate-document-from-prompt';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

function LoadingState() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-card p-8 rounded-lg shadow-lg">
      <div className="space-y-4 animate-pulse">
        <Skeleton className="h-8 w-1/3 mb-6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full mt-4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}

export default function Home() {
  const [doc, setDoc] = useState<GenerateDocumentFromPromptOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async (prompt: string, template: string) => {
    setIsLoading(true);
    setDoc(null);

    let fullPrompt = prompt;
    if (template !== 'general') {
      fullPrompt = `Using a template for a "${template}", generate a document based on the following prompt: "${prompt}"`;
    }

    try {
      const result = await generateDocumentFromPrompt({ prompt: fullPrompt });
      setDoc(result);
    } catch (error) {
      console.error('Failed to generate document:', error);
      toast({
        title: 'Generation Failed',
        description: 'There was an error generating the document. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    setDoc(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header onLogoClick={handleBackToHome} />
      <main className="flex-grow flex flex-col">
        {!doc && !isLoading && (
          <div className="flex-grow container mx-auto px-4 py-8 md:py-12 flex items-start justify-center">
            <PromptForm onGenerate={handleGenerate} />
          </div>
        )}
        {isLoading && (
          <div className="flex-grow container mx-auto px-4 py-8 md:py-12 flex items-start justify-center">
            <LoadingState />
          </div>
        )}
        {doc && !isLoading && <Editor document={doc.document} />}
      </main>
    </div>
  );
}
