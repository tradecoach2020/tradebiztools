import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { 
  CheckSquare, 
  Calendar,
  Trophy,
  Target,
  Clock,
  ChevronDown,
  ChevronUp,
  Plus,
  FilePlus,
  Users,
  Globe,
  Settings,
  BookOpen,
  Shield,
  Smartphone
} from "lucide-react";
import { saveToLocalStorage, getFromLocalStorage } from "@/lib/utils";

// Predefined tasks for trade business owners (your 64+ options)
const businessTaskOptions = [
  // Sales & Marketing
  {
    id: "email-quotes",
    category: "Sales & Marketing",
    task: "Create email quotation document",
    estimatedTime: "30 mins",
    priority: "high"
  },
  {
    id: "review-requests",
    category: "Sales & Marketing",
    task: "Send out review request text to customers",
    estimatedTime: "15 mins",
    priority: "medium"
  },
  {
    id: "follow-up-calls",
    category: "Sales & Marketing",
    task: "Make follow-up calls with prospects",
    estimatedTime: "1 hour",
    priority: "medium"
  },
  {
    id: "social-media",
    category: "Sales & Marketing",
    task: "Schedule social media posts",
    estimatedTime: "30 mins",
    priority: "low"
  },
  {
    id: "website-update",
    category: "Sales & Marketing",
    task: "Update website with recent projects",
    estimatedTime: "45 mins",
    priority: "medium"
  },
  {
    id: "google-listing",
    category: "Sales & Marketing",
    task: "Update Google Business listing",
    estimatedTime: "20 mins",
    priority: "medium"
  },
  {
    id: "referral-program",
    category: "Sales & Marketing",
    task: "Set up customer referral program",
    estimatedTime: "1 hour",
    priority: "medium"
  },
  
  // Admin & Finance
  {
    id: "invoice-template",
    category: "Admin & Finance",
    task: "Create invoice document template",
    estimatedTime: "45 mins",
    priority: "high"
  },
  {
    id: "review-finances",
    category: "Admin & Finance",
    task: "Review weekly financial performance",
    estimatedTime: "30 mins",
    priority: "high"
  },
  {
    id: "chase-payments",
    category: "Admin & Finance",
    task: "Chase overdue customer payments",
    estimatedTime: "30 mins",
    priority: "high"
  },
  {
    id: "expense-tracking",
    category: "Admin & Finance",
    task: "Update expense tracking spreadsheet",
    estimatedTime: "20 mins",
    priority: "medium"
  },
  {
    id: "tax-planning",
    category: "Admin & Finance",
    task: "Meet with accountant for tax planning",
    estimatedTime: "1 hour",
    priority: "medium"
  },
  {
    id: "price-review",
    category: "Admin & Finance",
    task: "Review and update service pricing",
    estimatedTime: "1 hour",
    priority: "high"
  },
  
  // Operations
  {
    id: "job-schedule",
    category: "Operations",
    task: "Update job schedule for team",
    estimatedTime: "20 mins",
    priority: "high"
  },
  {
    id: "material-orders",
    category: "Operations",
    task: "Place orders for materials",
    estimatedTime: "45 mins",
    priority: "high"
  },
  {
    id: "tool-maintenance",
    category: "Operations",
    task: "Check equipment and tool maintenance",
    estimatedTime: "1 hour",
    priority: "medium"
  },
  {
    id: "vehicle-maintenance",
    category: "Operations",
    task: "Schedule vehicle service/maintenance",
    estimatedTime: "30 mins",
    priority: "medium"
  },
  {
    id: "job-checklist",
    category: "Operations",
    task: "Create standardized job checklist",
    estimatedTime: "45 mins",
    priority: "high"
  },
  {
    id: "inventory-check",
    category: "Operations",
    task: "Perform inventory check of supplies",
    estimatedTime: "1 hour",
    priority: "medium"
  },
  
  // Team Management
  {
    id: "employee-checkin",
    category: "Team Management",
    task: "Conduct weekly employee check-in",
    estimatedTime: "30 mins",
    priority: "medium"
  },
  {
    id: "training-plan",
    category: "Team Management",
    task: "Update training plan for team",
    estimatedTime: "1 hour",
    priority: "low"
  },
  {
    id: "recruitment",
    category: "Team Management",
    task: "Post job listing for new team member",
    estimatedTime: "45 mins",
    priority: "medium"
  },
  {
    id: "performance-review",
    category: "Team Management",
    task: "Conduct employee performance review",
    estimatedTime: "1 hour",
    priority: "medium"
  },
  {
    id: "team-meeting",
    category: "Team Management",
    task: "Plan weekly team meeting agenda",
    estimatedTime: "20 mins",
    priority: "medium"
  },
  {
    id: "health-safety",
    category: "Team Management",
    task: "Review health & safety procedures",
    estimatedTime: "45 mins",
    priority: "high"
  },
  
  // Customer Service
  {
    id: "customer-follow-up",
    category: "Customer Service",
    task: "Follow up with recent customers",
    estimatedTime: "45 mins",
    priority: "medium"
  },
  {
    id: "satisfaction-survey",
    category: "Customer Service",
    task: "Create customer satisfaction survey",
    estimatedTime: "30 mins",
    priority: "low"
  },
  {
    id: "complaint-handling",
    category: "Customer Service",
    task: "Review & improve complaint handling process",
    estimatedTime: "1 hour",
    priority: "medium"
  },
  {
    id: "client-communication",
    category: "Customer Service",
    task: "Create client communication templates",
    estimatedTime: "45 mins",
    priority: "medium"
  },
  {
    id: "thank-you-notes",
    category: "Customer Service",
    task: "Send thank you notes to recent clients",
    estimatedTime: "30 mins",
    priority: "low"
  },
  
  // Business Development
  {
    id: "growth-planning",
    category: "Business Development",
    task: "Work on 3-month business growth plan",
    estimatedTime: "2 hours",
    priority: "high"
  },
  {
    id: "networking",
    category: "Business Development",
    task: "Attend local business networking event",
    estimatedTime: "2 hours",
    priority: "medium"
  },
  {
    id: "competitor-research",
    category: "Business Development",
    task: "Research competitor offerings",
    estimatedTime: "1 hour",
    priority: "low"
  },
  {
    id: "new-service",
    category: "Business Development",
    task: "Plan new service offering",
    estimatedTime: "1.5 hours",
    priority: "medium"
  },
  {
    id: "business-coach",
    category: "Business Development",
    task: "Session with business coach",
    estimatedTime: "1 hour",
    priority: "medium"
  },
  
  // Lead Generation
  {
    id: "door-to-door",
    category: "Lead Generation",
    task: "Canvas 20 houses in target area",
    estimatedTime: "2 hours",
    priority: "medium"
  },
  {
    id: "business-cards",
    category: "Lead Generation", 
    task: "Order and distribute business cards",
    estimatedTime: "30 mins",
    priority: "low"
  },
  {
    id: "local-ads",
    category: "Lead Generation",
    task: "Set up local Facebook/Google ads",
    estimatedTime: "1.5 hours",
    priority: "high"
  },
  {
    id: "leaflet-drop",
    category: "Lead Generation",
    task: "Plan leaflet drop in new area",
    estimatedTime: "1 hour",
    priority: "medium"
  },
  {
    id: "partner-network",
    category: "Lead Generation",
    task: "Contact local suppliers for referrals",
    estimatedTime: "45 mins",
    priority: "medium"
  },
  
  // Digital Marketing
  {
    id: "before-after-photos",
    category: "Digital Marketing",
    task: "Take before/after photos of current job",
    estimatedTime: "15 mins",
    priority: "high"
  },
  {
    id: "case-study",
    category: "Digital Marketing",
    task: "Write case study of recent project",
    estimatedTime: "45 mins",
    priority: "medium"
  },
  {
    id: "video-testimonial",
    category: "Digital Marketing",
    task: "Record customer video testimonial",
    estimatedTime: "30 mins",
    priority: "medium"
  },
  {
    id: "instagram-stories",
    category: "Digital Marketing",
    task: "Create Instagram stories of work process",
    estimatedTime: "20 mins",
    priority: "low"
  },
  {
    id: "linkedin-update",
    category: "Digital Marketing",
    task: "Update LinkedIn business profile",
    estimatedTime: "30 mins",
    priority: "low"
  },
  
  // Quality & Processes
  {
    id: "quality-checklist",
    category: "Quality & Processes",
    task: "Create quality control checklist",
    estimatedTime: "1 hour",
    priority: "high"
  },
  {
    id: "standard-procedures",
    category: "Quality & Processes",
    task: "Document standard operating procedures",
    estimatedTime: "2 hours",
    priority: "high"
  },
  {
    id: "supplier-review",
    category: "Quality & Processes",
    task: "Review and negotiate with suppliers",
    estimatedTime: "1 hour",
    priority: "medium"
  },
  {
    id: "warranty-system",
    category: "Quality & Processes",
    task: "Set up warranty tracking system",
    estimatedTime: "45 mins",
    priority: "medium"
  },
  {
    id: "job-costing",
    category: "Quality & Processes",
    task: "Analyze job costing accuracy",
    estimatedTime: "1 hour",
    priority: "high"
  },
  
  // Personal Development
  {
    id: "skills-training",
    category: "Personal Development",
    task: "Complete online skills training course",
    estimatedTime: "2 hours",
    priority: "medium"
  },
  {
    id: "industry-reading",
    category: "Personal Development",
    task: "Read industry publications/blogs",
    estimatedTime: "30 mins",
    priority: "low"
  },
  {
    id: "certification-research",
    category: "Personal Development",
    task: "Research new certifications",
    estimatedTime: "45 mins",
    priority: "low"
  },
  {
    id: "mentor-meeting",
    category: "Personal Development",
    task: "Meet with industry mentor",
    estimatedTime: "1 hour",
    priority: "medium"
  },
  {
    id: "trade-show",
    category: "Personal Development",
    task: "Plan to attend trade show/exhibition",
    estimatedTime: "1 hour",
    priority: "low"
  },
  
  // Insurance & Legal
  {
    id: "insurance-review",
    category: "Insurance & Legal",
    task: "Review business insurance coverage",
    estimatedTime: "1 hour",
    priority: "medium"
  },
  {
    id: "contract-templates",
    category: "Insurance & Legal",
    task: "Update customer contract templates",
    estimatedTime: "1 hour",
    priority: "high"
  },
  {
    id: "compliance-check",
    category: "Insurance & Legal",
    task: "Check industry compliance requirements",
    estimatedTime: "45 mins",
    priority: "medium"
  },
  {
    id: "terms-conditions",
    category: "Insurance & Legal",
    task: "Update terms and conditions",
    estimatedTime: "30 mins",
    priority: "medium"
  },
  
  // Technology & Tools
  {
    id: "crm-setup",
    category: "Technology & Tools",
    task: "Set up basic CRM system",
    estimatedTime: "2 hours",
    priority: "high"
  },
  {
    id: "scheduling-app",
    category: "Technology & Tools",
    task: "Research scheduling/booking apps",
    estimatedTime: "1 hour",
    priority: "medium"
  },
  {
    id: "invoicing-software",
    category: "Technology & Tools",
    task: "Compare invoicing software options",
    estimatedTime: "45 mins",
    priority: "medium"
  },
  {
    id: "backup-system",
    category: "Technology & Tools",
    task: "Set up document backup system",
    estimatedTime: "1 hour",
    priority: "high"
  },
  {
    id: "mobile-tools",
    category: "Technology & Tools",
    task: "Download useful mobile apps for trades",
    estimatedTime: "30 mins",
    priority: "low"
  }
];

