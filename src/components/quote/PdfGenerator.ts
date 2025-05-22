
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { toast } from "@/components/ui/use-toast";

interface Service {
  id: string;
  name: string;
  price: number;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
}

export const generateQuotePdf = (
  selectedServices: string[],
  customerInfo: CustomerInfo,
  services: Service[],
  totalAmount: number,
  t: (english: string, arabic: string) => string,
  isRtl: boolean
): void => {
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
    foot: [[t("Total", "المجموع"), `$${totalAmount}`]],
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
