import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  RotateCcw
} from "lucide-react";

interface Question {
  id: number;
  timestamp: string;
  question: string;
  category: string;
  asker: string;
}

const previousQAQuestions: Question[] = [
  {
    id: 1,
    timestamp: "Question 1",
    question: "I'm struggling to price my electrical work correctly. How do I know if I'm charging enough without losing customers?",
    category: "Pricing",
    asker: "Dave from Manchester"
  },
  {
    id: 2,
    timestamp: "Question 2",
    question: "My business is just me and one apprentice. When should I consider hiring more staff, and how do I know I'm ready?",
    category: "Growth",
    asker: "Sarah from Bristol"
  },
  {
    id: 3,
    timestamp: "Question 3",
    question: "I spend too much time on admin and quotes. What systems should I put in place to free up more time for actual work?",
    category: "Systems",
    asker: "Mark from Leeds"
  },
  {
    id: 4,
    timestamp: "Question 4",
    question: "How do I handle customers who always want to negotiate on price? I feel like I'm always having to justify my rates?",
    category: "Customer Relations",
    asker: "Tony from Birmingham"
  },
  {
    id: 5,
    timestamp: "Question 5",
    question: "I'm a plumber and I want to get more commercial work. How do I break into that market when all my experience is residential?",
    category: "Marketing",
    asker: "Lisa from Glasgow"
  },
  {
    id: 6,
    timestamp: "Question 6",
    question: "My cash flow is all over the place. Sometimes I'm flush, sometimes I'm struggling. How do I smooth this out?",
    category: "Finance",
    asker: "Chris from Cardiff"
  },
  {
    id: 7,
    timestamp: "Question 7",
    question: "I've been thinking about getting off the tools but I'm worried about losing control of quality. How do I manage this transition?",
    category: "Leadership",
    asker: "Pete from Newcastle"
  },
  {
    id: 8,
    timestamp: "Question 8",
    question: "Social media feels overwhelming. What's the simplest way to get started with marketing my carpentry business online?",
    category: "Digital Marketing",
    asker: "Emma from Southampton"
  },
  {
    id: 9,
    timestamp: "Question 9",
    question: "I'm constantly getting calls for emergency work but it's disrupting my planned jobs. How do I balance this?",
    category: "Time Management",
    asker: "Rob from Nottingham"
  },
  {
    id: 10,
    timestamp: "Question 10",
    question: "My apprentice is progressing well but I'm not sure how to structure their pay progression. Any guidance on this?",
    category: "Team Development",
    asker: "Michelle from Sheffield"
  },
  {
    id: 11,
    timestamp: "Question 11",
    question: "I keep underbidding jobs because I'm afraid of losing work. How do I get more confident with my pricing?",
    category: "Pricing",
    asker: "James from Liverpool"
  },
  {
    id: 12,
    timestamp: "Question 12",
    question: "What's the best way to handle difficult customers who keep changing their requirements mid-job?",
    category: "Customer Relations",
    asker: "Anna from Brighton"
  },
  {
    id: 13,
    timestamp: "Question 13",
    question: "I want to expand into a second trade area. Should I learn it myself or hire someone who already has the skills?",
    category: "Business Development",
    asker: "Kevin from Oxford"
  },
  {
    id: 14,
    timestamp: "Question 14",
    question: "My van insurance and fuel costs keep going up. How do I factor these rising costs into my pricing?",
    category: "Finance",
    asker: "Rachel from York"
  },
  {
    id: 15,
    timestamp: "Question 15",
    question: "I'm getting more work than I can handle but I'm not ready to hire yet. What's the best way to manage this growth?",
    category: "Growth",
    asker: "Simon from Cambridge"
  },
  {
    id: 16,
    timestamp: "Question 16",
    question: "How do I compete with larger companies when bidding for commercial contracts? They always seem to undercut me.",
    category: "Business Strategy",
    asker: "Paul from Edinburgh"
  },
  {
    id: 17,
    timestamp: "Question 17",
    question: "I'm thinking about offering maintenance contracts to my customers. How should I price these and what should I include?",
    category: "Service Expansion",
    asker: "Helen from Plymouth"
  },
  {
    id: 18,
    timestamp: "Question 18",
    question: "My wife helps with the business admin but we're arguing about work stuff at home. How do we separate business and personal?",
    category: "Family Business",
    asker: "Steve from Coventry"
  },
  {
    id: 19,
    timestamp: "Question 19",
    question: "I want to take a proper holiday but I'm worried about leaving the business. How do I prepare for time off?",
    category: "Work-Life Balance",
    asker: "Caroline from Reading"
  },
  {
    id: 20,
    timestamp: "Question 20",
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

const LiveQandA = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const currentQuestion = previousQAQuestions[currentQuestionIndex];

  const handlePrevious = () => {
    setCurrentQuestionIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentQuestionIndex(prev => Math.min(previousQAQuestions.length - 1, prev + 1));
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  return (
    <section id="live-qa" className="mb-8">
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center text-white mb-2">
                <Video className="mr-2 h-6 w-6 text-red-500" />
                Q&A Recording Helper
              </h2>
              <p className="text-gray-400 text-sm">
                Questions from previous live session - Record your responses to create Q&A content
              </p>
            </div>
            
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <Badge variant="outline" className="bg-red-100 text-red-600 border-red-200">
                <Video className="h-3 w-3 mr-1" />
                Recording Mode
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-600 border-blue-200">
                <MessageSquare className="h-3 w-3 mr-1" />
                {previousQAQuestions.length} Questions
              </Badge>
            </div>
          </div>

          {/* Current Question Display */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Badge className={`${categoryColors[currentQuestion.category]} text-white`}>
                  {currentQuestion.category}
                </Badge>
                <span className="text-sm text-gray-400 font-semibold">
                  {currentQuestion.timestamp}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {currentQuestion.asker}
              </span>
            </div>
            
            <div className="mb-6">
              <p className="text-white text-xl leading-relaxed font-medium">
                "{currentQuestion.question}"
              </p>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                
                <Button
                  onClick={handleNext}
                  disabled={currentQuestionIndex === previousQAQuestions.length - 1}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
                
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 ml-4"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset to Start
                </Button>
              </div>
              
              <div className="text-sm text-gray-400">
                Question {currentQuestionIndex + 1} of {previousQAQuestions.length}
              </div>
            </div>
          </div>

          {/* Recording Instructions */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6 border-l-4 border-red-500">
            <div className="flex items-start gap-3">
              <Video className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <h3 className="text-white font-semibold mb-2">Recording Instructions</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Read each question aloud as if someone just asked it during a live session, then provide your answer. 
                  Use the navigation controls to move between questions. Each question represents a real concern from trade business owners.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Jump Grid */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Jump to Questions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {previousQAQuestions.map((question, index) => (
                <Button
                  key={question.id}
                  onClick={() => handleJumpToQuestion(index)}
                  variant={index === currentQuestionIndex ? "default" : "ghost"}
                  size="sm"
                  className={`text-left justify-start h-auto p-3 ${
                    index === currentQuestionIndex 
                      ? 'bg-primary text-white' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-xs">Q{index + 1}</span>
                      <Badge 
                        className={`${categoryColors[question.category]} text-white text-xs`}
                      >
                        {question.category}
                      </Badge>
                    </div>
                    <div className="text-xs text-left line-clamp-2">
                      {question.question.substring(0, 40)}...
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Question Categories Summary */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Question Categories</h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(previousQAQuestions.map(q => q.category))).map(category => {
                const count = previousQAQuestions.filter(q => q.category === category).length;
                return (
                  <Badge 
                    key={category}
                    className={`${categoryColors[category]} text-white`}
                  >
                    {category} ({count})
                  </Badge>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default LiveQandA;