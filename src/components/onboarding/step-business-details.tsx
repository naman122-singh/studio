
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  craftType: z.string().min(1, "Please select a craft type."),
  experience: z.coerce.number().min(0, "Years of experience is required."),
  businessScale: z.enum(["individual", "family-run", "cooperative", "small-enterprise"]),
});

export function StepBusinessDetails() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        craftType: "",
        experience: 0,
        businessScale: "individual",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="craftType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">What is your primary craft or art form?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your craft..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="handloom">Handloom</SelectItem>
                  <SelectItem value="pottery">Pottery</SelectItem>
                  <SelectItem value="jewelry">Jewelry</SelectItem>
                  <SelectItem value="woodwork">Woodwork</SelectItem>
                  <SelectItem value="painting">Painting</SelectItem>
                  <SelectItem value="embroidery">Embroidery</SelectItem>
                   <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">How many years of experience do you have?</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 10" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="businessScale"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-lg font-semibold">What is the scale of your business?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                        <div className="p-4 border rounded-lg hover:border-primary cursor-pointer w-full text-center">
                            <RadioGroupItem value="individual" id="individual" className="sr-only"/>
                            <label htmlFor="individual" className="font-medium cursor-pointer">Individual</label>
                        </div>
                    </FormControl>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                         <div className="p-4 border rounded-lg hover:border-primary cursor-pointer w-full text-center">
                            <RadioGroupItem value="family-run" id="family-run" className="sr-only"/>
                            <label htmlFor="family-run" className="font-medium cursor-pointer">Family-run</label>
                        </div>
                    </FormControl>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                        <div className="p-4 border rounded-lg hover:border-primary cursor-pointer w-full text-center">
                            <RadioGroupItem value="cooperative" id="cooperative" className="sr-only"/>
                            <label htmlFor="cooperative" className="font-medium cursor-pointer">Cooperative</label>
                        </div>
                    </FormControl>
                  </FormItem>
                   <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                        <div className="p-4 border rounded-lg hover:border-primary cursor-pointer w-full text-center">
                            <RadioGroupItem value="small-enterprise" id="small-enterprise" className="sr-only"/>
                             <label htmlFor="small-enterprise" className="font-medium cursor-pointer">Small Enterprise</label>
                        </div>
                    </FormControl>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
