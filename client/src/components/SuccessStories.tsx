import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ArrowUp, ArrowDown, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface TrustpilotReview {
  id: number;
  name: string;
  location: string;
  review: string;
  rating: number;
  date: string;
  improvement: {
    type: string;
    amount: string;
    metric: string;
  };
}

interface TrustpilotResponse {
  reviews: TrustpilotReview[];
}

const SuccessStories = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  // Carousel navigation without useRef

  // Fetch real-time reviews from Trustpilot
  const { data: reviewsData, isLoading, error } = useQuery<TrustpilotResponse>({
    queryKey: ['/api/trustpilot/reviews'],
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const successStories = reviewsData?.reviews || [];

  const handlePrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      scrollToIndex(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < successStories.length - 1) {
      setActiveIndex(activeIndex + 1);
      scrollToIndex(activeIndex + 1);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <section id="stories" className="mb-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold flex items-center mb-6">
              <span className="text-secondary mr-2">🚀</span> Success Stories
            </h2>
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  // Show error state with fallback
  if (error || successStories.length === 0) {
    return (
      <section id="stories" className="mb-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold flex items-center mb-6">
              <span className="text-secondary mr-2">🚀</span> Success Stories
            </h2>
            <p className="text-gray-600 text-center">
              Unable to load reviews from Trustpilot at the moment.
            </p>
          </CardContent>
        </Card>
      </section>
    );
  }

  const scrollToIndex = (index: number) => {
    const carousel = document.querySelector('[data-carousel-container]');
    if (carousel) {
      const storyElements = carousel.querySelectorAll('[data-story]');
      if (storyElements[index]) {
        storyElements[index].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start'
        });
      }
    }
  };

  const getImprovementIcon = (type: string) => {
    switch (type) {
      case 'profit':
      case 'revenue':
        return <ArrowUp className="mr-1 h-4 w-4" />;
      case 'time':
        return <ArrowDown className="mr-1 h-4 w-4" />;
      default:
        return <ArrowUp className="mr-1 h-4 w-4" />;
    }
  };

  return (
    <section id="stories" className="mb-8">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold flex items-center mb-6">
            <span className="text-secondary mr-2">🚀</span> Success Stories
          </h2>
          
          <div className="mb-6 relative">
            <div className="overflow-hidden" 
              style={{ 
                maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)"
              }}>
              <div 
                data-carousel-container
                className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar"
                style={{ scrollSnapType: "x mandatory" }}
              >
                {successStories.map((story: TrustpilotReview, index: number) => (
                  <div 
                    key={story.id}
                    data-story={story.id}
                    className="flex-none w-full md:w-1/2 lg:w-1/3 scroll-snap-align-start"
                  >
                    <div className="border border-neutral-200 rounded-lg overflow-hidden hover:shadow-md transition h-full">
                      <div className="p-4 bg-neutral-50 flex items-center">
                        <Avatar className="w-12 h-12 rounded-full mr-3">
                          <AvatarFallback>{getInitials(story.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{story.name}</h3>
                          <p className="text-sm text-neutral-500">{story.location}</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="text-yellow-400 mb-2">
                          {[...Array(story.rating)].map((_, i) => (
                            <Star key={i} className="inline-block h-4 w-4 fill-yellow-400" />
                          ))}
                          {[...Array(5 - story.rating)].map((_, i) => (
                            <Star key={i + story.rating} className="inline-block h-4 w-4 text-gray-300" />
                          ))}
                        </div>
                        <p className="text-sm mb-3">
                          {story.review}
                        </p>
                        <div className="flex items-center justify-end text-sm">
                          <Button 
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:text-primary/90"
                            onClick={() => window.open('https://www.trustpilot.com/review/tradecoach.co.uk', '_blank')}
                          >
                            Write a review
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full hidden md:flex"
              onClick={handlePrevious}
              disabled={activeIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full hidden md:flex"
              onClick={handleNext}
              disabled={activeIndex === successStories.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          

        </CardContent>
      </Card>
    </section>
  );
};

export default SuccessStories;
