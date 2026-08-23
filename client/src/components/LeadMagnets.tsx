import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, FileText, Mail, Check } from "lucide-react";

// Lead magnet PDF downloads
const leadMagnets = [
  {
    id: "pdf1",
    title: "What's Your Number Worksheet",
    description: "Discover the critical financial metrics every trade business owner needs to know for sustainable growth.",
    coverImage: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    fileSize: "PDF Guide",
    pages: "Essential Reading",
    downloadUrl: "/pdfs/Whats Your Number Worksheet.pdf"
  },
  {
    id: "pdf2",
    title: "Wealth Creation",
    description: "A comprehensive guide to building long-term wealth through your trade business and smart investment strategies.",
    coverImage: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    fileSize: "PDF Guide",
    pages: "Complete Guide",
    downloadUrl: "/pdfs/Wealth Creation.pdf"
  },
  {
    id: "pdf3",
    title: "Property for Dummies",
    description: "Everything you need to know about property investment, simplified for busy trade business owners.",
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    fileSize: "PDF Guide",
    pages: "Step-by-Step",
    downloadUrl: "/pdfs/Property for Dummies.pdf"
  }
];

const LeadMagnets = () => {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSelectPdf = (id: string) => {
    setSelectedPdf(id);
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would normally send the lead information to your CRM or email marketing system
    console.log("Lead submitted:", { name, email, pdfId: selectedPdf });
    
    // Trigger PDF download
    const selectedMagnet = leadMagnets.find(pdf => pdf.id === selectedPdf);
    if (selectedMagnet?.downloadUrl) {
      const link = document.createElement('a');
      link.href = selectedMagnet.downloadUrl;
      link.download = selectedMagnet.title.replace(/\s+/g, '-').toLowerCase() + '.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    // Show success state
    setSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setSelectedPdf(null);
      setName("");
      setEmail("");
      setSubmitted(false);
    }, 5000);
  };

  const selectedLeadMagnet = selectedPdf ? leadMagnets.find(pdf => pdf.id === selectedPdf) : null;

  return (
    <section id="free-resources" className="mb-8">
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <FileText className="mr-2 text-primary" /> Free Trade Business Resources
          </h2>
          
          {selectedPdf && !submitted ? (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <img 
                    src={selectedLeadMagnet?.coverImage} 
                    alt={selectedLeadMagnet?.title} 
                    className="w-full h-auto rounded-md border border-gray-700 shadow-lg"
                  />
                  <div className="mt-4 text-gray-400 text-sm">
                    <p><strong>File size:</strong> {selectedLeadMagnet?.fileSize}</p>
                    <p><strong>Pages:</strong> {selectedLeadMagnet?.pages}</p>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-bold text-white mb-2">{selectedLeadMagnet?.title}</h3>
                  <p className="text-gray-300 mb-6">{selectedLeadMagnet?.description}</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
                      <Input 
                        id="name"
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name" 
                        required
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                      <Input 
                        id="email"
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email" 
                        required
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div className="pt-2">
                      <Button 
                        type="submit" 
                        className="bg-primary hover:bg-primary/90 w-full md:w-auto"
                      >
                        <Download className="mr-2 h-4 w-4" /> Get Your Free PDF
                      </Button>
                      <p className="text-xs text-gray-400 mt-2">
                        By submitting, you agree to receive occasional emails from TradeCoach. You can unsubscribe anytime.
                      </p>
                    </div>
                  </form>
                  
                  <div className="mt-4">
                    <Button 
                      variant="ghost" 
                      onClick={() => setSelectedPdf(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      Back to resources
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : submitted ? (
            <div className="bg-gray-800 border border-green-900 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="text-green-500 h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
              <p className="text-gray-300 mb-6">
                Your download link has been sent to <strong>{email}</strong>
              </p>
              <p className="text-gray-400 mb-6">
                Check your inbox (and spam folder) for an email from TradeCoach with your download link.
              </p>
              <Button 
                variant="outline" 
                onClick={() => setSelectedPdf(null)}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                Browse more resources
              </Button>
            </div>
          ) : (
            <div>
              <p className="text-gray-300 mb-6">
                Download these free resources to help you grow your trade business, increase profits, and get off the tools.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {leadMagnets.map((pdf) => (
                  <div 
                    key={pdf.id}
                    className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-primary transition-colors"
                  >
                    <div 
                      className="h-40 bg-cover bg-center"
                      style={{ backgroundImage: `url(${pdf.coverImage})` }}
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-white mb-2">{pdf.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{pdf.description}</p>
                      <Button 
                        onClick={() => handleSelectPdf(pdf.id)}
                        className="w-full bg-primary hover:bg-primary/90"
                      >
                        <Mail className="mr-2 h-4 w-4" /> Get Free PDF
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default LeadMagnets;