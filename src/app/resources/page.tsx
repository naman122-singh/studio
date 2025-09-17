import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { MoreHorizontal, PlusCircle, Star } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

const resources = [
  {
    name: "Jaipur Clay Emporium",
    type: "Raw Material",
    contact: "contact@jcem.com",
    location: "Jaipur, RJ",
    tags: ["AI Recommended", "Bulk Orders"],
    rating: 4.9,
  },
  {
    name: "WeaveIndia Logistics",
    type: "Logistics",
    contact: "support@weaveindia.com",
    location: "Delhi, DL",
    tags: ["Community Favorite"],
    rating: 4.7,
  },
  {
    name: "Mumbai Maker Space",
    type: "Workshop",
    contact: "mms@workshop.io",
    location: "Mumbai, MH",
    tags: [],
    rating: 4.5,
  },
  {
    name: "Southern Woods Co.",
    type: "Raw Material",
    contact: "sales@swc.in",
    location: "Chennai, TN",
    tags: ["Best Price"],
    rating: 4.8,
  },
  {
    name: "CraftPack Secure",
    type: "Packaging",
    contact: "info@craftpack.com",
    location: "Bengaluru, KA",
    tags: ["AI Recommended"],
    rating: 4.9,
  },
];

export default function ResourcesPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden"/>
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Resources Hub</h1>
                <p className="text-muted-foreground">Share and discover suppliers, logistics, and workshops.</p>
            </div>
        </div>
        {/* Placeholder for a "Add Resource" button which could open a dialog */}
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Resource
        </Button>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Shared Resources</CardTitle>
          <CardDescription>A community-curated list of vendors and services.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
                <TableHead className="hidden sm:table-cell">Location</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resources.map((resource) => (
                <TableRow key={resource.name}>
                  <TableCell className="font-medium">
                    {resource.name}
                    <div className="flex flex-wrap gap-1 mt-1">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant={tag.includes("AI") ? "default" : "secondary"} className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{resource.type}</TableCell>
                  <TableCell className="hidden md:table-cell">{resource.contact}</TableCell>
                  <TableCell className="hidden sm:table-cell">{resource.location}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-primary mr-1" fill="currentColor"/>
                      {resource.rating.toFixed(1)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Contact</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
