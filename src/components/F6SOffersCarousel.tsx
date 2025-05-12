
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, DollarSign, Package } from "lucide-react";

// F6S top offers data
const f6sOffers = [
  {
    id: 1,
    title: "AWS Activate Portfolio",
    description: "AWS credits for eligible startups, plus technical support and training",
    value: "$100,000",
    category: "Cloud Credits",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    link: "https://www.f6s.com/deals/aws-activate-portfolio"
  },
  {
    id: 2,
    title: "Google Cloud for Startups",
    description: "Cloud credits, plus business and technical support for qualified startups",
    value: "$100,000",
    category: "Cloud Credits",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
    link: "https://www.f6s.com/deals/google-cloud-for-startups"
  },
  {
    id: 3,
    title: "HubSpot for Startups",
    description: "Up to 90% off HubSpot software for eligible startups",
    value: "$40,000+",
    category: "Marketing & Sales",
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/hubspot.svg",
    link: "https://www.f6s.com/deals/hubspot-for-startups"
  },
  {
    id: 4,
    title: "Microsoft for Startups Founders Hub",
    description: "Free access to Microsoft tools, mentorship, and technical support",
    value: "$150,000",
    category: "Cloud & Development",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
    link: "https://www.f6s.com/deals/microsoft-for-startups-founders-hub"
  },
  {
    id: 5,
    title: "Stripe Atlas",
    description: "Tools and guidance to incorporate your company and set up payments",
    value: "$500+",
    category: "Business Formation",
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/stripe.svg",
    link: "https://www.f6s.com/deals/stripe-atlas"
  },
  {
    id: 6,
    title: "Notion for Startups",
    description: "Credits for Notion's workspace platform for eligible startups",
    value: "$1,000",
    category: "Productivity",
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/notion.svg",
    link: "https://www.f6s.com/deals/notion-for-startups"
  },
  {
    id: 7,
    title: "Amplitude for Startups",
    description: "Free Amplitude Growth plan for eligible startups",
    value: "$40,000",
    category: "Analytics",
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/amplitude.svg",
    link: "https://www.f6s.com/deals/amplitude-for-startups"
  },
  {
    id: 8,
    title: "MongoDB for Startups",
    description: "Credits for MongoDB Atlas and technical support",
    value: "$5,000",
    category: "Database",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg",
    link: "https://www.f6s.com/deals/mongodb-for-startups"
  },
  {
    id: 9,
    title: "Airtable for Startups",
    description: "Credits towards any Airtable plan for eligible startups",
    value: "$2,000",
    category: "Productivity",
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/airtable.svg",
    link: "https://www.f6s.com/deals/airtable-for-startups"
  },
  {
    id: 10,
    title: "Twilio Startups",
    description: "Credits for SMS, voice, and other communication APIs",
    value: "$3,000",
    category: "Communication",
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twilio.svg",
    link: "https://www.f6s.com/deals/twilio-startups"
  }
];

const F6SOffersCarousel: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const [api, setApi] = useState<any>(null);

  useEffect(() => {
    if (!api) return;
    
    // Auto-play functionality
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section id="f6s-offers" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${isRtl ? 'font-arabic' : 'font-english'}`}>
            {t("Top F6S Startup Offers", "أفضل عروض F6S للشركات الناشئة")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t(
              "We help you apply for and secure these valuable resources from the F6S platform to boost your startup growth.",
              "نساعدك في التقديم والحصول على هذه الموارد القيمة من منصة F6S لتعزيز نمو شركتك الناشئة."
            )}
          </p>
          <a 
            href="https://www.f6s.com/deals" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block mt-4 text-tech-blue hover:text-tech-purple"
          >
            {t("Browse all F6S deals →", "تصفح جميع عروض F6S ←")}
          </a>
        </div>

        <div className="relative mx-auto max-w-7xl px-8">
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {f6sOffers.map((offer) => (
                <CarouselItem key={offer.id} className="md:basis-1/2 lg:basis-1/3 p-1">
                  <Card className="h-full border-2 hover:border-tech-blue transition-all duration-300 hover:shadow-lg">
                    <CardHeader className="pb-2">
                      <div className="h-16 flex items-center justify-between mb-2">
                        <div className="w-16 h-16 flex items-center justify-center">
                          {offer.logo ? (
                            <img 
                              src={offer.logo} 
                              alt={offer.title}
                              className="max-h-12 max-w-12 object-contain"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement?.appendChild(
                                  Object.assign(document.createElement('div'), {
                                    className: 'flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full',
                                    innerHTML: `<span class="text-gray-500 text-lg font-bold">${offer.title.charAt(0)}</span>`,
                                  })
                                );
                              }}
                            />
                          ) : (
                            <Package className="w-12 h-12 text-tech-blue" />
                          )}
                        </div>
                        <div className="flex items-center">
                          <Badge variant="outline" className="px-3 py-1 bg-blue-50">
                            {offer.category}
                          </Badge>
                        </div>
                      </div>
                      <CardTitle className="text-xl">{offer.title}</CardTitle>
                      <CardDescription className="text-2xl font-bold text-tech-accent flex items-center">
                        <DollarSign className="w-5 h-5 mr-1" />
                        {offer.value}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        {offer.description}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <a 
                        href={offer.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-tech-blue hover:text-tech-purple font-medium"
                      >
                        {t("Learn more →", "معرفة المزيد ←")}
                      </a>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden sm:block">
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default F6SOffersCarousel;
