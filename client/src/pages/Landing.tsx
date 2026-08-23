import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { ArrowRight, Wrench, BookOpen } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Helmet>
        <title>TradeCoach - Coaching & Works</title>
        <meta name="description" content="TradeCoach — business coaching tools and trade works pricing tools for trade business owners." />
      </Helmet>

      <header className="bg-black border-b border-gray-800 px-6 py-5">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              <span className="text-gray-400">TRADE</span>
              <span className="text-white">COACH</span>
            </h1>
            <p className="text-sm text-gray-500">Free Tools for Trade Business Owners</p>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row">
        <Link href="/coaching">
          <a className="group relative flex-1 flex flex-col items-center justify-center min-h-[50vh] md:min-h-full cursor-pointer bg-black hover:bg-gray-950 transition-colors duration-300 border-b md:border-b-0 md:border-r border-gray-800">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 flex flex-col items-center text-center px-8 py-16 md:py-0">
              <div className="w-20 h-20 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-6 group-hover:bg-orange-500/20 group-hover:border-orange-500/60 transition-all duration-300">
                <BookOpen className="w-9 h-9 text-orange-400" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                Coaching
              </h2>
              <p className="text-gray-400 text-lg max-w-sm leading-relaxed mb-8">
                Daily tips, business health score, video training, action trackers and community resources.
              </p>
              <div className="flex items-center gap-2 text-orange-400 font-semibold text-base group-hover:gap-4 transition-all duration-200">
                Enter <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </a>
        </Link>

        <Link href="/works">
          <a className="group relative flex-1 flex flex-col items-center justify-center min-h-[50vh] md:min-h-full cursor-pointer bg-black hover:bg-gray-950 transition-colors duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 flex flex-col items-center text-center px-8 py-16 md:py-0">
              <div className="w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 group-hover:border-blue-500/60 transition-all duration-300">
                <Wrench className="w-9 h-9 text-blue-400" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                Works
              </h2>
              <p className="text-gray-400 text-lg max-w-sm leading-relaxed mb-8">
                Trade pricing calculator, AI design tool, and our full range of products and services.
              </p>
              <div className="flex items-center gap-2 text-blue-400 font-semibold text-base group-hover:gap-4 transition-all duration-200">
                Enter <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </a>
        </Link>
      </main>

      <footer className="bg-black border-t border-gray-800 py-4 text-center text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} TradeCoach. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
