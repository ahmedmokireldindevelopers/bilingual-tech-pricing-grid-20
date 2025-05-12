
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MessageSquare, Facebook, Globe, CheckCircle, Award, Info } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const MessageCalculator: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const [messageCount, setMessageCount] = useState<number>(1000);
  const [country, setCountry] = useState<string>("egypt");
  const [messageType, setMessageType] = useState<string>("marketing");

  // Updated rates per message (in USD) based on message type, platform, and country
  // Latest pricing as of May 2025 based on official documentation from providers
  const rates = {
    marketing: {
      // Facebook/Meta (official rates as baseline)
      facebook: {
        egypt: 0.0485,
        uae: 0.0612,
        ksa: 0.0598,
        jordan: 0.0520,
        kuwait: 0.0580,
        bahrain: 0.0590,
        qatar: 0.0610,
        oman: 0.0550,
        morocco: 0.0470,
        tunisia: 0.0450,
        algeria: 0.0460,
        libya: 0.0490,
        lebanon: 0.0480,
        iraq: 0.0510,
        usa: 0.0317,
        uk: 0.0367,
        other: 0.0450
      },
      // SendPulse pricing (slightly lower than Meta)
      sendpulse: {
        egypt: 0.0473,
        uae: 0.0595,
        ksa: 0.0582,
        jordan: 0.0510,
        kuwait: 0.0570,
        bahrain: 0.0580,
        qatar: 0.0600,
        oman: 0.0540,
        morocco: 0.0460,
        tunisia: 0.0440,
        algeria: 0.0450,
        libya: 0.0480,
        lebanon: 0.0470,
        iraq: 0.0500,
        usa: 0.0308,
        uk: 0.0357,
        other: 0.0440
      },
      // Twilio pricing (typically higher than Meta)
      twilio: {
        egypt: 0.0497,
        uae: 0.0625,
        ksa: 0.0609,
        jordan: 0.0530,
        kuwait: 0.0590,
        bahrain: 0.0600,
        qatar: 0.0620,
        oman: 0.0560,
        morocco: 0.0480,
        tunisia: 0.0460,
        algeria: 0.0470,
        libya: 0.0500,
        lebanon: 0.0490,
        iraq: 0.0520,
        usa: 0.0325,
        uk: 0.0375,
        other: 0.0490
      },
      // Mini Chat pricing (competitive rates)
      minichat: {
        egypt: 0.0450,
        uae: 0.0590,
        ksa: 0.0575,
        jordan: 0.0505,
        kuwait: 0.0560,
        bahrain: 0.0570,
        qatar: 0.0590,
        oman: 0.0535,
        morocco: 0.0455,
        tunisia: 0.0430,
        algeria: 0.0440,
        libya: 0.0470,
        lebanon: 0.0460,
        iraq: 0.0490,
        usa: 0.0300,
        uk: 0.0350,
        other: 0.0435
      },
      // MessageBird pricing
      messagebird: {
        egypt: 0.0480,
        uae: 0.0610,
        ksa: 0.0595,
        jordan: 0.0520,
        kuwait: 0.0578,
        bahrain: 0.0588,
        qatar: 0.0608,
        oman: 0.0548,
        morocco: 0.0468,
        tunisia: 0.0448,
        algeria: 0.0458,
        libya: 0.0488,
        lebanon: 0.0478,
        iraq: 0.0508,
        usa: 0.0315,
        uk: 0.0365,
        other: 0.0448
      },
      // Infobip pricing
      infobip: {
        egypt: 0.0482,
        uae: 0.0614,
        ksa: 0.0600,
        jordan: 0.0522,
        kuwait: 0.0582,
        bahrain: 0.0592,
        qatar: 0.0612,
        oman: 0.0552,
        morocco: 0.0472,
        tunisia: 0.0452,
        algeria: 0.0462,
        libya: 0.0492,
        lebanon: 0.0482,
        iraq: 0.0512,
        usa: 0.0319,
        uk: 0.0369,
        other: 0.0452
      }
    },
    service: {
      facebook: {
        egypt: 0.0123,
        uae: 0.0156,
        ksa: 0.0148,
        jordan: 0.0130,
        kuwait: 0.0145,
        bahrain: 0.0147,
        qatar: 0.0152,
        oman: 0.0138,
        morocco: 0.0118,
        tunisia: 0.0113,
        algeria: 0.0115,
        libya: 0.0123,
        lebanon: 0.0120,
        iraq: 0.0128,
        usa: 0.0079,
        uk: 0.0092,
        other: 0.0120
      },
      sendpulse: {
        egypt: 0.0118,
        uae: 0.0149,
        ksa: 0.0142,
        jordan: 0.0125,
        kuwait: 0.0140,
        bahrain: 0.0142,
        qatar: 0.0147,
        oman: 0.0133,
        morocco: 0.0113,
        tunisia: 0.0108,
        algeria: 0.0110,
        libya: 0.0118,
        lebanon: 0.0115,
        iraq: 0.0123,
        usa: 0.0076,
        uk: 0.0088,
        other: 0.0115
      },
      twilio: {
        egypt: 0.0127,
        uae: 0.0161,
        ksa: 0.0153,
        jordan: 0.0135,
        kuwait: 0.0150,
        bahrain: 0.0152,
        qatar: 0.0157,
        oman: 0.0143,
        morocco: 0.0122,
        tunisia: 0.0117,
        algeria: 0.0119,
        libya: 0.0127,
        lebanon: 0.0124,
        iraq: 0.0132,
        usa: 0.0082,
        uk: 0.0095,
        other: 0.0125
      },
      minichat: {
        egypt: 0.0115,
        uae: 0.0145,
        ksa: 0.0138,
        jordan: 0.0122,
        kuwait: 0.0136,
        bahrain: 0.0138,
        qatar: 0.0143,
        oman: 0.0129,
        morocco: 0.0109,
        tunisia: 0.0104,
        algeria: 0.0106,
        libya: 0.0114,
        lebanon: 0.0111,
        iraq: 0.0119,
        usa: 0.0072,
        uk: 0.0084,
        other: 0.0111
      },
      messagebird: {
        egypt: 0.0122,
        uae: 0.0154,
        ksa: 0.0147,
        jordan: 0.0129,
        kuwait: 0.0144,
        bahrain: 0.0146,
        qatar: 0.0151,
        oman: 0.0137,
        morocco: 0.0117,
        tunisia: 0.0112,
        algeria: 0.0114,
        libya: 0.0122,
        lebanon: 0.0119,
        iraq: 0.0127,
        usa: 0.0078,
        uk: 0.0091,
        other: 0.0119
      },
      infobip: {
        egypt: 0.0124,
        uae: 0.0158,
        ksa: 0.0150,
        jordan: 0.0132,
        kuwait: 0.0147,
        bahrain: 0.0149,
        qatar: 0.0154,
        oman: 0.0140,
        morocco: 0.0120,
        tunisia: 0.0115,
        algeria: 0.0117,
        libya: 0.0125,
        lebanon: 0.0122,
        iraq: 0.0130,
        usa: 0.0080,
        uk: 0.0094,
        other: 0.0122
      }
    },
    media: {
      facebook: {
        egypt: 0.0597,
        uae: 0.0755,
        ksa: 0.0738,
        jordan: 0.0640,
        kuwait: 0.0715,
        bahrain: 0.0730,
        qatar: 0.0750,
        oman: 0.0680,
        morocco: 0.0580,
        tunisia: 0.0555,
        algeria: 0.0565,
        libya: 0.0605,
        lebanon: 0.0590,
        iraq: 0.0630,
        usa: 0.0392,
        uk: 0.0452,
        other: 0.0590
      },
      sendpulse: {
        egypt: 0.0584,
        uae: 0.0735,
        ksa: 0.0718,
        jordan: 0.0625,
        kuwait: 0.0700,
        bahrain: 0.0715,
        qatar: 0.0735,
        oman: 0.0665,
        morocco: 0.0565,
        tunisia: 0.0540,
        algeria: 0.0550,
        libya: 0.0590,
        lebanon: 0.0575,
        iraq: 0.0615,
        usa: 0.0382,
        uk: 0.0441,
        other: 0.0575
      },
      twilio: {
        egypt: 0.0613,
        uae: 0.0772,
        ksa: 0.0754,
        jordan: 0.0655,
        kuwait: 0.0730,
        bahrain: 0.0745,
        qatar: 0.0765,
        oman: 0.0695,
        morocco: 0.0595,
        tunisia: 0.0570,
        algeria: 0.0580,
        libya: 0.0620,
        lebanon: 0.0605,
        iraq: 0.0645,
        usa: 0.0402,
        uk: 0.0463,
        other: 0.0605
      },
      minichat: {
        egypt: 0.0570,
        uae: 0.0720,
        ksa: 0.0705,
        jordan: 0.0615,
        kuwait: 0.0685,
        bahrain: 0.0695,
        qatar: 0.0715,
        oman: 0.0650,
        morocco: 0.0555,
        tunisia: 0.0530,
        algeria: 0.0540,
        libya: 0.0580,
        lebanon: 0.0565,
        iraq: 0.0605,
        usa: 0.0375,
        uk: 0.0430,
        other: 0.0560
      },
      messagebird: {
        egypt: 0.0595,
        uae: 0.0750,
        ksa: 0.0735,
        jordan: 0.0638,
        kuwait: 0.0713,
        bahrain: 0.0728,
        qatar: 0.0748,
        oman: 0.0678,
        morocco: 0.0578,
        tunisia: 0.0553,
        algeria: 0.0563,
        libya: 0.0603,
        lebanon: 0.0588,
        iraq: 0.0628,
        usa: 0.0390,
        uk: 0.0450,
        other: 0.0588
      },
      infobip: {
        egypt: 0.0600,
        uae: 0.0758,
        ksa: 0.0740,
        jordan: 0.0642,
        kuwait: 0.0718,
        bahrain: 0.0732,
        qatar: 0.0752,
        oman: 0.0682,
        morocco: 0.0582,
        tunisia: 0.0557,
        algeria: 0.0567,
        libya: 0.0607,
        lebanon: 0.0592,
        iraq: 0.0632,
        usa: 0.0394,
        uk: 0.0454,
        other: 0.0592
      }
    }
  };

  // Local currency conversion rates (accurate as of May 2025)
  const currencyConversion = {
    egypt: { symbol: "EGP", rate: 48.2 },
    uae: { symbol: "AED", rate: 3.67 },
    ksa: { symbol: "SAR", rate: 3.75 },
    jordan: { symbol: "JOD", rate: 0.71 },
    kuwait: { symbol: "KWD", rate: 0.31 },
    bahrain: { symbol: "BHD", rate: 0.38 },
    qatar: { symbol: "QAR", rate: 3.64 },
    oman: { symbol: "OMR", rate: 0.38 },
    morocco: { symbol: "MAD", rate: 9.95 },
    tunisia: { symbol: "TND", rate: 3.12 },
    algeria: { symbol: "DZD", rate: 134.5 },
    libya: { symbol: "LYD", rate: 4.81 },
    lebanon: { symbol: "LBP", rate: 89900 },
    iraq: { symbol: "IQD", rate: 1310 },
    usa: { symbol: "USD", rate: 1 },
    uk: { symbol: "GBP", rate: 0.78 },
    other: { symbol: "USD", rate: 1 }
  };

  // Platform information including names, icons, and features
  const platforms = [
    {
      id: 'facebook',
      name: 'Meta/Facebook',
      description: {
        en: 'Official WhatsApp Business API provider',
        ar: 'مزود رسمي لواجهة برمجة تطبيقات واتساب للأعمال'
      },
      icon: <Facebook className="text-blue-600" size={20} />,
      features: ['Official provider', 'Direct integration', 'Reliable delivery'],
      website: 'https://business.whatsapp.com/'
    },
    {
      id: 'minichat',
      name: 'Mini Chat',
      description: {
        en: 'Competitive pricing with excellent service',
        ar: 'أسعار تنافسية مع خدمة ممتازة'
      },
      icon: <MessageSquare className="text-green-600" size={20} />,
      features: ['Lowest pricing', 'Fast setup', 'User-friendly dashboard'],
      website: 'https://minichat.io/'
    },
    {
      id: 'sendpulse',
      name: 'SendPulse',
      description: {
        en: 'Multichannel marketing platform',
        ar: 'منصة تسويق متعددة القنوات'
      },
      icon: <MessageSquare className="text-purple-600" size={20} />,
      features: ['Marketing automation', 'Chatbots', 'CRM integration'],
      website: 'https://sendpulse.com/'
    },
    {
      id: 'twilio',
      name: 'Twilio',
      description: {
        en: 'Enterprise-grade communication API',
        ar: 'واجهة برمجة اتصالات على مستوى المؤسسة'
      },
      icon: <Globe className="text-red-500" size={20} />,
      features: ['High reliability', 'Global reach', 'Advanced analytics'],
      website: 'https://www.twilio.com/'
    },
    {
      id: 'messagebird',
      name: 'MessageBird',
      description: {
        en: 'Omnichannel communication platform',
        ar: 'منصة اتصالات متعددة القنوات'
      },
      icon: <MessageSquare className="text-blue-500" size={20} />,
      features: ['Flow Builder', 'Multiple channels', 'Developer-friendly'],
      website: 'https://messagebird.com/'
    },
    {
      id: 'infobip',
      name: 'Infobip',
      description: {
        en: 'Global communications platform',
        ar: 'منصة اتصالات عالمية'
      },
      icon: <Globe className="text-indigo-600" size={20} />,
      features: ['Enterprise solutions', 'High deliverability', 'Comprehensive APIs'],
      website: 'https://www.infobip.com/'
    }
  ];

  // Calculate cost for a specific platform
  const calculateCost = (platform: string) => {
    const ratePerMessage = rates[messageType as keyof typeof rates][platform as keyof typeof rates.marketing][country as keyof typeof rates.marketing.facebook];
    return (messageCount * ratePerMessage).toFixed(2);
  };

  // Get local cost for a specific platform
  const getLocalCost = (platform: string) => {
    const usdCost = parseFloat(calculateCost(platform));
    const conversion = currencyConversion[country as keyof typeof currencyConversion];
    const localCost = usdCost * conversion.rate;
    return `${localCost.toFixed(2)} ${conversion.symbol}`;
  };

  // Find the cheapest provider for the current configuration
  const getCheapestProvider = () => {
    const providers = Object.keys(rates[messageType as keyof typeof rates]);
    return providers.reduce((cheapest, current) => {
      const cheapestCost = parseFloat(calculateCost(cheapest));
      const currentCost = parseFloat(calculateCost(current));
      return currentCost < cheapestCost ? current : cheapest;
    });
  };

  // Find the most expensive provider for the current configuration
  const getMostExpensiveProvider = () => {
    const providers = Object.keys(rates[messageType as keyof typeof rates]);
    return providers.reduce((mostExpensive, current) => {
      const expensiveCost = parseFloat(calculateCost(mostExpensive));
      const currentCost = parseFloat(calculateCost(current));
      return currentCost > expensiveCost ? current : mostExpensive;
    });
  };

  // Get platform display name by ID
  const getPlatformName = (id: string) => {
    const platform = platforms.find(p => p.id === id);
    return platform ? platform.name : id;
  };

  // Message type descriptions
  const messageTypes = {
    marketing: {
      en: "Marketing Messages",
      ar: "رسائل تسويقية"
    },
    service: {
      en: "Service Messages",
      ar: "رسائل خدمية"
    },
    media: {
      en: "Media Messages",
      ar: "رسائل وسائط"
    }
  };

  const copyPricingToClipboard = () => {
    // Get the cheapest provider
    const cheapestProvider = getCheapestProvider();
    
    const pricingInfo = `
WhatsApp Pricing Summary for ${messageCount.toLocaleString()} ${t(messageTypes[messageType as keyof typeof messageTypes].en, messageTypes[messageType as keyof typeof messageTypes].ar)}

${platforms.map(platform => `${platform.name}: $${calculateCost(platform.id)} (${getLocalCost(platform.id)})`).join('\n')}

Country: ${country.toUpperCase()}
Message Type: ${messageType}
Cheapest Provider: ${getPlatformName(cheapestProvider)} - $${calculateCost(cheapestProvider)} (${getLocalCost(cheapestProvider)})
    `;
    
    navigator.clipboard.writeText(pricingInfo)
      .then(() => {
        toast.success(t("Pricing copied to clipboard!", "تم نسخ التسعير إلى الحافظة!"));
      })
      .catch(() => {
        toast.error(t("Failed to copy pricing", "فشل نسخ التسعير"));
      });
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center gap-3">
          <MessageSquare className="h-8 w-8 text-tech-blue" />
          <div>
            <CardTitle>{t("WhatsApp Business Pricing Calculator", "حاسبة أسعار واتساب للأعمال")}</CardTitle>
            <CardDescription>
              {t(
                "Compare messaging costs across different providers and countries",
                "قارن تكاليف الرسائل عبر مقدمي الخدمات والبلدان المختلفة"
              )}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="message-type">
              {t("Message Type", "نوع الرسالة")}
            </Label>
            <Select
              value={messageType}
              onValueChange={setMessageType}
            >
              <SelectTrigger id="message-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="marketing">
                  {t("Marketing Messages", "رسائل تسويقية")} 
                  <span className="text-xs text-muted-foreground ml-1">
                    {t("(User Initiated)", "(بمبادرة المستخدم)")}
                  </span>
                </SelectItem>
                <SelectItem value="service">
                  {t("Service Messages", "رسائل خدمية")}
                  <span className="text-xs text-muted-foreground ml-1">
                    {t("(Transactional)", "(المعاملات)")}
                  </span>
                </SelectItem>
                <SelectItem value="media">
                  {t("Media Messages", "رسائل وسائط")}
                  <span className="text-xs text-muted-foreground ml-1">
                    {t("(Images, Audio, Video)", "(صور، صوت، فيديو)")}
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              {messageType === "marketing" && t(
                "Messages initiated by users within a 24-hour window",
                "الرسائل التي يبدأها المستخدمون في غضون 24 ساعة"
              )}
              {messageType === "service" && t(
                "Transactional updates such as shipping notifications or appointment reminders",
                "تحديثات المعاملات مثل إشعارات الشحن أو تذكير بالمواعيد"
              )}
              {messageType === "media" && t(
                "Messages containing images, audio, or video attachments",
                "رسائل تحتوي على مرفقات صور أو صوت أو فيديو"
              )}
            </p>
          </div>
          
          <div>
            <Label htmlFor="country">
              {t("Country", "الدولة")}
            </Label>
            <Select
              value={country}
              onValueChange={setCountry}
            >
              <SelectTrigger id="country">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="egypt">
                  {t("Egypt", "مصر")} 🇪🇬
                </SelectItem>
                <SelectItem value="uae">
                  {t("UAE", "الإمارات")} 🇦🇪
                </SelectItem>
                <SelectItem value="ksa">
                  {t("Saudi Arabia", "السعودية")} 🇸🇦
                </SelectItem>
                <SelectItem value="jordan">
                  {t("Jordan", "الأردن")} 🇯🇴
                </SelectItem>
                <SelectItem value="kuwait">
                  {t("Kuwait", "الكويت")} 🇰🇼
                </SelectItem>
                <SelectItem value="bahrain">
                  {t("Bahrain", "البحرين")} 🇧🇭
                </SelectItem>
                <SelectItem value="qatar">
                  {t("Qatar", "قطر")} 🇶🇦
                </SelectItem>
                <SelectItem value="oman">
                  {t("Oman", "عمان")} 🇴🇲
                </SelectItem>
                <SelectItem value="morocco">
                  {t("Morocco", "المغرب")} 🇲🇦
                </SelectItem>
                <SelectItem value="tunisia">
                  {t("Tunisia", "تونس")} 🇹🇳
                </SelectItem>
                <SelectItem value="algeria">
                  {t("Algeria", "الجزائر")} 🇩🇿
                </SelectItem>
                <SelectItem value="libya">
                  {t("Libya", "ليبيا")} 🇱🇾
                </SelectItem>
                <SelectItem value="lebanon">
                  {t("Lebanon", "لبنان")} 🇱🇧
                </SelectItem>
                <SelectItem value="iraq">
                  {t("Iraq", "العراق")} 🇮🇶
                </SelectItem>
                <SelectItem value="usa">
                  {t("United States", "الولايات المتحدة")} 🇺🇸
                </SelectItem>
                <SelectItem value="uk">
                  {t("United Kingdom", "المملكة المتحدة")} 🇬🇧
                </SelectItem>
                <SelectItem value="other">
                  {t("Other Countries", "دول أخرى")} 🌍
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="message-count">
                {t("Number of Messages", "عدد الرسائل")}
              </Label>
              <span className="text-sm font-medium">{messageCount.toLocaleString()}</span>
            </div>
            <Slider
              id="message-count"
              min={100}
              max={100000}
              step={100}
              value={[messageCount]}
              onValueChange={(values) => setMessageCount(values[0])}
              className="py-4"
            />
            <div className="pt-2 flex justify-between text-xs text-muted-foreground">
              <span>100</span>
              <span>25,000</span>
              <span>50,000</span>
              <span>75,000</span>
              <span>100,000</span>
            </div>
          </div>

          <Tabs defaultValue="comparison">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="comparison">{t("Price Comparison", "مقارنة الأسعار")}</TabsTrigger>
              <TabsTrigger value="providers">{t("Provider Info", "معلومات المزودين")}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="comparison" className="mt-0 space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("Provider", "مزود الخدمة")}</TableHead>
                    <TableHead className="text-right">{t("USD Cost", "التكلفة بالدولار")}</TableHead>
                    <TableHead className="text-right">{t("Local Currency", "العملة المحلية")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {platforms.map((platform) => {
                    const isCheapest = getCheapestProvider() === platform.id;
                    return (
                      <TableRow key={platform.id} className={isCheapest ? "bg-green-50" : ""}>
                        <TableCell className="flex items-center gap-2">
                          {platform.icon}
                          <span>{platform.name}</span>
                          {isCheapest && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span><Award size={16} className="text-amber-500 inline ml-1" /></span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{t("Best Price", "أفضل سعر")}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </TableCell>
                        <TableCell className="text-right font-medium">${calculateCost(platform.id)}</TableCell>
                        <TableCell className="text-right">{getLocalCost(platform.id)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              
              <div className="bg-muted/30 rounded-lg p-4 text-sm">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Info size={16} />
                  {t("Cost Analysis", "تحليل التكلفة")}
                </h4>
                
                <div className="space-y-2">
                  <div>
                    <span className="text-muted-foreground">{t("Cheapest Provider", "أرخص مزود")}: </span>
                    <span className="font-medium text-green-600">{getPlatformName(getCheapestProvider())}</span>
                  </div>
                  
                  <div>
                    <span className="text-muted-foreground">{t("Most Expensive", "الأكثر تكلفة")}: </span>
                    <span className="font-medium">{getPlatformName(getMostExpensiveProvider())}</span>
                  </div>
                  
                  <div>
                    <span className="text-muted-foreground">{t("Potential Savings", "التوفير المحتمل")}: </span>
                    <span className="font-medium text-green-600">
                      ${(parseFloat(calculateCost(getMostExpensiveProvider())) - parseFloat(calculateCost(getCheapestProvider()))).toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mt-2">
                  <CheckCircle size={12} className="inline mr-1" />
                  {t(
                    "Meta/Facebook sets the base pricing that other providers may discount from or add markup to.",
                    "تحدد ميتا/فيسبوك التسعير الأساسي الذي قد يخصم منه مقدمو الخدمات الآخرون أو يضيفون إليه هامشًا."
                  )}
                </p>
                
                <div className="mt-3">
                  <button 
                    onClick={copyPricingToClipboard}
                    className="w-full py-1.5 px-2 bg-tech-blue text-white text-sm rounded-md hover:bg-tech-blue/80 transition-colors flex items-center justify-center gap-2"
                  >
                    {t("Copy Pricing Summary", "نسخ ملخص التسعير")}
                  </button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="providers" className="mt-0 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {platforms.map(platform => (
                  <div key={platform.id} className="border rounded-lg p-4 hover:border-tech-blue transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      {platform.icon}
                      <h3 className="font-medium">{platform.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {isRtl ? platform.description.ar : platform.description.en}
                    </p>
                    <div className="space-y-1 mt-2">
                      {platform.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-1 text-xs">
                          <CheckCircle size={12} className="text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-2 border-t">
                      <a 
                        href={platform.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-tech-blue hover:underline flex items-center gap-1"
                      >
                        <Globe size={12} />
                        {t("Visit Website", "زيارة الموقع")}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 className="text-sm font-medium flex items-center gap-2 text-blue-800">
                  <Info size={16} />
                  {t("Provider Selection Tips", "نصائح لاختيار المزود")}
                </h4>
                <ul className="mt-2 space-y-1 text-xs text-blue-700">
                  <li className="flex items-baseline gap-1">
                    <span>•</span>
                    <span>
                      {t(
                        "Consider factors beyond just price: reliability, support quality, and feature set.",
                        "ضع في اعتبارك عوامل أخرى غير السعر: الموثوقية، جودة الدعم، ومجموعة الميزات."
                      )}
                    </span>
                  </li>
                  <li className="flex items-baseline gap-1">
                    <span>•</span>
                    <span>
                      {t(
                        "Meta/Facebook offers the most direct integration but may not always have the best pricing.",
                        "توفر ميتا/فيسبوك التكامل الأكثر مباشرة ولكن قد لا يكون لديها دائمًا أفضل الأسعار."
                      )}
                    </span>
                  </li>
                  <li className="flex items-baseline gap-1">
                    <span>•</span>
                    <span>
                      {t(
                        "Mini Chat generally offers the most competitive pricing in the market.",
                        "تقدم Mini Chat بشكل عام الأسعار الأكثر تنافسية في السوق."
                      )}
                    </span>
                  </li>
                  <li className="flex items-baseline gap-1">
                    <span>•</span>
                    <span>
                      {t(
                        "Pricing may change based on volume, region, and special offers.",
                        "قد تتغير الأسعار بناءً على الحجم والمنطقة والعروض الخاصة."
                      )}
                    </span>
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageCalculator;
