import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Calendar, 
  CheckSquare, 
  Plus, 
  Trash2, 
  Download, 
  RotateCcw, 
  Clock,
  FilePlus,
  Users,
  Target,
  Globe,
  Settings,
  BookOpen,
  Shield,
  Smartphone
} from "lucide-react";
import { saveToLocalStorage, getFromLocalStorage } from "@/lib/utils";

// Predefined tasks for trade business owners
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

// Priority colors
const priorityColors: Record<string, string> = {
  "high": "text-red-500",
  "medium": "text-amber-500",
  "low": "text-green-500"
};

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

// Custom task type
type Task = {
  id: string;
  task: string;
  category: string;
  estimatedTime: string;
  priority: string;
  completed: boolean;
  added: Date;
  completedDate?: Date;
};

const WeeklyActionPlanner = () => {
  const [activeTasks, setActiveTasks] = useState<Task[]>(() => {
    return getFromLocalStorage("weeklyTasks", []);
  });
  
  const [completedTasks, setCompletedTasks] = useState<Task[]>(() => {
    return getFromLocalStorage("completedWeeklyTasks", []);
  });
  
  const [showTaskSelector, setShowTaskSelector] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Get unique categories
  const categories = Array.from(new Set(businessTaskOptions.map(task => task.category)));
  
  // Filter task options by selected category
  const filteredTaskOptions = selectedCategory 
    ? businessTaskOptions.filter(task => task.category === selectedCategory)
    : businessTaskOptions;
  
  // Save tasks to localStorage when they change
  useEffect(() => {
    saveToLocalStorage("weeklyTasks", activeTasks);
    saveToLocalStorage("completedWeeklyTasks", completedTasks);
  }, [activeTasks, completedTasks]);
  
  const addTask = (taskOption: typeof businessTaskOptions[0]) => {
    // Check if task is already in the active list
    if (activeTasks.some(task => task.id === taskOption.id)) {
      return;
    }
    
    const newTask: Task = {
      ...taskOption,
      completed: false,
      added: new Date()
    };
    
    setActiveTasks([...activeTasks, newTask]);
  };
  
  const removeTask = (taskId: string) => {
    setActiveTasks(activeTasks.filter(task => task.id !== taskId));
  };
  
  const toggleTaskCompletion = (taskId: string) => {
    const updatedTasks = activeTasks.map(task => {
      if (task.id === taskId) {
        return { 
          ...task, 
          completed: !task.completed,
          completedDate: !task.completed ? new Date() : undefined
        };
      }
      return task;
    });
    
    // If task was completed, move it to completed tasks
    const completedTask = updatedTasks.find(task => task.id === taskId && task.completed);
    if (completedTask) {
      setCompletedTasks([...completedTasks, completedTask]);
      setActiveTasks(updatedTasks.filter(task => task.id !== taskId));
    } else {
      setActiveTasks(updatedTasks);
    }
  };
  
  const moveTaskBackToActive = (taskId: string) => {
    const taskToMove = completedTasks.find(task => task.id === taskId);
    if (taskToMove) {
      const updatedTask = { ...taskToMove, completed: false, completedDate: undefined };
      setActiveTasks([...activeTasks, updatedTask]);
      setCompletedTasks(completedTasks.filter(task => task.id !== taskId));
    }
  };
  
  const resetAllTasks = () => {
    setActiveTasks([]);
    setCompletedTasks([]);
  };
  
  const downloadTaskPlan = () => {
    const taskText = `
# My Trade Business Weekly Action Plan

## Pending Tasks (${activeTasks.length})
${activeTasks.map(task => `- [ ] ${task.task} (${task.estimatedTime} - ${task.priority} priority)`).join('\n')}

## Completed Tasks (${completedTasks.length})
${completedTasks.map(task => `- [x] ${task.task}`).join('\n')}
    `;
    
    const blob = new Blob([taskText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-weekly-action-plan.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Calculate estimated total time
  const calculateTotalTime = () => {
    let totalMinutes = 0;
    
    activeTasks.forEach(task => {
      const timeStr = task.estimatedTime;
      if (timeStr.includes('hour')) {
        const hours = parseInt(timeStr.split(' ')[0]);
        totalMinutes += hours * 60;
      } else if (timeStr.includes('min')) {
        const mins = parseInt(timeStr.split(' ')[0]);
        totalMinutes += mins;
      }
    });
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return `${hours > 0 ? `${hours} hr${hours !== 1 ? 's' : ''}` : ''} ${minutes > 0 ? `${minutes} min${minutes !== 1 ? 's' : ''}` : ''}`.trim();
  };

  return (
    <section id="weekly-planner" className="mb-8">
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold flex items-center text-white mb-1">
                <CheckSquare className="mr-2 text-primary" /> Weekly Action Planner
              </h2>
              <p className="text-gray-400 text-sm">Plan your week ahead with these key trade business tasks</p>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              {activeTasks.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadTaskPlan}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  <Download className="mr-2 h-4 w-4" /> Download Plan
                </Button>
              )}
              <Button
                variant={showTaskSelector ? "default" : "outline"}
                size="sm"
                onClick={() => setShowTaskSelector(!showTaskSelector)}
                className={showTaskSelector 
                  ? "bg-primary hover:bg-primary/90" 
                  : "border-gray-700 text-gray-300 hover:bg-gray-800"
                }
              >
                <Plus className="mr-2 h-4 w-4" /> Add Tasks
              </Button>
            </div>
          </div>
          
          {/* Example Tasks Banner */}
          {!showTaskSelector && activeTasks.length === 0 && (
            <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 flex flex-col mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Ready-to-Use Action Points for Trade Business Growth:</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-white font-medium mb-2 flex items-center">
                    <Target className="mr-2 h-4 w-4 text-primary" />
                    Quick Wins (15-30 mins)
                  </h4>
                  <ul className="space-y-1 text-gray-300 text-sm pl-4">
                    <li>• Take before/after photos of current job</li>
                    <li>• Send review request texts to recent customers</li>
                    <li>• Update Google Business listing</li>
                    <li>• Create Instagram stories of work process</li>
                    <li>• Download useful mobile apps for trades</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2 flex items-center">
                    <Settings className="mr-2 h-4 w-4 text-primary" />
                    Business Building (1-2 hours)
                  </h4>
                  <ul className="space-y-1 text-gray-300 text-sm pl-4">
                    <li>• Create email quotation template</li>
                    <li>• Set up basic CRM system</li>
                    <li>• Document standard operating procedures</li>
                    <li>• Set up local Facebook/Google ads</li>
                    <li>• Canvas 20 houses in target area</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-3 mb-4">
                <p className="text-gray-300 text-sm">
                  <strong className="text-white">Choose from {businessTaskOptions.length} actionable tasks</strong> across {categories.length} business categories including Lead Generation, Digital Marketing, Quality & Processes, and more.
                </p>
              </div>
              
              <Button 
                onClick={() => setShowTaskSelector(true)}
                className="self-start bg-primary hover:bg-primary/90"
              >
                <Plus className="mr-2 h-4 w-4" /> Browse All {businessTaskOptions.length} Action Points
              </Button>
            </div>
          )}
          
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {filteredTaskOptions.map(taskOption => (
                    <div 
                      key={taskOption.id}
                      className={`p-3 border border-gray-700 rounded-lg flex items-center justify-between ${
                        activeTasks.some(task => task.id === taskOption.id) 
                          ? 'bg-gray-700/50' 
                          : 'bg-gray-800 hover:bg-gray-700/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="text-gray-400">
                          {categoryIcons[taskOption.category] || <CheckSquare size={16} />}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{taskOption.task}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-400 flex items-center">
                              <Clock size={12} className="mr-1" /> {taskOption.estimatedTime}
                            </span>
                            <span className={`text-xs ${priorityColors[taskOption.priority]}`}>
                              {taskOption.priority.charAt(0).toUpperCase() + taskOption.priority.slice(1)} priority
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addTask(taskOption)}
                        disabled={activeTasks.some(task => task.id === taskOption.id)}
                        className="text-primary hover:text-primary/90 hover:bg-gray-700"
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowTaskSelector(false)}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Done Adding Tasks
                </Button>
              </div>
            </div>
          )}
          
          {/* Active Tasks List */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">This Week's Tasks</h3>
              {activeTasks.length > 0 && (
                <div className="text-gray-400 text-sm flex items-center">
                  <Clock size={14} className="mr-1" /> 
                  Estimated time: {calculateTotalTime()}
                </div>
              )}
            </div>
            
            {activeTasks.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-gray-700 rounded-lg">
                <p className="text-gray-400 mb-2">No tasks planned for this week.</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowTaskSelector(true)}
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  <Plus size={16} className="mr-1" /> Add Tasks to Your Plan
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Quick Task Suggestions */}
                <div className="p-3 border border-gray-700 rounded-lg bg-gray-800/50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">Quick Add Tasks:</h4>
                    <span className="text-xs text-gray-400">Click any tag to add to your plan</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-primary/50 text-primary hover:bg-primary/10 text-xs py-0 h-7"
                      onClick={() => {
                        const newTask = {
                          id: `quick-reviews-${Date.now()}`,
                          task: "Get 2× client reviews this week",
                          category: "Sales & Marketing",
                          estimatedTime: "30 mins",
                          priority: "high",
                          completed: false,
                          added: new Date()
                        };
                        setActiveTasks([...activeTasks, newTask]);
                      }}
                    >
                      <Plus size={12} className="mr-1" /> get 2× reviews
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-primary/50 text-primary hover:bg-primary/10 text-xs py-0 h-7"
                      onClick={() => {
                        const newTask = {
                          id: `quick-pricing-${Date.now()}`,
                          task: "Create pricing document",
                          category: "Admin & Finance",
                          estimatedTime: "1 hour",
                          priority: "high",
                          completed: false,
                          added: new Date()
                        };
                        setActiveTasks([...activeTasks, newTask]);
                      }}
                    >
                      <Plus size={12} className="mr-1" /> create pricing doc
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-primary/50 text-primary hover:bg-primary/10 text-xs py-0 h-7"
                      onClick={() => {
                        const newTask = {
                          id: `quick-blog-${Date.now()}`,
                          task: "Build a blog post for your website",
                          category: "Sales & Marketing",
                          estimatedTime: "1.5 hours",
                          priority: "medium",
                          completed: false,
                          added: new Date()
                        };
                        setActiveTasks([...activeTasks, newTask]);
                      }}
                    >
                      <Plus size={12} className="mr-1" /> build a blog
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-primary/50 text-primary hover:bg-primary/10 text-xs py-0 h-7"
                      onClick={() => {
                        const newTask = {
                          id: `quick-podcast-${Date.now()}`,
                          task: "Start a podcast for your trade business",
                          category: "Marketing",
                          estimatedTime: "2 hours",
                          priority: "medium",
                          completed: false,
                          added: new Date()
                        };
                        setActiveTasks([...activeTasks, newTask]);
                      }}
                    >
                      <Plus size={12} className="mr-1" /> start a podcast
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-primary/50 text-primary hover:bg-primary/10 text-xs py-0 h-7"
                      onClick={() => {
                        const newTask = {
                          id: `quick-website-${Date.now()}`,
                          task: "Update website content",
                          category: "Sales & Marketing",
                          estimatedTime: "1 hour",
                          priority: "medium",
                          completed: false,
                          added: new Date()
                        };
                        setActiveTasks([...activeTasks, newTask]);
                      }}
                    >
                      <Plus size={12} className="mr-1" /> update website
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-primary/50 text-primary hover:bg-primary/10 text-xs py-0 h-7"
                      onClick={() => {
                        const newTask = {
                          id: `quick-logo-${Date.now()}`,
                          task: "Design new logo for business",
                          category: "Business Development",
                          estimatedTime: "2 hours",
                          priority: "low",
                          completed: false,
                          added: new Date()
                        };
                        setActiveTasks([...activeTasks, newTask]);
                      }}
                    >
                      <Plus size={12} className="mr-1" /> design new logo
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-primary/50 text-primary hover:bg-primary/10 text-xs py-0 h-7"
                      onClick={() => {
                        const newTask = {
                          id: `quick-busplan-${Date.now()}`,
                          task: "Create new business plan",
                          category: "Business Development",
                          estimatedTime: "3 hours",
                          priority: "high",
                          completed: false,
                          added: new Date()
                        };
                        setActiveTasks([...activeTasks, newTask]);
                      }}
                    >
                      <Plus size={12} className="mr-1" /> do new business plan
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-primary/50 text-primary hover:bg-primary/10 text-xs py-0 h-7"
                      onClick={() => {
                        const newTask = {
                          id: `quick-job-${Date.now()}`,
                          task: "Add new job advert to Indeed",
                          category: "Team Management",
                          estimatedTime: "45 mins",
                          priority: "medium",
                          completed: false,
                          added: new Date()
                        };
                        setActiveTasks([...activeTasks, newTask]);
                      }}
                    >
                      <Plus size={12} className="mr-1" /> add job advert to Indeed
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-primary/50 text-primary hover:bg-primary/10 text-xs py-0 h-7"
                      onClick={() => {
                        const newTask = {
                          id: `quick-xero-${Date.now()}`,
                          task: "Update Xero for real-time financial data",
                          category: "Admin & Finance",
                          estimatedTime: "1 hour",
                          priority: "high",
                          completed: false,
                          added: new Date()
                        };
                        setActiveTasks([...activeTasks, newTask]);
                      }}
                    >
                      <Plus size={12} className="mr-1" /> make Xero real-time
                    </Button>
                  </div>
                </div>
                
                {activeTasks.map(task => (
                  <div 
                    key={task.id}
                    className="p-3 border border-gray-700 rounded-lg bg-gray-800 flex justify-between items-center"
                  >
                    <div className="flex items-start gap-2">
                      <Checkbox 
                        id={`task-${task.id}`}
                        checked={task.completed}
                        onCheckedChange={() => toggleTaskCompletion(task.id)}
                        className="mt-1"
                      />
                      <div>
                        <Label 
                          htmlFor={`task-${task.id}`}
                          className="text-white cursor-pointer hover:text-primary transition-colors"
                        >
                          {task.task}
                        </Label>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-400 flex items-center">
                            <Clock size={12} className="mr-1" /> {task.estimatedTime}
                          </span>
                          <span className={`text-xs ${priorityColors[task.priority]}`}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTask(task.id)}
                      className="text-gray-400 hover:text-red-500 hover:bg-transparent"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-white">Completed Tasks</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetAllTasks}
                  className="text-gray-400 hover:text-red-500 hover:bg-transparent"
                >
                  <RotateCcw size={14} className="mr-1" /> Reset All
                </Button>
              </div>
              <div className="space-y-2">
                {completedTasks.map(task => (
                  <div 
                    key={task.id}
                    className="p-3 border border-gray-700 rounded-lg bg-gray-800/50 flex justify-between items-center"
                  >
                    <div className="flex items-start gap-2">
                      <div className="text-green-500 mt-1">
                        <CheckSquare size={16} />
                      </div>
                      <div>
                        <p className="text-gray-400 line-through">{task.task}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Completed {task.completedDate ? new Date(task.completedDate).toLocaleDateString() : 'recently'}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveTaskBackToActive(task.id)}
                      className="text-gray-400 hover:text-primary hover:bg-transparent"
                    >
                      <RotateCcw size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default WeeklyActionPlanner;