import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Youtube, Clock, Calendar, Eye } from "lucide-react";

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

// TradeCoach YouTube API key
const YOUTUBE_API_KEY = "AIzaSyAhVuZDgnSF1B1pF0LzjvrsLS6_kozz35E";
const CHANNEL_ID = "UCpJ3PI9MdKWHMcQ9COaUiw";

const YoutubeVideos = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fallback videos in case API fails
  const fallbackVideos = [
    {
      id: "v1",
      title: "The 3 Biggest Growth Barriers in Trade Businesses",
      videoId: "NZeiBF1VsQw",
      thumbnail: "https://img.youtube.com/vi/NZeiBF1VsQw/hqdefault.jpg",
      description: "Discover the 3 most common barriers holding back your growth and how to overcome them."
    },
    {
      id: "v2",
      title: "How To Stop Being The Bottleneck In Your Business",
      videoId: "t1hRQoi81h8",
      thumbnail: "https://img.youtube.com/vi/t1hRQoi81h8/hqdefault.jpg",
      description: "Learn how to stop being the bottleneck in your trade business and start growing."
    },
    {
      id: "v3",
      title: "5 Systems Every Trade Business Needs",
      videoId: "I2kLW_r9T_M",
      thumbnail: "https://img.youtube.com/vi/I2kLW_r9T_M/hqdefault.jpg",
      description: "The 5 essential systems that will transform your trade business and help you get off the tools."
    }
  ];
  
  // Format view counts for better display
  const formatViews = (viewCount: string) => {
    const count = parseInt(viewCount, 10);
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return viewCount;
  };
  
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
        
        // Fetch videos from your channel
        const searchResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=6&order=date&type=video&key=${YOUTUBE_API_KEY}`
        );
        
        if (!searchResponse.ok) {
          throw new Error('YouTube API search request failed');
        }
        
        const searchData = await searchResponse.json();
        
        if (searchData.items && searchData.items.length > 0) {
          // Map the response to our video interface
          const channelVideos = searchData.items.map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            videoId: item.id.videoId,
            thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
            description: item.snippet.description,
            publishedAt: item.snippet.publishedAt
          }));
          
          setVideos(channelVideos);
        } else {
          // If no videos found, use fallback videos
          setVideos(fallbackVideos);
        }
      } catch (err) {
        console.error("Error fetching YouTube videos:", err);
        setError("Failed to load videos. Using previously cached videos.");
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
              <span className="text-red-600 mr-2"><Youtube size={24} /></span> TradeCoach Videos
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
                videos.map((video) => (
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
        </CardContent>
      </Card>
    </section>
  );
};

export default YoutubeVideos;