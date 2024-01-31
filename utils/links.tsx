import { AreaChart, Layers, AppWindow } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const links: NavLink[] = [
  {
    href: "/tasks",
    label: "tasks",
    icon: <Layers />,
  },
  {
    href: "/collections",
    label: "collections",
    icon: <AppWindow />,
  },
  {
    href: "/profile",
    label: "profile",
    icon: <AreaChart />,
  },
];

export default links;
