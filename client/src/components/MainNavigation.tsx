import { useState } from "react";
import { navigationItems } from "@/lib/data";
import { cn } from "@/lib/utils";

const MainNavigation = () => {
  const [activeItem, setActiveItem] = useState("daily-fix");

  const handleClick = (id: string) => {
    setActiveItem(id);
    
    // Scroll to the section
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-gray-900 shadow-sm mb-6 overflow-x-auto border-b border-gray-800">
      <div className="container mx-auto">
        <ul className="flex space-x-1 md:space-x-4">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(item.id);
                }}
                className={cn(
                  "inline-block px-4 py-3 text-gray-400 hover:text-primary transition-colors",
                  activeItem === item.id && "text-primary border-b-2 border-primary font-medium"
                )}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default MainNavigation;
