import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowDown, MessageSquare, Sparkles, Zap } from "lucide-react";

const HeroSection = () => {
  const { t, isRtl } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-tech-dark via-tech-blue to-tech-purple">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTYgNmg2djZoLTZ2LTZ6bS02LTZoNnY2aC02di02em0wLTZoNnY2aC02di02em0tNiA2aDZ2Nmgtfli2di02em0wIDZoNnY2aC02di02em02LTEyaDZ2NmgtNnYtNnptLTYgMGg2djZoLTZ2LTZ6bS02IDBoNnY2aC02di02em0wIDZoNnY2aC02di02em0wIDZoNnY2aC02di02em0wIDZoNnY2aC02di02eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
      
      <div className="absolute top-20 left-10 w-72 h-72 bg-tech-purple/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-tech-blue/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-tech-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20">
            <Sparkles className="w-4 h-4 text-tech-accent" />
            <span className="text-white/90 text-sm font-medium">
              {t("Premium Technical Solutions", "حلول تقنية متميزة")}
            </span>
          </div>
          
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight ${isRtl ? 'font-arabic' : 'font-english'}`}>
            {t(
              "Transform Your Business with",
              "حوّل عملك مع"
            )}
            <span className="block mt-2 bg-gradient-to-r from-white via-tech-light to-tech-purple bg-clip-text text-transparent">
              {t("WhatsApp Business API", "واجهة برمجة تطبيقات واتساب")}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t(
              "Professional setup, chatbot development, and automation solutions to revolutionize your customer communication.",
              "إعداد احترافي وتطوير روبوتات الدردشة وحلول الأتمتة لإحداث ثورة في تواصلك مع العملاء."
            )}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-tech-dark hover:bg-white/90 font-semibold px-8 py-6 text-lg rounded-xl shadow-2xl shadow-white/20"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              data-testid="button-hero-contact"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              {t("Get Started Now", "ابدأ الآن")}
            </Button>
            <Button 
              size="lg" 
              className="bg-white/10 border-2 border-white/40 text-white hover:bg-white/20 backdrop-blur-sm font-semibold px-8 py-6 text-lg rounded-xl"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              data-testid="button-hero-services"
            >
              <Zap className="mr-2 h-5 w-5" />
              {t("Explore Services", "استكشف الخدمات")}
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">50+</div>
              <div className="text-white/60 text-sm mt-1">{t("Clients", "عميل")}</div>
            </div>
            <div className="text-center border-x border-white/20">
              <div className="text-3xl md:text-4xl font-bold text-white">99%</div>
              <div className="text-white/60 text-sm mt-1">{t("Satisfaction", "رضا")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">24/7</div>
              <div className="text-white/60 text-sm mt-1">{t("Support", "دعم")}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#services" className="text-white/60 hover:text-white transition-colors" data-testid="link-scroll-down">
          <ArrowDown className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