// Category icons
const categoryIcons: Record<string, any> = {
  "Sales & Marketing": <FilePlus size={16} />,
  "Admin & Finance": <Calendar size={16} />,
  "Operations": <CheckSquare size={16} />,
  "Team Management": <Users size={16} />,
  "Customer Service": <Users size={16} />,
  "Business Development": <Target size={16} />,
  "Lead Generation": <Target size={16} />,
  "Digital Marketing": <Globe size={16} />,
  "Quality & Processes": <Settings size={16} />,
  "Personal Development": <BookOpen size={16} />,
  "Insurance & Legal": <Shield size={16} />,
  "Technology & Tools": <Smartphone size={16} />
};

interface WeeklyTask {
  id: string;
  task: string;
  category: string;
  estimatedTime: string;
  priority: string;
  completed: boolean;
  added: Date;
  completedDate?: Date;
}

const WeeklyActionTracker = () => {
  const [weeklyTasks, setWeeklyTasks] = useState<WeeklyTask[]>(() => {
    return getFromLocalStorage("weeklyTasks", []);
  });
  
  const [completedTasks, setCompletedTasks] = useState<WeeklyTask[]>(() => {
    return getFromLocalStorage("completedWeeklyTasks", []);
  });
  
  const [showTaskSelector, setShowTaskSelector] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<string[]>(() => {
    return getFromLocalStorage("selectedWeeklyTasks", []);
  });

  // Get unique categories
  const categories = Array.from(new Set(businessTaskOptions.map(task => task.category)));
  
  // Filter task options by selected category
  const filteredTaskOptions = selectedCategory 
    ? businessTaskOptions.filter(task => task.category === selectedCategory)
    : businessTaskOptions;

  // Calculate progress
  const totalTasks = weeklyTasks.length + completedTasks.length;
  const completedCount = completedTasks.length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  // Save to localStorage when tasks change
  useEffect(() => {
    saveToLocalStorage("weeklyTasks", weeklyTasks);
    saveToLocalStorage("completedWeeklyTasks", completedTasks);
    saveToLocalStorage("selectedWeeklyTasks", selectedTasks);
  }, [weeklyTasks, completedTasks, selectedTasks]);

  const addTask = (taskOption: typeof businessTaskOptions[0]) => {
    // Check if task is already in the active list
    if (weeklyTasks.some(task => task.id === taskOption.id)) {
      return;
    }
    
    const newTask: WeeklyTask = {
      ...taskOption,
      completed: false,
      added: new Date()
    };
    
    setWeeklyTasks([...weeklyTasks, newTask]);
  };

  const toggleTaskCompletion = (taskId: string) => {
    const taskIndex = weeklyTasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      const task = weeklyTasks[taskIndex];
      const updatedTask = { 
        ...task, 
        completed: true, 
        completedDate: new Date() 
      };
      
      // Move to completed tasks
      setCompletedTasks([...completedTasks, updatedTask]);
      setWeeklyTasks(weeklyTasks.filter(t => t.id !== taskId));
    }
  };

  const undoTaskCompletion = (taskId: string) => {
    const taskIndex = completedTasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      const task = completedTasks[taskIndex];
      const updatedTask = { 
        ...task, 
        completed: false, 
        completedDate: undefined 
      };
      
      // Move back to active tasks
      setWeeklyTasks([...weeklyTasks, updatedTask]);
      setCompletedTasks(completedTasks.filter(t => t.id !== taskId));
    }
  };

  return (
    <section className="mb-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold flex items-center text-white mb-1">
                <CheckSquare className="mr-2 text-primary" /> Weekly Action Tracker
              </h2>
              <p className="text-gray-400 text-sm">Add tasks from our library and track your weekly progress</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="bg-blue-900/30 border border-blue-800 rounded-lg px-3 py-1">
                  <span className="text-blue-400 text-sm font-medium">1% Better Every Day</span>
                </div>
                <span className="text-gray-500 text-xs">Small improvements compound into big results</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-2 md:mt-0">
              {totalTasks > 0 && (
                <div className="flex items-center gap-4">
                  {/* Circular Progress Chart - Donut Style */}
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 42 42">
                      {/* Background circle */}
                      <circle
                        className="text-gray-800"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="transparent"
                        r="15.915"
                        cx="21"
                        cy="21"
                      />
                      {/* Progress circle */}
                      <circle
                        className="text-primary transition-all duration-300 ease-in-out"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        fill="transparent"
                        r="15.915"
                        cx="21"
                        cy="21"
                        strokeDasharray={`${progressPercentage} ${100 - progressPercentage}`}
                        strokeDashoffset="0"
                      />
                    </svg>
                    {/* Center content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xs font-bold text-white leading-none">{progressPercentage}%</span>
                      <span className="text-[10px] text-gray-400 leading-none">done</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{completedCount}/{totalTasks}</div>
                    <div className="text-sm text-gray-400">Tasks Completed</div>
                  </div>
                </div>
              )}
              <Button
                onClick={() => setShowTaskSelector(!showTaskSelector)}
                className={showTaskSelector 
                  ? "bg-primary hover:bg-primary/90" 
                  : "bg-gray-700 hover:bg-gray-600"
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                {showTaskSelector ? 'Hide Tasks' : 'Add Tasks'}
              </Button>
            </div>
          </div>

          {/* Task Selector */}
          {showTaskSelector && (
            <div className="mb-6 p-4 bg-gray-800 border border-gray-700 rounded-lg">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">Select tasks to add to your weekly plan:</h3>
                
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                  <Button
                    variant={selectedCategory === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(null)}
                    className={selectedCategory === null 
                      ? "bg-primary hover:bg-primary/90" 
                      : "border-gray-700 text-gray-300 hover:bg-gray-800"
                    }
                  >
                    All Categories
                  </Button>
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={selectedCategory === category
                        ? "bg-primary hover:bg-primary/90" 
                        : "border-gray-700 text-gray-300 hover:bg-gray-800"
                      }
                    >
                      {category}
                    </Button>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                  {filteredTaskOptions.map(taskOption => (
                    <div 
                      key={taskOption.id}
                      className={`p-3 border border-gray-700 rounded-lg flex items-center justify-between ${
                        weeklyTasks.some(task => task.id === taskOption.id) 
                          ? 'bg-green-900/20 border-green-800' 
                          : 'bg-gray-800/50 hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {categoryIcons[taskOption.category]}
                        <div className="flex-1">
                          <p className="text-sm text-white">{taskOption.task}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-400">{taskOption.category}</span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-400">{taskOption.estimatedTime}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => addTask(taskOption)}
                        disabled={weeklyTasks.some(task => task.id === taskOption.id)}
                        className={weeklyTasks.some(task => task.id === taskOption.id)
                          ? "bg-green-600 text-white cursor-not-allowed"
                          : "bg-primary hover:bg-primary/90"
                        }
                      >
                        {weeklyTasks.some(task => task.id === taskOption.id) ? '✓ Added' : 'Add'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {totalTasks > 0 && (
            <>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Progress</span>
                  <span className="text-sm font-medium text-white">{progressPercentage}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* Active Tasks */}
                {weeklyTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
                  >
                    <Checkbox
                      checked={false}
                      onCheckedChange={() => toggleTaskCompletion(task.id)}
                      className="border-gray-600 data-[state=checked]:bg-primary"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{task.task}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-400">{task.category}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {task.estimatedTime}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Completed Tasks */}
                {completedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-3 bg-green-900/20 rounded-lg border border-green-800 hover:border-green-700 transition-colors"
                  >
                    <Checkbox
                      checked={true}
                      onCheckedChange={() => undoTaskCompletion(task.id)}
                      className="border-green-600 data-[state=checked]:bg-green-600"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-green-100 line-through truncate">{task.task}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-green-300">{task.category}</span>
                        <span className="text-xs text-green-500">•</span>
                        <span className="text-xs text-green-300">
                          <Trophy className="h-3 w-3 inline mr-1" />
                          Done
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {weeklyTasks.length === 0 && completedTasks.length > 0 && (
                <div className="text-center py-6 mt-4 bg-green-900/20 rounded-lg border border-green-800">
                  <Trophy className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-green-100 mb-1">Week Complete!</h3>
                  <p className="text-green-300 text-sm">All weekly tasks completed. Great work!</p>
                </div>
              )}
            </>
          )}

          {/* Empty State */}
          {totalTasks === 0 && (
            <div className="text-center py-8">
              <CheckSquare className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Start Your Weekly Planning</h3>
              <p className="text-gray-400 mb-4">
                Choose from {businessTaskOptions.length} actionable tasks across {categories.length} business categories
              </p>
              <Button 
                onClick={() => setShowTaskSelector(true)}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Browse {businessTaskOptions.length} Available Tasks
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default WeeklyActionTracker;