
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
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className={`section-title text-center ${isRtl ? 'font-arabic' : 'font-english'}`}>
          {t("Our Services", "خدماتنا")}
        </h2>
        <p className="section-subtitle text-center">
          {t(
            "Comprehensive technical solutions for your digital business needs",
            "حلول تقنية شاملة لاحتياجات أعمالك الرقمية"
          )}
        </p>
        
        <div className="text-center mb-10">
          <div className="inline-block bg-tech-blue/10 rounded-lg px-4 py-2 mb-6">
            <h3 className="text-lg font-medium text-tech-blue">
              {t("Specialized in WhatsApp Business API & Chatbot Solutions", "متخصصون في واجهة برمجة تطبيقات WhatsApp Business وحلول روبوتات الدردشة")}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((service) => (
            <div 
              key={service.id} 
              className={`service-card animate-fade-in overflow-hidden ${
                service.highlighted ? 'border-2 border-tech-blue shadow-lg' : ''
              }`}
            >
              {service.image && (
                <div className="h-40 overflow-hidden -mx-6 -mt-6 mb-4">
                  <img 
                    src={service.image} 
                    alt={isRtl ? service.title.ar : service.title.en}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              <div className="service-icon mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isRtl ? service.title.ar : service.title.en}
              </h3>
              <p className="text-gray-600 mb-4">
                {isRtl ? service.description.ar : service.description.en}
              </p>
              <ul className="feature-list">
                {service.features.map((feature, index) => (
                  <li key={index}>
                    <Check className="text-green-500" size={18} />
                    <span>{isRtl ? feature.ar : feature.en}</span>
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
