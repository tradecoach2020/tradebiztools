import AppHeader from "@/components/AppHeader";
import ProgressBar from "@/components/ProgressBar";
import MainNavigation from "@/components/MainNavigation";
import BusinessHealthScore from "@/components/BusinessHealthScore";
import Footer from "@/components/Footer";
import WhiteLabelDemo from "@/components/WhiteLabelDemo";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  Calculator, 
  Target, 
  TrendingUp, 
  Video, 
  MessageSquare,
  Download,
  Play,
  HelpCircle,
  Share2,
  Users,
  BookOpen,
  Star,
  PlusCircle
} from "lucide-react";
import { Helmet } from "react-helmet";

const Home = () => {
  const featureCards = [
    {
      title: "Job Calendar",
      description: "Manage appointments and projects",
      icon: Calendar,
      path: "/calendar",
      color: "bg-blue-500"
    },
    {
      title: "Weekly Action Tracker",
      description: "Plan and track your weekly business goals",
      icon: Target,
      path: "/weekly-action-tracker",
      color: "bg-indigo-500"
    },
    {
      title: "Daily Fix",
      description: "Get daily tips to improve your business",
      icon: TrendingUp,
      path: "/daily-fix",
      color: "bg-green-500"
    },
    {
      title: "Trade Calculator",
      description: "Calculate pricing and estimates",
      icon: Calculator,
      path: "/trade-calculator",
      color: "bg-purple-500"
    },
    {
      title: "Business Health Score",
      description: "Assess your business performance",
      icon: Star,
      path: "/business-health",
      color: "bg-yellow-500"
    },
    {
      title: "Blog Articles",
      description: "Read the latest trade business insights",
      icon: BookOpen,
      path: "/blogs",
      color: "bg-red-500"
    },
    {
      title: "Success Stories",
      description: "Get inspired by other tradespeople",
      icon: Users,
      path: "/success-stories",
      color: "bg-blue-600"
    },
    {
      title: "Facebook Community",
      description: "Connect with other trade professionals",
      icon: Users,
      path: "/facebook-community",
      color: "bg-blue-700"
    },
    {
      title: "YouTube Videos",
      description: "Watch expert trade business advice",
      icon: Video,
      path: "/youtube-videos",
      color: "bg-red-600"
    },
    {
      title: "AI Design Tool",
      description: "Create professional designs with AI",
      icon: PlusCircle,
      path: "/ai-design-tool",
      color: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    {
      title: "Free Trade Business Resources",
      description: "Download free business templates and guides",
      icon: Download,
      path: "/free-resources",
      color: "bg-teal-500"
    },
    {
      title: "Coaching Room",
      description: "Access coaching resources",
      icon: MessageSquare,
      path: "/coaching-room",
      color: "bg-pink-500"
    },
    {
      title: "Video Modules",
      description: "Learn from video tutorials",
      icon: Play,
      path: "/video-modules",
      color: "bg-cyan-500"
    },
    {
      title: "Quick Wins",
      description: "Track your business improvements",
      icon: Target,
      path: "/quick-wins",
      color: "bg-amber-500"
    },
    {
      title: "Live Q&A",
      description: "Join live coaching sessions",
      icon: HelpCircle,
      path: "/live-qa",
      color: "bg-emerald-500"
    },
    {
      title: "Share the Love",
      description: "Tell your mates about this app",
      icon: Share2,
      path: "/share",
      color: "bg-pink-500"
    }
  ];

  return (
    <div>
      <Helmet>
        <title>TradeCoach Lite - Free Trade Business Tools & Resources</title>
        <meta name="description" content="Free comprehensive business tools platform for trade professionals. Get daily tips, calculate pricing, track progress, and access expert coaching resources." />
        <meta property="og:title" content="TradeCoach Lite - Free Trade Business Tools" />
        <meta property="og:description" content="Comprehensive business tools platform designed specifically for trade professionals. Free tools including pricing calculators, business health assessments, and daily coaching tips." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tradecoach-lite.replit.app" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Helmet>
      
      <AppHeader />
      <ProgressBar />
      <MainNavigation />
      
      <main className="container mx-auto px-4 pb-12">
        <div>
          <BusinessHealthScore />
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            {featureCards.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Link key={index} href={feature.path}>
                  <Card className="h-32 cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
                    <CardContent className="p-4 h-full flex flex-col justify-between">
                      <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-2`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-gray-900 leading-tight">{feature.title}</h3>
                        <p className="text-xs text-gray-600 mt-1 leading-tight">{feature.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      
      <Footer />
      <WhiteLabelDemo />
    </div>
  );
};

export default Home;