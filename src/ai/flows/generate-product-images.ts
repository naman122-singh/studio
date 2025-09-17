'use server';

/**
 * @fileOverview An AI agent to generate product images with a 3D view.
 *
 * - generateProductImages - A function that handles the product image generation process.
 * - GenerateProductImagesInput - The input type for the generateProductImages function.
 * - GenerateProductImagesOutput - The return type for the generateProductImages function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductImagesInputSchema = z.object({
  productDescription: z.string().describe('The detailed description of the product.'),
  stylePreference: z.string().describe('The preferred style for the generated image (e.g., minimalist, rustic, modern).'),
  viewPreference: z.string().describe('The preferred view for the generated image (e.g., front, side, 3D).'),
});
export type GenerateProductImagesInput = z.infer<typeof GenerateProductImagesInputSchema>;

const GenerateProductImagesOutputSchema = z.object({
  imageUrl: z.string().describe('The URL of the generated product image.'),
});
export type GenerateProductImagesOutput = z.infer<typeof GenerateProductImagesOutputSchema>;

export async function generateProductImages(input: GenerateProductImagesInput): Promise<GenerateProductImagesOutput> {
  return generateProductImagesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductImagesPrompt',
  input: {schema: GenerateProductImagesInputSchema},
  output: {schema: GenerateProductImagesOutputSchema},
  prompt: `You are an AI assistant specialized in generating product images for artisans.

  Based on the product description, style preference and view preference, generate a compelling product image that showcases the product in a 3D view.

  Product Description: {{{productDescription}}}
  Style Preference: {{{stylePreference}}}
  View Preference: {{{viewPreference}}}

  Ensure the generated image is visually appealing and suitable for online marketing.
  Include high level of detail and make it look professional and photorealistic.
  The output should be the image URL.
  `,
});

const generateProductImagesFlow = ai.defineFlow(
  {
    name: 'generateProductImagesFlow',
    inputSchema: GenerateProductImagesInputSchema,
    outputSchema: GenerateProductImagesOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: `Generate a product image with the following description: ${input.productDescription}, style: ${input.stylePreference}, view: ${input.viewPreference}. Make it photorealistic.`,
    });

    if (!media || !media.url) {
      throw new Error('Could not generate image.');
    }

    return {imageUrl: media.url};
  }
);
