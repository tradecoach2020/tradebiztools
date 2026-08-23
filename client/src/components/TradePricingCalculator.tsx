import { useState, Fragment } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  PenLine, 
  Info, 
  Download, 
  ChevronDown, 
  ChevronUp,
  Plus,
  Trash2
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

const TradePricingCalculator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<TradeTemplate>(tradeTemplates[0]);
  const [sections, setSections] = useState<PricingSection[]>(tradeTemplates[0].sections);
  const [projectName, setProjectName] = useState("New Project");
  const [subTotal, setSubTotal] = useState(0);
  const [vatRate, setVatRate] = useState(20);
  const [profit, setProfit] = useState(20);
  const [editMode, setEditMode] = useState(false);
  
  // Calculate totals when quantities or prices change
  const calculateTotals = (updatedSections: PricingSection[]) => {
    const newSections = updatedSections.map(section => {
      const sectionItems = section.items.map(item => {
        const total = item.quantity * item.unitPrice;
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
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-3">Pricing Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1 border-b border-gray-700">
                    <span className="text-gray-300">Subtotal:</span>
                    <span className="text-white">{formatCurrency(subTotal)}</span>
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
                    <span className="text-white">{formatCurrency(vatAmount)}</span>
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
                    <span className="text-white">{formatCurrency(profitAmount)}</span>
                  </div>
                  
                  <div className="flex justify-between py-2 mt-2 border-t border-gray-700">
                    <span className="text-white font-medium">TOTAL:</span>
                    <span className="text-white font-bold text-xl">{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>
            </div>
            
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
                          <Fragment key={section.id}>
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
                              <TableRow key={item.id} className="hover:bg-gray-800/80">
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
                              <TableRow className="hover:bg-gray-900/90 bg-gray-900/50">
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
            
            <div className="mt-4 flex justify-between">
              <div className="flex items-center gap-2 text-gray-400">
                <Info size={14} />
                <span className="text-xs">All changes are saved automatically within this session.</span>
              </div>
              <Button
                onClick={exportToCSV}
                className="bg-primary hover:bg-primary/90"
              >
                <Download className="mr-2 h-4 w-4" /> Export Pricing Sheet
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default TradePricingCalculator;