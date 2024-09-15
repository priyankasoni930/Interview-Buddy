import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { ArrowRight, CheckCircle, Brain } from "lucide-react";
import Link from "next/link";

export default function Component() {
  const features = [
    "Personalized interview simulations",
    "Real-time feedback on your responses",
    "Industry-specific question banks",
    "AI-powered performance analysis",
  ];

  return (
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

      <main className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
        <Brain className="w-20 h-20 text-primary mb-8" />
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6 max-w-4xl">
          Your Personal AI Interview Coach
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
          Double your chances of landing that job offer with our AI-powered
          interview prep. Get personalized feedback, practice real-time
          scenarios, and boost your confidence.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left max-w-2xl">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <CheckCircle className="text-green-500 mr-2 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        <Link href="/dashboard">
          <Button size="lg" className="text-lg px-8 py-6">
            Get Started <ArrowRight className="ml-2" />
          </Button>
        </Link>
      </main>
    </div>
  );
}
