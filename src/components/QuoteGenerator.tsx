
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Download } from "lucide-react";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Define services with their prices
const services = [
  {
    id: "whatsapp-api",
    name: { en: "WhatsApp Business API Setup", ar: "إعداد واجهة برمجة تطبيقات واتساب بزنس" },
    price: 350
  },
  {
    id: "chatbot",
    name: { en: "Chatbot Development & Integration", ar: "تطوير ودمج روبوتات المحادثة" },
    price: 499
  },
  {
    id: "fb-verification",
    name: { en: "Facebook Business Manager Verification", ar: "توثيق مدير أعمال فيسبوك" },
    price: 199
  },
  {
    id: "whatsapp-automation",
    name: { en: "WhatsApp Automation Scripts", ar: "نصوص أتمتة واتساب" },
    price: 299
  },
  {
    id: "sendpulse-grant",
    name: { en: "SendPulse $5000 Grant Application", ar: "طلب منحة SendPulse بقيمة 5000 دولار" },
    price: 149
  },
  {
    id: "make-plan",
    name: { en: "Make.com Teams Plan ($636/year)", ar: "خطة Make.com للفرق (636 دولار/سنة)" },
    price: 636
  },
  {
    id: "wordpress",
    name: { en: "WordPress Integration", ar: "تكامل ووردبريس" },
    price: 250
  },
  {
    id: "tech-support",
    name: { en: "Ongoing Technical Support", ar: "الدعم الفني المستمر" },
    price: 99
  },
];

// Create form schema
const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string().optional(),
  companyName: z.string().min(1, {
    message: "Company name is required.",
  }),
  additionalNotes: z.string().optional(),
  services: z.array(z.string()).refine((value) => value.length >= 1, {
    message: "You must select at least one service.",
  }),
});

