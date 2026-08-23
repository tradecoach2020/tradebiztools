import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatMessages } from "@/lib/data";
import { Download, Play, Send, MessageSquare, Clock } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const coachingQuestions = [
  {
    id: 1,
    question: "I'm struggling to price my electrical work correctly. How do I know if I'm charging enough without losing customers?",
    category: "Pricing",
    asker: "Dave from Manchester"
  },
  {
    id: 2,
    question: "My business is just me and one apprentice. When should I consider hiring more staff, and how do I know I'm ready?",
    category: "Growth",
    asker: "Sam from Bristol"
  },
  {
    id: 3,
    question: "I spend too much time on admin and quotes. What systems should I put in place to free up more time for actual work?",
    category: "Systems",
    asker: "Mark from Leeds"
  },
  {
    id: 4,
    question: "How do I handle customers who always want to negotiate on price? I feel like I'm always having to justify my rates?",
    category: "Customer Relations",
    asker: "Tony from Birmingham"
  },
  {
    id: 5,
    question: "I'm a plumber and I want to get more commercial work. How do I break into that market when all my experience is residential?",
    category: "Marketing",
    asker: "Liam from Glasgow"
  },
  {
    id: 6,
    question: "My cash flow is all over the place. Sometimes I'm flush, sometimes I'm struggling. How do I smooth this out?",
    category: "Finance",
    asker: "Chris from Cardiff"
  },
  {
    id: 7,
    question: "I've been thinking about getting off the tools but I'm worried about losing control of quality. How do I manage this transition?",
    category: "Leadership",
    asker: "Pete from Newcastle"
  },
  {
    id: 8,
    question: "Social media feels overwhelming. What's the simplest way to get started with marketing my carpentry business online?",
    category: "Digital Marketing",
    asker: "Eddie from Southampton"
  },
  {
    id: 9,
    question: "I'm constantly getting calls for emergency work but it's disrupting my planned jobs. How do I balance this?",
    category: "Time Management",
    asker: "Rob from Nottingham"
  },
  {
    id: 10,
    question: "My apprentice is progressing well but I'm not sure how to structure their pay progression. Any guidance on this?",
    category: "Team Development",
    asker: "Mike from Sheffield"
  },
  {
    id: 11,
    question: "I keep underbidding jobs because I'm afraid of losing work. How do I get more confident with my pricing?",
    category: "Pricing",
    asker: "James from Liverpool"
  },
  {
    id: 12,
    question: "What's the best way to handle difficult customers who keep changing their requirements mid-job?",
    category: "Customer Relations",
    asker: "Andy from Brighton"
  },
  {
    id: 13,
    question: "I want to expand into a second trade area. Should I learn it myself or hire someone who already has the skills?",
    category: "Business Development",
    asker: "Kevin from Oxford"
  },
  {
    id: 14,
    question: "My van insurance and fuel costs keep going up. How do I factor these rising costs into my pricing?",
    category: "Finance",
    asker: "Ryan from York"
  },
  {
    id: 15,
    question: "I'm getting more work than I can handle but I'm not ready to hire yet. What's the best way to manage this growth?",
    category: "Growth",
    asker: "Simon from Cambridge"
  },
  {
    id: 16,
    question: "How do I compete with larger companies when bidding for commercial contracts? They always seem to undercut me.",
    category: "Business Strategy",
    asker: "Paul from Edinburgh"
  },
  {
    id: 17,
    question: "I'm thinking about offering maintenance contracts to my customers. How should I price these and what should I include?",
    category: "Service Expansion",
    asker: "Harry from Plymouth"
  },
  {
    id: 18,
    question: "My wife helps with the business admin but we're arguing about work stuff at home. How do we separate business and personal?",
    category: "Family Business",
    asker: "Steve from Coventry"
  },
  {
    id: 19,
    question: "I want to take a proper holiday but I'm worried about leaving the business. How do I prepare for time off?",
    category: "Work-Life Balance",
    asker: "Carl from Reading"
  },
  {
    id: 20,
    question: "Should I invest in expensive new tools or keep using what I have? How do I know when an upgrade is worth it?",
    category: "Investment",
    asker: "Danny from Swansea"
  }
];

const categoryColors: Record<string, string> = {
  "Pricing": "bg-green-500",
  "Growth": "bg-blue-500",
  "Systems": "bg-purple-500",
  "Customer Relations": "bg-orange-500",
  "Marketing": "bg-pink-500",
  "Finance": "bg-yellow-500",
  "Leadership": "bg-indigo-500",
  "Digital Marketing": "bg-teal-500",
  "Time Management": "bg-red-500",
  "Team Development": "bg-cyan-500",
  "Business Development": "bg-emerald-500",
  "Business Strategy": "bg-slate-500",
  "Service Expansion": "bg-violet-500",
  "Family Business": "bg-rose-500",
  "Work-Life Balance": "bg-amber-500",
  "Investment": "bg-lime-500"
};

