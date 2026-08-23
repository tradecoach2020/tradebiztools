import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  FileText, 
  Mail, 
  Calendar,
  Check,
  Star,
  ExternalLink,
  ShoppingCart
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  icon: JSX.Element;
  popular?: boolean;
  category: string;
}

const products: Product[] = [
  {
    id: "website-design",
    name: "Website Design & Build",
    description: "Let TradeCoach design and build your online presence with a trade specific website designed specifically for your business, industry and location. **Please note SEO (search engine optimisation) is included",
    price: 1800.00,
    currency: "GBP",
    features: [
      "Trade-specific website design",
      "Custom built for your business",
      "Industry and location optimized",
      "SEO (Search Engine Optimisation) included",
      "Mobile responsive design",
      "Professional online presence",
      "Contact forms and lead capture",
      "Google My Business integration"
    ],
    icon: <Globe className="h-8 w-8 text-primary" />,
    popular: true,
    category: "Digital Marketing"
  },
  {
    id: "pdf-brochure",
    name: "PDF Brochure",
    description: "Professional PDF brochure designed to showcase your trade business services and attract potential clients.",
    price: 125.00,
    currency: "GBP",
    features: [
      "Professional design layout",
      "Trade-specific content",
      "High-quality graphics",
      "Print-ready format",
      "Digital distribution ready",
      "Brand consistent design"
    ],
    icon: <FileText className="h-8 w-8 text-primary" />,
    category: "Marketing Materials"
  },
  {
    id: "leaflet-design",
    name: "Leaflet Design",
    description: "Canvas all installation areas with a leaflet designed to entice potential clients to act and request a quote.",
    price: 125.00,
    currency: "GBP",
    features: [
      "Eye-catching design",
      "Call-to-action focused",
      "Area-specific targeting",
      "Quote request optimization",
      "Print-ready format",
      "Brand consistent styling"
    ],
    icon: <Mail className="h-8 w-8 text-primary" />,
    category: "Marketing Materials"
  },
  {
    id: "neighbourhood-letter",
    name: "Neighbourhood Letter",
    description: "Wow your future clients neighbours with a carefully designed letter informing them of upcoming work, info and offer of free quote.",
    price: 125.00,
    currency: "GBP",
    features: [
      "Professional letter template",
      "Neighbourhood-specific messaging",
      "Work notification design",
      "Free quote offer included",
      "Brand professional image",
      "Trust-building content"
    ],
    icon: <Mail className="h-8 w-8 text-primary" />,
    category: "Marketing Materials"
  },
  {
    id: "one-to-one-session",
    name: "Monthly Business Coaching with Daren",
    description: "Get ongoing personalized business coaching and guidance directly from Daren to accelerate your trade business growth.",
    price: 1200.00,
    currency: "GBP",
    features: [
      "Direct access to Daren",
      "Monthly coaching sessions",
      "Personalized business strategy",
      "Tailored action plan",
      "Business growth guidance",
      "Problem-solving sessions",
      "Follow-up recommendations",
      "Ongoing support throughout the month"
    ],
    icon: <Calendar className="h-8 w-8 text-primary" />,
    popular: true,
    category: "Coaching"
  }
];

const ProductsPage = () => {
  const formatPrice = (price: number, currency: string) => {
    const formattedPrice = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(price);
    return `${formattedPrice} inc VAT`;
  };

  const handlePurchase = (product: Product) => {
    const checkoutUrls: Record<string, string> = {
      "website-design": "https://www.offthetools.online/offers/59uCY2dx/checkout",
      "pdf-brochure": "https://www.offthetools.online/offers/s9YM3rTd/checkout",
      "leaflet-design": "https://www.offthetools.online/offers/zpJ7cdyT/checkout",
      "neighbourhood-letter": "https://www.offthetools.online/offers/KyR6RDZT/checkout",
      "one-to-one-session": "https://www.offthetools.online/offers/HkLdKZGc/checkout"
    };
    
    const checkoutUrl = checkoutUrls[product.id];
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
    } else {
      // Fallback to email for unknown products
      window.open(`mailto:hello@tradecoach.co.uk?subject=Enquiry about ${product.name}&body=I'm interested in purchasing ${product.name} for ${formatPrice(product.price, product.currency)}. Please provide more details.`, '_blank');
    }
  };

  const handleCourseAccess = () => {
    // Link to access the course
    window.open("https://www.offthetools.online/library", "_blank");
  };

  return (
    <section id="products" className="mb-8">
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Have it all done for you.
            </h2>
            <p className="text-gray-400 text-lg mb-6">
              Professional services to accelerate your trade business growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div 
                key={product.id}
                className={`relative border rounded-lg overflow-hidden transition-all hover:shadow-lg ${
                  product.popular 
                    ? 'border-primary bg-gray-800 shadow-lg' 
                    : 'border-gray-700 bg-gray-800/50'
                }`}
              >
                {product.popular && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-white">
                      <Star className="h-3 w-3 mr-1" /> Popular
                    </Badge>
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {product.icon}
                    <div className="ml-3">
                      <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                      <span className="text-sm text-gray-400">{product.category}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-white mb-1">
                      {formatPrice(product.price, product.currency)}
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-white font-medium mb-3">What's included:</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-300">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button
                    onClick={() => handlePurchase(product)}
                    className={`w-full ${
                      product.popular 
                        ? 'bg-primary hover:bg-primary/90' 
                        : 'bg-gray-700 hover:bg-gray-600'
                    } text-white`}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Get Started
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-blue-900/20 border border-blue-800 rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-white mb-2">
              Need a custom solution?
            </h3>
            <p className="text-gray-300 mb-4">
              Contact us to discuss your specific requirements and get a tailored quote for your trade business.
            </p>
            <Button 
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
              onClick={() => window.open("mailto:hello@tradecoach.co.uk?subject=Custom Solution Enquiry", "_blank")}
            >
              Contact Us for Custom Work
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ProductsPage;