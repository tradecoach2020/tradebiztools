import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, 
  Send, 
  User, 
  Calendar,
  Phone,
  X,
  CornerDownRight,
  Bell
} from "lucide-react";
import { formatDate } from "@/lib/utils";

// Types 
type MessageType = "user" | "va" | "system";

interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
  isNew?: boolean;
}

interface VARequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  timestamp: Date;
  status: "pending" | "in-progress" | "completed";
}

// Helper function to generate IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

// Initial welcome message
const welcomeMessage: Message = {
  id: generateId(),
  type: "system",
  content: "Hi there! Need help with your trade business? Submit your question here and our VA will get back to you within 24 hours.",
  timestamp: new Date()
};

const TradeCoachVA = () => {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [inputMessage, setInputMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [showUserForm, setShowUserForm] = useState(false);
  const [vaRequests, setVaRequests] = useState<VARequest[]>([]);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    const messagesContainer = document.querySelector('[data-messages-container]');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);
  
  // Simulate VA response (in real implementation, this would come from your backend)
  useEffect(() => {
    // This would typically be a polling mechanism or WebSocket connection to check for responses
    const checkForNewResponses = () => {
      // For demo purposes, we'll simulate a VA response after 10 seconds for the first request
      if (vaRequests.length > 0 && vaRequests[0].status === "pending" && !hasSubmitted) {
        const timer = setTimeout(() => {
          // Simulate response for demonstration purposes
          const vaResponse: Message = {
            id: generateId(),
            type: "va",
            content: "Hi there! This is Jane, your TradeCoach VA. Thanks for your question. I'll look into this for you and get back to you shortly. Is there anything else you need help with in the meantime?",
            timestamp: new Date(),
            isNew: true
          };
          
          setMessages(prev => [...prev, vaResponse]);
          
          // Update request status
          setVaRequests(prev => 
            prev.map(req => 
              req.id === vaRequests[0].id 
                ? {...req, status: "in-progress"} 
                : req
            )
          );
          
          // If chat is not open, increment unread count
          if (!isChatOpen) {
            setUnreadCount(prev => prev + 1);
          }
        }, 10000);
        
        return () => clearTimeout(timer);
      }
    };
    
    checkForNewResponses();
  }, [vaRequests, isChatOpen, hasSubmitted]);
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;
    
    // If user hasn't provided contact info, show the form
    if (!userInfo.name || !userInfo.email) {
      setShowUserForm(true);
      return;
    }
    
    const newMessage: Message = {
      id: generateId(),
      type: "user",
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Create a new VA request
    const newRequest: VARequest = {
      id: generateId(),
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone,
      message: inputMessage,
      timestamp: new Date(),
      status: "pending"
    };
    
    setVaRequests(prev => [...prev, newRequest]);
    setInputMessage("");
    setHasSubmitted(true);
    
    // Add a confirmation message
    const confirmationMessage: Message = {
      id: generateId(),
      type: "system",
      content: "Thanks for your request! Our VA will respond to you within 24 hours. You'll receive a notification here and possibly an email when they reply.",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, confirmationMessage]);
  };
  
  // Handle user info submission
  const handleUserInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userInfo.name || !userInfo.email) {
      return; // Don't proceed without required fields
    }
    
    setShowUserForm(false);
    
    // Now proceed with sending the message
    handleSendMessage();
  };
  
  // Handle opening the chat
  const handleOpenChat = () => {
    setIsChatOpen(true);
    setUnreadCount(0);
    
    // Mark any new messages as read
    setMessages(prev => 
      prev.map(msg => ({...msg, isNew: false}))
    );
  };
  
  return (
    <>
      {/* Floating VA button */}
      <div className="fixed bottom-4 right-4 z-50">
        {!isChatOpen ? (
          <button
            onClick={handleOpenChat}
            className="bg-primary rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
          >
            <MessageSquare className="text-white" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl w-80 sm:w-96 overflow-hidden">
            {/* Chat header */}
            <div className="bg-primary p-3 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium">TradeCoach VA</h3>
                  <p className="text-white/70 text-xs">Virtual Assistant Support</p>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-white/70 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Chat messages */}
            <div className="h-96 overflow-y-auto p-3 bg-gray-800" data-messages-container>
              {messages.map(message => (
                <div 
                  key={message.id}
                  className={`mb-3 ${
                    message.type === "user" 
                      ? "flex justify-end" 
                      : "flex justify-start"
                  }`}
                >
                  {message.type === "va" && (
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                  
                  {message.type === "system" && (
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                      <Bell className="h-4 w-4 text-white" />
                    </div>
                  )}
                  
                  <div 
                    className={`p-3 rounded-lg max-w-[75%] ${
                      message.type === "user" 
                        ? "bg-primary text-white rounded-tr-none"
                        : message.type === "va"
                          ? "bg-gray-700 text-white rounded-tl-none"
                          : "bg-gray-600 text-white"
                    } ${message.isNew ? "ring-1 ring-blue-400" : ""}`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {formatDate(message.timestamp)}
                    </p>
                  </div>
                  
                  {message.type === "user" && (
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center ml-2 flex-shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {/* User info form */}
              {showUserForm && (
                <div className="mb-3 bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <h4 className="text-white font-medium mb-3 flex items-center">
                    <User className="h-4 w-4 mr-2" /> Your Contact Information
                  </h4>
                  
                  <form onSubmit={handleUserInfoSubmit} className="space-y-3">
                    <div>
                      <Input
                        type="text"
                        placeholder="Your Name *"
                        className="bg-gray-800 border-gray-600 text-white"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Email Address *"
                        className="bg-gray-800 border-gray-600 text-white"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="tel"
                        placeholder="Phone Number (Optional)"
                        className="bg-gray-800 border-gray-600 text-white"
                        value={userInfo.phone}
                        onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                      />
                    </div>
                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowUserForm(false)}
                        className="text-white border-gray-600 hover:bg-gray-700"
                        size="sm"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        size="sm"
                        className="bg-primary hover:bg-primary/90"
                      >
                        <CornerDownRight className="h-4 w-4 mr-2" /> Submit
                      </Button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Request submitted status */}
              {hasSubmitted && vaRequests.length > 0 && (
                <div className="flex justify-center mb-4">
                  <div className="bg-gray-700 rounded-full px-3 py-1 text-xs text-gray-300 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" /> Request submitted
                  </div>
                </div>
              )}
              
              {/* Auto-scroll marker */}
              <div />
            </div>
            
            {/* Chat input */}
            <div className="p-3 border-t border-gray-700 bg-gray-800">
              {hasSubmitted ? (
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Add more details to your request..."
                    className="bg-gray-700 border-gray-600 text-white focus:ring-primary min-h-[80px] resize-none"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={inputMessage.trim() === ""}
                    className="bg-primary hover:bg-primary/90 shrink-0 h-auto"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Ask our VA a question..."
                    className="bg-gray-700 border-gray-600 text-white focus:ring-primary"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={inputMessage.trim() === ""}
                    className="bg-primary hover:bg-primary/90 shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              <p className="mt-2 text-xs text-gray-400">
                Your questions are sent to a real virtual assistant who will respond within 24 hours
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TradeCoachVA;