const CoachingRoom = () => {
  const [message, setMessage] = useState("");
  const [messagesRemaining, setMessagesRemaining] = useState(0);
  const [question, setQuestion] = useState("");
  const [displayedQuestions, setDisplayedQuestions] = useState<typeof coachingQuestions>([]);

  useEffect(() => {
    // Add questions to the chat one by one every 4 seconds
    const interval = setInterval(() => {
      setDisplayedQuestions(prev => {
        const nextIndex = prev.length % coachingQuestions.length;
        const nextQuestion = coachingQuestions[nextIndex];
        
        // Keep only the last 6 questions to prevent infinite scroll
        const updatedQuestions = [...prev, nextQuestion];
        return updatedQuestions.slice(-6);
      });
    }, 4000);

    // Start with first question immediately
    setDisplayedQuestions([coachingQuestions[0]]);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (message.trim() && messagesRemaining > 0) {
      // In a real implementation, we would send the message to a backend
      setMessage("");
      setMessagesRemaining(messagesRemaining - 1);
    }
  };

  const handleSubmitQuestion = () => {
    if (question.trim()) {
      // In a real implementation, we would send the question to a backend
      setQuestion("");
      // Show a success message
      alert("Your question has been submitted successfully!");
    }
  };

  return (
    <section id="coaching" className="mb-8">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold flex items-center mb-6">
            <span className="text-secondary mr-2">💬</span> Coaching Room
          </h2>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/2">
              <div className="border border-neutral-200 rounded-lg overflow-hidden mb-4">
                <div className="bg-neutral-100 p-4">
                  <h3 className="font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="23 7 16 12 23 17 23 7" />
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                    </svg>
                    Weekly Q&A Recording
                    <Badge variant="outline" className="ml-2 bg-green-100 text-success border-0 px-2 py-0.5 rounded-full text-xs">NEW</Badge>
                  </h3>
                </div>
                <div className="p-4">
                  <div className="aspect-w-16 aspect-h-9 bg-neutral-800 rounded-md mb-4 relative">
                    {/* Video placeholder */}
                    <div className="relative overflow-hidden rounded-md w-full pt-[56.25%] bg-neutral-800">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button variant="outline" size="icon" className="rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition">
                          <Play className="h-5 w-5 text-primary" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <h4 className="font-medium mb-2">Q&A Session: May 15, 2023</h4>
                  <p className="text-sm text-neutral-500 mb-4">
                    Topics covered: Getting more leads from Facebook, pricing seasonal work, dealing with difficult clients
                  </p>
                  <div className="text-sm text-neutral-600 flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    38 minutes
                  </div>
                  <div>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      <Download size={16} className="mr-1" /> Download Audio (MP3)
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium mb-2">Submit Your Question</h4>
                <p className="text-sm text-neutral-600 mb-4">
                  Get your business questions answered in next week's Q&A session.
                </p>
                <div className="mb-4">
                  <Textarea
                    className="w-full border border-neutral-300 rounded p-2 text-sm"
                    rows={3}
                    placeholder="Type your question here..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                </div>
                <Button 
                  className="bg-primary hover:bg-primary/90 text-sm"
                  onClick={handleSubmitQuestion}
                  disabled={!question.trim()}
                >
                  Submit Question
                </Button>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="border border-neutral-200 rounded-lg overflow-hidden h-full flex flex-col">
                <div className="bg-neutral-100 p-4 flex items-center justify-between">
                  <h3 className="font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    Community Chat
                  </h3>
                  <Badge variant="outline" className="bg-green-100 text-success border-0 px-2 py-0.5 rounded-full text-xs">12 Online</Badge>
                </div>
                
                <div className="p-4 flex-grow overflow-y-auto" style={{ maxHeight: '400px' }}>
                  <div className="space-y-4">
                    {displayedQuestions.map((question, index) => (
                      <div key={`${question.id}-${index}`} className="flex items-start gap-3 animate-in slide-in-from-bottom duration-500">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {question.asker.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <span className="font-medium text-sm">{question.asker}</span>
                            <Badge className={`ml-2 ${categoryColors[question.category]} text-white text-xs`}>
                              {question.category}
                            </Badge>
                            <span className="text-xs text-neutral-500 ml-2 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              just now
                            </span>
                          </div>
                          <p className="text-sm text-black bg-white border border-neutral-200 p-3 rounded-lg leading-relaxed">
                            {question.question}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {displayedQuestions.length === 0 && (
                      <div className="text-center py-8 text-gray-400">
                        <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Loading community discussions...</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-4 border-t border-neutral-200">
                  <div className="flex items-center">
                    <input 
                      type="text" 
                      className="border border-neutral-300 rounded-l-md p-2 flex-grow text-sm"
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      className="bg-primary hover:bg-primary/90 p-2 rounded-r-md"
                      onClick={handleSendMessage}
                      disabled={!message.trim() || messagesRemaining <= 0}
                    >
                      <Send size={16} />
                    </Button>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-xs text-neutral-500">
                    <span>Free users: 1 message per day</span>
                    <span>{messagesRemaining}/1 messages remaining today</span>
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

export default CoachingRoom;
