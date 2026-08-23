import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { templates } from "@/lib/data";
import { Download, FileText, FileIcon, BookOpen, ChevronDown, ChevronUp, Lock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TemplatesVault = () => {
  const [downloading, setDownloading] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [showLockedContent, setShowLockedContent] = useState(false);

  const handleDownload = (id: number, downloadUrl: string | undefined) => {
    setDownloading(id);
    
    // Simulate download process
    setTimeout(() => {
      setDownloading(null);
      if (downloadUrl) {
        window.open(downloadUrl, "_blank");
      }
    }, 1000);
  };
  
  // Separate free and locked templates
  const freeTemplates = templates.filter(template => template.isFree);
  const lockedTemplates = templates.filter(template => !template.isFree);
  
  // Filtered templates based on active tab and show locked content state
  const getFilteredTemplates = () => {
    let baseTemplates = showLockedContent ? templates : freeTemplates;
    return activeTab === "all" 
      ? baseTemplates 
      : baseTemplates.filter(template => template.category === activeTab);
  };
  
  const filteredTemplates = getFilteredTemplates();
  
  // Count templates by category (only free templates for main counts)
  const businessCount = freeTemplates.filter(t => t.category === "business").length;
  const workpackCount = freeTemplates.filter(t => t.category === "workpack").length;
  const lockedCount = lockedTemplates.length;

  return (
    <section id="templates" className="mb-8">
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold flex items-center mb-6 text-white">
            <span className="text-primary mr-2">📄</span> Trade Templates Vault
          </h2>
          
          <div className="flex items-center justify-between mb-6">
            <Tabs defaultValue="all" className="flex-1" onValueChange={setActiveTab}>
              <TabsList className="bg-gray-800 border border-gray-700">
                <TabsTrigger value="all" className="data-[state=active]:bg-primary">
                  All ({showLockedContent ? templates.length : freeTemplates.length})
                </TabsTrigger>
                <TabsTrigger value="business" className="data-[state=active]:bg-primary">
                  <FileIcon size={14} className="mr-1" /> Business ({businessCount})
                </TabsTrigger>
                <TabsTrigger value="workpack" className="data-[state=active]:bg-primary">
                  <BookOpen size={14} className="mr-1" /> PDF Workpacks ({workpackCount})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-4">
                <p className="text-gray-400 mb-4">
                  Browse our free business templates and workpacks to help you grow your trade business.
                </p>
              </TabsContent>
              
              <TabsContent value="business" className="mt-4">
                <p className="text-gray-400 mb-4">
                  Essential business documents for running your trade business professionally, from quotes to job sheets.
                </p>
              </TabsContent>
              
              <TabsContent value="workpack" className="mt-4">
                <p className="text-gray-400 mb-4">
                  Comprehensive PDF workpacks covering key business growth areas from lead generation to wealth building.
                </p>
              </TabsContent>
            </Tabs>
            
            {lockedCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLockedContent(!showLockedContent)}
                className="text-gray-400 hover:text-white ml-4"
              >
                <Lock className="h-4 w-4 mr-1" />
                {showLockedContent ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-1" />
                    Hide Locked ({lockedCount})
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-1" />
                    Show Locked ({lockedCount})
                  </>
                )}
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {filteredTemplates.map((template) => (
              <div 
                key={template.id}
                className={`border border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition ${
                  !template.isFree ? 'bg-gray-800/50' : (
                    template.category === "workpack" ? 'bg-gray-800 border-primary/50' : 'bg-gray-800'
                  )
                }`}
              >
                <div className={`p-4 flex items-center justify-between border-b border-gray-700 ${
                  template.category === "workpack" ? 'bg-primary/10' : 'bg-gray-800'
                }`}>
                  <h3 className={`font-medium ${!template.isFree ? 'text-gray-400' : 'text-white'}`}>
                    {template.name}
                  </h3>
                  {template.isFree ? (
                    <span className="text-green-500 text-sm">Free</span>
                  ) : (
                    <span className="text-gray-400 text-sm bg-gray-700 px-2 py-0.5 rounded">Locked</span>
                  )}
                </div>
                <div className="p-4">
                  <p className={`text-sm ${template.isFree ? 'text-gray-300' : 'text-gray-400'} mb-4`}>
                    {template.description}
                  </p>
                  <div className="flex justify-between items-center">
                    {template.isFree ? (
                      <>
                        <span className="text-xs text-gray-500">
                          {template.category === "workpack" ? (
                            <span className="flex items-center">
                              <FileText size={12} className="mr-1 text-primary" /> {template.formats}
                            </span>
                          ) : template.formats}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownload(template.id, template.downloadUrl)}
                          disabled={downloading === template.id}
                          className="text-primary hover:text-blue-400"
                        >
                          {downloading === template.id ? (
                            "Downloading..."
                          ) : (
                            <>
                              <Download size={16} className="mr-1" /> Download
                            </>
                          )}
                        </Button>
                      </>
                    ) : (
                      <div className="flex justify-center w-full">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-orange-400 border-orange-600 hover:bg-orange-600 hover:text-white"
                        >
                          Unlock in Off The Tools
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {!showLockedContent && lockedCount > 0 && (
            <div className="bg-orange-900/20 rounded-lg border border-orange-800 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Premium Content Available</h3>
                  <p className="text-sm text-gray-300">20+ premium content workpacks available within the Off The Tools Programme, plus how-to videos and plug-and-play business systems</p>
                </div>
                <Button 
                  onClick={() => setShowLockedContent(true)}
                  className="bg-orange-600 hover:bg-orange-700 shrink-0"
                >
                  View Premium Content
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default TemplatesVault;