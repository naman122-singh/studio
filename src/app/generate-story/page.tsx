import { GenerateStoryForm } from "./generate-story-form";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function GenerateStoryPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden"/>
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            AI Storytelling
          </h1>
          <p className="text-muted-foreground">
            Record your product's story and get it translated instantly.
          </p>
        </div>
      </header>

      <GenerateStoryForm />
    </div>
  );
}
