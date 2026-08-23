import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { videoModules } from "@/lib/data";
import { Play, Star } from "lucide-react";
import tradecoachBgImage from "../assets/tradecoach-program-bg.png";

const MiniVideoModules = () => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const handleWatchVideo = (id: number) => {
    setSelectedVideo(id);
    // In a real implementation, this would open a video player or redirect to the video
  };

  return (
    <section id="videos" className="mb-8">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold flex items-center mb-6">
            <span className="text-secondary mr-2">🎓</span> Mini Video Modules
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {videoModules.map((video) => (
              <div key={video.id} className="border border-neutral-200 rounded-lg overflow-hidden hover:shadow-md transition">
                <div className="relative">
                  <img 
                    src={video.thumbnailUrl} 
                    alt={video.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition"
                      onClick={() => handleWatchVideo(video.id)}
                    >
                      <Play className="h-5 w-5 text-primary" />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-neutral-900 bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-2">{video.title}</h3>
                  <p className="text-sm text-neutral-500 mb-4">
                    {video.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-neutral-500">
                      {video.rating} <Star className="inline-block h-3 w-3 text-yellow-400 fill-yellow-400" /> ({video.reviews})
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary hover:text-primary/90"
                      onClick={() => handleWatchVideo(video.id)}
                    >
                      Watch Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div 
            className="rounded-lg p-6 overflow-hidden relative"
            style={{
              backgroundImage: `url(${tradecoachBgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-white text-xl">GET OFF THE TOOLS IN 12 WEEKS!</h4>
                <p className="text-gray-100 mt-2">
                  These mini-modules are just a taste. Get the complete step-by-step system in the Off The Tools Programme.
                </p>
                <p className="text-gray-200 text-sm mt-1 font-medium">
                  A COMPREHENSIVE 12 WEEK COURSE FOR TRADES - FAST TRACK YOUR FREEDOM!
                </p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 shrink-0 mt-4 md:mt-0 text-white px-6 py-3 rounded-md font-bold text-md shadow-lg">
                Join Off The Tools
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default MiniVideoModules;
