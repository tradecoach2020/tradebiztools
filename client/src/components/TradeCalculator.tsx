import React, { useState, useEffect } from "react";
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

// Define the generic item interface
interface PricingItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
}

// Define a section of related items
interface PricingSection {
  id: string;
  name: string;
  items: PricingItem[];
  isOpen: boolean;
  total: number;
}

// Define trade-specific templates
interface TradeTemplate {
  id: string;
  name: string;
  icon: JSX.Element;
  description: string;
  sections: PricingSection[];
}

// Helper function to generate IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2
  }).format(amount);
};

// Trade templates
const tradeTemplates: TradeTemplate[] = [
  {
    id: "landscaping",
    name: "Landscaping",
    icon: <span className="text-green-500">🌿</span>,
    description: "Complete pricing calculator for landscaping projects including materials, labor, and equipment.",
    sections: [
      {
        id: "materials",
        name: "Materials",
        isOpen: true,
        total: 0,
        items: [
          { id: generateId(), name: "Soil/Compost", quantity: 0, unit: "m³", unitPrice: 45, total: 0 },
          { id: generateId(), name: "Plants", quantity: 0, unit: "items", unitPrice: 15, total: 0 },
          { id: generateId(), name: "Turf/Grass", quantity: 0, unit: "m²", unitPrice: 8.50, total: 0 },
          { id: generateId(), name: "Decorative Stone", quantity: 0, unit: "ton", unitPrice: 80, total: 0 },
          { id: generateId(), name: "Timber", quantity: 0, unit: "m", unitPrice: 12, total: 0 }
        ]
      },
      {
        id: "aggregates",
        name: "Aggregates",
        isOpen: false,
        total: 0,
        items: [
          { id: generateId(), name: "Sand", quantity: 0, unit: "ton", unitPrice: 50, total: 0 },
          { id: generateId(), name: "Gravel", quantity: 0, unit: "ton", unitPrice: 55, total: 0 },
          { id: generateId(), name: "Crushed Stone", quantity: 0, unit: "ton", unitPrice: 60, total: 0 },
          { id: generateId(), name: "Cement", quantity: 0, unit: "bag", unitPrice: 8, total: 0 }
        ]
      },
      {
        id: "waste",
        name: "Waste Removal",
        isOpen: false,
        total: 0,
        items: [
          { id: generateId(), name: "Skip Hire", quantity: 0, unit: "week", unitPrice: 200, total: 0 },
          { id: generateId(), name: "Waste Disposal", quantity: 0, unit: "load", unitPrice: 120, total: 0 },
          { id: generateId(), name: "Site Clearance", quantity: 0, unit: "day", unitPrice: 180, total: 0 }
        ]
      },
      {
        id: "labor",
        name: "Labor",
        isOpen: false,
        total: 0,
        items: [
          { id: generateId(), name: "Skilled Landscaper", quantity: 0, unit: "hour", unitPrice: 35, total: 0 },
          { id: generateId(), name: "General Laborer", quantity: 0, unit: "hour", unitPrice: 25, total: 0 },
          { id: generateId(), name: "Machine Operator", quantity: 0, unit: "hour", unitPrice: 40, total: 0 }
        ]
      },
      {
        id: "equipment",
        name: "Equipment",
        isOpen: false,
        total: 0,
        items: [
          { id: generateId(), name: "Mini Digger", quantity: 0, unit: "day", unitPrice: 120, total: 0 },
          { id: generateId(), name: "Plate Compactor", quantity: 0, unit: "day", unitPrice: 45, total: 0 },
          { id: generateId(), name: "Cement Mixer", quantity: 0, unit: "day", unitPrice: 50, total: 0 }
        ]
      }
    ]
  },
  {
    id: "plumbing",
    name: "Plumbing",
    icon: <span className="text-blue-500">🔧</span>,
    description: "Detailed pricing calculator for plumbing jobs including fixtures, pipes, labor, and additional services.",
    sections: [
      {
        id: "materials",
        name: "Materials & Fixtures",
        isOpen: true,
        total: 0,
        items: [
          { id: generateId(), name: "Pipes (copper)", quantity: 0, unit: "m", unitPrice: 12, total: 0 },
          { id: generateId(), name: "Pipes (PVC)", quantity: 0, unit: "m", unitPrice: 6, total: 0 },
          { id: generateId(), name: "Toilet", quantity: 0, unit: "item", unitPrice: 150, total: 0 },
          { id: generateId(), name: "Sink", quantity: 0, unit: "item", unitPrice: 120, total: 0 },
          { id: generateId(), name: "Shower", quantity: 0, unit: "item", unitPrice: 200, total: 0 },
          { id: generateId(), name: "Water Tank", quantity: 0, unit: "item", unitPrice: 250, total: 0 }
        ]
      },
      {
        id: "fittings",
        name: "Fittings & Valves",
        isOpen: false,
        total: 0,
        items: [
          { id: generateId(), name: "Elbows", quantity: 0, unit: "item", unitPrice: 3.50, total: 0 },
          { id: generateId(), name: "T-Joints", quantity: 0, unit: "item", unitPrice: 4, total: 0 },
          { id: generateId(), name: "Valves", quantity: 0, unit: "item", unitPrice: 15, total: 0 },
          { id: generateId(), name: "Pipe Clips", quantity: 0, unit: "pack", unitPrice: 8, total: 0 }
        ]
      },
      {
        id: "labor",
        name: "Labor",
        isOpen: false,
        total: 0,
        items: [
          { id: generateId(), name: "Plumber", quantity: 0, unit: "hour", unitPrice: 45, total: 0 },
          { id: generateId(), name: "Assistant", quantity: 0, unit: "hour", unitPrice: 25, total: 0 },
          { id: generateId(), name: "Emergency Call-out Fee", quantity: 0, unit: "item", unitPrice: 120, total: 0 }
        ]
      },
      {
        id: "additional",
        name: "Additional Services",
        isOpen: false,
        total: 0,
        items: [
          { id: generateId(), name: "Water Pressure Testing", quantity: 0, unit: "item", unitPrice: 80, total: 0 },
          { id: generateId(), name: "Drain Cleaning", quantity: 0, unit: "hour", unitPrice: 60, total: 0 },
          { id: generateId(), name: "Leak Detection", quantity: 0, unit: "service", unitPrice: 100, total: 0 }
        ]
      }
    ]
  },
  {
    id: "electrical",
    name: "Electrical",
    icon: <span className="text-yellow-500">⚡</span>,
    description: "Comprehensive electrical work calculator with materials, labor, testing, and certification.",
    sections: [
      {
        id: "materials",
        name: "Materials",
        isOpen: true,
        total: 0,
        items: [
          { id: generateId(), name: "Cables", quantity: 0, unit: "m", unitPrice: 2.5, total: 0 },
          { id: generateId(), name: "Socket Outlets", quantity: 0, unit: "item", unitPrice: 12, total: 0 },
          { id: generateId(), name: "Light Fixtures", quantity: 0, unit: "item", unitPrice: 35, total: 0 },
          { id: generateId(), name: "Consumer Unit", quantity: 0, unit: "item", unitPrice: 120, total: 0 },
          { id: generateId(), name: "Switches", quantity: 0, unit: "item", unitPrice: 8, total: 0 }
        ]
      },
      {
        id: "protection",
        name: "Protection & Safety",
        isOpen: false,
        total: 0,
        items: [
          { id: generateId(), name: "MCBs", quantity: 0, unit: "item", unitPrice: 15, total: 0 },
          { id: generateId(), name: "RCDs", quantity: 0, unit: "item", unitPrice: 45, total: 0 },
          { id: generateId(), name: "Surge Protectors", quantity: 0, unit: "item", unitPrice: 30, total: 0 }
        ]
      },
      {
        id: "labor",
        name: "Labor",
        isOpen: false,
        total: 0,
        items: [
          { id: generateId(), name: "Electrician", quantity: 0, unit: "hour", unitPrice: 40, total: 0 },
          { id: generateId(), name: "Apprentice", quantity: 0, unit: "hour", unitPrice: 20, total: 0 },
          { id: generateId(), name: "Emergency Call-out Fee", quantity: 0, unit: "item", unitPrice: 120, total: 0 }
        ]
      },
      {
        id: "testing",
        name: "Testing & Certification",
        isOpen: false,
        total: 0,
        items: [
          { id: generateId(), name: "Electrical Installation Certificate", quantity: 0, unit: "item", unitPrice: 120, total: 0 },
          { id: generateId(), name: "PAT Testing", quantity: 0, unit: "hour", unitPrice: 35, total: 0 },
          { id: generateId(), name: "Periodic Inspection", quantity: 0, unit: "service", unitPrice: 150, total: 0 }
        ]
      }
    ]
  },
  {
    id: "carpentry",
    name: "Carpentry",
    icon: <span className="text-amber-600">🪚</span>,
    description: "Detailed pricing spreadsheet for carpentry jobs including materials, hardware, finishes, and labor.",
    sections: [
      {
        id: "materials",
        name: "Materials",
        isOpen: true,
        total: 0,
        items: [
          { id: generateId(), name: "Timber", quantity: 0, unit: "m", unitPrice: 15, total: 0 },
          { id: generateId(), name: "Plywood", quantity: 0, unit: "sheet", unitPrice: 35, total: 0 },
          { id: generateId(), name: "MDF", quantity: 0, unit: "sheet", unitPrice: 28, total: 0 },
          { id: generateId(), name: "Hardwood", quantity: 0, unit: "m²", unitPrice: 45, total: 0 }
        ]
      },
      {
        id: "hardware",
        name: "Hardware & Fixings",
        isOpen: false,
        total: 0,
        items: [
          { id: generateId(), name: "Screws", quantity: 0, unit: "box", unitPrice: 8, total: 0 },
          { id: generateId(), name: "Hinges", quantity: 0, unit: "pair", unitPrice: 5, total: 0 },
          { id: generateId(), name: "Handles", quantity: 0, unit: "item", unitPrice: 12, total: 0 },
          { id: generateId(), name: "Brackets", quantity: 0, unit: "pack", unitPrice: 10, total: 0 }
        ]
      },
      {
        id: "finishes",
        name: "Finishes",
        isOpen: false,
        total: 0,
        items: [
          { id: generateId(), name: "Wood Stain", quantity: 0, unit: "liter", unitPrice: 15, total: 0 },
          { id: generateId(), name: "Varnish", quantity: 0, unit: "liter", unitPrice: 18, total: 0 },
          { id: generateId(), name: "Paint", quantity: 0, unit: "liter", unitPrice: 12, total: 0 },
          { id: generateId(), name: "Wood Filler", quantity: 0, unit: "tube", unitPrice: 8, total: 0 }
        ]
      },
      {
        id: "labor",
        name: "Labor",
        isOpen: false,
        total: 0,
        items: [
          { id: generateId(), name: "Carpenter", quantity: 0, unit: "hour", unitPrice: 35, total: 0 },
          { id: generateId(), name: "Apprentice", quantity: 0, unit: "hour", unitPrice: 20, total: 0 },
          { id: generateId(), name: "Design Fee", quantity: 0, unit: "service", unitPrice: 150, total: 0 }
        ]
      }
    ]
  },
  {
    id: "roofing",
    name: "Roofing",
    icon: <span className="text-red-500">🏠</span>,
    description: "Complete roofing cost calculator covering materials, insulation, labor, and equipment.",
    sections: [
      {
        id: "materials",
        name: "Roofing Materials",
        isOpen: true,
        total: 0,
        items: [
          { id: generateId(), name: "Roof Tiles", quantity: 0, unit: "m²", unitPrice: 30, total: 0 },
          { id: generateId(), name: "Felt/Membrane", quantity: 0, unit: "m²", unitPrice: 8, total: 0 },
          { id: generateId(), name: "Battens", quantity: 0, unit: "m", unitPrice: 2.5, total: 0 },
          { id: generateId(), name: "Flashing", quantity: 0, unit: "m", unitPrice: 15, total: 0 },
          { id: generateId(), name: "Ridge Tiles", quantity: 0, unit: "item", unitPrice: 10, total: 0 }
        ]
      },
      {
        id: "insulation",
        name: "Insulation",
        isOpen: false,
        total: 0,
        items: [
          { id: generateId(), name: "Insulation Boards", quantity: 0, unit: "m²", unitPrice: 25, total: 0 },
          { id: generateId(), name: "Loft Insulation", quantity: 0, unit: "roll", unitPrice: 30, total: 0 },
          { id: generateId(), name: "Vapor Barrier", quantity: 0, unit: "m²", unitPrice: 3, total: 0 }
        ]
      },
      {
        id: "drainage",
        name: "Drainage & Guttering",
        isOpen: false,
        total: 0,
        items: [
          { id: generateId(), name: "Guttering", quantity: 0, unit: "m", unitPrice: 12, total: 0 },
          { id: generateId(), name: "Downpipes", quantity: 0, unit: "m", unitPrice: 8, total: 0 },
          { id: generateId(), name: "Gutter Brackets", quantity: 0, unit: "item", unitPrice: 2, total: 0 },
          { id: generateId(), name: "Drain Connectors", quantity: 0, unit: "item", unitPrice: 5, total: 0 }
        ]
      },
      {
        id: "labor",
        name: "Labor",
        isOpen: false,
        total: 0,
        items: [
          { id: generateId(), name: "Roofer", quantity: 0, unit: "hour", unitPrice: 35, total: 0 },
          { id: generateId(), name: "Laborer", quantity: 0, unit: "hour", unitPrice: 25, total: 0 },
          { id: generateId(), name: "Scaffolding Erection", quantity: 0, unit: "day", unitPrice: 150, total: 0 }
        ]
      },
      {
        id: "equipment",
        name: "Equipment",
        isOpen: false,
        total: 0,
        items: [
          { id: generateId(), name: "Scaffolding Hire", quantity: 0, unit: "week", unitPrice: 300, total: 0 },
          { id: generateId(), name: "Roof Ladder", quantity: 0, unit: "day", unitPrice: 25, total: 0 },
          { id: generateId(), name: "Safety Equipment", quantity: 0, unit: "set", unitPrice: 120, total: 0 }
        ]
      }
    ]
  },
  {
    id: "custom",
    name: "Custom",
    icon: <span className="text-primary">📝</span>,
    description: "Create your own custom pricing calculator for any trade or project type.",
    sections: [
      {
        id: "section1",
        name: "Materials",
        isOpen: true,
        total: 0,
        items: [
          { id: generateId(), name: "Material 1", quantity: 0, unit: "item", unitPrice: 0, total: 0 },
          { id: generateId(), name: "Material 2", quantity: 0, unit: "item", unitPrice: 0, total: 0 }
        ]
      },
      {
        id: "section2",
        name: "Labor",
        isOpen: false,
        total: 0,
        items: [
          { id: generateId(), name: "Labor 1", quantity: 0, unit: "hour", unitPrice: 0, total: 0 }
        ]
      }
    ]
  }
];

