
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge, DollarSign, Gift } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FundingSection: React.FC = () => {
  const { t, isRtl } = useLanguage();

  const fundingOptions = [
    {
      id: 1,
      icon: <Badge className="w-10 h-10 text-tech-purple" />,
      title: {
        en: "SendPulse $5000 Grant",
        ar: "منحة SendPulse بقيمة 5000 دولار"
      },
      description: {
        en: "Receive marketing credits worth $5000 for your email, SMS, and web push campaigns through our specialized application process.",
        ar: "احصل على رصيد تسويقي بقيمة 5000 دولار لحملات البريد الإلكتروني والرسائل القصيرة وإشعارات الويب من خلال عملية التطبيق المتخصصة لدينا."
      },
      value: "$5,000",
      link: "#pricing"
    },
    {
      id: 2,
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
      link: "#pricing"
    },
    {
      id: 3,
      icon: <Gift className="w-10 h-10 text-tech-accent" />,
      title: {
        en: "Startup Growth Package",
        ar: "حزمة نمو الشركات الناشئة"
      },
      description: {
        en: "Comprehensive package that includes various tools and services specially curated for early-stage startups looking to scale quickly.",
        ar: "حزمة شاملة تتضمن مختلف الأدوات والخدمات المنسقة خصيصًا للشركات الناشئة في مراحلها المبكرة التي تتطلع إلى التوسع بسرعة."
      },
      value: "$2,000+",
      link: "#contact"
    }
  ];

  return (
    <section id="funding" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${isRtl ? 'font-arabic' : 'font-english'}`}>
            {t("Startup Funding & Grants", "تمويل ومنح الشركات الناشئة")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t(
              "We help startups access valuable resources, credits, and tools to accelerate growth without burning through capital.",
              "نساعد الشركات الناشئة في الوصول إلى موارد وأرصدة وأدوات قيمة لتسريع النمو دون استنفاد رأس المال."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {fundingOptions.map((option) => (
            <Card key={option.id} className="bg-white transition-all duration-300 hover:shadow-lg border-2 hover:border-tech-purple">
              <CardHeader className="pb-2">
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
                  className="mt-4 inline-block text-tech-blue hover:text-tech-purple font-medium"
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
