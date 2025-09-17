import { Button } from "@/components/ui/button";
import { ArrowRight, Award, ScanText, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <section className="relative flex-1 flex items-center justify-center text-center bg-background/70">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="https://picsum.photos/seed/artisan-bg/1920/1080"
            alt="Background of an artisan working"
            fill
            className="object-cover opacity-20"
            data-ai-hint="artisan background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
        </div>
        <div className="relative z-10 container px-4 mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold font-headline mb-4">
            <span className="bg-gradient-to-r from-orange-400 via-yellow-500 to-teal-400 text-transparent bg-clip-text">
              Kala Saathi
            </span>
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold font-headline mb-6">
            Your AI Craft Companion
          </h2>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
            Empowering Indian traditional artists and craftsmen with AI-driven
            guidance, market insights, and personalized assistance to preserve and
            promote our rich cultural heritage.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-orange-400 to-yellow-500 text-primary-foreground hover:from-orange-500 hover:to-yellow-600">
              <Link href="/dashboard">
                Start your journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link href="#">Watch Demo</Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="bg-background relative z-10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <h3 className="text-4xl font-bold text-primary mb-2">500+</h3>
              <p className="text-muted-foreground">Traditional Crafts</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl font-bold text-primary mb-2">1000+</h3>
              <p className="text-muted-foreground">Active Artisans</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl font-bold text-primary mb-2">24/7</h3>
              <p className="text-muted-foreground">AI Assistance</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-background/50 relative z-10">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold font-headline mb-4">AI-Authenticity Badge</h2>
            <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-12">
                Preserve your craft's legacy and build trust with a digital certificate of authenticity, powered by AI.
            </p>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
                <div className="flex items-start gap-4 p-6 border rounded-lg bg-card">
                    <div className="p-3 bg-primary/10 rounded-full">
                        <ScanText className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2 font-headline">Cultural Authentication</h3>
                        <p className="text-muted-foreground">AI scans designs, patterns, and weaving styles to authenticate cultural roots.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-6 border rounded-lg bg-card">
                    <div className="p-3 bg-primary/10 rounded-full">
                        <Award className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2 font-headline">Digital Heritage Certificate</h3>
                        <p className="text-muted-foreground">Provides artisans with a digital heritage certificate that boosts trust and combats cheap imitations.</p>
                    </div>
                </div>
            </div>
            <div className="mt-12">
                <Button asChild size="lg">
                    <Link href="/authenticity-badge">
                        Get Your Badge
                        <ShieldCheck className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
}
