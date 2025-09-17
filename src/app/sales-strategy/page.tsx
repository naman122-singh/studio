import { SalesStrategyForm } from "./sales-strategy-form";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function SalesStrategyPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden"/>
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            AI Sales Strategy
          </h1>
          <p className="text-muted-foreground">
            Get a tailored sales strategy based on your business data.
          </p>
        </div>
      </header>

      <SalesStrategyForm />
    </div>
  );
}
