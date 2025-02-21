"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F5E6D3]">
      <header className="sticky top-0 z-50 backdrop-blur-sm bg-[#FFFAF0]/50 border-b border-[#E6D5C1]">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-[#6B4423]" />
              <h2 className="text-2xl font-bold text-[#3C2915]">
                Interview-Buddy
              </h2>
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="text-[#6B4423] hover:text-[#3C2915]"
              >
                Dashboard
              </Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>
      <div className="mx-5 md:mx-20 lg:mx-36 py-8">{children}</div>
    </div>
  );
}

export default DashboardLayout;
