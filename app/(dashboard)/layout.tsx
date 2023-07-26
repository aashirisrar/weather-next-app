"use client";

import Sidebar from "@/components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <div className="hidden h-full bg-gray-900 md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
        <Sidebar />
      </div>
      <main className="md:pl-72">
        Hello Content
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
