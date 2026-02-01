
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, FileText, ArrowRight, MessageSquare, FileCode, X } from "lucide-react";

const DetailedPlans: React.FC = () => {
  const { t, isRtl } = useLanguage();
  
  const additionalPlans = [
    {
      id: 1,
      icon: <FileCode size={24} />,
      name: {
        en: "N8N Automation Solution",
        ar: "حلول الأتمتة N8N"
      },
      description: {
        en: "Self-hosted workflow automation platform with advanced features and integrations",
        ar: "منصة أتمتة سير العمل المستضافة ذاتيًا مع ميزات وتكاملات متقدمة"
      },
      price: {
        usd: 799,
        local: "~30,200 EGP"
      },
      features: [
        {
          en: "Full installation and setup",
          ar: "التثبيت والإعداد الكامل",
          included: true
        },
        {
          en: "Server configuration",
          ar: "تكوين الخادم",
          included: true
        },
        {
          en: "Custom workflows creation",
          ar: "إنشاء سير عمل مخصص",
          included: true
        },
        {
          en: "Database integration",
          ar: "تكامل قاعدة البيانات",
          included: true
        },
        {
          en: "API connections setup",
          ar: "إعداد اتصالات API",
          included: true
        },
        {
          en: "1 month maintenance & support",
          ar: "صيانة ودعم لمدة شهر واحد",
          included: true
        }
      ]
    },
    {
      id: 2,
      icon: <FileText size={24} />,
      name: {
        en: "Advanced Documentation Package",
        ar: "حزمة التوثيق المتقدمة"
      },
      description: {
        en: "Comprehensive technical documentation for your entire workflow setup",
        ar: "توثيق تقني شامل لإعداد سير العمل بأكمله"
      },
      price: {
        usd: 350,
        local: "~13,230 EGP"
      },
      features: [
        {
          en: "Process flowcharts",
          ar: "مخططات سير العمليات",
          included: true
        },
        {
          en: "Technical manuals",
          ar: "الأدلة التقنية",
          included: true
        },
        {
          en: "Integration guides",
          ar: "أدلة التكامل",
          included: true
        },
        {
          en: "Screenshot tutorials",
          ar: "البرامج التعليمية بالصور",
          included: true
        },
        {
          en: "Video walkthroughs",
          ar: "شروحات الفيديو",
          included: true
        },
        {
          en: "Editable source files",
          ar: "ملفات المصدر القابلة للتحرير",
          included: false
        }
      ]
    }
  ];
  
  const comparisonTable = [
    {
      feature: {
        en: "Automation Platform",
        ar: "منصة الأتمتة"
      },
      make: {
        en: "Cloud-based, subscription model",
        ar: "قائم على السحابة، نموذج اشتراك"
      },
      n8n: {
        en: "Self-hosted, one-time setup fee",
        ar: "مستضاف ذاتيًا، رسوم إعداد لمرة واحدة"
      }
    },
    {
      feature: {
        en: "Pricing Model",
        ar: "نموذج التسعير"
      },
      make: {
        en: "$636/year ongoing",
        ar: "636 دولار/سنة مستمرة"
      },
      n8n: {
        en: "$799 one-time setup + hosting costs",
        ar: "799 دولار لإعداد مرة واحدة + تكاليف الاستضافة"
      }
    },
    {
      feature: {
        en: "Data Privacy",
        ar: "خصوصية البيانات"
      },
      make: {
        en: "Data stored on Make's servers",
        ar: "البيانات مخزنة على خوادم Make"
      },
      n8n: {
        en: "Data remains on your own servers",
        ar: "البيانات تبقى على خوادمك الخاصة"
      }
    },
    {
      feature: {
        en: "Customization",
        ar: "التخصيص"
      },
      make: {
        en: "Limited by platform constraints",
        ar: "محدود بقيود المنصة"
      },
      n8n: {
        en: "Fully customizable with code nodes",
        ar: "قابل للتخصيص بالكامل مع عقد الكود"
      }
    },
    {
      feature: {
        en: "Technical Control",
        ar: "التحكم التقني"
      },
      make: {
        en: "Managed by Make.com",
        ar: "تدار بواسطة Make.com"
      },
      n8n: {
        en: "Complete control over deployment",
        ar: "تحكم كامل في النشر"
      }
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className={`section-title text-center ${isRtl ? 'font-arabic' : 'font-english'}`}>
          {t("Advanced Solutions", "الحلول المتقدمة")}
        </h2>
        <p className="section-subtitle text-center">
          {t(
            "Specialized options for businesses with advanced automation needs",
            "خيارات متخصصة للشركات ذات احتياجات الأتمتة المتقدمة"
          )}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {additionalPlans.map((plan) => (
            <Card key={plan.id} className="border-2 hover:border-tech-blue transition-all duration-300">
              <CardHeader>
                <div className="service-icon mb-4">
                  {plan.icon}
                </div>
                <CardTitle>{isRtl ? plan.name.ar : plan.name.en}</CardTitle>
                <CardDescription>{isRtl ? plan.description.ar : plan.description.en}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="text-3xl font-bold text-tech-blue">
                    ${plan.price.usd}
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
                    href={`https://wa.me/201006334062?text=${encodeURIComponent(`Hello, I would like to know more about the ${plan.name.en}`)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="cta-button flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={18} />
                    <span>{t("Get Details on WhatsApp", "احصل على التفاصيل عبر واتساب")}</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <h3 className={`text-2xl font-bold mb-6 text-center ${isRtl ? 'font-arabic' : 'font-english'}`}>
            {t("Make.com vs N8N Comparison", "مقارنة بين Make.com و N8N")}
          </h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 border-b text-left">{t("Feature", "الميزة")}</th>
                  <th className="py-3 px-4 border-b text-left">Make.com</th>
                  <th className="py-3 px-4 border-b text-left">N8N</th>
                </tr>
              </thead>
              <tbody>
                {comparisonTable.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b font-medium">
                      {isRtl ? row.feature.ar : row.feature.en}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {isRtl ? row.make.ar : row.make.en}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {isRtl ? row.n8n.ar : row.n8n.en}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 max-w-3xl mx-auto">
              {t(
                "Not sure which solution is right for you? Contact our experts for a personalized recommendation based on your specific business needs and technical requirements.",
                "غير متأكد من الحل المناسب لك؟ اتصل بخبرائنا للحصول على توصية مخصصة بناءً على احتياجات عملك المحددة والمتطلبات التقنية."
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailedPlans;
