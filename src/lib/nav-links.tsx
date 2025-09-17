import {
  Award,
  BookText,
  Bot,
  Home,
  Image,
  LayoutDashboard,
  Library,
  TrendingUp,
  Users,
  Video,
  HeartHandshake
} from "lucide-react";

export type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
  tooltip: string;
};

export const navLinks: NavLink[] = [
  {
    href: "/landing",
    label: "Home",
    icon: <Home />,
    tooltip: "Home Page",
  },
  {
    href: "/",
    label: "Dashboard",
    icon: <LayoutDashboard />,
    tooltip: "Dashboard",
  },
  {
    href: "/ai-assistant",
    label: "AI Assistant",
    icon: <Bot />,
    tooltip: "AI Assistant",
  },
  {
    href: "/sales-strategy",
    label: "AI Sales Strategist",
    icon: <TrendingUp />,
    tooltip: "AI Sales Strategist",
  },
  {
    href: "/generate-image",
    label: "Image Generation",
    icon: <Image />,
    tooltip: "Image Generation",
  },
  {
    href: "/generate-video",
    label: "Video Generation",
    icon: <Video />,
    tooltip: "Video Generation",
  },
  {
    href: "/generate-story",
    label: "AI Storyteller",
    icon: <BookText />,
    tooltip: "AI Storyteller",
  },
  {
    href: "/authenticity-badge",
    label: "AI Authenticity Badge",
    icon: <Award />,
    tooltip: "AI-Authenticity Badge",
  },
  {
    href: "/community",
    label: "AI Community",
    icon: <Users />,
    tooltip: "Artisan AI Community",
  },
  {
    href: "/resources",
    label: "NGOs and Schemes",
    icon: <HeartHandshake />,
    tooltip: "NGOs and Schemes",
  },
];
