import { AreaChart, Layers, AppWindow } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const links: NavLink[] = [
  {
    href: "/tasks",
    label: "個人記事",
    icon: <Layers />,
  },

  {
    href: "/profile",
    label: "個人檔案",
    icon: <AreaChart />,
  },
];

export default links;
