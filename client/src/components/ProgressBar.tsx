import { getFromLocalStorage } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const ProgressBar = () => {
  const [progress, setProgress] = useState(() => {
    return getFromLocalStorage<number>("userProgress", 70);
  });

  useEffect(() => {
    // This would normally be calculated based on user activity
    // For now we're just using the locally stored value with a fallback
  }, []);

  const handleCourseAccess = () => {
    window.open("https://www.offthetools.online/library", "_blank");
  };

  return (
    <div className="bg-gray-800 text-white text-center py-2 text-sm border-b border-gray-700">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <span>
          You've completed <strong className="text-primary">{progress}%</strong> of free content
        </span>
        <div className="hidden md:block">
          <Button
            onClick={handleCourseAccess}
            variant="ghost"
            size="sm"
            className="text-primary hover:text-blue-400 hover:bg-primary/10 text-xs px-3 py-1"
          >
            <ExternalLink className="mr-1 h-3 w-3" />
            Access the Off The Tools Programme
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
