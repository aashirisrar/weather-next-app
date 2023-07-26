"use client";

import { cn } from "@/lib/utils";
import { LayoutDashboard, Cloud, CloudDrizzleIcon, Sun } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const tools = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    color: "text-sky-500",
  },
  {
    title: "Weather",
    href: "/weather",
    icon: Cloud,
    color: "text-violet-500",
  },
  {
    title: "AQI",
    href: "/aqi",
    icon: Sun,
    color: "text-pink-700",
  },

  //   green-700, emerald-500, orange-700
];
const Sidebar = () => {
  const pathName = usePathname();
  return (
    <div className="text-white bg-[#111827] space-y-4 py-4 flex flex-col h-full ">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-3">
            <CloudDrizzleIcon
              size="lg"
              className="
            text-orange-500"
            />
          </div>
          <h1 className={(cn("text-2xl font-bold"), montserrat.className)}>
            Forecast
          </h1>
        </Link>
        <div className="space-y-1">
          {tools.map((tool) => (
            <Link
              href={tool.href}
              key={tool.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathName === tool.href ? "bg-white/10 " : "text-zinc-400"
              )}
            >
              <div key={tool.title} className="flex items-center flex-1">
                <tool.icon className={cn("h-5 w-5 mr-3", tool.color)} />
                {tool.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