const QuoteGenerator: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      companyName: "",
      additionalNotes: "",
      services: [],
    },
  });

  // Handle service selection
  const handleServiceChange = (serviceId: string, checked: boolean) => {
    const serviceObj = services.find(s => s.id === serviceId);
    if (!serviceObj) return;

    setSelectedServices(prev => {
      const newServices = checked 
        ? [...prev, serviceId] 
        : prev.filter(id => id !== serviceId);
      
      // Calculate new total price
      const newTotal = services
        .filter(service => newServices.includes(service.id))
        .reduce((sum, service) => sum + service.price, 0);
      
      setTotalPrice(newTotal);
      form.setValue("services", newServices);
      return newServices;
    });
  };

  // Generate PDF quote
  const generatePDF = (data: z.infer<typeof formSchema>) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const date = format(new Date(), "MMMM dd, yyyy");
    const quoteNumber = `QUO-${Math.floor(Math.random() * 10000)}`;
    
    // Add header logo/name
    doc.setFontSize(24);
    doc.setTextColor(0, 82, 165); // Blue color for the header
    doc.text("Tech Services", pageWidth / 2, 20, { align: "center" });
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Professional Technical Solutions", pageWidth / 2, 26, { align: "center" });
    doc.text("support@techservices.com | +1-800-TECH-SRV", pageWidth / 2, 31, { align: "center" });
    
    // Add watermark
    doc.setTextColor(220, 220, 220);
    doc.setFontSize(60);
    doc.text("QUOTE", pageWidth / 2, 110, {
      align: "center",
      angle: 45,
    });
    
    // Reset text color
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    
    // Client information
    doc.text(`Quote #: ${quoteNumber}`, 14, 45);
    doc.text(`Date: ${date}`, 14, 51);
    doc.text(`Valid until: ${format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), "MMMM dd, yyyy")}`, 14, 57);
    
    doc.text("Client Information:", 14, 67);
    doc.text(`Name: ${data.fullName}`, 14, 73);
    doc.text(`Email: ${data.email}`, 14, 79);
    if (data.phoneNumber) doc.text(`Phone: ${data.phoneNumber}`, 14, 85);
    doc.text(`Company: ${data.companyName}`, 14, 91);
    
    // Services table
    const tableData = services
      .filter(service => data.services.includes(service.id))
      .map(service => [
        isRtl ? service.name.ar : service.name.en, 
        `$${service.price.toFixed(2)}`
      ]);
    
    autoTable(doc, {
      startY: 100,
      head: [["Service", "Price"]],
      body: tableData,
      theme: "grid",
      headStyles: { 
        fillColor: [0, 82, 165],
        textColor: [255, 255, 255],
        fontStyle: "bold"
      },
      foot: [["Total", `$${totalPrice.toFixed(2)}`]],
      footStyles: { 
        fillColor: [240, 240, 240],
        textColor: [0, 0, 0],
        fontStyle: "bold"
      }
    });
    
    // Additional notes
    if (data.additionalNotes) {
      const finalY = (doc as any).lastAutoTable.finalY + 10;
      doc.text("Additional Notes:", 14, finalY);
      doc.setFontSize(10);
      const splitNotes = doc.splitTextToSize(data.additionalNotes, pageWidth - 28);
      doc.text(splitNotes, 14, finalY + 6);
    }
    
    // Save and download
    doc.save(`quote-${quoteNumber}.pdf`);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      generatePDF(values);
      toast.success("Quote generated successfully!");
      setOpen(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Error generating quote. Please try again.");
    }
  };

  return (
    <section id="quote-generator" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className={`section-title text-center ${isRtl ? 'font-arabic' : 'font-english'}`}>
          {t("Get Your Custom Quote", "احصل على عرض أسعار مخصص")}
        </h2>
        <p className="section-subtitle text-center mb-10">
          {t(
            "Select the services you need and get an instant quote",
            "اختر الخدمات التي تحتاجها واحصل على عرض أسعار فوري"
          )}
        </p>

        <div className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>{t("Service Selection", "اختيار الخدمة")}</CardTitle>
              <CardDescription>
                {t("Choose the services you're interested in to get a customized quote", 
                   "اختر الخدمات التي تهتم بها للحصول على عرض أسعار مخصص")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form id="quote-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <div key={service.id} className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Checkbox 
                          id={service.id} 
                          onCheckedChange={(checked) => handleServiceChange(service.id, checked === true)}
                        />
                        <label
                          htmlFor={service.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col"
                        >
                          <span>{isRtl ? service.name.ar : service.name.en}</span>
                          <span className="text-muted-foreground text-xs">${service.price}</span>
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="px-4 py-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{t("Total", "المجموع")}</span>
                      <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full"
                        disabled={selectedServices.length === 0}
                      >
                        {t("Generate Quote", "إنشاء عرض الأسعار")}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                      <DialogHeader>
                        <DialogTitle>{t("Complete Your Information", "أكمل معلوماتك")}</DialogTitle>
                        <DialogDescription>
                          {t("Fill in your details to receive a customized quote", 
                             "املأ بياناتك للحصول على عرض أسعار مخصص")}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("Full Name", "الاسم الكامل")}</FormLabel>
                              <FormControl>
                                <Input placeholder={t("John Doe", "محمد أحمد")} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("Email", "البريد الإلكتروني")}</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="example@company.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("Phone Number (Optional)", "رقم الهاتف (اختياري)")}</FormLabel>
                              <FormControl>
                                <Input placeholder="+1 234 567 8900" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("Company Name", "اسم الشركة")}</FormLabel>
                              <FormControl>
                                <Input placeholder={t("Acme Inc", "شركة أكمي")} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="additionalNotes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("Additional Notes (Optional)", "ملاحظات إضافية (اختياري)")}</FormLabel>
                              <FormControl>
                                <Textarea placeholder={t("Any specific requirements or questions...", "أي متطلبات أو أسئلة محددة...")} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button type="submit" form="quote-form" className="w-full">
                        <Download className="mr-2" />
                        {t("Download Quote PDF", "تنزيل عرض الأسعار PDF")}
                      </Button>
                    </DialogContent>
                  </Dialog>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <p className="text-sm text-muted-foreground">
                {t("All quotes are valid for 30 days. For custom service packages, please contact us directly.", 
                   "جميع عروض الأسعار صالحة لمدة 30 يومًا. للحصول على حزم خدمات مخصصة، يرجى الاتصال بنا مباشرة.")}
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default QuoteGenerator;
