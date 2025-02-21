import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import {
  ArrowRight,
  CheckCircle,
  Brain,
  Video,
  MessageSquare,
  BarChart,
  Sparkles,
  Star,
  Users,
  Trophy,
  Clock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const features = [
    {
      icon: <Video className="w-6 h-6 text-primary" />,
      title: "Video Interviews",
      description:
        "Practice with real-time video recording to simulate actual interview conditions",
    },
    {
      icon: <Brain className="w-6 h-6 text-primary" />,
      title: "AI-Powered Feedback",
      description:
        "Get instant, detailed feedback on your responses from our advanced AI system",
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
      title: "Custom Questions",
      description:
        "Access role-specific questions tailored to your target position",
    },
    {
      icon: <BarChart className="w-6 h-6 text-primary" />,
      title: "Performance Analytics",
      description: "Track your progress and identify areas for improvement",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer at Google",
      image: "/testimonial1.jpg",
      content:
        "Interview-Buddy helped me prepare for my technical interviews. The AI feedback was incredibly helpful!",
    },
    {
      name: "Michael Chen",
      role: "Product Manager at Meta",
      image: "/testimonial2.jpg",
      content:
        "The custom questions and real-time feedback made all the difference in my interview preparation.",
    },
    {
      name: "Emily Brown",
      role: "Data Scientist at Amazon",
      image: "/testimonial3.jpg",
      content:
        "I landed my dream job after practicing with Interview-Buddy. The platform is simply amazing!",
    },
  ];

  const stats = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      value: "10,000+",
      label: "Active Users",
    },
    {
      icon: <Star className="w-8 h-8 text-primary" />,
      value: "4.9/5",
      label: "User Rating",
    },
    {
      icon: <Trophy className="w-8 h-8 text-primary" />,
      value: "85%",
      label: "Success Rate",
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      value: "24/7",
      label: "AI Availability",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5E6D3]">
      <header className="sticky top-0 z-50 backdrop-blur-sm bg-[#FFFAF0]/50 border-b border-[#E6D5C1]">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold text-primary">
                Interview-Buddy
              </h2>
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section with enhanced styling */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">
          <div className="flex-1 max-w-xl">
            <div className="inline-block px-4 py-2 bg-[#A98B73]/20 rounded-full text-[#6B4423] font-medium mb-4">
              AI Interview Platform
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#3C2915] mb-6 leading-tight">
              Master Your Interview Skills with{" "}
              <span className="text-[#6B4423]">AI-Powered</span> Practice
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Prepare for your next job interview with our intelligent interview
              simulator. Get real-time feedback, custom questions, and detailed
              analytics to improve your performance.
            </p>
            <div className="flex gap-4">
              <Link href="/dashboard">
                <Button className="gap-2">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative w-full max-w-lg mx-auto">
              <div className="absolute top-0 -left-4 w-72 h-72 bg-[#8B9D77] rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-[#A98B73] rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#D4B595] rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>
              <div className="relative">
                <Image
                  src="/interview-mockup.png"
                  width={500}
                  height={500}
                  alt="Interview Platform Demo"
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <section className="py-12 bg-[#FFFAF0]/70 backdrop-blur-sm rounded-2xl shadow-sm mb-20 border border-[#E6D5C1]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="text-[#6B4423]">{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold text-[#3C2915] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-[#6B4423]">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section with enhanced styling */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-[#3C2915] text-center mb-4">
            Everything You Need to Ace Your Interview
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools you need to
            succeed in your next interview.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-[#FFFAF0]/70 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-[#E6D5C1]"
              >
                <div className="w-12 h-12 bg-[#8B9D77]/20 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-[#6B4423]">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#3C2915]">
                  {feature.title}
                </h3>
                <p className="text-[#6B4423]">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-[#3C2915] text-center mb-16">
            How Interview-Buddy Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Create Your Profile",
                description:
                  "Set up your profile with your target role and experience level",
              },
              {
                step: "2",
                title: "Practice Interviews",
                description:
                  "Engage in AI-powered mock interviews with real-time feedback",
              },
              {
                step: "3",
                title: "Track Progress",
                description:
                  "Review your performance and improve with detailed analytics",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center relative flex flex-col items-center"
              >
                <div className="w-12 h-12 bg-[#8B9D77] text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#3C2915]">
                  {item.title}
                </h3>
                <p className="text-[#6B4423]">{item.description}</p>
                {index < 2 && (
                  <ArrowRight className="hidden md:block absolute -right-6 top-1/4 text-[#A98B73] w-12 h-12" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-[#3C2915] text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-[#FFFAF0]/70 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-[#E6D5C1]"
              >
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="bg-[#3C2915] backdrop-blur-sm text-[#FFFAF0] rounded-2xl p-8 md:p-12 mt-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Improve Your Interview Skills?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of job seekers who have improved their interview
              performance with Interview-Buddy
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="bg-white text-primary hover:bg-gray-100"
                >
                  Start Practicing Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="container mx-auto px-4 py-12 mt-20 border-t border-[#E6D5C1]">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <h3 className="font-bold text-lg">Interview-Buddy</h3>
            </div>
            <p className="text-gray-600">
              Empowering job seekers with AI-powered interview preparation.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-8 text-center text-gray-600">
          © 2024 Interview-Buddy. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
