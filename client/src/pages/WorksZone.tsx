import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import TradeCalculator from "@/components/TradeCalculator";
import AIDesignTool from "@/components/AIDesignTool";
import ProductsPage from "@/components/ProductsPage";
import Footer from "@/components/Footer";

const WorksZone = () => {
  return (
    <div>
      <Helmet>
        <title>Works - TradeCoach</title>
        <meta name="description" content="Trade pricing calculator, AI design tool and full range of products and services for trade business owners." />
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
              <p className="text-xs text-blue-400 font-medium uppercase tracking-wider">Works Zone</p>
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

      <main className="container mx-auto px-4 pb-12">
        <TradeCalculator />
        <AIDesignTool />
        <ProductsPage />
      </main>

      <Footer />
    </div>
  );
};

export default WorksZone;
