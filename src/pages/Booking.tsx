import { useState } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CalendarDays, Clock, User, Mail, Phone, MessageSquare, CheckCircle } from "lucide-react";

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"
];

const services = [
  { id: "whatsapp", en: "WhatsApp Business API", ar: "واتساب بزنس API" },
  { id: "chatbot", en: "Chatbot Development", ar: "تطوير روبوت الدردشة" },
  { id: "automation", en: "Business Automation", ar: "أتمتة الأعمال" },
  { id: "consultation", en: "Technical Consultation", ar: "استشارة تقنية" },
  { id: "support", en: "Technical Support", ar: "الدعم التقني" }
];

const BookingContent = () => {
  const { t, isRtl } = useLanguage();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!date || !selectedTime || !selectedService || !formData.name || !formData.email) {
      toast({
        title: t("Missing Information", "معلومات ناقصة"),
        description: t("Please fill in all required fields", "يرجى ملء جميع الحقول المطلوبة"),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitted(true);
    toast({
      title: t("Booking Confirmed!", "تم تأكيد الحجز!"),
      description: t("We'll send you a confirmation email shortly.", "سنرسل لك بريد تأكيد قريباً.")
    });
  };

  const canProceed = (currentStep: number) => {
    switch (currentStep) {
      case 1: return !!date;
      case 2: return !!selectedTime;
      case 3: return !!selectedService;
      case 4: return formData.name && formData.email;
      default: return false;
    }
  };

  if (isSubmitted) {
    return (
      <div className={`min-h-screen bg-gray-50 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-lg mx-auto text-center py-12">
              <CardContent>
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-tech-dark mb-4">
                  {t("Booking Confirmed!", "تم تأكيد الحجز!")}
                </h2>
                <p className="text-gray-600 mb-6">
                  {t("Thank you for booking with us. We've sent a confirmation to your email.", 
                     "شكراً لحجزك معنا. لقد أرسلنا تأكيداً إلى بريدك الإلكتروني.")}
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">{t("Date", "التاريخ")}:</span>
                    <span className="font-medium">{date?.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">{t("Time", "الوقت")}:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t("Service", "الخدمة")}:</span>
                    <span className="font-medium">
                      {services.find(s => s.id === selectedService)?.[isRtl ? 'ar' : 'en']}
                    </span>
                  </div>
                </div>
                <Button 
                  onClick={() => {
                    setIsSubmitted(false);
                    setStep(1);
                    setDate(undefined);
                    setSelectedTime("");
                    setSelectedService("");
                    setFormData({ name: "", email: "", phone: "", message: "" });
                  }}
                  className="bg-tech-blue hover:bg-tech-purple"
                  data-testid="button-book-another"
                >
                  {t("Book Another Appointment", "حجز موعد آخر")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-tech-dark mb-4">
              {t("Book an Appointment", "احجز موعداً")}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("Schedule a consultation with our technical experts", 
                 "حدد موعد استشارة مع خبرائنا التقنيين")}
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors ${
                      s === step ? 'bg-tech-blue text-white' : 
                      s < step ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {s < step ? <CheckCircle className="w-5 h-5" /> : s}
                  </div>
                  {s < 4 && <div className={`w-12 h-1 mx-2 ${s < step ? 'bg-green-500' : 'bg-gray-200'}`} />}
                </div>
              ))}
            </div>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {step === 1 && <><CalendarDays className="w-5 h-5" /> {t("Select Date", "اختر التاريخ")}</>}
                {step === 2 && <><Clock className="w-5 h-5" /> {t("Select Time", "اختر الوقت")}</>}
                {step === 3 && <><MessageSquare className="w-5 h-5" /> {t("Select Service", "اختر الخدمة")}</>}
                {step === 4 && <><User className="w-5 h-5" /> {t("Your Details", "بياناتك")}</>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date() || date.getDay() === 5}
                    className="rounded-md border"
                    data-testid="calendar-booking"
                  />
                </div>
              )}

              {step === 2 && (
                <div className="grid grid-cols-4 gap-3">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      className={selectedTime === time ? "bg-tech-blue" : ""}
                      onClick={() => setSelectedTime(time)}
                      data-testid={`button-time-${time}`}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedService === service.id 
                          ? 'border-tech-blue bg-tech-blue/5' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      data-testid={`option-service-${service.id}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{t(service.en, service.ar)}</span>
                        {selectedService === service.id && (
                          <CheckCircle className="w-5 h-5 text-tech-blue" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">{t("Full Name", "الاسم الكامل")} *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t("John Doe", "أحمد محمد")}
                        data-testid="input-booking-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">{t("Email", "البريد الإلكتروني")} *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="email@example.com"
                        data-testid="input-booking-email"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">{t("Phone Number", "رقم الهاتف")}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 234 567 890"
                      data-testid="input-booking-phone"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">{t("Additional Notes", "ملاحظات إضافية")}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t("Tell us more about your needs...", "أخبرنا المزيد عن احتياجاتك...")}
                      rows={3}
                      data-testid="input-booking-message"
                    />
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">{t("Booking Summary", "ملخص الحجز")}</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>{t("Date", "التاريخ")}:</strong> {date?.toLocaleDateString()}</p>
                      <p><strong>{t("Time", "الوقت")}:</strong> {selectedTime}</p>
                      <p><strong>{t("Service", "الخدمة")}:</strong> {services.find(s => s.id === selectedService)?.[isRtl ? 'ar' : 'en']}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1}
                  data-testid="button-booking-back"
                >
                  {t("Back", "رجوع")}
                </Button>
                {step < 4 ? (
                  <Button 
                    onClick={() => setStep(step + 1)}
                    disabled={!canProceed(step)}
                    className="bg-tech-blue hover:bg-tech-purple"
                    data-testid="button-booking-next"
                  >
                    {t("Next", "التالي")}
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit}
                    disabled={!canProceed(step)}
                    className="bg-tech-blue hover:bg-tech-purple"
                    data-testid="button-booking-submit"
                  >
                    {t("Confirm Booking", "تأكيد الحجز")}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const Booking = () => (
  <LanguageProvider>
    <SEO
      title="Book an Appointment"
      description="Schedule a consultation with our technical experts for WhatsApp API, Chatbot development, or Business Automation."
      keywords={['Booking', 'Consultation', 'Appointment', 'Technical Support']}
    />
    <BookingContent />
  </LanguageProvider>
);

export default Booking;
