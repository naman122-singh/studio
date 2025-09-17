import { SidebarTrigger } from "@/components/app-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const ngos = [
  {
    name: "Crafts Council of India",
    focus: "Preservation and promotion of Indian crafts",
    link: "https://www.craftscouncilofindia.org/",
    logo: "https://picsum.photos/seed/ngo1/40/40",
    tags: ["Advocacy", "Exhibitions"],
  },
  {
    name: "Dastkar",
    focus: "Support for traditional Indian craftspeople",
    link: "https://www.dastkar.org/",
    logo: "https://picsum.photos/seed/ngo2/40/40",
    tags: ["Livelihood", "Bazars"],
  },
  {
    name: "Self-Employed Women's Association (SEWA)",
    focus: "Empowering women in the informal sector",
    link: "https://www.sewa.org/",
    logo: "https://picsum.photos/seed/ngo3/40/40",
    tags: ["Women Empowerment", "Union"],
  },
];

const schemes = [
    {
        name: "Pradhan Mantri Mudra Yojana (PMMY)",
        description: "Provides loans up to ₹10 lakh to non-corporate, non-farm small/micro enterprises.",
        link: "https://www.mudra.org.in/",
        tags: ["Finance", "Loan"]
    },
    {
        name: "Stand-Up India Scheme",
        description: "Facilitates bank loans between ₹10 lakh and ₹1 Crore to at least one Scheduled Caste (SC) or Scheduled Tribe (ST) borrower and at least one woman borrower per bank branch for setting up a greenfield enterprise.",
        link: "https://www.standupmitra.in/",
        tags: ["SC/ST", "Women", "Loan"]
    },
     {
        name: "Scheme of Fund for Regeneration of Traditional Industries (SFURTI)",
        description: "Organizes traditional industries and artisans into clusters to make them competitive and provide support for their long-term sustainability.",
        link: "https://sfurti.msme.gov.in/",
        tags: ["Cluster Development", "Sustainability"]
    }
]

export default function ResourcesPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center gap-4">
        <SidebarTrigger className="md/hidden" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">NGOs and Schemes</h1>
          <p className="text-muted-foreground">
            Discover organizations and government schemes that can help you grow.
          </p>
        </div>
      </header>
      
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Supportive NGOs</CardTitle>
            <CardDescription>
              Connect with non-governmental organizations dedicated to supporting artisans.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {ngos.map((ngo) => (
              <div key={ngo.name} className="flex items-start gap-4 p-4 border rounded-lg">
                <img src={ngo.logo} alt={`${ngo.name} logo`} className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <h3 className="font-semibold">{ngo.name}</h3>
                  <p className="text-sm text-muted-foreground">{ngo.focus}</p>
                   <div className="flex flex-wrap gap-1 mt-2">
                      {ngo.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href={ngo.link} target="_blank" rel="noopener noreferrer">
                    Visit <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Government Schemes</CardTitle>
            <CardDescription>
              Explore government initiatives designed to benefit artisans and small businesses.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {schemes.map((scheme) => (
                <div key={scheme.name} className="p-4 border rounded-lg">
                    <h3 className="font-semibold">{scheme.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-3">{scheme.description}</p>
                    <div className="flex justify-between items-center">
                        <div className="flex flex-wrap gap-1">
                            {scheme.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                            ))}
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                            Learn More <ExternalLink className="ml-2 h-3 w-3" />
                          </a>
                        </Button>
                    </div>
                </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
