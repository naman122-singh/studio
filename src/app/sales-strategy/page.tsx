import { SalesStrategyForm } from "./sales-strategy-form";
import { SidebarTrigger } from "@/components/app-sidebar";
import { PricePredictorForm } from "./price-predictor-form";

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
            Get a tailored sales strategy and fair price suggestions for your craft.
          </p>
        </div>
      </header>
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <SalesStrategyForm />
        <PricePredictorForm />
      </div>
    </div>
  );
}
