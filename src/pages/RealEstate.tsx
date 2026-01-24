import { useState } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Building2,
  Home,
  MessageSquare,
  Bot,
  Calendar,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Target,
  BarChart3,
  Send,
  Clock,
  Zap,
  Globe,
} from "lucide-react";

interface AutomationTemplate {
  id: number;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  features: { en: string[]; ar: string[] };
  icon: any;
  category: string;
  popular?: boolean;
}

const templates: AutomationTemplate[] = [
  {
    id: 1,
    title: { en: "Lead Capture Bot", ar: "بوت التقاط العملاء المحتملين" },
    description: {
      en: "Automatically capture and qualify leads from WhatsApp inquiries",
      ar: "التقاط وتأهيل العملاء المحتملين تلقائياً من استفسارات واتساب"
    },
    features: {
      en: ["24/7 Lead Response", "Auto-qualification", "CRM Integration", "Lead Scoring"],
      ar: ["استجابة 24/7", "تأهيل تلقائي", "ربط CRM", "تقييم العملاء"]
    },
    icon: Bot,
    category: "leads",
    popular: true
  },
  {
    id: 2,
    title: { en: "Property Listing Broadcaster", ar: "ناشر قوائم العقارات" },
    description: {
      en: "Broadcast new listings to interested buyers automatically",
      ar: "بث القوائم الجديدة للمشترين المهتمين تلقائياً"
    },
    features: {
      en: ["Mass Broadcasting", "Targeted Segments", "Rich Media", "Analytics"],
      ar: ["بث جماعي", "شرائح مستهدفة", "وسائط متعددة", "تحليلات"]
    },
    icon: Send,
    category: "marketing"
  },
  {
    id: 3,
    title: { en: "Viewing Scheduler", ar: "جدولة المعاينات" },
    description: {
      en: "Let clients book property viewings through WhatsApp",
      ar: "دع العملاء يحجزون معاينات العقارات عبر واتساب"
    },
    features: {
      en: ["Calendar Sync", "Auto Reminders", "Conflict Detection", "Agent Assignment"],
      ar: ["مزامنة التقويم", "تذكيرات تلقائية", "كشف التعارضات", "تعيين الوكيل"]
    },
    icon: Calendar,
    category: "scheduling"
  },
  {
    id: 4,
    title: { en: "Follow-up Sequences", ar: "تسلسلات المتابعة" },
    description: {
      en: "Automated follow-up messages to nurture leads",
      ar: "رسائل متابعة تلقائية لرعاية العملاء المحتملين"
    },
    features: {
      en: ["Drip Campaigns", "Personalization", "A/B Testing", "Conversion Tracking"],
      ar: ["حملات تدريجية", "تخصيص", "اختبار A/B", "تتبع التحويل"]
    },
    icon: Clock,
    category: "nurturing"
  },
  {
    id: 5,
    title: { en: "Price Alert System", ar: "نظام تنبيه الأسعار" },
    description: {
      en: "Notify clients when prices change on properties they're interested in",
      ar: "إخطار العملاء عند تغير أسعار العقارات التي يهتمون بها"
    },
    features: {
      en: ["Price Monitoring", "Instant Alerts", "Custom Criteria", "Market Updates"],
      ar: ["مراقبة الأسعار", "تنبيهات فورية", "معايير مخصصة", "تحديثات السوق"]
    },
    icon: TrendingUp,
    category: "alerts"
  },
  {
    id: 6,
    title: { en: "Virtual Tour Assistant", ar: "مساعد الجولات الافتراضية" },
    description: {
      en: "Guide clients through virtual property tours via WhatsApp",
      ar: "إرشاد العملاء خلال جولات العقارات الافتراضية عبر واتساب"
    },
    features: {
      en: ["360° Tours", "Interactive Q&A", "Document Sharing", "Live Support"],
      ar: ["جولات 360°", "أسئلة تفاعلية", "مشاركة المستندات", "دعم مباشر"]
    },
    icon: Globe,
    category: "tours"
  }
];

const stats = [
  { value: "500+", label: { en: "Properties Listed", ar: "عقار مدرج" } },
  { value: "95%", label: { en: "Response Rate", ar: "معدل الاستجابة" } },
  { value: "2x", label: { en: "Faster Closings", ar: "إغلاق أسرع" } },
  { value: "24/7", label: { en: "Availability", ar: "متاح" } },
];

