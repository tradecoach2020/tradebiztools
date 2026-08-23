import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { quickWinActions } from "@/lib/data";
import { getFromLocalStorage, saveToLocalStorage } from "@/lib/utils";
import { Check, PoundSterling, CalendarDays, Star, Share2, CheckCircle, Circle } from "lucide-react";

const QuickWinsTracker = () => {
  const [completedActions, setCompletedActions] = useState<number[]>(() => {
    return getFromLocalStorage("completedQuickWins", [1, 2]);
  });
  
  const toggleAction = (id: number) => {
    setCompletedActions(prev => {
      const updated = prev.includes(id) 
        ? prev.filter(actionId => actionId !== id)
        : [...prev, id];
      
      saveToLocalStorage("completedQuickWins", updated);
      return updated;
    });
  };
  
  const progress = Math.round((completedActions.length / quickWinActions.length) * 100);
  
  // Weekly streak data
  const weekDays = ["M", "T", "W", "T", "F"];
  const activeWeekDays = [0, 1]; // Monday and Tuesday are active

  return (
    <section id="quick-wins" className="mb-8">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold flex items-center mb-6">
            <span className="text-secondary mr-2">🏆</span> Quick Wins Tracker
          </h2>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-2/3">
              <div className="border border-neutral-200 rounded-lg overflow-hidden mb-4">
                <div className="bg-neutral-100 p-4">
                  <h3 className="font-medium">This Week's Actions</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    {quickWinActions.map((action) => {
                      const isCompleted = completedActions.includes(action.id);
                      return (
                        <label 
                          key={action.id}
                          className={`flex items-center p-3 border ${isCompleted ? 'border-green-200 bg-green-50' : 'border-neutral-200 hover:border-primary'} rounded-md cursor-pointer`}
                        >
                          <Checkbox
                            className={`mr-3 h-5 w-5 rounded ${isCompleted ? 'text-success' : 'text-primary'}`}
                            checked={isCompleted}
                            onCheckedChange={() => toggleAction(action.id)}
                          />
                          <div className="flex-grow">
                            <h4 className={`font-medium ${isCompleted ? 'line-through' : ''}`}>{action.title}</h4>
                            <p className={`text-sm text-neutral-500 ${isCompleted ? 'line-through' : ''}`}>{action.description}</p>
                          </div>
                          <span className={isCompleted ? 'text-success' : 'text-neutral-300'}>
                            {isCompleted ? <CheckCircle size={16} /> : <Circle size={16} />}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/3">
              <div className="border border-neutral-200 rounded-lg overflow-hidden h-full">
                <div className="bg-neutral-100 p-4">
                  <h3 className="font-medium">Your Progress</h3>
                </div>
                <div className="p-4 text-center">
                  <div className="mb-4 inline-block">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#e2e8f0"
                          strokeWidth="3"
                          strokeDasharray="100, 100"
                        />
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#2563eb"
                          strokeWidth="3"
                          strokeDasharray={`${progress}, 100`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <div className="text-3xl font-bold text-primary">{progress}%</div>
                        <div className="text-xs text-neutral-500">completed</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Weekly Streak</h4>
                    <div className="flex justify-center space-x-1">
                      {weekDays.map((day, index) => (
                        <div 
                          key={index}
                          className={`w-8 h-8 rounded-full ${activeWeekDays.includes(index) ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-500'} flex items-center justify-center text-xs`}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Achievements</h4>
                    <div className="flex justify-center space-x-2">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-primary text-xl" title="Raised Prices">
                        <PoundSterling size={20} />
                      </div>
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-success text-xl" title="Delegated Tasks">
                        <Check size={20} />
                      </div>
                      <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-400 text-xl" title="Locked">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-400 text-xl" title="Locked">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-xs text-neutral-500 mt-2">
                      Unlock more badges in the full programme
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default QuickWinsTracker;
