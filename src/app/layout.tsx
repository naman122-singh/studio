

"use client";

import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { MessageCircle, Settings } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChatAssistant } from "@/components/chat-assistant";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { DashboardHeader } from "@/components/dashboard-header";
import { usePathname } from "next/navigation";
import { DevicePreviewProvider, useDevicePreview } from "@/contexts/device-preview-context";
import { DevicePreviewControls } from "@/components/device-preview-controls";
import { cn } from "@/lib/utils";

// This component can't be in the same file as the provider
function LayoutContent({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const { width } = useDevicePreview();
    const isLandingPage = pathname === "/landing";

    if (isLandingPage) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="flex h-screen w-full">
            <div className="flex flex-col flex-1 overflow-hidden">
                <DashboardHeader />
                <main className="flex-1 overflow-y-auto bg-muted/40 p-4 lg:p-6 transition-all duration-300 ease-in-out">
                    <div
                        className={cn(
                            "mx-auto transition-all duration-500 ease-in-out",
                            width !== '100%' && "shadow-2xl ring-1 ring-black/10 rounded-lg overflow-hidden"
                        )}
                        style={{ maxWidth: width }}
                    >
                        <div className={cn(width !== '100%' && "bg-background")}>
                             <div className="p-6 lg:p-8">
                                {children}
                             </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}


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
          <DevicePreviewProvider>
            <LayoutContent>{children}</LayoutContent>
            
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
                  <div className="space-y-6">
                    <div className="space-y-2">
                        <p className="text-sm font-medium">Theme</p>
                        <div className="flex items-center justify-between p-2 rounded-lg border">
                            <p className="text-sm">Appearance</p>
                            <ThemeToggle />
                        </div>
                    </div>
                    <DevicePreviewControls />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <Toaster />
          </DevicePreviewProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
