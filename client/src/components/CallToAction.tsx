import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, Calendar } from "lucide-react";

const CallToAction = () => {
  const [countdown, setCountdown] = useState({
    days: 5,
    hours: 12,
    minutes: 45,
    seconds: 33
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              if (days > 0) {
                days -= 1;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="mb-12">
      <div className="bg-primary text-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-2/3 p-8">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Off The Tools?</h2>
            <p className="mb-6 text-blue-100">
              Join hundreds of trade business owners who have transformed their businesses from stressful jobs into profitable systems that don't depend on their time.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <span className="h-6 w-6 bg-white text-primary rounded-full flex items-center justify-center mr-3">
                  <Check size={12} />
                </span>
                <span>Work fewer hours while making more money</span>
              </div>
              <div className="flex items-center">
                <span className="h-6 w-6 bg-white text-primary rounded-full flex items-center justify-center mr-3">
                  <Check size={12} />
                </span>
                <span>Build a team that delivers quality work without you</span>
              </div>
              <div className="flex items-center">
                <span className="h-6 w-6 bg-white text-primary rounded-full flex items-center justify-center mr-3">
                  <Check size={12} />
                </span>
                <span>Create systems that generate consistent profits</span>
              </div>
              <div className="flex items-center">
                <span className="h-6 w-6 bg-white text-primary rounded-full flex items-center justify-center mr-3">
                  <Check size={12} />
                </span>
                <span>Finally take time off without worrying about the business</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="secondary" 
                className="bg-white text-primary hover:bg-blue-50 transition"
              >
                Learn More About Off The Tools
              </Button>
              <Button 
                className="bg-secondary hover:bg-secondary/90 transition"
              >
                Join Now (Limited Spots)
              </Button>
            </div>
          </div>
          <div className="lg:w-1/3 bg-blue-800 p-8 flex flex-col justify-center">
            <div className="text-center mb-4">
              <div className="inline-block p-2 bg-blue-700 rounded-lg mb-3">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-1">Next Enrollment</h3>
              <p className="text-blue-200">Limited spots available</p>
            </div>
            
            <div className="grid grid-cols-4 gap-2 mb-6">
              <div className="bg-blue-900 p-2 rounded text-center">
                <div className="text-2xl font-bold">{countdown.days}</div>
                <div className="text-xs text-blue-300">Days</div>
              </div>
              <div className="bg-blue-900 p-2 rounded text-center">
                <div className="text-2xl font-bold">{countdown.hours}</div>
                <div className="text-xs text-blue-300">Hours</div>
              </div>
              <div className="bg-blue-900 p-2 rounded text-center">
                <div className="text-2xl font-bold">{countdown.minutes}</div>
                <div className="text-xs text-blue-300">Mins</div>
              </div>
              <div className="bg-blue-900 p-2 rounded text-center">
                <div className="text-2xl font-bold">{countdown.seconds}</div>
                <div className="text-xs text-blue-300">Secs</div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm mb-2 text-blue-200">Only 5 spots remaining this month</p>
              <div className="h-2 bg-blue-900 rounded-full mb-2">
                <div className="h-2 bg-secondary rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
