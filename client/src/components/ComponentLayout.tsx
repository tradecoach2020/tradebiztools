import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import ProgressBar from "@/components/ProgressBar";
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";

interface ComponentLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const ComponentLayout = ({ children, title }: ComponentLayoutProps) => {
  return (
    <div>
      <AppHeader />
      <ProgressBar />
      <MainNavigation />
      
      <main className="container mx-auto px-4 pb-12">
        <div className="mb-4 flex items-center gap-3">
          <Link href="/">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          {title && (
            <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          )}
        </div>
        
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default ComponentLayout;