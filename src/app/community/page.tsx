import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, MessageCircle, Send, Share2 } from "lucide-react";
import { SidebarTrigger } from "@/components/app-sidebar";

const artisans = [
  {
    name: "Priya Sharma",
    craft: "Pottery",
    location: "Jaipur, Rajasthan",
    image: PlaceHolderImages.find(p => p.id === 'artisan1'),
    bio: "Clay whispers stories to my hands. I craft modern ceramics with traditional soul.",
  },
  {
    name: "Rohan Das",
    craft: "Woodworking",
    location: "Kolkata, West Bengal",
    image: PlaceHolderImages.find(p => p.id === 'artisan2'),
    bio: "Reclaiming old wood to give it a new life and purpose in your home.",
  },
  {
    name: "Ananya Reddy",
    craft: "Textile Weaving",
    location: "Hyderabad, Telangana",
    image: PlaceHolderImages.find(p => p.id === 'artisan3'),
    bio: "Weaving threads of tradition into contemporary fabrics. Each piece is a poem.",
  },
  {
    name: "Vikram Singh",
    craft: "Metalwork",
    location: "Ahmedabad, Gujarat",
    image: PlaceHolderImages.find(p => p.id === 'artisan4'),
    bio: "Forging metal into art. Inspired by nature's geometry and industrial forms.",
  },
    {
    name: "Meera Iyer",
    craft: "Jewelry Design",
    location: "Chennai, Tamil Nadu",
    image: PlaceHolderImages.find(p => p.id === 'artisan5'),
    bio: "Creating minimalist jewelry that tells a maximalist story. For the modern spirit.",
  },
    {
    name: "Kabir Khan",
    craft: "Leather Goods",
    location: "Mumbai, Maharashtra",
    image: PlaceHolderImages.find(p => p.id === 'artisan6'),
    bio: "Hand-stitched leather goods that age as gracefully as you do.",
  },
];

export default function CommunityPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden"/>
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Artisan Community</h1>
          <p className="text-muted-foreground">Connect, collaborate, and grow with fellow creators.</p>
        </div>
      </header>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Find Nearby Artisans</CardTitle>
              <CardDescription>Discover collaborators for group shipping or local markets.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                <Image
                  src="https://picsum.photos/seed/map/800/400"
                  alt="Map of artisans"
                  width={800}
                  height={400}
                  className="rounded-lg object-cover w-full h-full"
                  data-ai-hint="world map"
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-headline">Community Feed</h2>
            {artisans.slice(0, 2).map((artisan) => (
              <Card key={artisan.name}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={artisan.image?.imageUrl} data-ai-hint={artisan.image?.imageHint} />
                    <AvatarFallback>{artisan.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{artisan.name}</CardTitle>
                    <CardDescription>{artisan.craft} &middot; {artisan.location}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                   <Image
                    src="https://picsum.photos/seed/craft1/600/400"
                    alt="Artisan's work"
                    width={600}
                    height={400}
                    className="rounded-lg mb-4 w-full"
                    data-ai-hint="artisan craft"
                  />
                  <p className="text-sm mb-4">Just finished this new collection! What do you all think? Open for collaborations!</p>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <Heart className="w-4 h-4" /> 23
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" /> 5
                    </Button>
                     <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <Share2 className="w-4 h-4" /> Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="space-y-8">
            <Card>
            <CardHeader>
                <CardTitle className="font-headline">Members</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-96">
                <div className="space-y-4">
                    {artisans.map((artisan) => (
                    <div key={artisan.name} className="flex items-center gap-4">
                        <Avatar>
                        <AvatarImage src={artisan.image?.imageUrl} data-ai-hint={artisan.image?.imageHint} />
                        <AvatarFallback>{artisan.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                        <p className="text-sm font-medium">{artisan.name}</p>
                        <p className="text-xs text-muted-foreground">{artisan.craft}</p>
                        </div>
                        <Button variant="outline" size="sm">Connect</Button>
                    </div>
                    ))}
                </div>
                </ScrollArea>
            </CardContent>
            </Card>

            <Card>
            <CardHeader>
                <CardTitle className="font-headline">Group Chat</CardTitle>
                <CardDescription>#general</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col h-96">
                <ScrollArea className="flex-1 p-4 -m-4">
                <div className="space-y-4 text-sm">
                    <p><span className="font-semibold text-primary">Priya:</span> Anyone going to the Delhi craft fair next month?</p>
                    <p><span className="font-semibold text-accent">Rohan:</span> I'll be there! Let's share a stall.</p>
                    <p><span className="font-semibold text-primary">You:</span> Great idea! I'm in.</p>
                </div>
                </ScrollArea>
                <form className="flex items-center gap-2 pt-4 border-t">
                    <Input placeholder="Message #general" />
                    <Button type="submit" size="icon"><Send className="w-4 h-4" /></Button>
                </form>
            </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
