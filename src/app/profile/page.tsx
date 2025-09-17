import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/app-sidebar";
import { Settings } from "lucide-react";

export default function ProfilePage() {
  const creations = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    seed: 100 + i,
    title: `Artwork ${i + 1}`,
    hint: "handmade craft",
  }));

  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            My Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your presence on Kala Saathi.
          </p>
        </div>
      </header>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-primary">
              <AvatarImage src="https://picsum.photos/seed/user-profile/200/200" data-ai-hint="user portrait" />
              <AvatarFallback>KA</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold font-headline">Kala Artisan</h2>
              <p className="text-muted-foreground">Jaipur Blue Pottery Artist</p>
              <p className="mt-2 max-w-xl text-sm">
                I find joy in shaping earth into art, blending ancient techniques with modern aesthetics. Each piece tells a story of heritage and heart.
              </p>
            </div>
            <Button variant="outline">
              <Settings className="mr-2" />
              Edit Profile
            </Button>
          </div>
          <Separator className="my-6" />
          <div className="flex justify-center md:justify-start gap-8 text-center">
            <div>
              <p className="text-2xl font-bold">42</p>
              <p className="text-sm text-muted-foreground">Creations</p>
            </div>
            <div>
              <p className="text-2xl font-bold">1,200</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div>
              <p className="text-2xl font-bold">150</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-2xl font-bold font-headline mb-4">My Creations</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {creations.map((creation) => (
            <div key={creation.id} className="aspect-square rounded-lg overflow-hidden group relative">
              <Image
                src={`https://picsum.photos/seed/${creation.seed}/400/400`}
                alt={creation.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={creation.hint}
              />
               <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                 <p className="text-white text-sm font-semibold">{creation.title}</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
