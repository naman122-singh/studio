
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";

const products = [
  { name: "Handwoven Silk Saree", sold: 32, revenue: 12450 },
  { name: "Brass Oil Lamp", sold: 28, revenue: 8960 },
  { name: "Wooden Jewelry Box", sold: 24, revenue: 7200 },
  { name: "Block Print Kurta", sold: 18, revenue: 5940 },
  { name: "Clay Pottery Set", sold: 12, revenue: 3600 },
];

export function TopProducts() {
  const maxSold = Math.max(...products.map(p => p.sold));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Clock className="h-5 w-5" />
          Top Selling Products
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {products.map(product => (
          <div key={product.name} className="space-y-1">
            <div className="flex justify-between text-sm">
              <p className="font-medium">{product.name}</p>
              <p className="text-muted-foreground">{product.sold} sold</p>
            </div>
            <div className="flex items-center gap-4">
              <Progress value={(product.sold / maxSold) * 100} className="h-2 flex-1" />
              <p className="text-sm font-semibold text-right w-20">₹{product.revenue.toLocaleString('en-IN')}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
