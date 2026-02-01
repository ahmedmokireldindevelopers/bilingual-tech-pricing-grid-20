import { useState } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import FadeIn from "@/components/animations/FadeIn";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Bot, 
  Database, 
  Globe, 
  Briefcase, 
  BookOpen, 
  TrendingUp, 
  Layout, 
  FileText,
  Smartphone,
  CheckCircle2,
  Download
} from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import leadwaveImg from "@/assets/products/leadwave.png";
import wacrmImg from "@/assets/products/wacrm.png";
import wasendarImg from "@/assets/products/wasendar.png";
import chatpionImg from "@/assets/products/chatpion.png";
import saasToolkitImg from "@/assets/products/saas_toolkit.png";
import moneyModelsImg from "@/assets/products/100m_book.png";
import businessExplainedImg from "@/assets/products/business_explained.png";
import smartInsightsImg from "@/assets/products/smart_insights.png";

interface Product {
  id: string;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  category: "software" | "saas" | "digital";
  icon: any;
  features: { en: string[]; ar: string[] };
  price?: { en: string; ar: string };
  badge?: { en: string; ar: string };
  images: string[];
}

const products: Product[] = [
  // Software Products
  {
    id: "lead-wave",
    name: { en: "Lead Wave", ar: "Lead Wave" },
    description: { 
      en: "Advanced Windows-based desktop application for comprehensive WhatsApp marketing automation and campaign management.", 
      ar: "تطبيق سطح مكتب متقدم لنظام ويندوز لأتمتة تسويق واتساب وإدارة الحملات بشكل شامل."
    },
    category: "software",
    icon: MessageSquare,
    features: { 
      en: ["Multi-Account Management", "Bulk Messaging w/ Attachments", "AI Chatbot Integration", "Anti-Ban Technology", "Campaign Analytics"], 
      ar: ["إدارة حسابات متعددة", "رسائل جماعية مع مرفقات", "تكامل روبوت الدردشة بالذكاء الاصطناعي", "تقنية الحماية من الحظر", "تحليلات الحملات"] 
    },
    badge: { en: "Best Seller", ar: "الأكثر مبيعاً" },
    images: [leadwaveImg]
  },
  {
    id: "wacrm",
    name: { en: "WaCRM", ar: "WaCRM" },
    description: { 
      en: "Powerful CRM tool designed specifically for WhatsApp to organize contacts, schedule follow-ups, and streamline communication.", 
      ar: "أداة CRM قوية مصممة خصيصاً لواتساب لتنظيم جهات الاتصال، جدولة المتابعات، وتبسيط التواصل."
    },
    category: "software",
    icon: Database,
    features: { 
      en: ["Contact Segmentation & Tagging", "Scheduled Messages", "Quick Replies", "Export/Import Contacts", "Browser Extension"], 
      ar: ["تقسيم وتصنيف جهات الاتصال", "رسائل مجدولة", "ردود سريعة", "تصدير/استيراد جهات الاتصال", "إضافة للمتصفح"] 
    },
    images: [wacrmImg]
  },
  {
    id: "wasendar",
    name: { en: "WaSendar", ar: "WaSendar" },
    description: { 
      en: "Efficient bulk WhatsApp messaging solution focused on speed and reliability for high-volume marketing campaigns.", 
      ar: "حل فعال لمراسلات واتساب الجماعية يركز على السرعة والموثوقية للحملات التسويقية كبيرة الحجم."
    },
    category: "software",
    icon: Smartphone,
    features: { 
      en: ["High-Speed Bulk Sending", "Group Messaging Tools", "Auto-Reply Rules", "Number Filtering", "Detailed Delivery Reports"], 
      ar: ["إرسال جماعي عالي السرعة", "أدوات مراسلة المجموعات", "قواعد الرد التلقائي", "تصفية الأرقام", "تقارير تسليم مفصلة"] 
    },
    images: [wasendarImg]
  },

  // SaaS Products
  {
    id: "chatpion",
    name: { en: "Chatpion", ar: "Chatpion" },
    description: { 
      en: "All-in-one marketing SaaS platform combining AI chatbots, e-commerce, and social media automation.", 
      ar: "منصة SaaS تسويقية شاملة تجمع بين روبوتات الدردشة بالذكاء الاصطناعي، التجارة الإلكترونية، وأتمتة وسائل التواصل الاجتماعي."
    },
    category: "saas",
    icon: Bot,
    features: { 
      en: ["Facebook/IG Chatbots", "E-commerce in Messenger", "Social Media Auto-Posting", "SMS & Email Marketing", "Drag & Drop Flow Builder"], 
      ar: ["شات بوت فيسبوك/انستجرام", "تجارة إلكترونية داخل الماسنجر", "نشر تلقائي على السوشيال ميديا", "تسويق عبر SMS والبريد", "بناء تدفق بالسحب والإفلات"] 
    },
    badge: { en: "Feature Rich", ar: "غني بالميزات" },
    images: [chatpionImg]
  },

  // Digital Products
  {
    id: "saas-toolkit",
    name: { en: "SaaS Toolkit", ar: "SaaS Toolkit" },
    description: { 
      en: "Comprehensive collection of tools, templates, and resources for building, launching, and scaling SaaS businesses.", 
      ar: "مجموعة شاملة من الأدوات، القوالب، والموارد لبناء، إطلاق، وتوسيع شركات البرمجيات كخدمة (SaaS)."
    },
    category: "digital",
    icon: Layout,
    features: { 
      en: ["Startup Checklists", "Growth Metrics Calculators", "Tech Stack Recommendations", "Marketing Templates", "Launch Strategies"], 
      ar: ["قوائم تحقق للشركات الناشئة", "حاسبات مقاييس النمو", "توصيات البنية التقنية", "قوالب تسويقية", "استراتيجيات الإطلاق"] 
    },
    images: [saasToolkitImg]
  },
  {
    id: "100m-models",
    name: { en: "$100M Money Models", ar: "نماذج الـ 100 مليون دولار" },
    description: { 
      en: "Exclusive frameworks and strategies specifically designed for high-growth businesses targeting massive scale.", 
      ar: "أطر عمل واستراتيجيات حصرية مصممة خصيصاً للشركات عالية النمو التي تستهدف توسعاً هائلاً."
    },
    category: "digital",
    icon: TrendingUp,
    features: { 
      en: ["Acquisition Channels", "Value Ladder Design", "Pricing Psychology", "Retention Strategies", "Scaling Systems"], 
      ar: ["قنوات الاستحواذ", "تصميم سلم القيمة", "سيكولوجية التسعير", "استراتيجيات الاحتفاظ بالعملاء", "أنظمة التوسع"] 
    },
    badge: { en: "Premium", ar: "متميز" },
    images: [moneyModelsImg]
  },
  {
    id: "business-explained",
    name: { en: "Business Explained", ar: "شرح الأعمال (Business Explained)" },
    description: { 
      en: "in-depth educational resources breaking down complex business concepts into actionable steps and clear explanations.", 
      ar: "موارد تعليمية متعمقة تبسط مفاهيم الأعمال المعقدة إلى خطوات قابلة للتنفيذ وشروحات واضحة."
    },
    category: "digital",
    icon: BookOpen,
    features: { 
      en: ["Business Fundamentals", "Financial Literacy", "Operational Excellence", "Strategic Planning", "Case Studies"], 
      ar: ["أساسيات الأعمال", "الثقافة المالية", "التميز التشغيلي", "التخطيط الاستراتيجي", "دراسات حالة"] 
    },
    images: [businessExplainedImg]
  },
  {
    id: "business-models-bundle",
    name: { en: "Business Models Super Guides", ar: "حزمة أدلة نماذج الأعمال" },
    description: { 
      en: "Extensive bundle of guides covering various business models like subscription, freemium, platform, and marketplace.", 
      ar: "حزمة واسعة من الأدلة تغطي نماذج أعمال متنوعة مثل الاشتراكات، المجانية (Freemium)، المنصات، والأسواق."
    },
    category: "digital",
    icon: Briefcase,
    features: { 
      en: ["50+ Business Models", "Revenue Stream Analysis", "Implementation Frameworks", "Industry Examples", "Pivot Strategies"], 
      ar: ["أكثر من 50 نموذج عمل", "تحليل مصادر الإيرادات", "أطر التنفيذ", "أمثلة من الصناعة", "استراتيجيات التحول"] 
    },
    images: [businessExplainedImg]
  },
  {
    id: "smart-insights",
    name: { en: "Smart Insights Templates", ar: "قوالب Smart Insights" },
    description: { 
      en: "Professional digital marketing frameworks, planning templates, and strategy toolkits for data-driven growth.", 
      ar: "أطر عمل احترافية للتسويق الرقمي، قوالب تخطيط، ومجموعات أدوات استراتيجية للنمو القائم على البيانات."
    },
    category: "digital",
    icon: Globe,
    features: { 
      en: ["RACE Framework", "Content Calendar", "Audit Templates", "Persona Builders", "KPI Dashboards"], 
      ar: ["إطار عمل RACE", "تقويم المحتوى", "قوالب التدقيق", "بناء الشخصيات", "لوحات معلومات مؤشرات الأداء"] 
    },
    images: [smartInsightsImg]
  }
];

