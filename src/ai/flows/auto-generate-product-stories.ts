'use server';

/**
 * @fileOverview A product story generation AI agent.
 *
 * - generateProductStories - A function that handles the product story generation process.
 * - GenerateProductStoriesInput - The input type for the generateProductStories function.
 * - GenerateProductStoriesOutput - The return type for the generateProductStories function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const GenerateProductStoriesInputSchema = z.object({
  voiceRecordingDataUri: z
    .string()
    .describe(
      'A voice recording of the artisan describing their product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
  productDetails: z.string().describe('The name and description of the product.'),
  targetLanguages: z.array(z.string()).describe('The list of languages to translate the product story to.'),
});
export type GenerateProductStoriesInput = z.infer<typeof GenerateProductStoriesInputSchema>;

const GenerateProductStoriesOutputSchema = z.object({
  originalTranscription: z.string().describe('The transcription of the original voice recording.'),
  translatedStories: z.record(z.string(), z.string()).describe('A map of language code to the translated product story in that language.'),
});
export type GenerateProductStoriesOutput = z.infer<typeof GenerateProductStoriesOutputSchema>;

export async function generateProductStories(input: GenerateProductStoriesInput): Promise<GenerateProductStoriesOutput> {
  return generateProductStoriesFlow(input);
}

const transcribeAndTranslatePrompt = ai.definePrompt({
  name: 'transcribeAndTranslatePrompt',
  input: {schema: GenerateProductStoriesInputSchema},
  output: {schema: GenerateProductStoriesOutputSchema},
  prompt: `You are an AI assistant helping artisans create product stories for their products.

The artisan has provided a voice recording describing their product and its story. First, transcribe the voice recording to text. Then, generate engaging product stories in the following languages:

{{#each targetLanguages}}
- {{this}}
{{/each}}

Make sure to take into consideration the product details when generating the product stories.

Product Details: {{{productDetails}}}
Voice Recording: {{media url=voiceRecordingDataUri}}

Return the transcription of the original voice recording and the translated product stories in a JSON format.`, // Changed from TEXT to JSON
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const generateProductStoriesFlow = ai.defineFlow(
  {
    name: 'generateProductStoriesFlow',
    inputSchema: GenerateProductStoriesInputSchema,
    outputSchema: GenerateProductStoriesOutputSchema,
  },
  async input => {
    const {output} = await transcribeAndTranslatePrompt(input);
    return output!;
  }
);
