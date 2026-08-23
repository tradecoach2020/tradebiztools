import { Card, CardContent } from "@/components/ui/card";
import { dailyTips } from "@/lib/data";
import { cn, formatDate, saveToLocalStorage, getFromLocalStorage } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  ThumbsUp, 
  Share2,
  Lightbulb,
  Flame,
  Calendar
} from "lucide-react";

const DailyFix = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [streak, setStreak] = useState(() => {
    return getFromLocalStorage("dailyStreakData", {
      currentStreak: 0,
      lastVisitDate: null as string | null,
      totalDays: 0
    });
  });
  
  // Calculate daily tip index based on days since epoch
  const getDailyTipIndex = () => {
    const today = new Date();
    const epochStart = new Date('2024-01-01'); // Start date for tip rotation
    const daysDiff = Math.floor((today.getTime() - epochStart.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff % dailyTips.length; // Cycle through all 50 tips
  };
  
  const currentTip = dailyTips[getDailyTipIndex()];

  useEffect(() => {
    const today = new Date().toDateString();
    const lastVisit = streak.lastVisitDate;
    
    if (lastVisit !== today) {
      let newStreak = { ...streak };
      
      if (lastVisit) {
        const lastDate = new Date(lastVisit);
        const todayDate = new Date(today);
        const daysDiff = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 1) {
          // Consecutive day - continue streak
          newStreak.currentStreak += 1;
        } else if (daysDiff > 1) {
          // Missed days - reset streak
          newStreak.currentStreak = 1;
        }
      } else {
        // First visit
        newStreak.currentStreak = 1;
      }
      
      newStreak.lastVisitDate = today as string;
      newStreak.totalDays += 1;
      
      setStreak(newStreak);
      saveToLocalStorage("dailyStreakData", newStreak);
    }
  }, []);



  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <section id="daily-fix" className="mb-8">
      <Card className="bg-gray-900 border-gray-800">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 h-48 md:h-auto bg-gradient-to-br from-blue-900 to-primary flex items-center justify-center">
            <Lightbulb className="h-24 w-24 text-yellow-400" />
          </div>
          <div className="p-6 md:w-2/3">
            {/* Streak Section */}
            <div className="mb-6 p-4 bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-lg border border-orange-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Flame className="h-6 w-6 text-orange-500" />
                  <div>
                    <h3 className="text-lg font-bold text-white">Daily Streak Challenge!</h3>
                    <p className="text-sm text-gray-300">Visit daily for tips and insights - how long can you go?</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-orange-500">{streak.currentStreak}</div>
                  <div className="text-xs text-gray-400">day streak</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-gray-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    Total days: {streak.totalDays}
                  </div>
                  <div className="text-gray-400">
                    Last visit: {streak.lastVisitDate ? new Date(streak.lastVisitDate).toLocaleDateString() : 'Today'}
                  </div>
                </div>
                {streak.currentStreak >= 7 && (
                  <div className="text-orange-400 font-medium">🔥 On fire!</div>
                )}
                {streak.currentStreak >= 30 && (
                  <div className="text-red-400 font-bold">🚀 Unstoppable!</div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center text-white">
                <Lightbulb className="mr-2 h-6 w-6 text-yellow-400" /> Daily Fix
                <span className="ml-2 text-xs bg-blue-900 text-blue-400 px-2 py-1 rounded-full">NEW TODAY</span>
              </h2>
              <span className="text-xs text-gray-500">{new Date().toLocaleDateString()}</span>
            </div>
            
            <div className="mb-4 p-4 bg-gray-800 rounded-lg border border-gray-700 relative">
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                <i className="fas fa-quote-left"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2 pl-6 text-white">{currentTip.title}</h3>
              <p className="text-gray-300">
                {currentTip.content}
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleLike}
                  className={cn(
                    "text-gray-400 hover:text-primary",
                    isLiked && "text-primary"
                  )}
                >
                  <ThumbsUp className="mr-1 h-4 w-4" /> Helpful
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-primary">
                  <Share2 className="mr-1 h-4 w-4" /> Share
                </Button>
              </div>
              <div className="text-xs text-gray-500">
                Tip {getDailyTipIndex() + 1} of {dailyTips.length} • Changes daily
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default DailyFix;
