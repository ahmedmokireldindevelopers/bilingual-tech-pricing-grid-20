
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, X, ArrowRight, MessageSquare, Link, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import MessageCalculator from "./MessageCalculator";

const PricingSection: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const [showAnnual, setShowAnnual] = useState(true);
  
  const pricingPlans = [
    {
      id: 1,
      name: {
        en: "Complete Package",
        ar: "الباقة الكاملة"
      },
      description: {
        en: "All inclusive solution with all services",
        ar: "حل شامل مع جميع الخدمات"
      },
      price: {
        usd: showAnnual ? 850 : 1100,
        local: showAnnual ? "~32,000 EGP" : "~41,500 EGP"
      },
      features: [
        {
          en: "Facebook Business Manager Verification",
          ar: "توثيق مدير أعمال فيسبوك",
          included: true
        },
        {
          en: "WhatsApp Business API Setup",
          ar: "إعداد واجهة برمجة تطبيقات واتساب بزنس",
          included: true
        },
        {
          en: "SendPulse $5000 Grant",
          ar: "منحة SendPulse بقيمة 5000 دولار",
          included: true
        },
        {
          en: "Make.com Teams Plan",
          ar: "خطة Make.com للفرق",
          included: true
        },
        {
          en: "WordPress Integration",
          ar: "تكامل ووردبريس",
          included: true
        },
        {
          en: "3 Months Technical Support",
          ar: "دعم فني لمدة 3 أشهر",
          included: true
        }
      ],
      highlight: true
    },
    {
      id: 2,
      name: {
        en: "Fixed Package",
        ar: "الباقة الثابتة"
      },
      description: {
        en: "Standardized solution for most businesses",
        ar: "حل موحد لمعظم الأعمال"
      },
      price: {
        usd: 1000,
        local: "~37,800 EGP"
      },
      features: [
        {
          en: "Facebook Business Manager Verification",
          ar: "توثيق مدير أعمال فيسبوك",
          included: true
        },
        {
          en: "WhatsApp Business API Setup",
          ar: "إعداد واجهة برمجة تطبيقات واتساب بزنس",
          included: true
        },
        {
          en: "SendPulse $5000 Grant",
          ar: "منحة SendPulse بقيمة 5000 دولار",
          included: true
        },
        {
          en: "Make.com Teams Plan",
          ar: "خطة Make.com للفرق",
          included: true
        },
        {
          en: "WordPress Integration",
          ar: "تكامل ووردبريس",
          included: false
        },
        {
          en: "1 Month Technical Support",
          ar: "دعم فني لمدة شهر واحد",
          included: true
        }
      ],
      highlight: false
    },
    {
      id: 3,
      name: {
        en: "Optional Workflows",
        ar: "سير العمل الاختياري"
      },
      description: {
        en: "Add custom workflow automations",
        ar: "أضف أتمتة سير عمل مخصصة"
      },
      price: {
        usd: "From $50",
        local: "From ~1,890 EGP"
      },
      features: [
        {
          en: "Custom Integrations",
          ar: "تكاملات مخصصة",
          included: true
        },
        {
          en: "Workflow Automation",
          ar: "أتمتة سير العمل",
          included: true
        },
        {
          en: "API Connections",
          ar: "اتصالات API",
          included: true
        },
        {
          en: "Scheduled Tasks",
          ar: "المهام المجدولة",
          included: true
        },
        {
          en: "Data Transformation",
          ar: "تحويل البيانات",
          included: true
        },
        {
          en: "Ongoing Maintenance",
          ar: "صيانة مستمرة",
          included: false
        }
      ],
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className={`section-title text-center ${isRtl ? 'font-arabic' : 'font-english'}`}>
          {t("Pricing Plans", "خطط الأسعار")}
        </h2>
        <p className="section-subtitle text-center">
          {t(
            "Transparent pricing options to meet your business needs",
            "خيارات أسعار شفافة لتلبية احتياجات عملك"
          )}
        </p>

        <div className="flex justify-center mb-10">
          <div className="bg-gray-100 p-1 rounded-full inline-flex">
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                showAnnual ? 'bg-tech-blue text-white' : 'text-gray-700'
              }`}
              onClick={() => setShowAnnual(true)}
            >
              {t("Annual", "سنوي")}
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                !showAnnual ? 'bg-tech-blue text-white' : 'text-gray-700'
              }`}
              onClick={() => setShowAnnual(false)}
            >
              {t("One-time", "دفعة واحدة")}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.id} 
              className={`price-card animate-scale-in ${
                plan.highlight ? 'border-tech-blue' : ''
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-0 bg-tech-blue text-white py-1 px-4 text-sm">
                  {t("Popular", "الأكثر شيوعاً")}
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">
                {isRtl ? plan.name.ar : plan.name.en}
              </h3>
              <p className="text-gray-600 mb-4">
                {isRtl ? plan.description.ar : plan.description.en}
              </p>
              <div className="mb-6">
                <div className="text-3xl font-bold text-tech-blue">
                  ${typeof plan.price.usd === "number" ? plan.price.usd.toLocaleString() : plan.price.usd}
                </div>
                <div className="text-gray-500">
                  {plan.price.local}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    {feature.included ? (
                      <Check className="text-green-500 mt-1 flex-shrink-0" size={18} />
                    ) : (
                      <X className="text-gray-400 mt-1 flex-shrink-0" size={18} />
                    )}
                    <span className={feature.included ? "" : "text-gray-400"}>
                      {isRtl ? feature.ar : feature.en}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-2">
                <a 
                  href="https://wa.me/201006334062" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cta-button flex items-center justify-center gap-2"
                >
                  <MessageSquare size={18} />
                  <span>{t("Contact on WhatsApp", "تواصل على واتساب")}</span>
                </a>
                <a 
                  href="mailto:ahmedmokireldin@gmail.com" 
                  className="secondary-button text-center"
                >
                  {t("Email Inquiry", "استفسار عبر البريد")}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className={`text-2xl font-bold mb-6 text-center ${isRtl ? 'font-arabic' : 'font-english'}`}>
            {t("Calculate WhatsApp Message Costs", "حساب تكاليف رسائل واتساب")}
          </h3>
          <div className="max-w-2xl mx-auto">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
              <div className="flex items-start gap-2">
                <Info size={18} className="text-blue-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-800 mb-1">
                    {t("Updated Pricing Information", "معلومات التسعير المحدثة")}
                  </h4>
                  <p className="text-xs text-blue-700">
                    {t(
                      "Our calculator now includes pricing from more providers including Mini Chat, which often offers the most competitive rates in the market. All pricing data is updated as of May 2025.",
                      "تتضمن الآلة الحاسبة لدينا الآن أسعارًا من المزيد من مقدمي الخدمات بما في ذلك Mini Chat، والتي غالبًا ما تقدم أكثر الأسعار تنافسية في السوق. تم تحديث جميع بيانات التسعير اعتبارًا من مايو 2025."
                    )}
                  </p>
                </div>
              </div>
            </div>
            
            <MessageCalculator />
            
            <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Link size={18} className="text-tech-blue" />
                {t("Understanding WhatsApp Message Types", "فهم أنواع رسائل واتساب")}
              </h4>
              
              <p className="mb-4">
                {t(
                  "Different message types have different pricing and features. Learn more about the differences between User-Initiated, Business-Initiated, and Service messages.",
                  "تختلف أنواع الرسائل من حيث الأسعار والميزات. تعرف على المزيد حول الاختلافات بين الرسائل التي يبدأها المستخدم والرسائل التي تبدأها الشركة ورسائل الخدمة."
                )}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-4 rounded border border-gray-200">
                  <img 
                    src="https://scontent.fcai19-6.fna.fbcdn.net/v/t39.2365-6/387103807_709767617086680_8758572233270544545_n.png?_nc_cat=104&ccb=1-7&_nc_sid=14755e&_nc_ohc=HD2PEzKUkDcAX8h6XoA&_nc_ht=scontent.fcai19-6.fna&oh=00_AfCV5YCxGAv2_2SA7rXYH-E329JXRdX-6Jg3UvxI4zY3Qw&oe=66023858" 
                    alt="WhatsApp Message Types" 
                    className="w-full h-auto rounded" 
                  />
                </div>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <img 
                    src="https://scontent.fcai19-6.fna.fbcdn.net/v/t39.2365-6/387084293_304701432261242_4716256922159419997_n.png?_nc_cat=110&ccb=1-7&_nc_sid=14755e&_nc_ohc=vRyXPP2MF-AAX8g-UXv&_nc_ht=scontent.fcai19-6.fna&oh=00_AfC6DIXDVYKzx5eutZApc2DK2Tmes9wQzCiIVvW-NOecow&oe=66035493" 
                    alt="WhatsApp Conversation Types" 
                    className="w-full h-auto rounded" 
                  />
                </div>
              </div>
              
              <div className="flex justify-center mt-4">
                <a 
                  href="https://www.facebook.com/business/help/213629561949441" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-tech-blue hover:underline flex items-center gap-2"
                >
                  <span>{t("Learn more about WhatsApp Business API pricing", "تعرف على المزيد حول أسعار واجهة برمجة تطبيقات WhatsApp Business")}</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
