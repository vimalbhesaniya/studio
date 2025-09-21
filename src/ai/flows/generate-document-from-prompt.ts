'use server';

/**
 * @fileOverview A document generation AI agent.
 *
 * - generateDocumentFromPrompt - A function that handles the document generation process.
 * - GenerateDocumentFromPromptInput - The input type for the generateDocumentFromPrompt function.
 * - GenerateDocumentFromPromptOutput - The return type for the generateDocumentFromPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDocumentFromPromptInputSchema = z.object({
  prompt: z.string().describe('The natural language prompt for generating the document.'),
});
export type GenerateDocumentFromPromptInput = z.infer<typeof GenerateDocumentFromPromptInputSchema>;

const GenerateDocumentFromPromptOutputSchema = z.object({
  document: z.string().describe('The generated document in HTML format.'),
});
export type GenerateDocumentFromPromptOutput = z.infer<typeof GenerateDocumentFromPromptOutputSchema>;

export async function generateDocumentFromPrompt(input: GenerateDocumentFromPromptInput): Promise<GenerateDocumentFromPromptOutput> {
  return generateDocumentFromPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDocumentFromPromptPrompt',
  input: {schema: GenerateDocumentFromPromptInputSchema},
  output: {schema: GenerateDocumentFromPromptOutputSchema},
  prompt: `You are an expert document generator. Your goal is to create well-structured documents based on user prompts.
  The output should be a valid HTML document. Use appropriate HTML tags for headings, paragraphs, lists, etc.
  For example, use <h1> for the main title, <h2> for sections, <p> for paragraphs, <ul> or <ol> for lists.

  Create a document based on the following prompt: {{{prompt}}}`,
});

const generateDocumentFromPromptFlow = ai.defineFlow(
  {
    name: 'generateDocumentFromPromptFlow',
    inputSchema: GenerateDocumentFromPromptInputSchema,
    outputSchema: GenerateDocumentFromPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
