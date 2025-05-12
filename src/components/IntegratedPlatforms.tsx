
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const IntegratedPlatforms: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const [autoPlay, setAutoPlay] = useState(true);

  // Updated platforms with more reliable icon paths and better quality images
  const platforms = [
    {
      name: "Facebook",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/facebook.svg",
      color: "#1877F2",
      link: "https://www.facebook.com/business",
    },
    {
      name: "WhatsApp",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/whatsapp.svg",
      color: "#25D366",
      link: "https://business.whatsapp.com/",
    },
    {
      name: "Instagram",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/instagram.svg",
      color: "#E4405F",
      link: "https://business.instagram.com/",
    },
    {
      name: "SendPulse",
      icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@develop/icons/mailchimp.svg", // Using alternative icon
      color: "#0084FF",
      link: "https://sendpulse.com/",
    },
    {
      name: "WordPress",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/wordpress.svg",
      color: "#21759B",
      link: "https://wordpress.org/",
    },
    {
      name: "Make.com",
      icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@develop/icons/zapier.svg", // Using alternative icon
      color: "#000000",
      link: "https://www.make.com/",
    },
    {
      name: "N8N",
      icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@develop/icons/nodered.svg", // Using alternative icon
      color: "#6933FF",
      link: "https://n8n.io/",
    },
    {
      name: "Zapier",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/zapier.svg",
      color: "#FF4A00",
      link: "https://zapier.com/",
    },
    {
      name: "Shopify",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/shopify.svg",
      color: "#7AB55C",
      link: "https://www.shopify.com/",
    },
    {
      name: "WooCommerce",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/woo.svg",
      color: "#96588A",
      link: "https://woocommerce.com/",
    },
  ];

  useEffect(() => {
    const timer = autoPlay
      ? setInterval(() => {
          document.querySelector(".carousel-next")?.dispatchEvent(
            new MouseEvent("click", {
              view: window,
              bubbles: true,
              cancelable: true,
            })
          );
        }, 3000)
      : null;

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [autoPlay]);

  return (
    <section id="integrations" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className={`section-title text-center ${isRtl ? 'font-arabic' : 'font-english'}`}>
          {t("Integrated Platforms", "المنصات المتكاملة")}
        </h2>
        <p className="section-subtitle text-center">
          {t(
            "Connect and automate your workflow with these powerful platforms",
            "قم بالربط وأتمتة سير العمل الخاص بك مع هذه المنصات القوية"
          )}
        </p>

        <div className="mt-12 relative">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
          >
            <CarouselContent>
              {platforms.map((platform, index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                  <a 
                    href={platform.link}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block"
                    aria-label={`Visit ${platform.name} website`}
                  >
                    <div className="platform-card animate-fade-in h-40 flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      <div 
                        className="w-20 h-20 mb-3 rounded-full flex items-center justify-center p-3 relative overflow-hidden shadow-md"
                        style={{ backgroundColor: `${platform.color}20` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/10 animate-pulse" />
                        <img
                          src={platform.icon}
                          alt={platform.name}
                          className="w-14 h-14 object-contain"
                          loading="lazy"
                          style={{ filter: `invert(${platform.color === '#000000' ? 1 : 0})` }}
                          onError={(e) => {
                            const target = e.currentTarget;
                            // Fallback to a data URI with the platform initial
                            target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Crect width='56' height='56' fill='%23${platform.color.replace('#', '')}' rx='28' /%3E%3Ctext x='28' y='35' text-anchor='middle' font-family='Arial' font-size='24' font-weight='bold' fill='white'%3E${platform.name.charAt(0)}%3C/text%3E%3C/svg%3E`;
                          }}
                        />
                      </div>
                      <h3 className="text-center font-medium">{platform.name}</h3>
                    </div>
                  </a>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="carousel-prev -left-4 md:-left-6 lg:-left-8" />
            <CarouselNext className="carousel-next -right-4 md:-right-6 lg:-right-8" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default IntegratedPlatforms;
