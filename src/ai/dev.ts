import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-document-with-ai.ts';
import '@/ai/flows/refine-document-with-ai.ts';
import '@/ai/flows/generate-document-from-prompt.ts';
import '@/ai/flows/generate-citations.ts';