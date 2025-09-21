'use server';

/**
 * @fileOverview Generates citations in different formats (APA, MLA, Chicago) for a given document.
 *
 * - generateCitations - A function that generates citations for a document.
 * - GenerateCitationsInput - The input type for the generateCitations function.
 * - GenerateCitationsOutput - The return type for the generateCitations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCitationsInputSchema = z.object({
  documentText: z.string().describe('The text of the document to generate citations for.'),
  citationFormat: z
    .enum(['APA', 'MLA', 'Chicago'])
    .describe('The format to use for the citations.'),
});
export type GenerateCitationsInput = z.infer<typeof GenerateCitationsInputSchema>;

const GenerateCitationsOutputSchema = z.object({
  citedDocument: z.string().describe('The document with citations added.'),
});
export type GenerateCitationsOutput = z.infer<typeof GenerateCitationsOutputSchema>;

export async function generateCitations(input: GenerateCitationsInput): Promise<GenerateCitationsOutput> {
  return generateCitationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCitationsPrompt',
  input: {schema: GenerateCitationsInputSchema},
  output: {schema: GenerateCitationsOutputSchema},
  prompt: `You are an expert academic writing assistant. Given a document, you will add citations in the specified format.

Document Text: {{{documentText}}}
Citation Format: {{{citationFormat}}}

Add citations to the document text. Return the document with the added citations.
Ensure that the citations are correctly formatted according to the specified citation format.

Output the full document text with the citations added inline. Make sure that you are not hallucinating sources and cite real sources.
If no source can be found for a claim, omit the citation.
`,
});

const generateCitationsFlow = ai.defineFlow(
  {
    name: 'generateCitationsFlow',
    inputSchema: GenerateCitationsInputSchema,
    outputSchema: GenerateCitationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
