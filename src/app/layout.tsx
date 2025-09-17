import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { MessageCircle, Settings } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChatAssistant } from "@/components/chat-assistant";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { DashboardHeader } from "@/components/dashboard-header";

export const metadata: Metadata = {
  title: "Kala Saathi",
  description: "Your AI Craft Companion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDashboardLayout = true; // This would be dynamic in a real app

  if (isDashboardLayout) {
    return (
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        </head>
        <body className="font-body antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex h-screen w-full">
              <AppSidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <DashboardHeader />
                <main className="flex-1 overflow-y-auto p-6 lg:p-8">
                  {children}
                </main>
              </div>
            </div>
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
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
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="rounded-full w-14 h-14 shadow-lg">
                  <Settings className="w-6 h-6" />
                  <span className="sr-only">Open Settings</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-xs p-4">
                  <SheetHeader className="mb-4">
                    <SheetTitle>Settings</SheetTitle>
                  </SheetHeader>
                  <div className="flex items-center justify-between p-2 rounded-lg border">
                      <p className="text-sm font-medium">Theme</p>
                      <ThemeToggle />
                  </div>
              </SheetContent>
            </Sheet>
          </div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
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
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="rounded-full w-14 h-14 shadow-lg">
                  <Settings className="w-6 h-6" />
                  <span className="sr-only">Open Settings</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-xs p-4">
                  <SheetHeader className="mb-4">
                    <SheetTitle>Settings</SheetTitle>
                  </SheetHeader>
                  <div className="flex items-center justify-between p-2 rounded-lg border">
                      <p className="text-sm font-medium">Theme</p>
                      <ThemeToggle />
                  </div>
              </SheetContent>
            </Sheet>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
