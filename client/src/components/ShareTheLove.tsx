import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, MessageCircle, Heart, Users, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ShareTheLove = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // Get the current app URL
  const appUrl = window.location.origin;
  
  // Pre-filled message for sharing
  const shareMessage = `Hey! Have you seen this new app for tradesmen and women? It's brilliant - give it a look! ${appUrl}`;

  const handleShareViaSMS = () => {
    // Create SMS link with pre-filled message
    const smsUrl = `sms:?body=${encodeURIComponent(shareMessage)}`;
    
    // Open SMS app
    window.open(smsUrl, '_blank');
    
    toast({
      title: "SMS App Opened",
      description: "Select contacts and send your message!"
    });
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareMessage);
      setCopied(true);
      
      toast({
        title: "Message Copied",
        description: "Share message copied to clipboard!"
      });
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Please copy the link manually",
        variant: "destructive"
      });
    }
  };

  const handleShareViaWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "WhatsApp Opened",
      description: "Share with your contacts on WhatsApp!"
    });
  };

  return (
    <section className="mb-8">
      <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold text-white">
            <Heart className="text-red-500" />
            Share the Love!
          </CardTitle>
          <p className="text-gray-300">
            Know a tradesman or woman who would enjoy this app? Spread the word with one click!
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <p className="text-sm text-gray-300 mb-3">Your message to share:</p>
            <div className="bg-gray-900/50 p-3 rounded border border-gray-600">
              <p className="text-white text-sm">
                "Hey! Have you seen this new app for tradesmen and women? It's brilliant - give it a look!"
              </p>
              <p className="text-blue-400 text-sm mt-1">{appUrl}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={handleShareViaSMS}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 py-6"
            >
              <MessageCircle className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Text Message</div>
                <div className="text-xs opacity-90">Send via SMS</div>
              </div>
            </Button>

            <Button
              onClick={handleShareViaWhatsApp}
              className="bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2 py-6"
            >
              <MessageCircle className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">WhatsApp</div>
                <div className="text-xs opacity-90">Share instantly</div>
              </div>
            </Button>

            <Button
              onClick={handleCopyLink}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center justify-center gap-2 py-6"
            >
              {copied ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
              <div className="text-left">
                <div className="font-medium">{copied ? "Copied!" : "Copy Message"}</div>
                <div className="text-xs opacity-90">Manual share</div>
              </div>
            </Button>
          </div>

          <div className="text-center pt-4 border-t border-gray-700">
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
              <Users className="h-4 w-4" />
              <span>Help your fellow tradespeople discover tools that make their work easier!</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ShareTheLove;