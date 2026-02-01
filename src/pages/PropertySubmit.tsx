import { useState } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Home,
  Building2,
  MapPin,
  Phone,
  Mail,
  User,
  Upload,
  FileText,
  Image as ImageIcon,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Ruler,
  DollarSign,
  Bed,
  Bath,
  Car,
  X,
} from "lucide-react";

interface PropertyFormData {
  ownerName: string;
  email: string;
  phone: string;
  whatsapp: string;
  propertyType: string;
  listingType: string;
  location: string;
  country: string;
  city: string;
  address: string;
  area: string;
  bedrooms: string;
  bathrooms: string;
  parking: string;
  price: string;
  currency: string;
  title: string;
  description: string;
  features: string;
  images: File[];
  documents: File[];
}

const PropertySubmitContent = () => {
  const { t, isRtl } = useLanguage();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState<PropertyFormData>({
    ownerName: "",
    email: "",
    phone: "",
    whatsapp: "",
    propertyType: "",
    listingType: "",
    location: "",
    country: "",
    city: "",
    address: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    parking: "",
    price: "",
    currency: "EGP",
    title: "",
    description: "",
    features: "",
    images: [],
    documents: [],
  });

  const propertyTypes = [
    { value: "apartment", label: t("Apartment", "شقة") },
    { value: "villa", label: t("Villa", "فيلا") },
    { value: "duplex", label: t("Duplex", "دوبلكس") },
    { value: "penthouse", label: t("Penthouse", "بنتهاوس") },
    { value: "studio", label: t("Studio", "ستوديو") },
    { value: "townhouse", label: t("Townhouse", "تاون هاوس") },
    { value: "land", label: t("Land", "أرض") },
    { value: "commercial", label: t("Commercial", "تجاري") },
    { value: "office", label: t("Office", "مكتب") },
    { value: "retail", label: t("Retail Shop", "محل تجاري") },
    { value: "warehouse", label: t("Warehouse", "مخزن") },
    { value: "other", label: t("Other", "أخرى") },
  ];

  const listingTypes = [
    { value: "sale", label: t("For Sale", "للبيع") },
    { value: "rent", label: t("For Rent", "للإيجار") },
    { value: "exchange", label: t("For Exchange", "للاستبدال") },
  ];

  const countries = [
    { value: "egypt", label: t("Egypt", "مصر") },
    { value: "uae", label: t("UAE", "الإمارات") },
    { value: "saudi", label: t("Saudi Arabia", "السعودية") },
    { value: "kuwait", label: t("Kuwait", "الكويت") },
    { value: "qatar", label: t("Qatar", "قطر") },
    { value: "bahrain", label: t("Bahrain", "البحرين") },
    { value: "oman", label: t("Oman", "عمان") },
    { value: "jordan", label: t("Jordan", "الأردن") },
    { value: "other", label: t("Other", "أخرى") },
  ];

  const currencies = [
    { value: "EGP", label: t("Egyptian Pound (EGP)", "جنيه مصري") },
    { value: "USD", label: t("US Dollar (USD)", "دولار أمريكي") },
    { value: "EUR", label: t("Euro (EUR)", "يورو") },
    { value: "AED", label: t("UAE Dirham (AED)", "درهم إماراتي") },
    { value: "SAR", label: t("Saudi Riyal (SAR)", "ريال سعودي") },
  ];

  const handleInputChange = (field: keyof PropertyFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.images.length > 10) {
      toast({
        title: t("Too many images", "صور كثيرة جداً"),
        description: t("Maximum 10 images allowed", "الحد الأقصى 10 صور"),
        variant: "destructive",
      });
      return;
    }
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.documents.length > 5) {
      toast({
        title: t("Too many documents", "مستندات كثيرة جداً"),
        description: t("Maximum 5 documents allowed", "الحد الأقصى 5 مستندات"),
        variant: "destructive",
      });
      return;
    }
    setFormData(prev => ({ ...prev, documents: [...prev.documents, ...files] }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const removeDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (stepNum: number): boolean => {
    switch (stepNum) {
      case 1:
        if (!formData.ownerName || !formData.email || !formData.phone) {
          toast({
            title: t("Missing Information", "معلومات ناقصة"),
            description: t("Please fill in all required fields", "الرجاء ملء جميع الحقول المطلوبة"),
            variant: "destructive",
          });
          return false;
        }
        return true;
      case 2:
        if (!formData.propertyType || !formData.listingType || !formData.country || !formData.city) {
          toast({
            title: t("Missing Information", "معلومات ناقصة"),
            description: t("Please fill in all required fields", "الرجاء ملء جميع الحقول المطلوبة"),
            variant: "destructive",
          });
          return false;
        }
        return true;
      case 3:
        if (!formData.area || !formData.price || !formData.title) {
          toast({
            title: t("Missing Information", "معلومات ناقصة"),
            description: t("Please fill in all required fields", "الرجاء ملء جميع الحقول المطلوبة"),
            variant: "destructive",
          });
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'images' || key === 'documents') {
          (value as File[]).forEach(file => {
            formDataToSend.append(key, file);
          });
        } else {
          formDataToSend.append(key, value as string);
        }
      });

      const response = await fetch('/api/property-submit', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitted(true);
        toast({
          title: t("Property Submitted", "تم إرسال العقار"),
          description: t("We will contact you soon", "سنتواصل معك قريباً"),
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      toast({
        title: t("Submission Received", "تم استلام الطلب"),
        description: t("Your property listing has been submitted successfully", "تم إرسال قائمة عقارك بنجاح"),
      });
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { num: 1, title: t("Contact Info", "معلومات الاتصال"), icon: User },
    { num: 2, title: t("Property Type", "نوع العقار"), icon: Building2 },
    { num: 3, title: t("Details", "التفاصيل"), icon: FileText },
    { num: 4, title: t("Media", "الوسائط"), icon: ImageIcon },
  ];

  if (submitted) {
    return (
      <div className={`min-h-screen bg-gray-50 ${isRtl ? 'rtl' : 'ltr'}`}>
        <Header />
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto text-center p-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t("Property Submitted Successfully!", "تم إرسال العقار بنجاح!")}
              </h2>
              <p className="text-gray-600 mb-8">
                {t(
                  "Thank you for submitting your property. Our team will review your listing and contact you within 24 hours.",
                  "شكراً لإرسال عقارك. سيراجع فريقنا قائمتك ويتواصل معك خلال 24 ساعة."
                )}
              </p>
              <Button onClick={() => { setSubmitted(false); setStep(1); setFormData({
                ownerName: "", email: "", phone: "", whatsapp: "", propertyType: "",
                listingType: "", location: "", country: "", city: "", address: "",
                area: "", bedrooms: "", bathrooms: "", parking: "", price: "",
                currency: "EGP", title: "", description: "", features: "", images: [], documents: []
              }); }} data-testid="button-submit-another">
                {t("Submit Another Property", "أرسل عقار آخر")}
              </Button>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${isRtl ? 'rtl' : 'ltr'}`}>
      <Header />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <Badge className="mb-3 text-sm">
              <Home className="w-3 h-3 mr-1.5" />
              {t("Property Listing", "إدراج العقار")}
            </Badge>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              {t("Submit Your Property", "أرسل عقارك")}
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto text-sm">
              {t(
                "Fill in the details below to list your property for sale, rent, or exchange",
                "املأ التفاصيل أدناه لإدراج عقارك للبيع أو الإيجار أو الاستبدال"
              )}
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-1 md:gap-2">
              {steps.map((s, idx) => (
                <div key={s.num} className="flex items-center">
                  <div className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-colors text-sm ${
                    step === s.num ? 'bg-blue-600 text-white' : 
                    step > s.num ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {step > s.num ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <s.icon className="w-4 h-4" />
                    )}
                    <span className="hidden md:inline font-medium text-sm">{s.title}</span>
                    <span className="md:hidden font-medium">{s.num}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`w-6 md:w-8 h-0.5 mx-1 rounded ${step > s.num ? 'bg-green-400' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-4 md:p-6">
              {step === 1 && (
                <div className="space-y-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle>{t("Contact Information", "معلومات الاتصال")}</CardTitle>
                    <CardDescription>{t("How can we reach you?", "كيف يمكننا التواصل معك؟")}</CardDescription>
                  </CardHeader>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {t("Full Name", "الاسم الكامل")} *
                      </Label>
                      <Input
                        value={formData.ownerName}
                        onChange={(e) => handleInputChange("ownerName", e.target.value)}
                        placeholder={t("Enter your name", "أدخل اسمك")}
                        data-testid="input-owner-name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {t("Email", "البريد الإلكتروني")} *
                      </Label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder={t("Enter your email", "أدخل بريدك الإلكتروني")}
                        data-testid="input-email"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {t("Phone Number", "رقم الهاتف")} *
                      </Label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder={t("Enter phone number", "أدخل رقم الهاتف")}
                        data-testid="input-phone"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {t("WhatsApp Number", "رقم واتساب")}
                      </Label>
                      <Input
                        value={formData.whatsapp}
                        onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                        placeholder={t("Enter WhatsApp number", "أدخل رقم واتساب")}
                        data-testid="input-whatsapp"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle>{t("Property Information", "معلومات العقار")}</CardTitle>
                    <CardDescription>{t("Tell us about your property", "أخبرنا عن عقارك")}</CardDescription>
                  </CardHeader>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>{t("Property Type", "نوع العقار")} *</Label>
                      <Select value={formData.propertyType} onValueChange={(v) => handleInputChange("propertyType", v)}>
                        <SelectTrigger data-testid="select-property-type">
                          <SelectValue placeholder={t("Select type", "اختر النوع")} />
                        </SelectTrigger>
                        <SelectContent>
                          {propertyTypes.map(type => (
                            <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>{t("Listing Type", "نوع الإدراج")} *</Label>
                      <Select value={formData.listingType} onValueChange={(v) => handleInputChange("listingType", v)}>
                        <SelectTrigger data-testid="select-listing-type">
                          <SelectValue placeholder={t("Select listing type", "اختر نوع الإدراج")} />
                        </SelectTrigger>
                        <SelectContent>
                          {listingTypes.map(type => (
                            <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {t("Country", "الدولة")} *
                      </Label>
                      <Select value={formData.country} onValueChange={(v) => handleInputChange("country", v)}>
                        <SelectTrigger data-testid="select-country">
                          <SelectValue placeholder={t("Select country", "اختر الدولة")} />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map(country => (
                            <SelectItem key={country.value} value={country.value}>{country.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>{t("City", "المدينة")} *</Label>
                      <Input
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder={t("Enter city", "أدخل المدينة")}
                        data-testid="input-city"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label>{t("Full Address", "العنوان الكامل")}</Label>
                      <Input
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder={t("Enter full address", "أدخل العنوان الكامل")}
                        data-testid="input-address"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle>{t("Property Details", "تفاصيل العقار")}</CardTitle>
                    <CardDescription>{t("Provide specific details about your property", "قدم تفاصيل محددة عن عقارك")}</CardDescription>
                  </CardHeader>

                  <div className="space-y-2">
                    <Label>{t("Property Title", "عنوان العقار")} *</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder={t("e.g., Luxury Villa in New Cairo", "مثال: فيلا فاخرة في القاهرة الجديدة")}
                      data-testid="input-title"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Ruler className="w-4 h-4" />
                        {t("Area (m²)", "المساحة (م²)")} *
                      </Label>
                      <Input
                        type="number"
                        value={formData.area}
                        onChange={(e) => handleInputChange("area", e.target.value)}
                        placeholder="150"
                        data-testid="input-area"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        {t("Price", "السعر")} *
                      </Label>
                      <Input
                        type="number"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        placeholder="1000000"
                        data-testid="input-price"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>{t("Currency", "العملة")}</Label>
                      <Select value={formData.currency} onValueChange={(v) => handleInputChange("currency", v)}>
                        <SelectTrigger data-testid="select-currency">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map(curr => (
                            <SelectItem key={curr.value} value={curr.value}>{curr.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Bed className="w-4 h-4" />
                        {t("Bedrooms", "غرف النوم")}
                      </Label>
                      <Input
                        type="number"
                        value={formData.bedrooms}
                        onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                        placeholder="3"
                        data-testid="input-bedrooms"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Bath className="w-4 h-4" />
                        {t("Bathrooms", "الحمامات")}
                      </Label>
                      <Input
                        type="number"
                        value={formData.bathrooms}
                        onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                        placeholder="2"
                        data-testid="input-bathrooms"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Car className="w-4 h-4" />
                        {t("Parking Spaces", "أماكن الركن")}
                      </Label>
                      <Input
                        type="number"
                        value={formData.parking}
                        onChange={(e) => handleInputChange("parking", e.target.value)}
                        placeholder="1"
                        data-testid="input-parking"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>{t("Description", "الوصف")}</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder={t("Describe your property in detail...", "صف عقارك بالتفصيل...")}
                      rows={4}
                      data-testid="input-description"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t("Features & Amenities", "المميزات والمرافق")}</Label>
                    <Textarea
                      value={formData.features}
                      onChange={(e) => handleInputChange("features", e.target.value)}
                      placeholder={t("e.g., Pool, Garden, Security, etc.", "مثال: حمام سباحة، حديقة، أمن، إلخ.")}
                      rows={3}
                      data-testid="input-features"
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle>{t("Upload Media", "رفع الوسائط")}</CardTitle>
                    <CardDescription>{t("Add photos and documents", "أضف الصور والمستندات")}</CardDescription>
                  </CardHeader>

                  <div className="space-y-4">
                    <Label className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      {t("Property Images", "صور العقار")} ({formData.images.length}/10)
                    </Label>
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <Upload className="w-10 h-10 mx-auto text-gray-400 mb-4" />
                      <Label htmlFor="images-upload" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-700 font-medium">
                          {t("Click to upload images", "انقر لرفع الصور")}
                        </span>
                      </Label>
                      <Input
                        id="images-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                        data-testid="input-images"
                      />
                      <p className="text-sm text-gray-400 mt-2">PNG, JPG, JPEG - {t("Max 10 images", "حد أقصى 10 صور")}</p>
                    </div>

                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-4 gap-4">
                        {formData.images.map((file, idx) => (
                          <div key={idx} className="relative group">
                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Property ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              data-testid={`button-remove-image-${idx}`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Label className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      {t("Documents (PDF)", "المستندات (PDF)")} ({formData.documents.length}/5)
                    </Label>
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <FileText className="w-10 h-10 mx-auto text-gray-400 mb-4" />
                      <Label htmlFor="docs-upload" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-700 font-medium">
                          {t("Click to upload documents", "انقر لرفع المستندات")}
                        </span>
                      </Label>
                      <Input
                        id="docs-upload"
                        type="file"
                        accept=".pdf"
                        multiple
                        className="hidden"
                        onChange={handleDocumentUpload}
                        data-testid="input-documents"
                      />
                      <p className="text-sm text-gray-400 mt-2">PDF - {t("Max 5 documents", "حد أقصى 5 مستندات")}</p>
                    </div>

                    {formData.documents.length > 0 && (
                      <div className="space-y-2">
                        {formData.documents.map((file, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-red-500" />
                              <span className="text-sm font-medium">{file.name}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeDocument(idx)}
                              className="text-red-500 hover:text-red-700"
                              data-testid={`button-remove-doc-${idx}`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8 pt-6 border-t">
                {step > 1 ? (
                  <Button variant="outline" onClick={prevStep} data-testid="button-prev">
                    {isRtl ? <ArrowRight className="w-4 h-4 ml-2" /> : <ArrowLeft className="w-4 h-4 mr-2" />}
                    {t("Previous", "السابق")}
                  </Button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <Button onClick={nextStep} data-testid="button-next">
                    {t("Next", "التالي")}
                    {isRtl ? <ArrowLeft className="w-4 h-4 mr-2" /> : <ArrowRight className="w-4 h-4 ml-2" />}
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={isSubmitting} data-testid="button-submit">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        {t("Submitting...", "جاري الإرسال...")}
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {t("Submit Property", "إرسال العقار")}
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const PropertySubmit = () => {
  return (
    <LanguageProvider>
      <SEO
        title="Submit Your Property"
        description="List your property for sale, rent, or exchange. Reach thousands of potential buyers with our marketing platform."
        keywords={['Submit Property', 'Sell Home', 'Rent Apartment', 'Real Estate Listing']}
      />
      <PropertySubmitContent />
    </LanguageProvider>
  );
};

export default PropertySubmit;
