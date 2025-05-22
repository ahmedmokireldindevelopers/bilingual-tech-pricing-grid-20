import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { toast } from "@/components/ui/use-toast";

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
    if (selectedServices.length === 0) {
      toast({
        title: t("Please select at least one service", "الرجاء اختيار خدمة واحدة على الأقل"),
        variant: "destructive"
      });
      return;
    }

    if (!customerInfo.name || !customerInfo.email) {
      toast({
        title: t("Please provide your name and email", "الرجاء تقديم اسمك وبريدك الإلكتروني"),
        variant: "destructive"
      });
      return;
    }

    const pdf = new jsPDF();
    
    // Add header with company info
    pdf.setFontSize(20);
    pdf.setTextColor(0, 51, 153);
    pdf.text("Tech Services", 105, 20, { align: "center" });
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text("Professional Technical Solutions", 105, 27, { align: "center" });
    pdf.text("contact@techservices.com | +1 (555) 123-4567", 105, 32, { align: "center" });
    
    // Add watermark
    pdf.setFontSize(60);
    pdf.setTextColor(230, 230, 230);
    pdf.text("QUOTE", 105, 140, { align: "center" });
    
    // Reset text color
    pdf.setTextColor(0, 0, 0);
    
    // Add customer info
    pdf.setFontSize(12);
    pdf.text("Customer Information:", 20, 45);
    pdf.setFontSize(10);
    pdf.text(`Name: ${customerInfo.name}`, 20, 52);
    pdf.text(`Email: ${customerInfo.email}`, 20, 57);
    pdf.text(`Phone: ${customerInfo.phone || "N/A"}`, 20, 62);
    pdf.text(`Company: ${customerInfo.company || "N/A"}`, 20, 67);
    
    // Add quote details
    pdf.setFontSize(12);
    pdf.text("Quote Details:", 20, 80);
    
    // Add services table
    const selectedServicesList = services.filter(service => selectedServices.includes(service.id));
    
    // @ts-ignore - jspdf-autotable types are not available
    pdf.autoTable({
      startY: 85,
      head: [[t("Service", "الخدمة"), t("Price", "السعر")]],
      body: selectedServicesList.map(service => [service.name, `$${service.price}`]),
      foot: [[t("Total", "المجموع"), `$${calculateTotal()}`]],
      theme: 'striped',
      headStyles: { fillColor: [0, 51, 153] },
      footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' }
    });
    
    // Add notes if any
    if (customerInfo.notes) {
      pdf.setFontSize(12);
      // @ts-ignore - Get the final Y position after the table
      const finalY = (pdf as any).lastAutoTable.finalY || 150;
      pdf.text("Notes:", 20, finalY + 10);
      pdf.setFontSize(10);
      pdf.text(customerInfo.notes, 20, finalY + 18);
    }
    
    // Add footer
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.text("This quote is valid for 30 days from the date of issue.", 105, 280, { align: "center" });
    
    // Save the PDF
    pdf.save(`Quote-${customerInfo.name}-${new Date().toISOString().slice(0, 10)}.pdf`);
    
    toast({
      title: t("Quote Generated", "تم إنشاء عرض السعر"),
      description: t("Your custom quote has been generated and is ready to download.", "تم إنشاء عرض السعر المخصص الخاص بك وهو جاهز للتنزيل."),
    });
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map(service => (
                <div key={service.id} className="flex items-start space-x-3 rtl:space-x-reverse">
                  <Checkbox 
                    id={service.id}
                    checked={selectedServices.includes(service.id)}
                    onCheckedChange={() => handleServiceToggle(service.id)}
                  />
                  <div className="flex flex-col">
                    <Label 
                      htmlFor={service.id}
                      className="font-medium cursor-pointer"
                    >
                      {service.name}
                    </Label>
                    <span className="text-sm text-muted-foreground">${service.price}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-right border-t pt-4">
              <p className="text-lg font-bold">
                {t("Total", "المجموع")}: <span className="text-tech-accent">${calculateTotal()}</span>
              </p>
            </div>

            {!showForm ? (
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={() => setShowForm(true)}
                  className="bg-tech-blue hover:bg-tech-purple"
                >
                  {t("Proceed to Generate Quote", "المتابعة لإنشاء عرض السعر")}
                </Button>
              </div>
            ) : (
              <div className="mt-8 border-t pt-4">
                <h3 className="text-lg font-semibold mb-4">
                  {t("Your Information", "معلوماتك")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("Name", "الاسم")} *</Label>
                    <Input 
                      id="name"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInfoChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("Email", "البريد الإلكتروني")} *</Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={handleInfoChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("Phone", "رقم الهاتف")}</Label>
                    <Input 
                      id="phone"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInfoChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">{t("Company", "الشركة")}</Label>
                    <Input 
                      id="company"
                      name="company"
                      value={customerInfo.company}
                      onChange={handleInfoChange}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="notes">{t("Additional Notes", "ملاحظات إضافية")}</Label>
                    <Textarea 
                      id="notes"
                      name="notes"
                      value={customerInfo.notes}
                      onChange={handleInfoChange}
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          {showForm && (
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                {t("Back", "رجوع")}
              </Button>
              <Button 
                onClick={generateQuote}
                className="bg-tech-blue hover:bg-tech-purple"
              >
                {t("Generate Quote PDF", "إنشاء عرض سعر PDF")}
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </section>
  );
};

export default QuoteGenerator;
