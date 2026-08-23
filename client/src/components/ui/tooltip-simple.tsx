import React from "react";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
}

export const Tooltip = ({ children, content }: TooltipProps) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
        {content}
      </div>
    </div>
  );
};

export const TooltipProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const TooltipTrigger = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const TooltipContent = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};