
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge as LucideBadge, DollarSign, Gift, CreditCard } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FundingSection: React.FC = () => {
  const { t, isRtl } = useLanguage();

  const fundingOptions = [
    {
      id: 1,
      icon: <CreditCard className="w-10 h-10 text-tech-accent" />,
      title: {
        en: "Stripe Payments Funding",
        ar: "تمويل مدفوعات Stripe"
      },
      description: {
        en: "Exclusive $25,000 in special funding for Stripe payment integration and processing fees for qualified startups and businesses.",
        ar: "تمويل حصري بقيمة 25000 دولار لتكامل مدفوعات Stripe ورسوم المعالجة للشركات الناشئة والأعمال المؤهلة."
      },
      value: "$25,000",
      link: "#pricing",
      featured: true
    },
    {
      id: 2,
      icon: <LucideBadge className="w-10 h-10 text-tech-purple" />,
      title: {
        en: "SendPulse $5000 Grant",
        ar: "منحة SendPulse بقيمة 5000 دولار"
      },
      description: {
        en: "Receive marketing credits worth $5000 for your email, SMS, and web push campaigns through our specialized application process.",
        ar: "احصل على رصيد تسويقي بقيمة 5000 دولار لحملات البريد الإلكتروني والرسائل القصيرة وإشعارات الويب من خلال عملية التطبيق المتخصصة لدينا."
      },
      value: "$5,000",
      link: "#pricing",
      featured: false
    },
    {
      id: 3,
      icon: <DollarSign className="w-10 h-10 text-tech-blue" />,
      title: {
        en: "Make.com Teams Plan",
        ar: "خطة Make.com للفرق"
      },
      description: {
        en: "We help you qualify for Make.com Teams subscription valued at $636/year for advanced workflow automation and integration capabilities.",
        ar: "نساعدك في التأهل لاشتراك Make.com Teams بقيمة 636 دولارًا سنويًا للحصول على إمكانات متقدمة لأتمتة سير العمل والتكامل."
      },
      value: "$636/year",
      link: "#pricing",
      featured: false
    }
  ];

  return (
    <section id="funding" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${isRtl ? 'font-arabic' : 'font-english'}`}>
            {t("Exclusive Funding & Grants", "تمويل ومنح حصرية")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t(
              "We help startups and businesses access valuable resources, credits, and tools worth over $30,000 to accelerate growth without burning through capital.",
              "نساعد الشركات الناشئة والأعمال في الوصول إلى موارد وأرصدة وأدوات قيمة تزيد قيمتها عن 30,000 دولار لتسريع النمو دون استنفاد رأس المال."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {fundingOptions.map((option) => (
            <Card 
              key={option.id} 
              className={`bg-white transition-all duration-300 hover:shadow-lg ${
                option.featured 
                  ? 'border-4 border-tech-accent relative transform hover:-translate-y-2' 
                  : 'border-2 hover:border-tech-purple'
              }`}
            >
              {option.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-tech-accent hover:bg-tech-accent text-white px-3 py-1 text-sm font-medium">
                    {t("EXCLUSIVE OFFER", "عرض حصري")}
                  </Badge>
                </div>
              )}
              <CardHeader className={`pb-2 ${option.featured ? 'pt-8' : ''}`}>
                <div className="mb-4">{option.icon}</div>
                <CardTitle>{isRtl ? option.title.ar : option.title.en}</CardTitle>
                <CardDescription className="text-2xl font-bold text-tech-accent">
                  {option.value}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {isRtl ? option.description.ar : option.description.en}
                </p>
                <a 
                  href={option.link} 
                  className={`mt-4 inline-block font-medium ${
                    option.featured 
                      ? 'text-tech-accent hover:text-tech-purple' 
                      : 'text-tech-blue hover:text-tech-purple'
                  }`}
                >
                  {t("Learn more →", "معرفة المزيد ←")}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FundingSection;