const DigitalStoreContent = () => {
  const { t, isRtl } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");

  const filterProducts = (category: string) => {
    if (category === "all") return products;
    return products.filter(p => p.category === category);
  };

  const handleInterest = (productName: string) => {
    const message = `Hello, I am interested in ordering: ${productName}`;
    const url = `https://wa.me/201006334062?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-tech-dark mb-4 drop-shadow-sm">
              {t("Digital Solutions Store", "متجر الحلول الرقمية")}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t(
                "Discover our premium collection of software, SaaS platforms, and educational resources to scale your business.",
                "اكتشف مجموعتنا المتميزة من البرمجيات، منصات SaaS، والموارد التعليمية لتوسيع نطاق عملك."
              )}
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-10">
              <TabsList className="grid w-full max-w-2xl grid-cols-4 bg-white shadow-sm p-1 rounded-xl h-auto">
                <TabsTrigger value="all" className="rounded-lg py-2.5 data-[state=active]:bg-tech-blue data-[state=active]:text-white transition-all">
                  {t("All", "الكل")}
                </TabsTrigger>
                <TabsTrigger value="software" className="rounded-lg py-2.5 data-[state=active]:bg-tech-blue data-[state=active]:text-white transition-all">
                  {t("Software", "برمجيات")}
                </TabsTrigger>
                <TabsTrigger value="saas" className="rounded-lg py-2.5 data-[state=active]:bg-tech-blue data-[state=active]:text-white transition-all">
                  {t("SaaS", "SaaS")}
                </TabsTrigger>
                <TabsTrigger value="digital" className="rounded-lg py-2.5 data-[state=active]:bg-tech-blue data-[state=active]:text-white transition-all">
                  {t("Digital & Courses", "منتجات رقمية")}
                </TabsTrigger>
              </TabsList>
            </div>

            {["all", "software", "saas", "digital"].map((tabInfo) => (
              <TabsContent key={tabInfo} value={tabInfo} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterProducts(tabInfo).map((product, index) => {
                    const Icon = product.icon;
                    return (
                      <FadeIn key={product.id} delay={index * 0.1} direction="up" className="h-full">
                        <Card className="border border-gray-100 hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
                          <CardHeader className="pb-3 relative">
                            {product.badge && (
                              <Badge className="absolute top-4 right-4 bg-tech-accent/90 text-white border-0">
                                {isRtl ? product.badge.ar : product.badge.en}
                              </Badge>
                            )}
                            <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
                               <Carousel className="w-full h-full" opts={{ loop: true }}>
                                 <CarouselContent>
                                   {product.images.map((image, idx) => (
                                     <CarouselItem key={idx}>
                                       <div className="p-1">
                                         <img src={image} alt={`${product.name.en} preview ${idx + 1}`} className="w-full h-48 object-cover rounded-md" />
                                       </div>
                                     </CarouselItem>
                                   ))}
                                 </CarouselContent>
                               </Carousel>
                            </div>
                            <CardTitle className="text-xl font-bold">
                              {isRtl ? product.name.ar : product.name.en}
                            </CardTitle>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">
                              {product.category === 'software' ? t("Software", "برمجيات") : 
                               product.category === 'saas' ? t("SaaS Platform", "منصة SaaS") : 
                               t("Digital Product", "منتج رقمي")}
                            </div>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <CardDescription className="text-base text-gray-600 mb-6 leading-relaxed">
                              {isRtl ? product.description.ar : product.description.en}
                            </CardDescription>
                            
                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold text-gray-900 border-b pb-1 mb-2">
                                {t("Key Features:", "الميزات الرئيسية:")}
                              </h4>
                              <ul className="space-y-2">
                                {(isRtl ? product.features.ar : product.features.en).map((feature, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                    <CheckCircle2 size={16} className="mt-0.5 text-tech-blue flex-shrink-0" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                          <CardFooter className="pt-4 border-t border-gray-50">
                            <Button 
                              className="w-full bg-tech-blue hover:bg-tech-purple text-white gap-2 h-11"
                              onClick={() => handleInterest(product.name.en)}
                            >
                              <MessageSquare size={18} />
                              {t("Order Now", "اطلب الآن")}
                            </Button>
                          </CardFooter>
                        </Card>
                      </FadeIn>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-16 bg-gradient-to-r from-tech-dark to-tech-blue rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">
                {t("Need a Custom Solution?", "هل تحتاج إلى حل مخصص؟")}
              </h2>
              <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
                {t(
                  "If you don't see exactly what you're looking for, our team can build a tailored solution for your specific business requirements.",
                  "إذا لم تجد ما تبحث عنه بالضبط، يمكن لفريقنا بناء حل مخصص لمتطلبات عملك المحددة."
                )}
              </p>
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-white text-tech-dark hover:bg-gray-100 font-bold"
                onClick={() => window.open(`https://wa.me/201006334062?text=${encodeURIComponent("Hello, I need a custom solution")}`, '_blank')}
              >
                {t("Contact Sales", "اتصل بالمبيعات")}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const DigitalStore = () => (
  <LanguageProvider>
    <SEO 
      title="Digital Solutions Store" 
      description="Explore our premium collection of software, SaaS platforms, and educational resources. Get the best tools to scale your business."
      keywords={['Digital Store', 'Software', 'SaaS', 'Courses', 'Templates']}
      type="website"
    />
    <DigitalStoreContent />
  </LanguageProvider>
);

export default DigitalStore;
