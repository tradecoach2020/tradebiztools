import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { lockedFeatures } from "@/lib/data";
import { Lock, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const LockedFeatures = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <section className="mb-8">
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <h2 className="text-2xl font-bold flex items-center text-white">
              <Lock className="mr-2 h-6 w-6 text-orange-500" />
              Premium Features
              <span className="ml-2 text-xs bg-orange-900 text-orange-400 px-2 py-1 rounded-full">
                {lockedFeatures.length} Available
              </span>
            </h2>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Hide
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  View All
                </>
              )}
            </Button>
          </div>
          
          {!isExpanded && (
            <div className="mt-4">
              <p className="text-gray-400 text-sm">
                Unlock advanced features including CRM tools, advanced analytics, custom templates, and more in the Off The Tools Programme.
              </p>
              <Button 
                className="mt-3 bg-orange-600 hover:bg-orange-700"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(true);
                }}
              >
                Explore Premium Features
              </Button>
            </div>
          )}
          
          {isExpanded && (
            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lockedFeatures.map((feature) => (
                  <div key={feature.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700 opacity-75">
                    <div className="flex items-center mb-3">
                      <Lock className="h-4 w-4 text-orange-500 mr-2" />
                      <h3 className="font-medium text-gray-300">{feature.title}</h3>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">
                      {feature.description}
                    </p>
                    <div className="text-center">
                      <Button 
                        variant="outline" 
                        className="text-orange-400 border-orange-600 hover:bg-orange-600 hover:text-white"
                        size="sm"
                      >
                        Unlock in Off The Tools
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-orange-900/20 rounded-lg border border-orange-800">
                <h3 className="text-lg font-semibold text-white mb-2">Ready to unlock everything?</h3>
                <p className="text-gray-300 text-sm mb-3">
                  Get access to all premium features, advanced tools, and exclusive content with the Off The Tools Programme.
                </p>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  Upgrade to Off The Tools Programme
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default LockedFeatures;
