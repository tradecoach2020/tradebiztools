import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare, 
  Send, 
  User, 
  AlertCircle, 
  Clock,
  Phone,
  Calendar,
  X
} from "lucide-react";
import { formatDate } from "@/lib/utils";

// Types for messages
type MessageType = "user" | "assistant" | "system";

interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
}

// Helper function to generate IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

const VirtualAssistantChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: generateId(),
      type: "system",
      content: "Welcome to TradeCoach Assistant! How can I help you with your trade business today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [hasUsedChat, setHasUsedChat] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    topic: ""
  });
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    const messagesContainer = document.querySelector('[data-messages-container]');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);
  
  // Simulate receiving a message from the assistant
  const simulateAssistantResponse = (userMessage: string) => {
    setIsTyping(true);
    
    // Prepare responses based on user input
    let response = "";
    
    // Basic keyword matching for common questions
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage === "hey") {
      response = "Hi there! How can I help with your trade business today?";
    } else if (lowerMessage.includes("pricing") || lowerMessage.includes("cost") || lowerMessage.includes("price")) {
      response = "Our Off The Tools Programme has flexible pricing options. Currently, we offer payment plans starting from £X per month. Would you like to schedule a call with our team to discuss this further?";
    } else if (lowerMessage.includes("template") || lowerMessage.includes("download")) {
      response = "You can access all our free templates in the Templates Vault section. For advanced templates, you'll need to join the full Off The Tools Programme.";
    } else if (lowerMessage.includes("call") || lowerMessage.includes("speak") || lowerMessage.includes("talk")) {
      response = "I'd be happy to arrange a call with one of our coaches. Would you like to schedule a free 15-minute consultation?";
      setShowScheduleForm(true);
    } else if (lowerMessage.includes("problem") || lowerMessage.includes("issue") || lowerMessage.includes("help")) {
      response = "I'm sorry to hear you're having trouble. Could you please provide more specific details about the challenge you're facing in your business? This will help us provide targeted advice.";
    } else {
      response = "Thanks for your message. Our team will review this and get back to you soon. In the meantime, feel free to explore our free resources or schedule a call if you need immediate assistance.";
    }
    
    // Simulate delay for typing
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        {
          id: generateId(),
          type: "assistant",
          content: response,
          timestamp: new Date()
        }
      ]);
      setIsTyping(false);
      
      // If chat is not open, increment unread count
      if (!isChatOpen) {
        setUnreadCount(prev => prev + 1);
      }
    }, 1500);
  };
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;
    
    const newMessage: Message = {
      id: generateId(),
      type: "user",
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");
    setHasUsedChat(true);
    
    // Simulate assistant response
    simulateAssistantResponse(inputMessage);
  };
  
  // Handle scheduling a call
  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, this would send the data to your backend
    console.log("Schedule form submitted:", scheduleForm);
    
    // Confirmation message
    setMessages(prev => [
      ...prev,
      {
        id: generateId(),
        type: "system",
        content: `Thanks ${scheduleForm.name}! We've scheduled a call for ${scheduleForm.date} at ${scheduleForm.time}. You'll receive a confirmation email shortly.`,
        timestamp: new Date()
      }
    ]);
    
    // Reset form and hide it
    setScheduleForm({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      topic: ""
    });
    
    setShowScheduleForm(false);
  };
  
  // Handle opening the chat
  const handleOpenChat = () => {
    setIsChatOpen(true);
    setUnreadCount(0);
  };
  
  return (
    <>
      {/* Floating chat button */}
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
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium">TradeCoach Assistant</h3>
                  <p className="text-white/70 text-xs">Virtual Assistant</p>
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
            <div className="h-96 overflow-y-auto p-3 bg-gray-800">
              {messages.map(message => (
                <div 
                  key={message.id}
                  className={`mb-3 ${
                    message.type === "user" 
                      ? "flex justify-end" 
                      : "flex justify-start"
                  }`}
                >
                  {message.type === "assistant" && (
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                      <MessageSquare className="h-4 w-4 text-white" />
                    </div>
                  )}
                  
                  {message.type === "system" && (
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                      <AlertCircle className="h-4 w-4 text-white" />
                    </div>
                  )}
                  
                  <div 
                    className={`p-3 rounded-lg max-w-[75%] ${
                      message.type === "user" 
                        ? "bg-primary text-white rounded-tr-none"
                        : message.type === "assistant"
                          ? "bg-gray-700 text-white rounded-tl-none"
                          : "bg-gray-600 text-white"
                    }`}
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
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start mb-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                    <MessageSquare className="h-4 w-4 text-white" />
                  </div>
                  <div className="p-3 rounded-lg bg-gray-700 text-white rounded-tl-none">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Schedule form */}
              {showScheduleForm && (
                <div className="mb-3 bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <h4 className="text-white font-medium mb-3 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" /> Schedule a Call
                  </h4>
                  
                  <form onSubmit={handleScheduleSubmit} className="space-y-3">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                        value={scheduleForm.name}
                        onChange={(e) => setScheduleForm({...scheduleForm, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                        value={scheduleForm.email}
                        onChange={(e) => setScheduleForm({...scheduleForm, email: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                        value={scheduleForm.phone}
                        onChange={(e) => setScheduleForm({...scheduleForm, phone: e.target.value})}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        className="p-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                        value={scheduleForm.date}
                        onChange={(e) => setScheduleForm({...scheduleForm, date: e.target.value})}
                        required
                      />
                      <input
                        type="time"
                        className="p-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                        value={scheduleForm.time}
                        onChange={(e) => setScheduleForm({...scheduleForm, time: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="What would you like to discuss?"
                        className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                        rows={2}
                        value={scheduleForm.topic}
                        onChange={(e) => setScheduleForm({...scheduleForm, topic: e.target.value})}
                      />
                    </div>
                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowScheduleForm(false)}
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
                        <Phone className="h-4 w-4 mr-2" /> Schedule Call
                      </Button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Ref for auto-scrolling */}
              <div data-message-end />
            </div>
            
            {/* Chat input */}
            <div className="p-3 border-t border-gray-700 bg-gray-800">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Type your message..."
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
              
              {!hasUsedChat && (
                <div className="mt-2 text-xs text-gray-400">
                  Ask us anything about your trade business! Our VA will assist you.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VirtualAssistantChat;