import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Facebook, Users, MessageSquare, Star } from "lucide-react";

const FacebookCommunity = () => {
  const openFacebookGroup = () => {
    window.open("https://www.facebook.com/groups/businesscoachingfortrades", "_blank");
  };

  return (
    <section id="facebook-community" className="mb-8">
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <Facebook className="h-8 w-8 text-white" />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl font-bold text-white mb-1">TradeCoach Community</h2>
              <p className="text-gray-400 text-sm">
                Join our private Facebook group for trade business owners.
              </p>
            </div>
            
            <Button 
              onClick={openFacebookGroup}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Facebook className="h-4 w-4" /> Join Community
            </Button>
          </div>


        </CardContent>
      </Card>
    </section>
  );
};

export default FacebookCommunity;