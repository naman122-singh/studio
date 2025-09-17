"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateShortVideoForSocialMedia } from "@/ai/flows/generate-short-videos-for-social-media";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Rocket, Loader2, Wand2, Video, Film } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  prompt: z.string().min(10, "Please provide a detailed prompt (at least 10 characters)."),
  photo: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function GenerateVideoForm() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setVideoUrl(null);

    try {
      const result = await generateShortVideoForSocialMedia({
        prompt: values.prompt,
        photoDataUri: photoPreview ?? undefined
      });
      
      if (result.videoDataUri) {
        setVideoUrl(result.videoDataUri);
      } else {
        throw new Error("Video generation failed to return a URL.");
      }
    } catch (error) {
      console.error("Video generation error:", error);
      toast({
        title: "Error Generating Video",
        description: "Something went wrong. This is an experimental feature and may fail. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Wand2 className="w-6 h-6 text-primary" />
                Describe Your Video
              </CardTitle>
              <CardDescription>
                Provide a prompt and an optional photo to generate a short video.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video Prompt</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., A cinematic shot of a potter's hands shaping clay on a wheel, with soft morning light."
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reference Photo (Optional)</FormLabel>
                    <FormControl>
                      <Input type="file" accept="image/*" onChange={handleFileChange} />
                    </FormControl>
                    <FormDescription>
                      Upload a photo to influence the video's style and content.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {photoPreview && (
                 <div className="w-32 h-32 rounded-lg overflow-hidden">
                    <img src={photoPreview} alt="Photo preview" className="w-full h-full object-cover" />
                 </div>
              )}
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Rocket className="mr-2 h-4 w-4" />
                )}
                Generate Video
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline">Generated Video</CardTitle>
          <CardDescription>
            Your AI-generated video will appear here. Generation may take up to a minute.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <div className="aspect-video w-full max-w-md rounded-lg bg-muted flex items-center justify-center overflow-hidden">
            {isLoading && (
              <div className="text-center text-muted-foreground p-4">
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                <p className="mt-4">Generating video... this can take a moment.</p>
              </div>
            )}
            {!isLoading && videoUrl && (
              <video
                src={videoUrl}
                controls
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
              />
            )}
            {!isLoading && !videoUrl && (
              <div className="text-center text-muted-foreground p-4">
                <Film className="mx-auto h-16 w-16 mb-2 opacity-50" />
                <p>Your video is just a click away.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
