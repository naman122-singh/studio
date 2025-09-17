import { SalesStrategyForm } from "./sales-strategy-form";
import { SidebarTrigger } from "@/components/app-sidebar";
import { PricePredictorForm } from "./price-predictor-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Wand2 } from "lucide-react";

export default function SalesStrategyPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden"/>
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            AI Sales & Pricing
          </h1>
          <p className="text-muted-foreground">
            Get tailored sales strategies and fair price suggestions for your craft.
          </p>
        </div>
      </header>
      <Tabs defaultValue="strategist" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="strategist">
            <Rocket className="mr-2"/>
            AI Sales Strategist
          </TabsTrigger>
          <TabsTrigger value="predictor">
            <Wand2 className="mr-2"/>
            AI Price Predictor
          </TabsTrigger>
        </TabsList>
        <TabsContent value="strategist">
            <SalesStrategyForm />
        </TabsContent>
        <TabsContent value="predictor">
            <PricePredictorForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