const TradeCalculator = () => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<TradeTemplate>(tradeTemplates[0]);
  const [sections, setSections] = useState<PricingSection[]>(tradeTemplates[0].sections);
  const [projectName, setProjectName] = useState("New Project");
  const [subTotal, setSubTotal] = useState(0);
  const [vatRate, setVatRate] = useState(20);
  const [profit, setProfit] = useState(20);
  const [markup, setMarkup] = useState(25);
  const [dayRate, setDayRate] = useState(1000);
  const [projectDays, setProjectDays] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [pricingMode, setPricingMode] = useState<'detailed' | 'simple'>('detailed');
  const [projectArea, setProjectArea] = useState(0);
  const [ratePerM2, setRatePerM2] = useState(250);
  
  // Material list dialog state
  const [showMaterialDialog, setShowMaterialDialog] = useState(false);
  const [supplierEmail, setSupplierEmail] = useState("");
  const [supplierPhone, setSupplierPhone] = useState("");
  const [materialListMessage, setMaterialListMessage] = useState("");
  
  // Calendar integration state
  const [showCalendarDialog, setShowCalendarDialog] = useState(false);
  const [calendarData, setCalendarData] = useState({
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    clientAddress: "",
    date: new Date().toISOString().split('T')[0],
    time: "09:00",
    type: "project" as "project" | "appointment",
    status: "scheduled" as "scheduled" | "in-progress" | "completed" | "quoted",
    duration: "1",
    notes: ""
  });
  
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
  
  // Handle sending material list via email
  const sendMaterialListEmail = () => {
    if (!supplierEmail) {
      toast({
        title: "Email Required",
        description: "Please enter a supplier email address",
        variant: "destructive"
      });
      return;
    }
    
    const materialList = generateMaterialList();
    const subject = `Material List - ${projectName}`;
    const body = encodeURIComponent(materialList);
    const mailtoLink = `mailto:${supplierEmail}?subject=${encodeURIComponent(subject)}&body=${body}`;
    
    window.open(mailtoLink);
    toast({
      title: "Email Opened",
      description: "Your email client has been opened with the material list"
    });
    setShowMaterialDialog(false);
  };
  
  // Handle sending material list via SMS
  const sendMaterialListSMS = () => {
    if (!supplierPhone) {
      toast({
        title: "Phone Number Required", 
        description: "Please enter a supplier phone number",
        variant: "destructive"
      });
      return;
    }
    
    const materialList = generateMaterialList();
    const smsBody = encodeURIComponent(materialList);
    const smsLink = `sms:${supplierPhone}?body=${smsBody}`;
    
    window.open(smsLink);
    toast({
      title: "SMS Opened",
      description: "Your messaging app has been opened with the material list"
    });
    setShowMaterialDialog(false);
  };
  
  // Copy material list to clipboard
  const copyMaterialList = async () => {
    const materialList = generateMaterialList();
    try {
      await navigator.clipboard.writeText(materialList);
      toast({
        title: "Copied to Clipboard",
        description: "Material list has been copied to your clipboard"
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Could not copy to clipboard. Please copy manually.",
        variant: "destructive"
      });
    }
  };

  // Save job to calendar
  const saveToCalendar = () => {
    if (!calendarData.clientName) {
      toast({
        title: "Client Name Required",
        description: "Please enter a client name",
        variant: "destructive"
      });
      return;
    }

    const existingEvents = JSON.parse(localStorage.getItem("calendar-events") || "[]");
    
    const newEvent = {
      id: Date.now().toString(),
      title: projectName || "Untitled Project",
      date: calendarData.date,
      time: calendarData.time,
      type: calendarData.type,
      status: calendarData.status,
      client: {
        name: calendarData.clientName,
        phone: calendarData.clientPhone,
        email: calendarData.clientEmail,
        address: calendarData.clientAddress
      },
      description: `Quote generated from pricing calculator. Total: £${getProjectTotal().toLocaleString()}`,
      estimatedValue: getProjectTotal(),
      duration: calendarData.duration,
      notes: calendarData.notes,
      createdAt: new Date()
    };

    const updatedEvents = [...existingEvents, newEvent];
    localStorage.setItem("calendar-events", JSON.stringify(updatedEvents));

    toast({
      title: "Added to Calendar",
      description: `${newEvent.title} has been added to your calendar`
    });

    setShowCalendarDialog(false);
    setCalendarData({
      clientName: "",
      clientPhone: "",
      clientEmail: "",
      clientAddress: "",
      date: new Date().toISOString().split('T')[0],
      time: "09:00",
      type: "project",
      status: "scheduled",
      duration: "1",
      notes: ""
    });
  };
  
  // Calculate totals when quantities or prices change
  const calculateTotals = (updatedSections: PricingSection[]) => {
    const newSections = updatedSections.map(section => {
      const sectionItems = section.items.map(item => {
        const baseTotal = item.quantity * item.unitPrice;
        const markupAmount = baseTotal * (markup / 100);
        const total = baseTotal + markupAmount;
        return { ...item, total };
      });
      
      const sectionTotal = sectionItems.reduce((sum, item) => sum + item.total, 0);
      
      return {
        ...section,
        items: sectionItems,
        total: sectionTotal
      };
    });
    
    const newSubTotal = newSections.reduce((sum, section) => sum + section.total, 0);
    setSubTotal(newSubTotal);
    setSections(newSections);
    
    return newSections;
  };

  // Calculate total with different pricing modes
  const getProjectTotal = () => {
    if (pricingMode === 'simple') {
      return projectArea * ratePerM2;
    }
    
    const materialTotal = subTotal;
    const laborTotal = projectDays * dayRate;
    const combinedTotal = materialTotal + laborTotal;
    const profitAmount = combinedTotal * (profit / 100);
    const vatAmount = (combinedTotal + profitAmount) * (vatRate / 100);
    
    return combinedTotal + profitAmount + vatAmount;
  };
  
  // Handle changing an item's quantity or unit price
  const handleItemChange = (
    sectionId: string, 
    itemId: string, 
    field: 'quantity' | 'unitPrice' | 'name' | 'unit', 
    value: string | number
  ) => {
    const newSections = sections.map(section => {
      if (section.id !== sectionId) return section;
      
      const newItems = section.items.map(item => {
        if (item.id !== itemId) return item;
        
        if (field === 'quantity' || field === 'unitPrice') {
          const numValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
          return { ...item, [field]: numValue };
        }
        
        return { ...item, [field]: value };
      });
      
      return { ...section, items: newItems };
    });
    
    calculateTotals(newSections);
  };
  
  // Toggle section open/closed state
  const toggleSection = (sectionId: string) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? { ...section, isOpen: !section.isOpen } 
        : section
    ));
  };
  
  // Add a new item to a section
  const addItem = (sectionId: string) => {
    const newSections = sections.map(section => {
      if (section.id !== sectionId) return section;
      
      return {
        ...section,
        items: [
          ...section.items,
          { 
            id: generateId(), 
            name: `New Item ${section.items.length + 1}`, 
            quantity: 0, 
            unit: "item", 
            unitPrice: 0, 
            total: 0 
          }
        ]
      };
    });
    
    calculateTotals(newSections);
  };
  
  // Remove an item from a section
  const removeItem = (sectionId: string, itemId: string) => {
    const newSections = sections.map(section => {
      if (section.id !== sectionId) return section;
      
      return {
        ...section,
        items: section.items.filter(item => item.id !== itemId)
      };
    });
    
    calculateTotals(newSections);
  };
  
  // Add a new section
  const addSection = () => {
    const newSection: PricingSection = {
      id: generateId(),
      name: `New Section ${sections.length + 1}`,
      isOpen: true,
      total: 0,
      items: [
        { 
          id: generateId(), 
          name: "New Item", 
          quantity: 0, 
          unit: "item", 
          unitPrice: 0, 
          total: 0 
        }
      ]
    };
    
    const newSections = [...sections, newSection];
    calculateTotals(newSections);
  };
  
  // Remove a section
  const removeSection = (sectionId: string) => {
    const newSections = sections.filter(section => section.id !== sectionId);
    calculateTotals(newSections);
  };
  
  // Change the template
  const handleTemplateChange = (templateId: string) => {
    const template = tradeTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
      const initializedSections = calculateTotals(JSON.parse(JSON.stringify(template.sections)));
      setSections(initializedSections);
    }
  };
  
  // Calculate VAT amount
  const vatAmount = subTotal * (vatRate / 100);
  
  // Calculate profit amount
  const profitAmount = subTotal * (profit / 100);
  
  // Calculate total including VAT and profit
  const total = subTotal + vatAmount + profitAmount;
  
  // Export to CSV
  const exportToCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += `${projectName} - Pricing Breakdown\n\n`;
    
    sections.forEach(section => {
      csvContent += `${section.name}\n`;
      csvContent += "Item,Quantity,Unit,Unit Price,Total\n";
      
      section.items.forEach(item => {
        csvContent += `${item.name},${item.quantity},${item.unit},${item.unitPrice.toFixed(2)},${item.total.toFixed(2)}\n`;
      });
      
      csvContent += `Section Total,,,,"${section.total.toFixed(2)}"\n\n`;
    });
    
    csvContent += `\nSubtotal,,,,${subTotal.toFixed(2)}\n`;
    csvContent += `VAT (${vatRate}%),,,,${vatAmount.toFixed(2)}\n`;
    csvContent += `Profit (${profit}%),,,,${profitAmount.toFixed(2)}\n`;
    csvContent += `TOTAL,,,,${total.toFixed(2)}\n`;
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${projectName.replace(/\s+/g, '_')}_pricing.csv`);
    document.body.appendChild(link);
    
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <section id="pricing-calculator" className="mb-8">
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center text-white">
                <Calculator className="mr-2 text-primary" /> Trade Pricing Calculator
              </h2>
              <p className="text-gray-400 text-sm">
                Create accurate price quotes for any trade project
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setEditMode(!editMode)}
                className="border-gray-700 hover:bg-gray-800 text-white"
              >
                <PenLine className="mr-2 h-4 w-4" /> {editMode ? "View Mode" : "Edit Mode"}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={exportToCSV}
                className="border-gray-700 hover:bg-gray-800 text-white"
              >
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <Label htmlFor="project-name" className="text-white">Project Name</Label>
                  <Input 
                    id="project-name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white mt-1"
                  />
                </div>
                
                <div className="mb-4">
                  <Label className="text-white">Pricing Mode</Label>
                  <Tabs value={pricingMode} onValueChange={(value) => setPricingMode(value as 'detailed' | 'simple')} className="mt-1">
                    <TabsList className="bg-gray-800 border border-gray-700 w-full">
                      <TabsTrigger value="detailed" className="data-[state=active]:bg-primary flex-1">
                        Detailed Pricing
                      </TabsTrigger>
                      <TabsTrigger value="simple" className="data-[state=active]:bg-primary flex-1">
                        Simple m² Rate
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {pricingMode === 'detailed' && (
                  <>
                    <div className="mb-4">
                      <Label htmlFor="template" className="text-white">Trade Template</Label>
                      <Select 
                        value={selectedTemplate.id}
                        onValueChange={handleTemplateChange}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select a trade template" />
                        </SelectTrigger>
                        <SelectContent>
                          {tradeTemplates.map(template => (
                            <SelectItem key={template.id} value={template.id}>
                              <div className="flex items-center">
                                {template.icon}
                                <span className="ml-2">{template.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-gray-500 text-xs mt-1">{selectedTemplate.description}</p>
                    </div>

                    <div className="mb-4">
                      <Label htmlFor="markup" className="text-white">Material Markup</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          id="markup"
                          type="number"
                          min="0"
                          max="100"
                          value={markup}
                          onChange={(e) => {
                            setMarkup(parseFloat(e.target.value) || 0);
                            calculateTotals(sections);
                          }}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                        <span className="text-gray-400">%</span>
                      </div>
                      <p className="text-gray-500 text-xs mt-1">Applied to all material costs</p>
                    </div>

                    <div className="mb-4">
                      <Label htmlFor="day-rate" className="text-white">Day Rate</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-400">£</span>
                        <Input
                          id="day-rate"
                          type="number"
                          min="0"
                          value={dayRate}
                          onChange={(e) => setDayRate(parseFloat(e.target.value) || 0)}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <Label htmlFor="project-days" className="text-white">Estimated Days</Label>
                      <Input
                        id="project-days"
                        type="number"
                        min="0"
                        step="0.5"
                        value={projectDays}
                        onChange={(e) => setProjectDays(parseFloat(e.target.value) || 0)}
                        className="bg-gray-800 border-gray-700 text-white mt-1"
                      />
                    </div>
                  </>
                )}

                {pricingMode === 'simple' && (
                  <>
                    <div className="mb-4">
                      <Label htmlFor="project-area" className="text-white">Project Area</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          id="project-area"
                          type="number"
                          min="0"
                          step="0.1"
                          value={projectArea}
                          onChange={(e) => setProjectArea(parseFloat(e.target.value) || 0)}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                        <span className="text-gray-400">m²</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <Label htmlFor="rate-per-m2" className="text-white">Rate per m²</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-400">£</span>
                        <Input
                          id="rate-per-m2"
                          type="number"
                          min="0"
                          value={ratePerM2}
                          onChange={(e) => setRatePerM2(parseFloat(e.target.value) || 0)}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                        <span className="text-gray-400">per m²</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-3">Pricing Summary</h3>
                <div className="space-y-2 text-sm">
                  {pricingMode === 'simple' ? (
                    <>
                      <div className="flex justify-between py-1 border-b border-gray-700">
                        <span className="text-gray-300">Area:</span>
                        <span className="text-white">{projectArea} m²</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-gray-700">
                        <span className="text-gray-300">Rate per m²:</span>
                        <span className="text-white">{formatCurrency(ratePerM2)}</span>
                      </div>
                      <div className="flex justify-between py-2 mt-2 border-t border-gray-700">
                        <span className="text-white font-medium">TOTAL:</span>
                        <span className="text-white font-bold text-xl">{formatCurrency(getProjectTotal())}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between py-1 border-b border-gray-700">
                        <span className="text-gray-300">Materials (inc. {markup}% markup):</span>
                        <span className="text-white">{formatCurrency(subTotal)}</span>
                      </div>
                      
                      <div className="flex justify-between py-1 border-b border-gray-700">
                        <span className="text-gray-300">Labor ({projectDays} days @ {formatCurrency(dayRate)}/day):</span>
                        <span className="text-white">{formatCurrency(projectDays * dayRate)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-1 border-b border-gray-700">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="profit-margin" className="text-gray-300 whitespace-nowrap">Profit Margin:</Label>
                          <div className="w-16">
                            <Input
                              id="profit-margin"
                              type="number"
                              min="0"
                              max="100"
                              value={profit}
                              onChange={(e) => setProfit(parseFloat(e.target.value) || 0)}
                              className="h-7 px-2 bg-gray-700 border-gray-600 text-white text-sm"
                            />
                          </div>
                          <span className="text-gray-400">%</span>
                        </div>
                        <span className="text-white">{formatCurrency((subTotal + projectDays * dayRate) * (profit / 100))}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-1 border-b border-gray-700">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="vat-rate" className="text-gray-300 whitespace-nowrap">VAT:</Label>
                          <div className="w-16">
                            <Input
                              id="vat-rate"
                              type="number"
                              min="0"
                              max="100"
                              value={vatRate}
                              onChange={(e) => setVatRate(parseFloat(e.target.value) || 0)}
                              className="h-7 px-2 bg-gray-700 border-gray-600 text-white text-sm"
                            />
                          </div>
                          <span className="text-gray-400">%</span>
                        </div>
                        <span className="text-white">{formatCurrency(((subTotal + projectDays * dayRate) * (1 + profit / 100)) * (vatRate / 100))}</span>
                      </div>
                      
                      <div className="flex justify-between py-2 mt-2 border-t border-gray-700">
                        <span className="text-white font-medium">TOTAL:</span>
                        <span className="text-white font-bold text-xl">{formatCurrency(getProjectTotal())}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {pricingMode === 'detailed' && (
              <>
                <div className="mt-6">
                  <Tabs defaultValue="spreadsheet" className="space-y-4">
                    <TabsList className="bg-gray-800 border border-gray-700">
                      <TabsTrigger value="spreadsheet" className="data-[state=active]:bg-primary">
                        Spreadsheet View
                      </TabsTrigger>
                      <TabsTrigger value="sections" className="data-[state=active]:bg-primary">
                        Section View
                      </TabsTrigger>
                    </TabsList>
                
                <TabsContent value="spreadsheet" className="border border-gray-700 rounded-lg">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableCaption>Pricing breakdown for {projectName}</TableCaption>
                      <TableHeader>
                        <TableRow className="bg-gray-800 hover:bg-gray-800">
                          <TableHead className="w-[250px]">Item</TableHead>
                          <TableHead className="text-right">Quantity</TableHead>
                          <TableHead className="text-right">Unit</TableHead>
                          <TableHead className="text-right">Unit Price</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                          {editMode && <TableHead className="text-right w-[100px]">Actions</TableHead>}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sections.map((section) => (
                          <React.Fragment key={section.id}>
                            <TableRow className="bg-gray-700/60 hover:bg-gray-700/80">
                              <TableCell colSpan={4} className="font-medium py-2">
                                {editMode ? (
                                  <Input
                                    value={section.name}
                                    onChange={(e) => {
                                      setSections(sections.map(s => 
                                        s.id === section.id ? { ...s, name: e.target.value } : s
                                      ));
                                    }}
                                    className="bg-gray-800 border-gray-600 text-white h-8"
                                  />
                                ) : (
                                  section.name
                                )}
                              </TableCell>
                              <TableCell className="text-right font-medium py-2">{formatCurrency(section.total)}</TableCell>
                              {editMode && (
                                <TableCell className="text-right py-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeSection(section.id)}
                                    className="h-7 px-2 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                </TableCell>
                              )}
                            </TableRow>
                            
                            {section.items.map((item) => (
                              <TableRow key={`item-${item.id}`} className="hover:bg-gray-800/80">
                                <TableCell>
                                  {editMode ? (
                                    <Input
                                      value={item.name}
                                      onChange={(e) => handleItemChange(section.id, item.id, 'name', e.target.value)}
                                      className="bg-gray-800 border-gray-600 text-white h-8"
                                    />
                                  ) : (
                                    item.name
                                  )}
                                </TableCell>
                                <TableCell className="text-right">
                                  <Input
                                    type="number"
                                    min="0"
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(section.id, item.id, 'quantity', e.target.value)}
                                    className="bg-gray-800 border-gray-600 text-white h-8 w-20 ml-auto"
                                  />
                                </TableCell>
                                <TableCell className="text-right">
                                  {editMode ? (
                                    <Input
                                      value={item.unit}
                                      onChange={(e) => handleItemChange(section.id, item.id, 'unit', e.target.value)}
                                      className="bg-gray-800 border-gray-600 text-white h-8 w-20 ml-auto"
                                    />
                                  ) : (
                                    item.unit
                                  )}
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex items-center justify-end gap-1">
                                    <span className="text-gray-400">£</span>
                                    <Input
                                      type="number"
                                      min="0"
                                      step="0.01"
                                      value={item.unitPrice}
                                      onChange={(e) => handleItemChange(section.id, item.id, 'unitPrice', e.target.value)}
                                      className="bg-gray-800 border-gray-600 text-white h-8 w-24"
                                    />
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">{formatCurrency(item.total)}</TableCell>
                                {editMode && (
                                  <TableCell className="text-right">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeItem(section.id, item.id)}
                                      className="h-7 px-2 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                    >
                                      <Trash2 size={16} />
                                    </Button>
                                  </TableCell>
                                )}
                              </TableRow>
                            ))}
                            
                            {editMode && (
                              <TableRow key={`add-${section.id}`} className="hover:bg-gray-900/90 bg-gray-900/50">
                                <TableCell colSpan={editMode ? 6 : 5}>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => addItem(section.id)}
                                    className="text-primary hover:text-primary hover:bg-primary/10"
                                  >
                                    <Plus size={16} className="mr-1" /> Add Item
                                  </Button>
                                </TableCell>
                              </TableRow>
                            )}
                          </React.Fragment>
                        ))}
                        
                        {editMode && (
                          <TableRow className="hover:bg-gray-800">
                            <TableCell colSpan={editMode ? 6 : 5} className="text-center">
                              <Button
                                variant="outline"
                                onClick={addSection}
                                className="border-dashed border-gray-600 text-gray-400 hover:text-white hover:bg-gray-700"
                              >
                                <Plus size={16} className="mr-1" /> Add New Section
                              </Button>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="sections" className="space-y-4">
                  {sections.map((section) => (
                    <Accordion
                      key={section.id}
                      type="single"
                      defaultValue={section.isOpen ? section.id : undefined}
                      collapsible
                      className="border border-gray-700 rounded-lg overflow-hidden"
                    >
                      <AccordionItem value={section.id} className="border-0">
                        <AccordionTrigger className="px-4 py-3 bg-gray-800 hover:bg-gray-800 hover:no-underline flex justify-between">
                          <div className="flex flex-1 justify-between mr-4">
                            <div className="font-medium text-white">
                              {editMode ? (
                                <Input
                                  value={section.name}
                                  onChange={(e) => {
                                    setSections(sections.map(s => 
                                      s.id === section.id ? { ...s, name: e.target.value } : s
                                    ));
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                  className="bg-gray-700 border-gray-600 text-white h-8 w-40"
                                />
                              ) : (
                                section.name
                              )}
                            </div>
                            <div className="text-gray-300">{formatCurrency(section.total)}</div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="bg-gray-900 p-0">
                          <div className="p-4 space-y-4">
                            {section.items.map((item) => (
                              <div 
                                key={item.id} 
                                className="grid grid-cols-1 md:grid-cols-5 gap-3 p-3 bg-gray-800 rounded-md border border-gray-700"
                              >
                                <div className="md:col-span-2">
                                  <Label className="text-xs text-gray-500 mb-1 block">Item</Label>
                                  {editMode ? (
                                    <Input
                                      value={item.name}
                                      onChange={(e) => handleItemChange(section.id, item.id, 'name', e.target.value)}
                                      className="bg-gray-700 border-gray-600 text-white h-8"
                                    />
                                  ) : (
                                    <div className="text-white">{item.name}</div>
                                  )}
                                </div>
                                <div>
                                  <Label className="text-xs text-gray-500 mb-1 block">Quantity</Label>
                                  <div className="flex items-center gap-2">
                                    <Input
                                      type="number"
                                      min="0"
                                      value={item.quantity}
                                      onChange={(e) => handleItemChange(section.id, item.id, 'quantity', e.target.value)}
                                      className="bg-gray-700 border-gray-600 text-white h-8"
                                    />
                                    {editMode ? (
                                      <Input
                                        value={item.unit}
                                        onChange={(e) => handleItemChange(section.id, item.id, 'unit', e.target.value)}
                                        className="bg-gray-700 border-gray-600 text-white h-8 w-16"
                                      />
                                    ) : (
                                      <span className="text-gray-400">{item.unit}</span>
                                    )}
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-xs text-gray-500 mb-1 block">Unit Price (£)</Label>
                                  <Input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={item.unitPrice}
                                    onChange={(e) => handleItemChange(section.id, item.id, 'unitPrice', e.target.value)}
                                    className="bg-gray-700 border-gray-600 text-white h-8"
                                  />
                                </div>
                                <div className="flex items-end justify-between">
                                  <div>
                                    <Label className="text-xs text-gray-500 mb-1 block">Total</Label>
                                    <div className="text-white font-medium">{formatCurrency(item.total)}</div>
                                  </div>
                                  {editMode && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeItem(section.id, item.id)}
                                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                    >
                                      <Trash2 size={16} />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            ))}
                            
                            {editMode && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addItem(section.id)}
                                className="w-full border-dashed border-gray-600 text-gray-400 hover:text-white hover:bg-gray-700"
                              >
                                <Plus size={16} className="mr-1" /> Add Item
                              </Button>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))}
                  
                  {editMode && (
                    <Button
                      variant="outline"
                      onClick={addSection}
                      className="w-full border-dashed border-gray-600 text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      <Plus size={16} className="mr-1" /> Add New Section
                    </Button>
                  )}
                </TabsContent>
                  </Tabs>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Info size={14} />
                    <span className="text-xs">All changes are saved automatically within this session.</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Dialog open={showCalendarDialog} onOpenChange={setShowCalendarDialog}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" /> Add to Calendar
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Add Job to Calendar</DialogTitle>
                          <DialogDescription>
                            Save this quote as a calendar appointment or project
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="cal-client-name">Client Name *</Label>
                            <Input
                              id="cal-client-name"
                              value={calendarData.clientName}
                              onChange={(e) => setCalendarData({...calendarData, clientName: e.target.value})}
                              className="mt-1"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label htmlFor="cal-date">Date</Label>
                              <Input
                                id="cal-date"
                                type="date"
                                value={calendarData.date}
                                onChange={(e) => setCalendarData({...calendarData, date: e.target.value})}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="cal-time">Time</Label>
                              <Input
                                id="cal-time"
                                type="time"
                                value={calendarData.time}
                                onChange={(e) => setCalendarData({...calendarData, time: e.target.value})}
                                className="mt-1"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label htmlFor="cal-type">Type</Label>
                              <Select value={calendarData.type} onValueChange={(value: "project" | "appointment") => setCalendarData({...calendarData, type: value})}>
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="appointment">Appointment (Quote)</SelectItem>
                                  <SelectItem value="project">Project (Booked)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="cal-duration">Duration (days)</Label>
                              <Input
                                id="cal-duration"
                                type="number"
                                step="0.5"
                                value={calendarData.duration}
                                onChange={(e) => setCalendarData({...calendarData, duration: e.target.value})}
                                className="mt-1"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="cal-phone">Client Phone</Label>
                            <Input
                              id="cal-phone"
                              value={calendarData.clientPhone}
                              onChange={(e) => setCalendarData({...calendarData, clientPhone: e.target.value})}
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="cal-email">Client Email</Label>
                            <Input
                              id="cal-email"
                              type="email"
                              value={calendarData.clientEmail}
                              onChange={(e) => setCalendarData({...calendarData, clientEmail: e.target.value})}
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="cal-address">Client Address</Label>
                            <Input
                              id="cal-address"
                              value={calendarData.clientAddress}
                              onChange={(e) => setCalendarData({...calendarData, clientAddress: e.target.value})}
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="cal-notes">Notes</Label>
                            <Textarea
                              id="cal-notes"
                              value={calendarData.notes}
                              onChange={(e) => setCalendarData({...calendarData, notes: e.target.value})}
                              className="mt-1"
                              placeholder="Additional notes about this job..."
                            />
                          </div>

                          <div className="bg-gray-800/50 p-3 rounded-lg">
                            <p className="text-sm text-gray-300">
                              <strong>Project:</strong> {projectName || "Untitled Project"}
                            </p>
                            <p className="text-sm text-gray-300">
                              <strong>Total Value:</strong> £{getProjectTotal().toLocaleString()}
                            </p>
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setShowCalendarDialog(false)}>
                            Cancel
                          </Button>
                          <Button onClick={saveToCalendar}>
                            Add to Calendar
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

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
                            <Label htmlFor="supplier-phone">Supplier Phone</Label>
                            <Input
                              id="supplier-phone"
                              type="tel"
                              placeholder="+44 7123 456789"
                              value={supplierPhone}
                              onChange={(e) => setSupplierPhone(e.target.value)}
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
                        
                        <DialogFooter className="flex-col gap-2 sm:flex-row">
                          <Button
                            onClick={sendMaterialListEmail}
                            disabled={!supplierEmail}
                            className="w-full sm:w-auto"
                          >
                            <Mail className="mr-2 h-4 w-4" /> Send Email
                          </Button>
                          <Button
                            onClick={sendMaterialListSMS}
                            disabled={!supplierPhone}
                            variant="outline"
                            className="w-full sm:w-auto"
                          >
                            <MessageSquare className="mr-2 h-4 w-4" /> Send SMS
                          </Button>
                          <Button
                            onClick={copyMaterialList}
                            variant="secondary"
                            className="w-full sm:w-auto"
                          >
                            Copy to Clipboard
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Button
                      onClick={exportToCSV}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Download className="mr-2 h-4 w-4" /> Export Pricing Sheet
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default TradeCalculator;