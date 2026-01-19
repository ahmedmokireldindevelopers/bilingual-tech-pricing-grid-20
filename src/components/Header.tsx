
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone, Globe, MessageSquare, Menu, X } from "lucide-react";

const Header = () => {
  const { t, toggleLanguage, language } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: t("Services", "الخدمات") },
    { href: "#pricing", label: t("Pricing", "الأسعار") },
    { href: "#testimonials", label: t("Reviews", "التقييمات") },
    { href: "#contact", label: t("Contact", "اتصل بنا") },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group" data-testid="link-logo">
            <div className={`p-2.5 rounded-xl transition-all duration-300 ${
              isScrolled 
                ? 'bg-gradient-to-br from-tech-blue to-tech-purple shadow-lg' 
                : 'bg-white/20 backdrop-blur-sm border border-white/30'
            }`}>
              <span className="font-bold text-xl text-white">TS</span>
            </div>
            <h1 className={`text-xl font-bold transition-colors ${
              isScrolled ? 'text-tech-dark' : 'text-white'
            }`}>
              {t("Tech Services", "الخدمات التقنية")}
            </h1>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className={`font-medium transition-colors hover:text-tech-blue ${
                  isScrolled ? 'text-tech-dark/80' : 'text-white/90'
                }`}
                data-testid={`link-nav-${link.href.replace('#', '')}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-3">
              <a 
                href="mailto:ahmedmokireldin@gmail.com" 
                className={`p-2 rounded-lg transition-colors ${
                  isScrolled 
                    ? 'hover:bg-gray-100 text-tech-dark' 
                    : 'hover:bg-white/10 text-white'
                }`}
                data-testid="link-email"
              >
                <Mail size={18} />
              </a>
              <a 
                href="tel:+201004101309" 
                className={`p-2 rounded-lg transition-colors ${
                  isScrolled 
                    ? 'hover:bg-gray-100 text-tech-dark' 
                    : 'hover:bg-white/10 text-white'
                }`}
                data-testid="link-phone"
              >
                <Phone size={18} />
              </a>
              <a 
                href="https://wa.me/201006334062" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`p-2 rounded-lg transition-colors ${
                  isScrolled 
                    ? 'hover:bg-green-100 text-green-600' 
                    : 'hover:bg-white/10 text-white'
                }`}
                data-testid="link-whatsapp"
              >
                <MessageSquare size={18} />
              </a>
            </div>
            
            <Button 
              onClick={toggleLanguage} 
              variant={isScrolled ? "outline" : "ghost"}
              size="sm"
              className={`flex items-center gap-2 ${
                !isScrolled && 'border-white/30 text-white hover:bg-white/10'
              }`}
              data-testid="button-language-toggle"
            >
              <Globe size={16} />
              <span>{language === "en" ? "العربية" : "English"}</span>
            </Button>
          </div>

          <button 
            className={`lg:hidden p-2 rounded-lg ${
              isScrolled ? 'text-tech-dark' : 'text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200/20">
            <nav className="flex flex-col gap-2 mt-4">
              {navLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                    isScrolled 
                      ? 'text-tech-dark hover:bg-gray-100' 
                      : 'text-white hover:bg-white/10'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid={`link-mobile-nav-${link.href.replace('#', '')}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200/20">
              <div className="flex items-center gap-2">
                <a href="mailto:ahmedmokireldin@gmail.com" className={`p-2 rounded-lg ${isScrolled ? 'text-tech-dark' : 'text-white'}`}>
                  <Mail size={18} />
                </a>
                <a href="tel:+201004101309" className={`p-2 rounded-lg ${isScrolled ? 'text-tech-dark' : 'text-white'}`}>
                  <Phone size={18} />
                </a>
                <a href="https://wa.me/201006334062" className={`p-2 rounded-lg ${isScrolled ? 'text-green-600' : 'text-white'}`}>
                  <MessageSquare size={18} />
                </a>
              </div>
              <Button 
                onClick={toggleLanguage} 
                variant="outline"
                size="sm"
                className={`flex items-center gap-2 ${!isScrolled && 'border-white/30 text-white'}`}
              >
                <Globe size={16} />
                <span>{language === "en" ? "العربية" : "English"}</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
