import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { 
  CheckSquare, 
  Calendar,
  Trophy,
  Target,
  Clock,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { saveToLocalStorage, getFromLocalStorage } from "@/lib/utils";

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

const WeeklyProgressTracker = () => {
  const [weeklyTasks, setWeeklyTasks] = useState<WeeklyTask[]>(() => {
    return getFromLocalStorage("weeklyTasks", []);
  });
  
  const [completedTasks, setCompletedTasks] = useState<WeeklyTask[]>(() => {
    return getFromLocalStorage("completedWeeklyTasks", []);
  });
  
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate progress
  const totalTasks = weeklyTasks.length + completedTasks.length;
  const completedCount = completedTasks.length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  // Save to localStorage when tasks change
  useEffect(() => {
    saveToLocalStorage("weeklyTasks", weeklyTasks);
    saveToLocalStorage("completedWeeklyTasks", completedTasks);
  }, [weeklyTasks, completedTasks]);

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

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-amber-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-400';
    }
  };

  if (totalTasks === 0) {
    return null; // Don't show if no tasks added
  }

  return (
    <section className="mb-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold flex items-center text-white mb-1">
                <CheckSquare className="mr-2 text-primary" /> Weekly Action Progress
              </h2>
              <p className="text-gray-400 text-sm">Track your weekly business development tasks</p>
            </div>
            <div className="text-right mt-2 md:mt-0">
              <div className="text-2xl font-bold text-primary">{completedCount}/{totalTasks}</div>
              <div className="text-sm text-gray-400">Tasks Completed</div>
            </div>
          </div>
          
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
        </CardContent>
      </Card>
    </section>
  );
};

export default WeeklyProgressTracker;