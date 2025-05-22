
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface CustomerFormProps {
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    company: string;
    notes: string;
  };
  onInfoChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBack: () => void;
  onSubmit: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ 
  customerInfo, 
  onInfoChange, 
  onBack, 
  onSubmit 
}) => {
  const { t } = useLanguage();
  
  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t("Name", "الاسم")} *</Label>
            <Input 
              id="name"
              name="name"
              value={customerInfo.name}
              onChange={onInfoChange}
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
              onChange={onInfoChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{t("Phone", "رقم الهاتف")}</Label>
            <Input 
              id="phone"
              name="phone"
              value={customerInfo.phone}
              onChange={onInfoChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">{t("Company", "الشركة")}</Label>
            <Input 
              id="company"
              name="company"
              value={customerInfo.company}
              onChange={onInfoChange}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">{t("Additional Notes", "ملاحظات إضافية")}</Label>
          <Textarea 
            id="notes"
            name="notes"
            value={customerInfo.notes}
            onChange={onInfoChange}
            rows={3}
          />
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={onBack}
        >
          {t("Back", "رجوع")}
        </Button>
        <Button 
          onClick={onSubmit}
          className="bg-tech-blue hover:bg-tech-purple"
        >
          {t("Generate Quote PDF", "إنشاء عرض سعر PDF")}
        </Button>
      </div>
    </>
  );
};

export default CustomerForm;
