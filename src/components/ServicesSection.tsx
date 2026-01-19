
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check } from "lucide-react";
import { 
  Badge, 
  MessageSquare, 
  FileText, 
  FileCode, 
  Info, 
  Link,
  Bot,
  MessageCircle
} from "lucide-react";

const ServicesSection: React.FC = () => {
  const { t, isRtl } = useLanguage();
  
  const services = [
    {
      id: 1,
      icon: <MessageSquare size={24} />,
      title: {
        en: "WhatsApp Business API Setup",
        ar: "إعداد واجهة برمجة تطبيقات واتساب بزنس"
      },
      description: {
        en: "Complete WhatsApp Business API deployment and configuration for enterprise-level customer communication.",
        ar: "نشر وتكوين واجهة برمجة تطبيقات WhatsApp Business الكاملة للتواصل مع العملاء على مستوى الشركات."
      },
      features: [
        {
          en: "API configuration & setup",
          ar: "تكوين وإعداد واجهة برمجة التطبيقات"
        },
        {
          en: "Multi-agent inbox",
          ar: "صندوق وارد متعدد الوكلاء"
        },
        {
          en: "Message templates approval",
          ar: "الموافقة على قوالب الرسائل"
        },
        {
          en: "Business account verification",
          ar: "التحقق من حساب الأعمال"
        }
      ],
      image: "/images/whatsapp-api.png",
      highlighted: true
    },
    {
      id: 2,
      icon: <Bot size={24} />,
      title: {
        en: "Chatbot Development & Integration",
        ar: "تطوير ودمج روبوتات المحادثة"
      },
      description: {
        en: "Custom chatbot solutions for WhatsApp, Facebook Messenger, and website integration with advanced AI capabilities.",
        ar: "حلول روبوت محادثة مخصصة لـ WhatsApp و Facebook Messenger ودمج موقع الويب مع قدرات الذكاء الاصطناعي المتقدمة."
      },
      features: [
        {
          en: "AI-powered responses",
          ar: "ردود مدعومة بالذكاء الاصطناعي"
        },
        {
          en: "Multi-platform integration",
          ar: "تكامل متعدد المنصات"
        },
        {
          en: "Custom workflows & logic",
          ar: "سير عمل ومنطق مخصص"
        },
        {
          en: "Analytics & reporting",
          ar: "التحليلات وإعداد التقارير"
        }
      ],
      image: "/images/chatbot-integration.png",
      highlighted: true
    },
    {
      id: 3,
      icon: <Badge size={24} />,
      title: {
        en: "Facebook Business Manager Verification",
        ar: "توثيق مدير أعمال فيسبوك"
      },
      description: {
        en: "Complete verification of your Facebook Business Manager account to unlock full advertising capabilities.",
        ar: "توثيق كامل لحساب مدير أعمالك على فيسبوك لإطلاق إمكانات الإعلانات الكاملة."
      },
      features: [
        {
          en: "Identity verification",
          ar: "التحقق من الهوية"
        },
        {
          en: "Business verification",
          ar: "التحقق من العمل التجاري"
        },
        {
          en: "Domain verification",
          ar: "التحقق من النطاق"
        },
        {
          en: "Ad account setup",
          ar: "إعداد حساب الإعلانات"
        }
      ],
      image: "/images/facebook-verification.png"
    },
    {
      id: 4,
      icon: <MessageCircle size={24} />,
      title: {
        en: "WhatsApp Automation Scripts",
        ar: "نصوص أتمتة واتساب"
      },
      description: {
        en: "Custom automation scripts for WhatsApp Business to streamline customer service and marketing workflows.",
        ar: "نصوص أتمتة مخصصة لـ WhatsApp Business لتبسيط خدمة العملاء وسير عمل التسويق."
      },
      features: [
        {
          en: "Auto-responders",
          ar: "الردود التلقائية"
        },
        {
          en: "Scheduled messaging",
          ar: "المراسلة المجدولة"
        },
        {
          en: "Customer segmentation",
          ar: "تقسيم العملاء"
        },
        {
          en: "Campaign automation",
          ar: "أتمتة الحملات"
        }
      ],
      image: "/images/whatsapp-automation.png",
      highlighted: true
    },
    {
      id: 5,
      icon: <Badge size={24} />,
      title: {
        en: "SendPulse $5000 Grant Application",
        ar: "طلب منحة SendPulse بقيمة 5000 دولار"
      },
      description: {
        en: "Complete application process for SendPulse grant program to receive marketing credits worth $5000.",
        ar: "إكمال عملية التقديم لبرنامج منح SendPulse للحصول على رصيد تسويقي بقيمة 5000 دولار."
      },
      features: [
        {
          en: "Application preparation",
          ar: "إعداد الطلب"
        },
        {
          en: "Documentation support",
          ar: "دعم التوثيق"
        },
        {
          en: "Account setup",
          ar: "إعداد الحساب"
        },
        {
          en: "Integration setup",
          ar: "إعداد التكامل"
        }
      ],
      image: "/images/sendpulse-grant.png"
    },
    {
      id: 6,
      icon: <Link size={24} />,
      title: {
        en: "Make.com Teams Plan ($636/year)",
        ar: "خطة Make.com للفرق (636 دولار/سنة)"
      },
      description: {
        en: "Get access to Make.com Teams plan for advanced workflow automation and integration capabilities.",
        ar: "الحصول على خطة Make.com للفرق لأتمتة سير العمل المتقدمة وإمكانات التكامل."
      },
      features: [
        {
          en: "Workflow automation",
          ar: "أتمتة سير العمل"
        },
        {
          en: "Multiple users access",
          ar: "وصول مستخدمين متعددين"
        },
        {
          en: "Advanced integrations",
          ar: "تكاملات متقدمة"
        },
        {
          en: "Technical setup support",
          ar: "دعم الإعداد الفني"
        }
      ],
      image: "/images/make-workflows.png"
    },
    {
      id: 7,
      icon: <FileCode size={24} />,
      title: {
        en: "WordPress Integration",
        ar: "تكامل ووردبريس"
      },
      description: {
        en: "Connect your WordPress site with various services and automate content management processes.",
        ar: "ربط موقع WordPress الخاص بك بخدمات مختلفة وأتمتة عمليات إدارة المحتوى."
      },
      features: [
        {
          en: "Plugin configuration",
          ar: "تكوين المكونات الإضافية"
        },
        {
          en: "API connections",
          ar: "اتصالات API"
        },
        {
          en: "Automated publishing",
          ar: "النشر الآلي"
        },
        {
          en: "Custom webhook setup",
          ar: "إعداد webhook مخصص"
        }
      ],
      image: "/images/wordpress-integration.png"
    },
    {
      id: 8,
      icon: <Info size={24} />,
      title: {
        en: "Ongoing Technical Support",
        ar: "الدعم الفني المستمر"
      },
      description: {
        en: "Continuous technical assistance for all implemented solutions with priority response times.",
        ar: "مساعدة فنية مستمرة لجميع الحلول المنفذة مع أوقات استجابة ذات أولوية."
      },
      features: [
        {
          en: "Priority support",
          ar: "دعم ذو أولوية"
        },
        {
          en: "Issue resolution",
          ar: "حل المشكلات"
        },
        {
          en: "System maintenance",
          ar: "صيانة النظام"
        },
        {
          en: "Regular updates",
          ar: "تحديثات منتظمة"
        }
      ],
      image: "/images/technical-support.png"
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-tech-blue/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-tech-purple/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-tech-blue/10 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-tech-blue animate-pulse" />
            <span className="text-tech-blue text-sm font-medium">
              {t("Professional Solutions", "حلول احترافية")}
            </span>
          </div>
          
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-tech-dark via-tech-blue to-tech-purple bg-clip-text text-transparent ${isRtl ? 'font-arabic' : 'font-english'}`}>
            {t("Our Services", "خدماتنا")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t(
              "Comprehensive technical solutions for your digital business needs",
              "حلول تقنية شاملة لاحتياجات أعمالك الرقمية"
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className={`group relative bg-white rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border ${
                service.highlighted 
                  ? 'border-tech-blue/30 shadow-lg shadow-tech-blue/10' 
                  : 'border-gray-100 hover:border-tech-blue/20'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              data-testid={`card-service-${service.id}`}
            >
              {service.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-tech-blue to-tech-purple text-white text-xs font-medium px-3 py-1 rounded-full">
                    {t("Popular", "شائع")}
                  </span>
                </div>
              )}
              
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 ${
                service.highlighted 
                  ? 'bg-gradient-to-br from-tech-blue to-tech-purple text-white' 
                  : 'bg-tech-light text-tech-blue group-hover:bg-gradient-to-br group-hover:from-tech-blue group-hover:to-tech-purple group-hover:text-white'
              }`}>
                {service.icon}
              </div>
              
              <h3 className="text-lg font-semibold mb-3 text-tech-dark group-hover:text-tech-blue transition-colors">
                {isRtl ? service.title.ar : service.title.en}
              </h3>
              <p className="text-gray-500 text-sm mb-5 leading-relaxed">
                {isRtl ? service.description.ar : service.description.en}
              </p>
              
              <ul className="space-y-2">
                {service.features.slice(0, 3).map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="text-green-600 w-3 h-3" />
                    </div>
                    <span className="text-gray-600">{isRtl ? feature.ar : feature.en}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
