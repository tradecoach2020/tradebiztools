import AppHeader from "@/components/AppHeader";
import ProgressBar from "@/components/ProgressBar";
import MainNavigation from "@/components/MainNavigation";
import DailyFix from "@/components/DailyFix";
import BusinessHealthScore from "@/components/BusinessHealthScore";
import TradeCoachYouTube from "@/components/TradeCoachYouTube";
import BlogSection from "@/components/BlogSection";
import LeadMagnets from "@/components/LeadMagnets";
import WeeklyActionTracker from "@/components/WeeklyActionTracker";
import ProgramWalkthrough from "@/components/ProgramWalkthrough";
import FacebookCommunity from "@/components/FacebookCommunity";
import AIDesignTool from "@/components/AIDesignTool";
import TradeCalculator from "@/components/TradeCalculator";
import ProductsPage from "@/components/ProductsPage";
import CoachingRoom from "@/components/CoachingRoom";
import MiniVideoModules from "@/components/MiniVideoModules";
import QuickWinsTracker from "@/components/QuickWinsTracker";
import SuccessStories from "@/components/SuccessStories";
import LockedFeatures from "@/components/LockedFeatures";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import LiveQandA from "@/components/LiveQandA";
import ShareTheLove from "@/components/ShareTheLove";

import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>TradeCoach Lite - Free Tools for Trade Business Owners</title>
        <meta name="description" content="Access free tools and resources to help you grow your trade business, including daily tips, business health assessments, templates, and more." />
        <meta property="og:title" content="TradeCoach Lite - Free Tools for Trade Business Owners" />
        <meta property="og:description" content="Access free tools and resources to help you grow your trade business, including daily tips, business health assessments, templates, and more." />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Helmet>
      
      <AppHeader />
      <ProgressBar />
      <MainNavigation />
      
      <main className="container mx-auto px-4 pb-12">
        <DailyFix />
        <BusinessHealthScore />
        <TradeCalculator />
        <WeeklyActionTracker />
        <AIDesignTool />
        <TradeCoachYouTube />
        <BlogSection />
        <LeadMagnets />
        <ProgramWalkthrough />
        <FacebookCommunity />
        <ProductsPage />
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

export default Home;