const RealEstateContent = () => {
  const { t, isRtl } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: t("All Templates", "جميع القوالب") },
    { id: "leads", label: t("Lead Capture", "التقاط العملاء") },
    { id: "marketing", label: t("Marketing", "التسويق") },
    { id: "scheduling", label: t("Scheduling", "الجدولة") },
    { id: "nurturing", label: t("Nurturing", "الرعاية") },
  ];

  const filteredTemplates = selectedCategory === "all" 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className={`min-h-screen bg-gradient-to-b from-gray-50 to-white ${isRtl ? 'rtl' : 'ltr'}`}>
      <Header />
      
      <section className="pt-24 pb-12 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/10 text-white border-white/20 px-3 py-1 text-sm">
              <Building2 className="w-3 h-3 mr-1.5 inline" />
              {t("Real Estate Marketing", "التسويق العقاري")}
            </Badge>
            
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
              {t("Automate Your Real Estate Business", "أتمت أعمالك العقارية")}
            </h1>
            
            <p className="text-base md:text-lg text-blue-100 mb-6 max-w-xl mx-auto">
              {t(
                "Powerful WhatsApp automation templates designed specifically for real estate professionals in Egypt and beyond",
                "قوالب أتمتة واتساب قوية مصممة خصيصاً لمحترفي العقارات في مصر وخارجها"
              )}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/real-estate/submit">
                <Button className="bg-white text-blue-900 hover:bg-blue-50 px-6" data-testid="button-list-property">
                  <Home className="w-4 h-4 mr-2" />
                  {t("List Your Property", "أدرج عقارك")}
                </Button>
              </Link>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-6" data-testid="button-contact-sales">
                <MessageSquare className="w-4 h-4 mr-2" />
                {t("Contact Sales", "تواصل معنا")}
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-0.5">{stat.value}</div>
                <div className="text-blue-200 text-xs">{isRtl ? stat.label.ar : stat.label.en}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge className="mb-3 text-sm">
              <Sparkles className="w-3 h-3 mr-1.5" />
              {t("Automation Templates", "قوالب الأتمتة")}
            </Badge>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              {t("Ready-to-Use WhatsApp Automation", "أتمتة واتساب جاهزة للاستخدام")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t(
                "Choose from our collection of pre-built automation templates designed for real estate marketing",
                "اختر من مجموعتنا من قوالب الأتمتة المعدة مسبقاً والمصممة للتسويق العقاري"
              )}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat.id)}
                data-testid={`button-category-${cat.id}`}
              >
                {cat.label}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="group hover:shadow-lg transition-all duration-300 border-gray-200">
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                      <template.icon className="w-5 h-5" />
                    </div>
                    {template.popular && (
                      <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs">
                        {t("Popular", "شائع")}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="mt-3 text-base">
                    {isRtl ? template.title.ar : template.title.en}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {isRtl ? template.description.ar : template.description.en}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-1.5 mb-3">
                    {(isRtl ? template.features.ar : template.features.en).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button size="sm" className="w-full group-hover:bg-blue-600 transition-colors" data-testid={`button-template-${template.id}`}>
                    {t("Use Template", "استخدم القالب")}
                    <ArrowRight className="w-3 h-3 ml-1.5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge className="mb-3 text-sm">
              <Target className="w-3 h-3 mr-1.5" />
              {t("For Property Owners", "لأصحاب العقارات")}
            </Badge>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              {t("Sell, Rent, or Exchange Your Property", "بع أو أجر أو استبدل عقارك")}
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto text-sm mb-6">
              {t(
                "List your property and reach thousands of potential buyers in Egypt and abroad",
                "أدرج عقارك وتواصل مع آلاف المشترين المحتملين في مصر والخارج"
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Card className="text-center p-5 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-base font-bold mb-2">{t("Sell", "بيع")}</h3>
              <p className="text-gray-600 text-sm mb-3">
                {t(
                  "Get the best price for your property with our marketing reach",
                  "احصل على أفضل سعر لعقارك مع وصولنا التسويقي"
                )}
              </p>
            </Card>

            <Card className="text-center p-5 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-base font-bold mb-2">{t("Rent", "تأجير")}</h3>
              <p className="text-gray-600 text-sm mb-3">
                {t(
                  "Find reliable tenants quickly with verified leads",
                  "اعثر على مستأجرين موثوقين بسرعة مع عملاء موثقين"
                )}
              </p>
            </Card>

            <Card className="text-center p-5 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-base font-bold mb-2">{t("Exchange", "استبدال")}</h3>
              <p className="text-gray-600 text-sm mb-3">
                {t(
                  "Swap your property with other owners seamlessly",
                  "استبدل عقارك مع ملاك آخرين بسلاسة"
                )}
              </p>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link to="/real-estate/submit">
              <Button className="px-8" data-testid="button-submit-property">
                <Home className="w-4 h-4 mr-2" />
                {t("Submit Your Property", "أرسل عقارك")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <Badge className="mb-3 text-sm">
                <BarChart3 className="w-3 h-3 mr-1.5" />
                {t("Why Choose Us", "لماذا تختارنا")}
              </Badge>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                {t("Marketing That Delivers Results", "تسويق يحقق النتائج")}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  icon: Globe,
                  title: t("Egypt & International", "مصر والخارج"),
                  desc: t("Reach buyers locally and internationally", "تواصل مع المشترين محلياً ودولياً")
                },
                {
                  icon: Bot,
                  title: t("24/7 Automation", "أتمتة 24/7"),
                  desc: t("Never miss a lead with automated responses", "لا تفوت أي عميل مع الردود التلقائية")
                },
                {
                  icon: MessageSquare,
                  title: t("WhatsApp Integration", "تكامل واتساب"),
                  desc: t("Direct communication via WhatsApp Business", "تواصل مباشر عبر واتساب للأعمال")
                },
                {
                  icon: BarChart3,
                  title: t("Analytics & Reports", "تحليلات وتقارير"),
                  desc: t("Track performance with detailed analytics", "تتبع الأداء مع تحليلات مفصلة")
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const RealEstate = () => {
  return (
    <LanguageProvider>
      <RealEstateContent />
    </LanguageProvider>
  );
};

export default RealEstate;
