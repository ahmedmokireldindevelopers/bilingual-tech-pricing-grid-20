
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone, MessageSquare, MapPin, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-tech-dark via-tech-dark to-tech-blue/20 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-tech-blue/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-tech-purple/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/attached_assets/my_logo_ahmed_1768850090136.png" 
                alt="ahmedmokireldin" 
                className="h-12 w-auto"
              />
              <span className="font-bold text-2xl">{t("Ahmed Mo Kireldin", "أحمد مو كريلدين")}</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              {t(
                "Professional technical solutions for WhatsApp Business API, chatbots, and digital automation.",
                "حلول تقنية احترافية لواجهة برمجة تطبيقات واتساب بزنس وروبوتات الدردشة والأتمتة الرقمية."
              )}
            </p>
            <div className="flex gap-4">
              <a 
                href="mailto:ahmedmokireldin@gmail.com" 
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-tech-blue transition-colors"
                data-testid="link-footer-email"
              >
                <Mail size={18} />
              </a>
              <a 
                href="tel:+201004101309" 
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-tech-blue transition-colors"
                data-testid="link-footer-phone"
              >
                <Phone size={18} />
              </a>
              <a 
                href="https://wa.me/201006334062" 
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-green-600 transition-colors"
                data-testid="link-footer-whatsapp"
              >
                <MessageSquare size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6">{t("Quick Links", "روابط سريعة")}</h4>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-tech-blue" />
                  {t("Services", "الخدمات")}
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-tech-blue" />
                  {t("Pricing", "الأسعار")}
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-tech-blue" />
                  {t("Reviews", "التقييمات")}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-tech-blue" />
                  {t("Contact", "اتصل بنا")}
                </a>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-tech-blue" />
                  {t("Privacy Policy", "سياسة الخصوصية")}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-tech-blue" />
                  {t("Terms of Service", "شروط الخدمة")}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6">{t("Contact Info", "معلومات التواصل")}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <Mail size={18} className="mt-1 flex-shrink-0" />
                <span className="break-all">ahmedmokireldin@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={18} className="flex-shrink-0" />
                <span>+201004101309</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <MapPin size={18} className="flex-shrink-0" />
                <span>{t("Egypt", "مصر")}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} {t("Ahmed Mo Kireldin. All rights reserved.", "أحمد مو كريلدين. جميع الحقوق محفوظة.")}
          </p>
          <button 
            onClick={scrollToTop}
            className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-tech-blue transition-colors"
            data-testid="button-scroll-top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
