import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ProgressBar";
import DailyFix from "@/components/DailyFix";
import BusinessHealthScore from "@/components/BusinessHealthScore";
import TradeCoachYouTube from "@/components/TradeCoachYouTube";
import BlogSection from "@/components/BlogSection";
import LeadMagnets from "@/components/LeadMagnets";
import WeeklyActionTracker from "@/components/WeeklyActionTracker";
import ProgramWalkthrough from "@/components/ProgramWalkthrough";
import FacebookCommunity from "@/components/FacebookCommunity";
import CoachingRoom from "@/components/CoachingRoom";
import MiniVideoModules from "@/components/MiniVideoModules";
import QuickWinsTracker from "@/components/QuickWinsTracker";
import SuccessStories from "@/components/SuccessStories";
import LiveQandA from "@/components/LiveQandA";
import ShareTheLove from "@/components/ShareTheLove";
import LockedFeatures from "@/components/LockedFeatures";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const CoachingZone = () => {
  return (
    <div>
      <Helmet>
        <title>Coaching - TradeCoach</title>
        <meta name="description" content="Daily coaching tips, business health score, video training and community resources for trade business owners." />
      </Helmet>

      <header className="bg-black shadow-sm sticky top-0 z-10 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <a className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 text-sm">
                <ArrowLeft className="w-4 h-4" />
                Back
              </a>
            </Link>
            <div className="w-px h-6 bg-gray-800" />
            <div>
              <h1 className="text-2xl font-bold tracking-wide">
                <span className="text-gray-400">TRADE</span>
                <span className="text-white">COACH</span>
              </h1>
              <p className="text-xs text-orange-400 font-medium uppercase tracking-wider">Coaching Zone</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="hidden md:block text-white border-gray-700 hover:bg-gray-800">
              Sign In
            </Button>
            <Button variant="default" className="bg-primary hover:bg-primary/90">
              Unlock Full Program
            </Button>
          </div>
        </div>
      </header>

      <ProgressBar />

      <main className="container mx-auto px-4 pb-12">
        <DailyFix />
        <BusinessHealthScore />
        <WeeklyActionTracker />
        <TradeCoachYouTube />
        <BlogSection />
        <LeadMagnets />
        <ProgramWalkthrough />
        <FacebookCommunity />
        <CoachingRoom />
        <MiniVideoModules />
        <QuickWinsTracker />
        <SuccessStories />
        <LiveQandA />
        <ShareTheLove />
        <LockedFeatures />
        <CallToAction />
      </main>

      <Footer />
    </div>
  );
};

export default CoachingZone;
