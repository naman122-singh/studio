import {
  BookText,
  Bot,
  Image,
  LayoutDashboard,
  Library,
  TrendingUp,
  Users,
  Video,
} from "lucide-react";

export type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
  tooltip: string;
};

export const navLinks: NavLink[] = [
  {
    href: "/dashboard",
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
    label: "Storytelling",
    icon: <BookText />,
    tooltip: "AI Storytelling",
  },
  {
    href: "/sales-strategy",
    label: "Sales Strategy",
    icon: <TrendingUp />,
    tooltip: "Sales Strategy",
  },
  {
    href: "/community",
    label: "Community",
    icon: <Users />,
    tooltip: "Artisan Community",
  },
  {
    href: "/resources",
    label: "Resources Hub",
    icon: <Library />,
    tooltip: "Resources Hub",
  },
];
