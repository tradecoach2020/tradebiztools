import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Youtube, Clock, Calendar, Eye, ExternalLink } from "lucide-react";

// Define YouTube video interface
interface YouTubeVideo {
  id: string;
  title: string;
  videoId: string;
  thumbnail: string;
  description: string;
  publishedAt?: string;
  viewCount?: string;
  duration?: string;
}

// TradeCoach YouTube channel info
const CHANNEL_HANDLE = "@tradecoach2020";

const TradeCoachYouTube = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllVideos, setShowAllVideos] = useState(false);
  
  // Fallback videos in case API fails
  const fallbackVideos: YouTubeVideo[] = [
    {
      id: "NZeiBF1VsQw",
      videoId: "NZeiBF1VsQw",
      title: "The 3 Biggest Growth Barriers in Trade Businesses",
      thumbnail: "https://img.youtube.com/vi/NZeiBF1VsQw/hqdefault.jpg",
      description: "Discover the 3 most common barriers holding back your growth and how to overcome them.",
      publishedAt: "2023-01-15T12:00:00Z"
    },
    {
      id: "t1hRQoi81h8",
      videoId: "t1hRQoi81h8",
      title: "How To Stop Being The Bottleneck In Your Business",
      thumbnail: "https://img.youtube.com/vi/t1hRQoi81h8/hqdefault.jpg",
      description: "Learn how to stop being the bottleneck in your trade business and start growing.",
      publishedAt: "2023-02-22T14:30:00Z"
    },
    {
      id: "I2kLW_r9T_M",
      videoId: "I2kLW_r9T_M",
      title: "5 Systems Every Trade Business Needs",
      thumbnail: "https://img.youtube.com/vi/I2kLW_r9T_M/hqdefault.jpg",
      description: "The 5 essential systems that will transform your trade business and help you get off the tools.",
      publishedAt: "2023-03-05T09:15:00Z"
    }
  ];
  
  // Format date to relative time
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
  };
  
  // Fetch videos from YouTube API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch videos from our server endpoint
        const response = await fetch('/api/youtube/videos');
        
        if (!response.ok) {
          throw new Error('Failed to fetch videos from server');
        }
        
        const data = await response.json();
        
        if (data.videos && data.videos.length > 0) {
          setVideos(data.videos);
        } else {
          setVideos(fallbackVideos);
        }
      } catch (err) {
        console.error("Error fetching YouTube videos:", err);
        setError("Failed to load latest videos. Showing example content.");
        setVideos(fallbackVideos);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVideos();
  }, []);
  
  const handlePlayVideo = (videoId: string) => {
    setSelectedVideo(videoId);
  };
  
  const handleSubscribe = () => {
    window.open("https://www.youtube.com/@tradecoach2020?sub_confirmation=1", "_blank");
  };

  return (
    <section id="youtube-videos" className="mb-8">
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center text-white mb-2 md:mb-0">
              <span className="text-red-600 mr-2"><Youtube size={24} /></span> TradeCoach Video Vault
            </h2>
            <Button 
              onClick={handleSubscribe}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Youtube className="mr-2 h-4 w-4" /> Subscribe to Channel
            </Button>
          </div>
          
          {selectedVideo ? (
            <div className="mb-6">
              <div className="aspect-video mb-4">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-md"
                ></iframe>
              </div>
              <Button
                variant="outline"
                onClick={() => setSelectedVideo(null)}
                className="text-gray-300 border-gray-700 hover:bg-gray-800"
              >
                Back to Video List
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {loading ? (
                <div className="col-span-3 py-12 flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : error ? (
                <div className="col-span-3 text-center py-8 border border-dashed border-gray-700 rounded-lg">
                  <p className="text-gray-400 mb-2">{error}</p>
                </div>
              ) : (
                (showAllVideos ? videos : videos.slice(0, 3)).map((video) => (
                  <div 
                    key={video.id} 
                    className="border border-gray-700 rounded-md overflow-hidden bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer"
                    onClick={() => handlePlayVideo(video.videoId)}
                  >
                    <div className="relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 5V19L19 12L8 5Z" fill="white" />
                          </svg>
                        </div>
                      </div>
                      {video.publishedAt && (
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
                          <Calendar size={12} className="mr-1" /> {formatDate(video.publishedAt)}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-white mb-2 line-clamp-1">{video.title}</h3>
                      <p className="text-sm text-gray-400 line-clamp-2">{video.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          
          {!selectedVideo && (
            <div className="text-center mt-6 space-y-3">
              {videos.length > 3 && (
                <Button 
                  variant="outline" 
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  onClick={() => setShowAllVideos(!showAllVideos)}
                >
                  {showAllVideos ? 'Show Less Videos' : `View More Videos (${videos.length - 3} more)`}
                </Button>
              )}
              <div>
                <Button 
                  variant="outline" 
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  onClick={() => window.open("https://www.youtube.com/@tradecoach2020", "_blank")}
                >
                  Visit YouTube Channel <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default TradeCoachYouTube;