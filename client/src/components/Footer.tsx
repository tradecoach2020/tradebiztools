import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Linkedin 
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email.trim() && email.includes('@')) {
      // In a real implementation, we would send the email to a backend
      console.log("Subscribing email:", email);
      setEmail("");
      // Show a success message
      alert("Thanks for subscribing!");
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold flex items-center mb-4">
              <span className="text-primary mr-2">🔧</span> TradeCoach
            </h2>
            <p className="text-gray-400 max-w-xs">
              Helping trade business owners get off the tools and build profitable businesses since 2017.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-medium mb-4 text-white">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Podcast</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">YouTube Channel</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Free Templates</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4 text-white">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4 text-white">Stay Updated</h3>
              <div className="mb-4">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-gray-800 border-gray-700 text-white rounded px-3 py-2 w-full text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button 
                className="bg-primary hover:bg-primary/90 text-sm"
                onClick={handleSubscribe}
                disabled={!email.trim() || !email.includes('@')}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} TradeCoach. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <Youtube size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
