
"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateProductStories } from "@/ai/flows/auto-generate-product-stories";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mic, Rocket, Square, Languages, QrCode, Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";

const languages = [
    { name: 'Assamese', code: 'as' },
    { name: 'Bengali', code: 'bn' },
    { name: 'Bodo', code: 'brx' },
    { name: 'Dogri', code: 'doi' },
    { name: 'English', code: 'en' },
    { name: 'Gujarati', code: 'gu' },
    { name: 'Hindi', code: 'hi' },
    { name: 'Kannada', code: 'kn' },
    { name: 'Kashmiri', code: 'ks' },
    { name: 'Konkani', code: 'gom' },
    { name: 'Maithili', code: 'mai' },
    { name: 'Malayalam', code: 'ml' },
    { name: 'Manipuri', code: 'mni' },
    { name: 'Marathi', code: 'mr' },
    { name: 'Nepali', code: 'ne' },
    { name: 'Odia', code: 'or' },
    { name: 'Punjabi', code: 'pa' },
    { name: 'Sanskrit', code: 'sa' },
    { name: 'Santali', code: 'sat' },
    { name: 'Sindhi', code: 'sd' },
    { name: 'Tamil', code: 'ta' },
    { name: 'Telugu', code: 'te' },
    { name: 'Urdu', code: 'ur' }
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
  const [qrCodes, setQrCodes] = useState<Record<string, string>>({});
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productDetails: "",
      targetLanguages: ["hi", "bn", "ta"],
    },
  });

  const generateQrCodes = (output: StoryOutput) => {
    const newQrCodes: Record<string, string> = {};
    for (const [lang, story] of Object.entries(output.translatedStories)) {
      newQrCodes[lang] = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(story)}`;
    }
    setQrCodes(newQrCodes);
  }

  useEffect(() => {
    if (storyOutput) {
      generateQrCodes(storyOutput);
    }
  }, [storyOutput]);

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
    setQrCodes({});

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
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>3. Select Languages</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value.length && "text-muted-foreground"
                            )}
                          >
                            {field.value.length > 0
                              ? `${field.value.length} language${field.value.length > 1 ? 's' : ''} selected`
                              : "Select languages"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                        <Command>
                          <CommandInput placeholder="Search language..." />
                          <CommandEmpty>No language found.</CommandEmpty>
                          <CommandGroup className="max-h-60 overflow-y-auto">
                            {languages.map((lang) => (
                              <CommandItem
                                value={lang.name}
                                key={lang.code}
                                onSelect={() => {
                                    const selected = field.value.includes(lang.code);
                                    if (selected) {
                                        field.onChange(field.value.filter((c) => c !== lang.code));
                                    } else {
                                        field.onChange([...field.value, lang.code]);
                                    }
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value.includes(lang.code) ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {lang.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
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
                             {qrCodes[lang] && (
                                <Image 
                                    src={qrCodes[lang]}
                                    alt={`QR code for ${lang} story`}
                                    width={100}
                                    height={100}
                                    className="rounded-md"
                                />
                             )}
                            <Button variant="outline" size="sm" className="w-full">
                                <QrCode className="w-4 h-4 mr-2"/>
                                Generate QR Story Code
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
