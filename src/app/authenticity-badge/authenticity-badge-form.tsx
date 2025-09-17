"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { authenticateDesign } from "@/ai/flows/authenticate-design";
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
import { Loader2, Rocket, ShieldCheck, Upload, Award, CheckCircle, XCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

const formSchema = z.object({
  designImage: z.any(),
  artisanNotes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;
type AuthOutput = {
  isAuthentic: boolean;
  culturalOrigin: string;
  confidenceScore: number;
  report: string;
  certificateData: {
    artisanName: string;
    craftName: string;
    dateOfAuthentication: string;
    certificateId: string;
  };
};

export function AuthenticityBadgeForm() {
  const [authResult, setAuthResult] = useState<AuthOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      artisanNotes: "",
    },
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        if (file.size > 4 * 1024 * 1024) {
            toast({
                title: "Image too large",
                description: "Please upload an image smaller than 4MB.",
                variant: "destructive",
            });
            return;
        }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  async function onSubmit(values: FormValues) {
    if (!imagePreview) {
        toast({ title: "No Image", description: "Please upload an image of your design.", variant: "destructive" });
        return;
    }
    setIsLoading(true);
    setAuthResult(null);

    try {
      const result = await authenticateDesign({
        designImageUri: imagePreview,
        artisanNotes: values.artisanNotes,
      });
      setAuthResult(result);
    } catch (error) {
      console.error("Authentication error:", error);
      toast({
        title: "Error During Authentication",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-primary" /> Authenticate Your Design
              </CardTitle>
              <CardDescription>
                Upload an image of your work to verify its cultural authenticity.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="designImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Design Image</FormLabel>
                     <FormControl>
                      <div className="flex flex-col items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {imagePreview ? (
                                    <Image src={imagePreview} alt="Preview" width={100} height={100} className="object-cover rounded-md"/>
                                ) : (
                                    <>
                                        <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP (MAX. 4MB)</p>
                                    </>
                                )}
                            </div>
                            <Input id="dropzone-file" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                        </label>
                      </div> 
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="artisanNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Artisan Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'This design is inspired by the Warli paintings of Maharashtra, using traditional rice paste pigment.'"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                     <FormDescription>
                      Provide any details about the design's origin, materials, or techniques.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading || !imagePreview}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Rocket className="mr-2 h-4 w-4" />
                )}
                Authenticate
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <Card className="sticky top-4">
        <CardHeader>
          <CardTitle className="font-headline">Authentication Result</CardTitle>
          <CardDescription>
            The AI's analysis of your design will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading && (
            <div className="space-y-4 text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Analyzing your design...</p>
            </div>
          )}
          {!isLoading && !authResult && (
             <div className="text-center text-muted-foreground p-8 h-64 flex flex-col items-center justify-center">
                <Award className="mx-auto h-16 w-16 mb-2 opacity-50" />
                <p>Your authenticity report will appear here.</p>
              </div>
          )}
          {authResult && (
            <div className="space-y-4">
               <Card className={authResult.isAuthentic ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"}>
                 <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                    {authResult.isAuthentic ? <CheckCircle className="h-8 w-8 text-green-600" /> : <XCircle className="h-8 w-8 text-red-600" />}
                    <div>
                        <CardTitle className="text-lg">{authResult.isAuthentic ? "Authentic" : "Not Determined to be Authentic"}</CardTitle>
                        <CardDescription>{authResult.culturalOrigin}</CardDescription>
                    </div>
                 </CardHeader>
                 <CardContent>
                     <p className="font-bold text-sm mb-1">Confidence: { (authResult.confidenceScore * 100).toFixed(0) }%</p>
                     <Progress value={authResult.confidenceScore * 100} className="h-2"/>
                 </CardContent>
               </Card>
               <div>
                <h3 className="font-semibold mb-2">Analysis Report</h3>
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md whitespace-pre-wrap">{authResult.report}</p>
              </div>
              {authResult.isAuthentic && (
                <div className="border-t pt-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2"><Award className="w-5 h-5 text-primary"/> Digital Heritage Certificate</h3>
                    <div className="p-4 border rounded-lg bg-background">
                        <p><strong>Artisan:</strong> {authResult.certificateData.artisanName}</p>
                        <p><strong>Craft:</strong> {authResult.certificateData.craftName}</p>
                        <p><strong>Authenticated:</strong> {new Date(authResult.certificateData.dateOfAuthentication).toLocaleDateString()}</p>
                        <p className="font-mono text-xs mt-2"><strong>ID:</strong> {authResult.certificateData.certificateId}</p>
                        <Button size="sm" className="mt-4">Download Certificate</Button>
                    </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
