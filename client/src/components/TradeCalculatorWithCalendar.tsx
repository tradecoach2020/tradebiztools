import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  PenLine, 
  Info, 
  Download, 
  Plus,
  Trash2,
  Send,
  Mail,
  MessageSquare,
  Calendar as CalendarIcon,
  Edit,
  ArrowRight,
  Clock,
  MapPin,
  Phone,
  User
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { saveToLocalStorage, getFromLocalStorage } from "@/lib/utils";

// Calendar Event Interface
interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "project" | "appointment";
  status: "scheduled" | "in-progress" | "completed" | "quoted";
  client: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  description: string;
  estimatedValue?: number;
  quotedValue?: number;
  actualValue?: number;
  duration: string;
  notes: string;
  createdAt: Date;
}

// Pricing Calculator Interfaces
interface PricingItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
}

interface PricingSection {
  id: string;
  name: string;
  items: PricingItem[];
  isOpen: boolean;
  total: number;
}

interface TradeTemplate {
  id: string;
  name: string;
  icon: JSX.Element;
  description: string;
  sections: PricingSection[];
}

const TradeCalculatorWithCalendar = () => {
  const { toast } = useToast();
  
  // Active tab state
  const [activeTab, setActiveTab] = useState<"calculator" | "calendar">("calculator");
  
  // Calendar States
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [calendarActiveTab, setCalendarActiveTab] = useState<"projects" | "appointments">("appointments");
  
  const [eventFormData, setEventFormData] = useState({
    title: "",
    date: new Date().toISOString().split('T')[0],
    time: "09:00",
    type: "appointment" as "project" | "appointment",
    status: "scheduled" as CalendarEvent["status"],
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    clientAddress: "",
    description: "",
    estimatedValue: "",
    duration: "1",
    notes: ""
  });

  // Pricing Calculator States
  const [projectName, setProjectName] = useState("New Project");
  const [editMode, setEditMode] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [vatRate, setVatRate] = useState(20);
  const [profit, setProfit] = useState(20);
  const [markup, setMarkup] = useState(15);
  const [dayRate, setDayRate] = useState(250);
  const [projectDays, setProjectDays] = useState(1);
  const [pricingMode, setPricingMode] = useState<'detailed' | 'simple'>('detailed');
  const [projectArea, setProjectArea] = useState(0);
  const [ratePerM2, setRatePerM2] = useState(250);
  
  // Material list dialog state
  const [showMaterialDialog, setShowMaterialDialog] = useState(false);
  const [supplierEmail, setSupplierEmail] = useState("");
  const [supplierPhone, setSupplierPhone] = useState("");
  const [materialListMessage, setMaterialListMessage] = useState("");

  const [sections, setSections] = useState<PricingSection[]>([
    {
      id: "1",
      name: "Materials",
      items: [
        { id: "1", name: "Bricks", quantity: 100, unit: "units", unitPrice: 0.50, total: 50 },
        { id: "2", name: "Cement", quantity: 5, unit: "bags", unitPrice: 8.00, total: 40 }
      ],
      isOpen: true,
      total: 90
    },
    {
      id: "2", 
      name: "Labour",
      items: [
        { id: "3", name: "Skilled Labour", quantity: 8, unit: "hours", unitPrice: 25.00, total: 200 }
      ],
      isOpen: true,
      total: 200
    }
  ]);

  const templates: TradeTemplate[] = [
    {
      id: "bathroom",
      name: "Bathroom Installation",
      icon: <Calculator className="h-4 w-4" />,
      description: "Complete bathroom renovation template",
      sections: [
        {
          id: "1",
          name: "Plumbing Materials",
          items: [
            { id: "1", name: "Toilet", quantity: 1, unit: "unit", unitPrice: 150, total: 150 },
            { id: "2", name: "Basin", quantity: 1, unit: "unit", unitPrice: 80, total: 80 },
            { id: "3", name: "Shower", quantity: 1, unit: "unit", unitPrice: 200, total: 200 }
          ],
          isOpen: true,
          total: 430
        },
        {
          id: "2",
          name: "Labour",
          items: [
            { id: "4", name: "Plumber", quantity: 16, unit: "hours", unitPrice: 35, total: 560 }
          ],
          isOpen: true,
          total: 560
        }
      ]
    },
    {
      id: "kitchen",
      name: "Kitchen Installation", 
      icon: <Calculator className="h-4 w-4" />,
      description: "Full kitchen fitting template",
      sections: [
        {
          id: "1",
          name: "Kitchen Units",
          items: [
            { id: "1", name: "Base Units", quantity: 8, unit: "units", unitPrice: 120, total: 960 },
            { id: "2", name: "Wall Units", quantity: 6, unit: "units", unitPrice: 90, total: 540 },
            { id: "3", name: "Worktop", quantity: 3, unit: "metres", unitPrice: 80, total: 240 }
          ],
          isOpen: true,
          total: 1740
        }
      ]
    }
  ];

  // Load events from localStorage on component mount
  useEffect(() => {
    const savedEvents = getFromLocalStorage<CalendarEvent[]>("calendar-events", []);
    setEvents(savedEvents);
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    saveToLocalStorage("calendar-events", events);
  }, [events]);

  // Calendar Functions
  const resetEventForm = () => {
    setEventFormData({
      title: "",
      date: new Date().toISOString().split('T')[0],
      time: "09:00",
      type: "appointment",
      status: "scheduled",
      clientName: "",
      clientPhone: "",
      clientEmail: "",
      clientAddress: "",
      description: "",
      estimatedValue: "",
      duration: "1",
      notes: ""
    });
    setEditingEvent(null);
  };

  const handleSaveEvent = () => {
    if (!eventFormData.title || !eventFormData.clientName || !eventFormData.date) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newEvent: CalendarEvent = {
      id: editingEvent?.id || Date.now().toString(),
      title: eventFormData.title,
      date: eventFormData.date,
      time: eventFormData.time,
      type: eventFormData.type,
      status: eventFormData.status,
      client: {
        name: eventFormData.clientName,
        phone: eventFormData.clientPhone,
        email: eventFormData.clientEmail,
        address: eventFormData.clientAddress
      },
      description: eventFormData.description,
      estimatedValue: eventFormData.estimatedValue ? parseFloat(eventFormData.estimatedValue) : undefined,
      duration: eventFormData.duration,
      notes: eventFormData.notes,
      createdAt: editingEvent?.createdAt || new Date()
    };

    if (editingEvent) {
      setEvents(events.map(event => event.id === editingEvent.id ? newEvent : event));
      toast({
        title: "Event Updated",
        description: `${newEvent.title} has been updated`
      });
    } else {
      setEvents([...events, newEvent]);
      toast({
        title: "Event Created",
        description: `${newEvent.title} has been added to your calendar`
      });
    }

    setShowEventDialog(false);
    resetEventForm();
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setEditingEvent(event);
    setEventFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      type: event.type,
      status: event.status,
      clientName: event.client.name,
      clientPhone: event.client.phone,
      clientEmail: event.client.email,
      clientAddress: event.client.address,
      description: event.description,
      estimatedValue: event.estimatedValue?.toString() || "",
      duration: event.duration,
      notes: event.notes
    });
    setShowEventDialog(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
    toast({
      title: "Event Deleted",
      description: "Event has been removed from your calendar"
    });
  };

  const convertToProject = (appointmentId: string) => {
    setEvents(events.map(event => 
      event.id === appointmentId 
        ? { ...event, type: "project", status: "scheduled" }
        : event
    ));
    toast({
      title: "Converted to Project",
      description: "Appointment has been converted to a project"
    });
  };

  const getStatusColor = (status: CalendarEvent["status"]) => {
    switch (status) {
      case "scheduled": return "bg-blue-500";
      case "in-progress": return "bg-yellow-500";
      case "completed": return "bg-green-500";
      case "quoted": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const getUpcomingEvents = (type: "project" | "appointment") => {
    const now = new Date();
    return events
      .filter(event => event.type === type)
      .filter(event => new Date(`${event.date}T${event.time}`) >= now)
      .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime())
      .slice(0, 5);
  };

  const getTodaysEvents = (type: "project" | "appointment") => {
    const today = new Date().toISOString().split('T')[0];
    return events
      .filter(event => event.type === type && event.date === today)
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  // Pricing Calculator Functions
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const calculateTotals = (updatedSections: PricingSection[]) => {
    const newSections = updatedSections.map(section => {
      const sectionItems = section.items.map(item => {
        const baseTotal = item.quantity * item.unitPrice;
        const itemTotal = section.name.toLowerCase().includes('material') 
          ? baseTotal * (1 + markup / 100) 
          : baseTotal;
        return { ...item, total: itemTotal };
      });
      
      const sectionTotal = sectionItems.reduce((sum, item) => sum + item.total, 0);
      return { ...section, items: sectionItems, total: sectionTotal };
    });
    
    setSections(newSections);
  };

  const getProjectTotal = (): number => {
    if (pricingMode === 'simple') {
      return projectArea * ratePerM2;
    }
    
    const subTotal = sections.reduce((sum, section) => sum + section.total, 0);
    const laborCost = projectDays * dayRate;
    const totalWithProfit = (subTotal + laborCost) * (1 + profit / 100);
    const finalTotal = totalWithProfit * (1 + vatRate / 100);
    return finalTotal;
  };

  const addQuoteToCalendar = () => {
    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: projectName || "Untitled Project",
      date: new Date().toISOString().split('T')[0],
      time: "09:00",
      type: "appointment",
      status: "quoted",
      client: {
        name: "New Client",
        phone: "",
        email: "",
        address: ""
      },
      description: `Quote generated from pricing calculator. Total: £${getProjectTotal().toLocaleString()}`,
      estimatedValue: getProjectTotal(),
      duration: "1",
      notes: "Generated from pricing calculator",
      createdAt: new Date()
    };

    setEvents([...events, newEvent]);
    
    toast({
      title: "Quote Added to Calendar",
      description: `${newEvent.title} has been added as an appointment`
    });

    // Switch to calendar tab to show the new event
    setActiveTab("calendar");
    setCalendarActiveTab("appointments");
  };

  // Generate material list from current quote (excluding labor and equipment)
  const generateMaterialList = () => {
    const materialItems: string[] = [];
    
    sections.forEach(section => {
      // Skip labor and equipment sections
      const sectionName = section.name.toLowerCase();
      if (sectionName.includes('labor') || 
          sectionName.includes('labour') || 
          sectionName.includes('equipment') || 
          sectionName.includes('tools') ||
          sectionName.includes('hire') ||
          sectionName.includes('rental')) {
        return;
      }
      
      section.items.forEach(item => {
        if (item.quantity > 0) {
          // Skip items that are clearly labor or equipment based on name
          const itemName = item.name.toLowerCase();
          if (!itemName.includes('labor') && 
              !itemName.includes('labour') && 
              !itemName.includes('equipment') && 
              !itemName.includes('tool') &&
              !itemName.includes('hire') &&
              !itemName.includes('rental') &&
              !itemName.includes('day rate') &&
              !itemName.includes('hourly')) {
            materialItems.push(`${item.quantity}x ${item.unit} - ${item.name}`);
          }
        }
      });
    });
    
    const materialList = `MATERIAL LIST - ${projectName}\n\n${materialItems.join('\n')}\n\nProject: ${projectName}\nDate: ${new Date().toLocaleDateString()}\n\nNote: This list contains materials only (labor and equipment excluded)`;
    
    setMaterialListMessage(materialList);
    return materialList;
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <Card className="max-w-7xl mx-auto bg-gray-900/90 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold">
            <Calculator className="text-primary" />
            Trade Calculator & Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "calculator" | "calendar")}>
            <TabsList className="bg-gray-800 border border-gray-700 mb-6">
              <TabsTrigger value="calculator" className="data-[state=active]:bg-primary">
                <Calculator className="mr-2 h-4 w-4" />
                Pricing Calculator
              </TabsTrigger>
              <TabsTrigger value="calendar" className="data-[state=active]:bg-primary">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Job Calendar
              </TabsTrigger>
            </TabsList>

            {/* Pricing Calculator Tab */}
            <TabsContent value="calculator">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <Input
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="text-xl font-bold bg-gray-800 border-gray-700 text-white"
                      placeholder="Project Name"
                    />
                    <Button
                      onClick={() => setEditMode(!editMode)}
                      variant={editMode ? "default" : "outline"}
                      className={editMode ? "bg-primary" : "border-gray-600 text-gray-300"}
                    >
                      <PenLine size={16} className="mr-1" />
                      {editMode ? "Save" : "Edit"}
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={addQuoteToCalendar}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Add Quote to Calendar
                    </Button>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-3">Pricing Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-1 border-b border-gray-700">
                      <span className="text-gray-300">Materials & Services:</span>
                      <span className="text-white">{formatCurrency(sections.reduce((sum, section) => sum + section.total, 0))}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-700">
                      <span className="text-gray-300">Labour ({projectDays} days @ £{dayRate}/day):</span>
                      <span className="text-white">{formatCurrency(projectDays * dayRate)}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-700">
                      <span className="text-gray-300">Profit ({profit}%):</span>
                      <span className="text-white">{formatCurrency(((sections.reduce((sum, section) => sum + section.total, 0) + projectDays * dayRate) * profit) / 100)}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-700">
                      <span className="text-gray-300">VAT ({vatRate}%):</span>
                      <span className="text-white">{formatCurrency((getProjectTotal() / (1 + vatRate / 100)) * (vatRate / 100))}</span>
                    </div>
                    <div className="flex justify-between py-2 mt-2 border-t border-gray-700">
                      <span className="text-white font-medium">TOTAL:</span>
                      <span className="text-white font-bold text-xl">{formatCurrency(getProjectTotal())}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Info size={14} />
                    <span className="text-xs">All changes are saved automatically within this session.</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Dialog open={showMaterialDialog} onOpenChange={setShowMaterialDialog}>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => {
                            generateMaterialList();
                            setShowMaterialDialog(true);
                          }}
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary hover:text-white"
                        >
                          <Send className="mr-2 h-4 w-4" /> Send List to Supplier
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Send Material List to Supplier</DialogTitle>
                          <DialogDescription>
                            Send your material list to your supplier via email or SMS
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="supplier-email">Supplier Email</Label>
                            <Input
                              id="supplier-email"
                              type="email"
                              placeholder="supplier@example.com"
                              value={supplierEmail}
                              onChange={(e) => setSupplierEmail(e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="material-preview">Material List Preview</Label>
                            <Textarea
                              id="material-preview"
                              value={materialListMessage}
                              onChange={(e) => setMaterialListMessage(e.target.value)}
                              className="mt-1 h-32 text-sm"
                              placeholder="Material list will appear here..."
                            />
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setShowMaterialDialog(false)}>
                            Cancel
                          </Button>
                          <Button onClick={() => {
                            const subject = `Material List - ${projectName}`;
                            const body = encodeURIComponent(materialListMessage);
                            const mailtoLink = `mailto:${supplierEmail}?subject=${encodeURIComponent(subject)}&body=${body}`;
                            window.open(mailtoLink);
                            setShowMaterialDialog(false);
                          }}>
                            <Mail className="mr-2 h-4 w-4" /> Send Email
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Calendar Tab */}
            <TabsContent value="calendar">
              <div className="space-y-6">
                <Tabs value={calendarActiveTab} onValueChange={(value) => setCalendarActiveTab(value as "projects" | "appointments")}>
                  <div className="flex justify-between items-center mb-6">
                    <TabsList className="bg-gray-800 border border-gray-700">
                      <TabsTrigger value="appointments" className="data-[state=active]:bg-primary">
                        Appointments ({events.filter(e => e.type === "appointment").length})
                      </TabsTrigger>
                      <TabsTrigger value="projects" className="data-[state=active]:bg-primary">
                        Projects ({events.filter(e => e.type === "project").length})
                      </TabsTrigger>
                    </TabsList>

                    <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
                      <DialogTrigger asChild>
                        <Button onClick={resetEventForm} className="bg-primary hover:bg-primary/90">
                          <Plus className="mr-2 h-4 w-4" />
                          Add {calendarActiveTab === "projects" ? "Project" : "Appointment"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>
                            {editingEvent ? "Edit" : "Add"} {eventFormData.type === "project" ? "Project" : "Appointment"}
                          </DialogTitle>
                        </DialogHeader>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2">
                            <Label htmlFor="title">Job Title *</Label>
                            <Input
                              id="title"
                              value={eventFormData.title}
                              onChange={(e) => setEventFormData({...eventFormData, title: e.target.value})}
                              placeholder="e.g., Kitchen Installation, Plumbing Repair"
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label htmlFor="date">Date *</Label>
                            <Input
                              id="date"
                              type="date"
                              value={eventFormData.date}
                              onChange={(e) => setEventFormData({...eventFormData, date: e.target.value})}
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label htmlFor="time">Time</Label>
                            <Input
                              id="time"
                              type="time"
                              value={eventFormData.time}
                              onChange={(e) => setEventFormData({...eventFormData, time: e.target.value})}
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label htmlFor="clientName">Client Name *</Label>
                            <Input
                              id="clientName"
                              value={eventFormData.clientName}
                              onChange={(e) => setEventFormData({...eventFormData, clientName: e.target.value})}
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label htmlFor="duration">Duration (days)</Label>
                            <Input
                              id="duration"
                              type="number"
                              step="0.5"
                              value={eventFormData.duration}
                              onChange={(e) => setEventFormData({...eventFormData, duration: e.target.value})}
                              className="mt-1"
                            />
                          </div>

                          <div className="col-span-2">
                            <Label htmlFor="description">Job Description</Label>
                            <Textarea
                              id="description"
                              value={eventFormData.description}
                              onChange={(e) => setEventFormData({...eventFormData, description: e.target.value})}
                              placeholder="Describe the work to be done..."
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <DialogFooter>
                          <Button variant="outline" onClick={() => setShowEventDialog(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleSaveEvent}>
                            {editingEvent ? "Update" : "Create"} {eventFormData.type === "project" ? "Project" : "Appointment"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <TabsContent value="appointments">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card className="bg-gray-800/50 border-gray-700">
                        <CardHeader>
                          <CardTitle className="text-lg">Today's Appointments</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {getTodaysEvents("appointment").length === 0 ? (
                            <p className="text-gray-400 text-center py-4">No appointments today</p>
                          ) : (
                            <div className="space-y-3">
                              {getTodaysEvents("appointment").map((event) => (
                                <div key={event.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <Badge className={`${getStatusColor(event.status)} text-white`}>
                                        {event.status}
                                      </Badge>
                                      <span className="font-medium">{event.time}</span>
                                    </div>
                                    <h4 className="font-medium mt-1">{event.title}</h4>
                                    <p className="text-sm text-gray-400">{event.client.name}</p>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => convertToProject(event.id)}
                                      className="text-green-400 border-green-400 hover:bg-green-400 hover:text-white"
                                    >
                                      <ArrowRight className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="outline" onClick={() => handleEditEvent(event)}>
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      <Card className="bg-gray-800/50 border-gray-700">
                        <CardHeader>
                          <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {getUpcomingEvents("appointment").length === 0 ? (
                            <p className="text-gray-400 text-center py-4">No upcoming appointments</p>
                          ) : (
                            <div className="space-y-3">
                              {getUpcomingEvents("appointment").map((event) => (
                                <div key={event.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <Badge className={`${getStatusColor(event.status)} text-white`}>
                                        {event.status}
                                      </Badge>
                                      <span className="text-sm text-gray-400">{event.date} at {event.time}</span>
                                    </div>
                                    <h4 className="font-medium mt-1">{event.title}</h4>
                                    <p className="text-sm text-gray-400">{event.client.name}</p>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => convertToProject(event.id)}
                                      className="text-green-400 border-green-400 hover:bg-green-400 hover:text-white"
                                      title="Convert to Project"
                                    >
                                      <ArrowRight className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="outline" onClick={() => handleEditEvent(event)}>
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="outline" onClick={() => handleDeleteEvent(event.id)} className="text-red-400 hover:bg-red-900/20">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="projects">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card className="bg-gray-800/50 border-gray-700">
                        <CardHeader>
                          <CardTitle className="text-lg">Today's Projects</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {getTodaysEvents("project").length === 0 ? (
                            <p className="text-gray-400 text-center py-4">No projects today</p>
                          ) : (
                            <div className="space-y-3">
                              {getTodaysEvents("project").map((event) => (
                                <div key={event.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <Badge className={`${getStatusColor(event.status)} text-white`}>
                                        {event.status}
                                      </Badge>
                                      <span className="font-medium">{event.time}</span>
                                    </div>
                                    <h4 className="font-medium mt-1">{event.title}</h4>
                                    <p className="text-sm text-gray-400">{event.client.name}</p>
                                    {event.estimatedValue && (
                                      <p className="text-sm text-green-400">£{event.estimatedValue.toLocaleString()}</p>
                                    )}
                                  </div>
                                  <div className="flex gap-2">
                                    <Button size="sm" variant="outline" onClick={() => handleEditEvent(event)}>
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      <Card className="bg-gray-800/50 border-gray-700">
                        <CardHeader>
                          <CardTitle className="text-lg">Upcoming Projects</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {getUpcomingEvents("project").length === 0 ? (
                            <p className="text-gray-400 text-center py-4">No upcoming projects</p>
                          ) : (
                            <div className="space-y-3">
                              {getUpcomingEvents("project").map((event) => (
                                <div key={event.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <Badge className={`${getStatusColor(event.status)} text-white`}>
                                        {event.status}
                                      </Badge>
                                      <span className="text-sm text-gray-400">{event.date} at {event.time}</span>
                                    </div>
                                    <h4 className="font-medium mt-1">{event.title}</h4>
                                    <p className="text-sm text-gray-400">{event.client.name}</p>
                                    {event.estimatedValue && (
                                      <p className="text-sm text-green-400">£{event.estimatedValue.toLocaleString()}</p>
                                    )}
                                  </div>
                                  <div className="flex gap-2">
                                    <Button size="sm" variant="outline" onClick={() => handleEditEvent(event)}>
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="outline" onClick={() => handleDeleteEvent(event.id)} className="text-red-400 hover:bg-red-900/20">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
};

export default TradeCalculatorWithCalendar;