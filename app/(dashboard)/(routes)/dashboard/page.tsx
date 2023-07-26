import { cn } from "@/lib/utils";
import { Cloud, LayoutDashboard, Sun } from "lucide-react";
import Link from "next/link";

const tools = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
  },
  {
    title: "Weather",
    href: "/weather",
    icon: Cloud,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    title: "AQI",
    href: "/aqi",
    icon: Sun,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },

  //   green-700, emerald-500, orange-700
];

const DashboardPage = () => {
  return (
    <div className="mt-52 flex flex-col text-center space-y-2 justify-center">
      <div>
        <div className="text-4xl text-black/100">The Weather Hub</div>
        <div className="mt-2 text-sm text-muted-foreground">
          All about weather in one place.
        </div>
      </div>
      <div className="pt-8 flex flex-col items-center space-y-2 ">
        {tools.map((tool) => (
          <Link
            href={tool.href}
            className={cn(
              "flex p-3 justify-center w-72 rounded-lg hover:bg-gray-100 transition",
              tool.bgColor
            )}
          >
            <tool.icon className={cn("mr-2 ", tool.color)} />
            {tool.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
