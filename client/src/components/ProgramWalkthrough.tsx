import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Youtube, Play, Lock, CheckCircle, ChevronRight, ExternalLink } from "lucide-react";

const ProgramWalkthrough = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInterestForm, setShowInterestForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    submitted: false
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would send this data to your backend
    console.log("Form submitted:", formData);
    setFormData({ ...formData, submitted: true });
  };

  const handleCourseAccess = () => {
    window.open("https://www.offthetools.online/library", "_blank");
  };

  return (
    <section id="program-walkthrough" className="mb-8">
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold flex items-center text-white mb-1">
                <span className="text-primary mr-2"><Youtube size={24} /></span>
                Off The Tools Programme Walkthrough
              </h2>
              <p className="text-gray-400 text-sm">
                Watch this walkthrough of how our comprehensive program helps trade business owners scale and get off the tools
              </p>
            </div>
          </div>

          {isPlaying ? (
            <div className="mb-6">
              <div className="aspect-video mb-4 bg-black rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/FOf0HkfgFGw?autoplay=1"
                  title="Off The Tools Programme Walkthrough"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              
              {!showInterestForm && !formData.submitted && (
                <div className="flex justify-center">
                  <Button 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => setShowInterestForm(true)}
                  >
                    <Lock className="mr-2 h-4 w-4" /> Unlock Full Programme Access
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div 
              className="relative aspect-video mb-6 rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => setIsPlaying(true)}
            >
              {/* Video thumbnail with play button */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <img 
                src="https://img.youtube.com/vi/FOf0HkfgFGw/maxresdefault.jpg" 
                alt="Off The Tools Programme Walkthrough" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Play fill="white" size={32} className="ml-2" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-xl font-bold text-white mb-2">
                  How the Off The Tools Programme Works
                </h3>
                <p className="text-gray-200">
                  Learn how our proven systems help trade business owners escape the day-to-day grind
                </p>
              </div>
            </div>
          )}
          
          {/* Express Interest Form */}
          {showInterestForm && !formData.submitted && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-3">Get Full Access to the Off The Tools Programme</h3>
              <p className="text-gray-300 mb-4">Complete this form to learn more about how we can help transform your trade business.</p>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    required
                    className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="pt-2">
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Get Programme Information
                  </Button>
                  <p className="text-xs text-gray-400 mt-2">
                    By submitting, you agree to receive information from TradeCoach about the Off The Tools Programme.
                  </p>
                </div>
              </form>
            </div>
          )}
          
          {/* Thank you message after submission */}
          {formData.submitted && (
            <div className="bg-green-900/20 border border-green-800 rounded-lg p-6 mb-6 text-center">
              <div className="w-16 h-16 mx-auto bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Thank You for Your Interest!</h3>
              <p className="text-gray-300 mb-4">
                We've received your information and a TradeCoach specialist will be in touch shortly to discuss how the Off The Tools Programme can help your business.
              </p>
              <p className="text-gray-400 text-sm">
                In the meantime, continue exploring the free resources available in TradeCoach Lite.
              </p>
            </div>
          )}
          
          {/* Programme Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h4 className="font-bold text-white mb-2 flex items-center">
                <span className="text-primary mr-2 flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                  </svg>
                </span>
                Proven Systems &amp; Processes
              </h4>
              <p className="text-gray-300 text-sm">
                Step-by-step frameworks to systematize every aspect of your trade business
              </p>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h4 className="font-bold text-white mb-2 flex items-center">
                <span className="text-primary mr-2 flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                  </svg>
                </span>
                Expert Coaching &amp; Support
              </h4>
              <p className="text-gray-300 text-sm">
                Direct access to coaches who've built successful trade businesses themselves
              </p>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h4 className="font-bold text-white mb-2 flex items-center">
                <span className="text-primary mr-2 flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                  </svg>
                </span>
                Done-For-You Resources
              </h4>
              <p className="text-gray-300 text-sm">
                Templates, scripts, and automation tools that save you hundreds of hours
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
              onClick={() => {
                if (isPlaying) {
                  setIsPlaying(false);
                  setShowInterestForm(false);
                }
              }}
            >
              {isPlaying ? "Return to Overview" : "Learn More About the Programme"}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button
              onClick={handleCourseAccess}
              className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Access the Off The Tools Programme
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ProgramWalkthrough;