import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Play, PlayCircle, Clock, ChevronRight, Eye } from "lucide-react";

// Video tutorial types
interface VideoTutorial {
  id: number;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  isFree: boolean;
  category: string;
  videoUrl?: string;
  unlockUrl?: string;
  viewCount?: number;
}

// Sample data for now - this will be replaced with your actual videos later
const videoTutorials: VideoTutorial[] = [
  // Free videos
  {
    id: 1,
    title: "How to Price Jobs Correctly",
    description: "Learn the fundamentals of pricing your trade jobs to ensure profitability while remaining competitive.",
    duration: "18:42",
    thumbnail: "https://placehold.co/320x180/1e293b/FFFFFF/png?text=Pricing+Jobs",
    isFree: true,
    category: "business",
    videoUrl: "#",
    viewCount: 268
  },
  {
    id: 2,
    title: "Social Media Marketing for Trades",
    description: "Simple social media strategies specifically for tradespeople to get more leads from Facebook and Instagram.",
    duration: "23:15",
    thumbnail: "https://placehold.co/320x180/1e293b/FFFFFF/png?text=Social+Media",
    isFree: true,
    category: "marketing",
    videoUrl: "#",
    viewCount: 183
  },
  {
    id: 3,
    title: "Time Management Essentials",
    description: "Practical time management tips for busy tradespeople - get more done in less time.",
    duration: "15:27",
    thumbnail: "https://placehold.co/320x180/1e293b/FFFFFF/png?text=Time+Management",
    isFree: true,
    category: "productivity",
    videoUrl: "#",
    viewCount: 207
  },
  
  // Premium videos (placeholders for future content)
  {
    id: 4,
    title: "Hiring Your First Employee",
    description: "Step-by-step guide to hiring, onboarding and managing your first employee in your trade business.",
    duration: "47:18",
    thumbnail: "https://placehold.co/320x180/1e293b/FFFFFF/png?text=Premium+Content",
    isFree: false,
    category: "team",
    unlockUrl: "#"
  },
  {
    id: 5,
    title: "Advanced Quoting Techniques",
    description: "Take your quoting to the next level with these advanced techniques that increase your win rate and profit margins.",
    duration: "35:42",
    thumbnail: "https://placehold.co/320x180/1e293b/FFFFFF/png?text=Premium+Content",
    isFree: false,
    category: "business",
    unlockUrl: "#"
  },
  {
    id: 6,
    title: "Systemizing Your Business",
    description: "How to create systems and processes that allow your business to run without you being involved in every detail.",
    duration: "52:09",
    thumbnail: "https://placehold.co/320x180/1e293b/FFFFFF/png?text=Premium+Content",
    isFree: false,
    category: "systems",
    unlockUrl: "#"
  },
  {
    id: 7,
    title: "Tax Planning for Trades",
    description: "Legal tax optimization strategies specifically for trade business owners, potentially saving you thousands.",
    duration: "40:33",
    thumbnail: "https://placehold.co/320x180/1e293b/FFFFFF/png?text=Premium+Content",
    isFree: false,
    category: "finance",
    unlockUrl: "#"
  },
  {
    id: 8,
    title: "Building Your Online Presence",
    description: "Comprehensive guide to establishing a professional online presence that attracts high-quality leads.",
    duration: "38:22",
    thumbnail: "https://placehold.co/320x180/1e293b/FFFFFF/png?text=Premium+Content",
    isFree: false,
    category: "marketing",
    unlockUrl: "#"
  }
];

const VideoTutorialsVault = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState<VideoTutorial | null>(null);
  
  // Filtered videos based on active tab
  const filteredVideos = activeTab === "all" 
    ? videoTutorials 
    : videoTutorials.filter(video => video.category === activeTab);
  
  // Count videos by category
  const freeCount = videoTutorials.filter(v => v.isFree).length;
  const premiumCount = videoTutorials.filter(v => !v.isFree).length;
  
  // Handle watching a video
  const handleWatchVideo = (video: VideoTutorial) => {
    setSelectedVideo(video);
    // In a real implementation, this would open the video player or redirect to the video page
    console.log("Watching video:", video.title);
  };
  
  return (
    <section id="video-tutorials" className="mb-8">
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold flex items-center mb-6 text-white">
            <span className="text-primary mr-2">🎬</span> Trade Video Tutorials Vault
          </h2>
          
          <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
            <TabsList className="bg-gray-800 border border-gray-700">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary">
                All Videos ({videoTutorials.length})
              </TabsTrigger>
              <TabsTrigger value="free" className="data-[state=active]:bg-primary">
                <Play size={14} className="mr-1" /> Free ({freeCount})
              </TabsTrigger>
              <TabsTrigger value="premium" className="data-[state=active]:bg-primary">
                <Lock size={14} className="mr-1" /> Premium ({premiumCount})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              <p className="text-gray-400 mb-4">
                Access trade-specific video tutorials to help you grow and manage your business more effectively.
              </p>
            </TabsContent>
            
            <TabsContent value="free" className="mt-4">
              <p className="text-gray-400 mb-4">
                Free video tutorials to help you get started with improving your trade business.
              </p>
            </TabsContent>
            
            <TabsContent value="premium" className="mt-4">
              <p className="text-gray-400 mb-4">
                In-depth premium video tutorials available exclusively to Off The Tools Programme members.
              </p>
            </TabsContent>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {filteredVideos.map((video) => (
              <div 
                key={video.id}
                className={`border border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition ${
                  !video.isFree ? 'bg-gray-800/50' : 'bg-gray-800'
                }`}
              >
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
                    <Clock size={12} className="mr-1" /> {video.duration}
                  </div>
                  {!video.isFree && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Lock className="text-white h-12 w-12 opacity-80" />
                    </div>
                  )}
                  {video.isFree && video.viewCount && (
                    <div className="absolute bottom-2 left-2 bg-blue-900/70 text-white text-xs px-2 py-1 rounded flex items-center">
                      <Eye size={12} className="mr-1" /> {video.viewCount} views
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className={`font-medium mb-2 ${!video.isFree ? 'text-gray-400' : 'text-white'}`}>
                    {video.title}
                  </h3>
                  <p className={`text-sm ${video.isFree ? 'text-gray-300' : 'text-gray-400'} mb-4 line-clamp-2`}>
                    {video.description}
                  </p>
                  <div className="flex justify-between items-center">
                    {video.isFree ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleWatchVideo(video)}
                        className="text-primary hover:text-blue-400 w-full"
                      >
                        <PlayCircle size={16} className="mr-1" /> Watch Now
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white w-full"
                      >
                        <Lock size={14} className="mr-1" /> Unlock in Off The Tools
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-medium text-white">Want All Video Tutorials?</h4>
              <p className="text-sm text-gray-300">Unlock the complete library with the Off The Tools Programme</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 shrink-0 flex items-center">
              Get Access <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default VideoTutorialsVault;