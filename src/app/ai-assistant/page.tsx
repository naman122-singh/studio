import { ChatAssistant } from "@/components/chat-assistant";
import { SidebarTrigger } from "@/components/app-sidebar";

export default function AiAssistantPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      <header className="flex items-center gap-4 mb-6">
        <SidebarTrigger className="md:hidden"/>
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">
            AI Assistant
            </h1>
            <p className="text-muted-foreground">
            Your personal helper for business, marketing, and content.
            </p>
        </div>
      </header>
      <div className="flex-1 border rounded-lg overflow-hidden">
        <ChatAssistant />
      </div>
    </div>
  );
}
