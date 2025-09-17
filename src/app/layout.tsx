import type { Metadata } from "next";
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/sidebar-nav";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChatAssistant } from "@/components/chat-assistant";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "CraftConnect AI",
  description: "AI-powered tools for modern artisans.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <Sidebar>
              <SidebarNav />
            </Sidebar>
            <SidebarInset>
              <div className="p-4 md:p-6 lg:p-8">
                {children}
              </div>
              <div className="fixed bottom-6 right-6 z-50">
                 <Sheet>
                  <SheetTrigger asChild>
                    <Button size="icon" className="rounded-full w-14 h-14 shadow-lg">
                      <MessageCircle className="w-6 h-6" />
                      <span className="sr-only">Open AI Assistant</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-lg p-0">
                    <SheetHeader className="p-4 border-b">
                      <SheetTitle className="font-headline">AI Assistant</SheetTitle>
                    </SheetHeader>
                    <div className="h-[calc(100svh-4.5rem)]">
                      <ChatAssistant />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
