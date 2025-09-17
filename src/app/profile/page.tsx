
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/app-sidebar";
import { Settings, Heart, Edit, Share2, Mail, Phone, MapPin, BadgeCheck, Camera, Sparkles, QrCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {

  const story = "My family has been creating beautiful pottery for four generations. I learned this sacred art from my grandmother, who taught me that every piece of clay holds the potential for beauty. Today, I blend traditional Rajasthani techniques with contemporary designs, creating pieces that tell stories of our rich heritage.";
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(story)}`;

  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <div className="text-center w-full">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-headline">
            Your Craft Identity
          </h1>
          <p className="text-muted-foreground">
            Showcase your artisan journey and connect with your audience.
          </p>
        </div>
      </header>

      <Card className="max-w-4xl mx-auto w-full">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="flex flex-col items-center justify-center relative">
              <Avatar className="w-32 h-32 border-4 border-primary">
                <AvatarFallback className="text-4xl">PS</AvatarFallback>
              </Avatar>
               <Badge className="absolute top-0 left-1/2 -translate-x-1/4 -translate-y-1/2 bg-orange-400 text-white">
                  <Sparkles className="w-3 h-3 mr-1"/> AI Avatar
               </Badge>
               <Button size="icon" className="absolute bottom-0 right-1/2 translate-x-3/4 translate-y-1/4 rounded-full border-2 border-background">
                   <Camera className="w-5 h-5"/>
               </Button>
            </div>
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold font-headline">Priya Sharma</h2>
              <p className="text-primary font-medium">Traditional Pottery</p>
              <div className="flex flex-wrap gap-2 my-3">
                <Badge variant="secondary">15 years</Badge>
                <Badge variant="secondary">Blue Pottery</Badge>
                <Badge variant="secondary">Terracotta</Badge>
                <Badge variant="secondary">Clay Sculptures</Badge>
              </div>
              <div className="grid sm:grid-cols-2 gap-y-2 gap-x-4 text-sm text-muted-foreground mt-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>priya.sharma@email.com</span>
                </div>
                 <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 9876543210</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Jaipur, Rajasthan</span>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4" />
                  <span>Verified Artisan</span>
                </div>
              </div>
               <Button variant="outline" className="mt-4">
                  <Share2 className="mr-2" /> Share Profile
                </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-4xl mx-auto w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="font-headline flex items-center gap-2 text-2xl">
              <Heart className="text-primary"/> My Craft Story
            </CardTitle>
            <Button variant="outline">
              <Edit className="mr-2"/> Edit Story
            </Button>
          </div>
          <CardDescription>
            Share the journey behind your art and connect with your audience
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-6">
          <p className="flex-1 text-muted-foreground">{story}</p>
          <div className="flex flex-col items-center gap-2">
             <Image 
                src={qrCodeUrl}
                alt="QR code for craft story"
                width={150}
                height={150}
                className="rounded-lg border p-1"
             />
             <p className="text-xs text-muted-foreground">Scan for the full story</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
