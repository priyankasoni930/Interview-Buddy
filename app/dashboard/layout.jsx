import React from "react";
import Header from "./_components/Header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { ArrowRight, CheckCircle, Brain } from "lucide-react";

function DashboardLayout({ children }) {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <header className="container mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/">
            <h2 className="text-2xl font-bold text-primary">Interview-Buddy</h2>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>
        <div className="mx-5 md:mx-20 lg:mx-36">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
