"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateProductStories } from "@/ai/flows/auto-generate-product-stories";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mic, Rocket, Square, Languages, QrCode } from "lucide-react";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "hi", name: "Hindi" },
  { code: "bn", name: "Bengali" },
  { code: "ta", name: "Tamil" },
];

const formSchema = z.object({
  productDetails: z.string().min(5, "Please enter product details."),
  targetLanguages: z.array(z.string()).min(1, "Please select at least one language."),
});

type FormValues = z.infer<typeof formSchema>;
type StoryOutput = {
  originalTranscription: string;
  translatedStories: Record<string, string>;
};

export function GenerateStoryForm() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioDataUri, setAudioDataUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [storyOutput, setStoryOutput] = useState<StoryOutput | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productDetails: "",
      targetLanguages: ["en", "es", "hi"],
    },
  });

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          setAudioDataUri(reader.result as string);
        };
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setAudioDataUri(null);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      toast({
        title: "Microphone Error",
        description: "Could not access microphone. Please check your browser permissions.",
        variant: "destructive",
      });
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  
  async function onSubmit(values: FormValues) {
    if (!audioDataUri) {
        toast({ title: "No Audio", description: "Please record your story first.", variant: "destructive" });
        return;
    }
    setIsLoading(true);
    setStoryOutput(null);

    try {
      const result = await generateProductStories({
        ...values,
        voiceRecordingDataUri: audioDataUri,
      });
      setStoryOutput(result);
    } catch (error) {
      console.error("Story generation error:", error);
      toast({ title: "Error Generating Stories", description: "Something went wrong. Please try again.", variant: "destructive" });
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
              <CardTitle className="font-headline">Tell Your Story</CardTitle>
              <CardDescription>Record a description of your product, select languages, and let AI do the rest.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormItem>
                <FormLabel>1. Record Your Story</FormLabel>
                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <Button type="button" size="icon" variant={isRecording ? "destructive" : "outline"} onClick={isRecording ? handleStopRecording : handleStartRecording}>
                    {isRecording ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </Button>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{isRecording ? "Recording..." : "Ready to record"}</p>
                    <p className="text-xs text-muted-foreground">{isRecording ? "Click the button to stop." : "Click the microphone to start."}</p>
                  </div>
                  {audioDataUri && !isRecording && (
                    <audio src={audioDataUri} controls className="h-10" />
                  )}
                </div>
              </FormItem>
              <FormField
                control={form.control}
                name="productDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>2. Product Details</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Hand-carved Wooden Elephant" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetLanguages"
                render={() => (
                  <FormItem>
                    <FormLabel>3. Select Languages</FormLabel>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {languages.map((lang) => (
                            <FormField
                            key={lang.code}
                            control={form.control}
                            name="targetLanguages"
                            render={({ field }) => {
                                return (
                                <FormItem key={lang.code} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                    <Checkbox
                                        checked={field.value?.includes(lang.code)}
                                        onCheckedChange={(checked) => {
                                        return checked
                                            ? field.onChange([...field.value, lang.code])
                                            : field.onChange(
                                                field.value?.filter(
                                                (value) => value !== lang.code
                                                )
                                            )
                                        }}
                                    />
                                    </FormControl>
                                    <FormLabel className="font-normal">{lang.name}</FormLabel>
                                </FormItem>
                                )
                            }}
                            />
                        ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading || !audioDataUri}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Rocket className="mr-2 h-4 w-4" />}
                Generate Stories
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Generated Content</CardTitle>
          <CardDescription>Your original transcription and translated stories will appear here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading && <div className="space-y-4">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
              <p className="text-center text-muted-foreground">AI is working its magic...</p>
            </div>}
          {storyOutput && (
            <>
              <div>
                <h3 className="font-semibold mb-2">Original Transcription</h3>
                <Textarea readOnly value={storyOutput.originalTranscription} className="bg-muted" rows={4}/>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2"><Languages className="w-5 h-5"/> Translated Stories</h3>
                <div className="space-y-4">
                  {Object.entries(storyOutput.translatedStories).map(([lang, story]) => (
                    <div key={lang}>
                      <h4 className="font-medium text-sm capitalize">{languages.find(l=>l.code === lang)?.name || lang}</h4>
                      <div className="flex gap-4">
                        <Textarea readOnly value={story} className="flex-1" rows={4}/>
                        <div className="flex flex-col items-center gap-2">
                             <Image 
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(story)}`}
                                alt={`QR code for ${lang} story`}
                                width={100}
                                height={100}
                                className="rounded-md"
                            />
                            <Button variant="outline" size="sm" className="w-full">
                                <QrCode className="w-4 h-4 mr-2"/>
                                Save
                            </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          {!isLoading && !storyOutput && (
             <div className="text-center text-muted-foreground p-4 h-64 flex flex-col items-center justify-center">
                <Mic className="mx-auto h-16 w-16 mb-2 opacity-50" />
                <p>Record your story to get started.</p>
              </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
