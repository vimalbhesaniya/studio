'use server';
/**
 * @fileOverview AI-powered document refinement flow.
 *
 * - refineDocumentWithAI - A function that refines document sections using AI.
 * - RefineDocumentWithAIInput - The input type for the refineDocumentWithAI function.
 * - RefineDocumentWithAIOutput - The return type for the refineDocumentWithAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RefineDocumentWithAIInputSchema = z.object({
  sectionText: z.string().describe('The text of the document section to refine.'),
  tone: z.string().optional().describe('The desired tone of the refined text (e.g., formal, casual, persuasive).'),
  length: z.string().optional().describe('The desired length of the refined text (e.g., shorter, longer).'),
  instructions: z.string().optional().describe('Any specific instructions for refining the text.'),
});
export type RefineDocumentWithAIInput = z.infer<typeof RefineDocumentWithAIInputSchema>;

const RefineDocumentWithAIOutputSchema = z.object({
  refinedText: z.string().describe('The AI-refined text section.'),
});
export type RefineDocumentWithAIOutput = z.infer<typeof RefineDocumentWithAIOutputSchema>;

export async function refineDocumentWithAI(input: RefineDocumentWithAIInput): Promise<RefineDocumentWithAIOutput> {
  return refineDocumentWithAIFlow(input);
}

const prompt = ai.definePrompt({
  name: 'refineDocumentWithAIPrompt',
  input: {schema: RefineDocumentWithAIInputSchema},
  output: {schema: RefineDocumentWithAIOutputSchema},
  prompt: `You are an AI document refinement assistant. You will be provided with a section of text from a document, and your task is to refine it based on the user's instructions.

Original Text:
{{sectionText}}

Tone: {{tone}}
Length: {{length}}
Instructions: {{instructions}}

Refined Text:`, 
});

const refineDocumentWithAIFlow = ai.defineFlow(
  {
    name: 'refineDocumentWithAIFlow',
    inputSchema: RefineDocumentWithAIInputSchema,
    outputSchema: RefineDocumentWithAIOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
