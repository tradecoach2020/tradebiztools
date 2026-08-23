import { Button } from "@/components/ui/button";

const AppHeader = () => {
  return (
    <header className="bg-black shadow-sm sticky top-0 z-10 border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              <span className="text-gray-400">TRADE</span>
              <span className="text-white">COACH</span>
            </h1>
            <p className="text-sm text-gray-400">Free Tools for Trade Business Owners</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="hidden md:block text-white border-gray-700 hover:bg-gray-800">
            Sign In
          </Button>
          <Button variant="default" className="bg-primary hover:bg-primary/90">
            Unlock Full Program
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
