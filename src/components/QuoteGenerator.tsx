
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ServiceSelection from "./quote/ServiceSelection";
import CustomerForm from "./quote/CustomerForm";
import TotalDisplay from "./quote/TotalDisplay";
import { generateQuotePdf } from "./quote/PdfGenerator";

interface Service {
  id: string;
  name: string;
  price: number;
}

const QuoteGenerator: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    notes: ""
  });
  const [showForm, setShowForm] = useState(false);

  const services: Service[] = [
    { id: "whatsapp-api", name: t("WhatsApp API Integration", "دمج واتساب API"), price: 499 },
    { id: "chatbot", name: t("Custom Chatbot Development", "تطوير روبوت محادثة مخصص"), price: 799 },
    { id: "whatsapp-automation", name: t("WhatsApp Automation Scripts", "سكربتات أتمتة واتساب"), price: 349 },
    { id: "website-integration", name: t("Website Integration", "دمج مع الموقع الإلكتروني"), price: 299 },
    { id: "crm-integration", name: t("CRM Integration", "دمج مع نظام إدارة علاقات العملاء"), price: 399 },
    { id: "training", name: t("Staff Training (2 sessions)", "تدريب الموظفين (جلستان)"), price: 199 },
    { id: "support", name: t("30-Day Priority Support", "دعم ذو أولوية لمدة 30 يومًا"), price: 149 },
    { id: "custom-reports", name: t("Custom Analytics Reports", "تقارير تحليلية مخصصة"), price: 249 },
  ];

  const handleServiceToggle = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter(id => id !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  const calculateTotal = () => {
    return services
      .filter(service => selectedServices.includes(service.id))
      .reduce((sum, service) => sum + service.price, 0);
  };

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  const generateQuote = () => {
    generateQuotePdf(
      selectedServices,
      customerInfo,
      services,
      calculateTotal(),
      t,
      isRtl
    );
  };

  return (
    <section id="quote-generator" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${isRtl ? 'font-arabic' : 'font-english'}`}>
            {t("Get Your Custom Quote", "احصل على عرض سعر مخصص")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t(
              "Select the services you're interested in to generate a custom quote tailored to your needs.",
              "حدد الخدمات التي تهتم بها لإنشاء عرض سعر مخصص يناسب احتياجاتك."
            )}
          </p>
        </div>

        <Card className="max-w-4xl mx-auto border-2 border-tech-light">
          <CardHeader>
            <CardTitle>
              {t("Select Services", "اختر الخدمات")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ServiceSelection 
              services={services}
              selectedServices={selectedServices}
              onServiceToggle={handleServiceToggle}
            />

            <TotalDisplay total={calculateTotal()} />

            {!showForm ? (
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={() => setShowForm(true)}
                  className="bg-tech-blue hover:bg-tech-purple"
                  disabled={selectedServices.length === 0}
                >
                  {t("Proceed to Generate Quote", "المتابعة لإنشاء عرض السعر")}
                </Button>
              </div>
            ) : (
              <div className="mt-8 border-t pt-4">
                <h3 className="text-lg font-semibold mb-4">
                  {t("Your Information", "معلوماتك")}
                </h3>
                <CustomerForm
                  customerInfo={customerInfo}
                  onInfoChange={handleInfoChange}
                  onBack={() => setShowForm(false)}
                  onSubmit={generateQuote}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default QuoteGenerator;
