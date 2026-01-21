import { useState } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Percent, Gift, Sparkles, Tag, Zap } from "lucide-react";

interface Offer {
  id: number;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  discount: number;
  originalPrice: number;
  expiresIn: number;
  claimed: number;
  maxClaims: number;
  icon: any;
  type: "flash" | "bundle" | "seasonal" | "new";
}

const offers: Offer[] = [
  {
    id: 1,
    title: { en: "WhatsApp API + Chatbot Bundle", ar: "باقة واتساب API + روبوت الدردشة" },
    description: { en: "Get both services at an unbeatable price!", ar: "احصل على الخدمتين بسعر لا يُقاوم!" },
    discount: 30,
    originalPrice: 1298,
    expiresIn: 48,
    claimed: 67,
    maxClaims: 100,
    icon: Gift,
    type: "bundle"
  },
  {
    id: 2,
    title: { en: "Flash Sale: Automation Package", ar: "تخفيض سريع: باقة الأتمتة" },
    description: { en: "Limited time offer - 40% off!", ar: "عرض لفترة محدودة - خصم 40%!" },
    discount: 40,
    originalPrice: 599,
    expiresIn: 12,
    claimed: 85,
    maxClaims: 100,
    icon: Zap,
    type: "flash"
  },
  {
    id: 3,
    title: { en: "New Year Special", ar: "عرض السنة الجديدة" },
    description: { en: "Start the year with digital transformation", ar: "ابدأ العام بالتحول الرقمي" },
    discount: 25,
    originalPrice: 799,
    expiresIn: 168,
    claimed: 42,
    maxClaims: 200,
    icon: Sparkles,
    type: "seasonal"
  },
  {
    id: 4,
    title: { en: "First-Time Customer Discount", ar: "خصم العميل الجديد" },
    description: { en: "Special pricing for new customers", ar: "أسعار خاصة للعملاء الجدد" },
    discount: 20,
    originalPrice: 499,
    expiresIn: 720,
    claimed: 156,
    maxClaims: 500,
    icon: Tag,
    type: "new"
  }
];

const OffersContent = () => {
  const { t, isRtl } = useLanguage();

  const formatTime = (hours: number) => {
    if (hours < 24) {
      return t(`${hours}h left`, `${hours} ساعة متبقية`);
    }
    const days = Math.floor(hours / 24);
    return t(`${days} days left`, `${days} أيام متبقية`);
  };

  const getTypeStyle = (type: string) => {
    switch (type) {
      case "flash": return "bg-red-500";
      case "bundle": return "bg-tech-purple";
      case "seasonal": return "bg-green-500";
      case "new": return "bg-tech-blue";
      default: return "bg-gray-500";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "flash": return t("Flash Sale", "تخفيض سريع");
      case "bundle": return t("Bundle", "باقة");
      case "seasonal": return t("Seasonal", "موسمي");
      case "new": return t("New Customer", "عميل جديد");
      default: return "";
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-tech-accent/10 text-tech-accent px-4 py-2 rounded-full mb-4">
              <Percent className="w-5 h-5" />
              <span className="font-semibold">{t("Limited Time Offers", "عروض لفترة محدودة")}</span>
            </div>
            <h1 className="text-4xl font-bold text-tech-dark mb-4">
              {t("Special Offers & Deals", "العروض الخاصة والصفقات")}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("Don't miss out on these exclusive deals! Save big on our premium services.", 
                 "لا تفوت هذه الصفقات الحصرية! وفر الكثير على خدماتنا المتميزة.")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {offers.map((offer) => {
              const IconComponent = offer.icon;
              const discountedPrice = offer.originalPrice * (1 - offer.discount / 100);
              const claimPercentage = (offer.claimed / offer.maxClaims) * 100;
              
              return (
                <Card key={offer.id} className="overflow-hidden hover:shadow-xl transition-all" data-testid={`card-offer-${offer.id}`}>
                  <div className={`h-2 ${getTypeStyle(offer.type)}`} />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className={getTypeStyle(offer.type)}>
                        {getTypeLabel(offer.type)}
                      </Badge>
                      <div className="flex items-center gap-1 text-tech-accent font-bold text-2xl">
                        -{offer.discount}%
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-tech-blue to-tech-purple flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">
                        {t(offer.title.en, offer.title.ar)}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {t(offer.description.en, offer.description.ar)}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{formatTime(offer.expiresIn)}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">{t("Claimed", "تم المطالبة")}</span>
                        <span className="font-medium">{offer.claimed}/{offer.maxClaims}</span>
                      </div>
                      <Progress value={claimPercentage} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center bg-gray-50 border-t">
                    <div>
                      <span className="text-gray-400 line-through text-sm">${offer.originalPrice}</span>
                      <span className="text-2xl font-bold text-tech-blue ml-2">${Math.round(discountedPrice)}</span>
                    </div>
                    <Button className="bg-gradient-to-r from-tech-blue to-tech-purple hover:opacity-90" data-testid={`button-claim-${offer.id}`}>
                      {t("Claim Offer", "احصل على العرض")}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-tech-blue to-tech-purple rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">
              {t("Subscribe for Exclusive Offers", "اشترك للحصول على عروض حصرية")}
            </h2>
            <p className="mb-6 opacity-90">
              {t("Be the first to know about our special deals and discounts!", 
                 "كن أول من يعرف عن صفقاتنا وخصوماتنا الخاصة!")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder={t("Enter your email", "أدخل بريدك الإلكتروني")}
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
                data-testid="input-subscribe-email"
              />
              <Button variant="secondary" className="bg-white text-tech-blue hover:bg-gray-100" data-testid="button-subscribe">
                {t("Subscribe", "اشترك")}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const Offers = () => (
  <LanguageProvider>
    <OffersContent />
  </LanguageProvider>
);

export default Offers;
