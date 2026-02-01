import { useState, useMemo } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MessageSquare, Bot, Zap, Shield, Clock, Star } from "lucide-react";

interface Product {
  id: number;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  price: number;
  category: string;
  icon: any;
  features: { en: string[]; ar: string[] };
  popular?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: { en: "WhatsApp Business API Setup", ar: "إعداد واتساب بزنس API" },
    description: { en: "Complete WhatsApp Business API integration for your business", ar: "تكامل كامل لواجهة برمجة تطبيقات واتساب بزنس لعملك" },
    price: 499,
    category: "whatsapp",
    icon: MessageSquare,
    features: { en: ["Full API Access", "24/7 Support", "Custom Integration"], ar: ["وصول كامل للـ API", "دعم 24/7", "تكامل مخصص"] },
    popular: true
  },
  {
    id: 2,
    name: { en: "AI Chatbot Development", ar: "تطوير روبوت دردشة ذكي" },
    description: { en: "Custom AI-powered chatbot for customer service", ar: "روبوت دردشة مدعوم بالذكاء الاصطناعي لخدمة العملاء" },
    price: 799,
    category: "chatbot",
    icon: Bot,
    features: { en: ["NLP Integration", "Multi-language", "Analytics Dashboard"], ar: ["تكامل معالجة اللغة", "متعدد اللغات", "لوحة تحليلات"] },
    popular: true
  },
  {
    id: 3,
    name: { en: "Automation Package", ar: "باقة الأتمتة" },
    description: { en: "Business process automation solutions", ar: "حلول أتمتة العمليات التجارية" },
    price: 599,
    category: "automation",
    icon: Zap,
    features: { en: ["Workflow Automation", "API Connections", "Custom Scripts"], ar: ["أتمتة سير العمل", "اتصالات API", "سكربتات مخصصة"] }
  },
  {
    id: 4,
    name: { en: "Security Audit", ar: "تدقيق أمني" },
    description: { en: "Comprehensive security assessment for your systems", ar: "تقييم أمني شامل لأنظمتك" },
    price: 349,
    category: "security",
    icon: Shield,
    features: { en: ["Vulnerability Scan", "Report & Recommendations", "Follow-up Support"], ar: ["فحص الثغرات", "تقرير وتوصيات", "دعم متابعة"] }
  },
  {
    id: 5,
    name: { en: "24/7 Technical Support", ar: "دعم تقني على مدار الساعة" },
    description: { en: "Round-the-clock technical assistance", ar: "مساعدة تقنية على مدار الساعة" },
    price: 199,
    category: "support",
    icon: Clock,
    features: { en: ["Instant Response", "Remote Access", "Priority Queue"], ar: ["استجابة فورية", "وصول عن بعد", "أولوية في الطابور"] }
  },
  {
    id: 6,
    name: { en: "Premium Consultation", ar: "استشارة متميزة" },
    description: { en: "Expert consultation for digital transformation", ar: "استشارة خبراء للتحول الرقمي" },
    price: 299,
    category: "consultation",
    icon: Star,
    features: { en: ["Strategy Planning", "Implementation Guide", "3-Month Support"], ar: ["تخطيط استراتيجي", "دليل التنفيذ", "دعم 3 أشهر"] }
  }
];

const categories = [
  { id: "all", en: "All Products", ar: "جميع المنتجات" },
  { id: "whatsapp", en: "WhatsApp", ar: "واتساب" },
  { id: "chatbot", en: "Chatbots", ar: "روبوتات الدردشة" },
  { id: "automation", en: "Automation", ar: "الأتمتة" },
  { id: "security", en: "Security", ar: "الأمان" },
  { id: "support", en: "Support", ar: "الدعم" },
  { id: "consultation", en: "Consultation", ar: "الاستشارات" }
];

const ProductsContent = () => {
  const { t, isRtl } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.name.ar.includes(searchQuery) ||
        product.description.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.ar.includes(searchQuery);
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleGetStarted = (productName: string) => {
    const message = `Hello, I am interested in the product: ${productName}`;
    const url = `https://wa.me/201006334062?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-tech-dark mb-4">
              {t("Our Products & Services", "منتجاتنا وخدماتنا")}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("Explore our comprehensive range of technical solutions designed to transform your business", 
                 "استكشف مجموعتنا الشاملة من الحلول التقنية المصممة لتحويل عملك")}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder={t("Search products...", "البحث عن المنتجات...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search-products"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={selectedCategory === cat.id ? "bg-tech-blue hover:bg-tech-purple" : ""}
                  data-testid={`button-category-${cat.id}`}
                >
                  {t(cat.en, cat.ar)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const IconComponent = product.icon;
              return (
                <Card key={product.id} className="hover:shadow-lg transition-shadow relative overflow-hidden" data-testid={`card-product-${product.id}`}>
                  {product.popular && (
                    <Badge className="absolute top-4 right-4 bg-tech-accent">
                      {t("Popular", "شائع")}
                    </Badge>
                  )}
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-tech-blue to-tech-purple flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">
                      {t(product.name.en, product.name.ar)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {t(product.description.en, product.description.ar)}
                    </p>
                    <ul className="space-y-2">
                      {(isRtl ? product.features.ar : product.features.en).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                          <div className="w-1.5 h-1.5 rounded-full bg-tech-blue" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-tech-blue">${product.price}</span>
                    <Button
                      className="bg-tech-blue hover:bg-tech-purple"
                      data-testid={`button-buy-${product.id}`}
                      onClick={() => handleGetStarted(product.name.en)}
                    >
                      {t("Get Started", "ابدأ الآن")}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {t("No products found matching your criteria", "لم يتم العثور على منتجات تطابق معاييرك")}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

const Products = () => (
  <LanguageProvider>
    <SEO 
      title="Products & Services" 
      description="Explore our comprehensive range of technical solutions including WhatsApp API, Chatbots, and Automation tools."
      keywords={['WhatsApp API', 'Chatbots', 'Automation', 'Security Audit', 'Technical Support']}
    />
    <ProductsContent />
  </LanguageProvider>
);

export default Products;
