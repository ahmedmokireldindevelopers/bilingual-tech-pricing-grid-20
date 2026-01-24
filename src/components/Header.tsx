
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone, Globe, MessageSquare, Menu, X, ShoppingBag, Tag, Calendar, Building2 } from "lucide-react";

const Header = () => {
  const { t, toggleLanguage, language } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pageLinks = [
    { href: "/products", label: t("Products", "المنتجات"), icon: ShoppingBag },
    { href: "/offers", label: t("Offers", "العروض"), icon: Tag },
    { href: "/real-estate", label: t("Real Estate", "العقارات"), icon: Building2 },
    { href: "/booking", label: t("Book Now", "احجز الآن"), icon: Calendar },
  ];

  const sectionLinks = [
    { href: "#services", label: t("Services", "الخدمات") },
    { href: "#pricing", label: t("Pricing", "الأسعار") },
    { href: "#contact", label: t("Contact", "اتصل بنا") },
  ];

  const shouldShowLight = isHomePage && !isScrolled;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || !isHomePage
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group" data-testid="link-logo">
            <img 
              src="/attached_assets/my_logo_ahmed_1768850090136.png" 
              alt="ahmedmokireldin" 
              className="h-10 w-auto"
            />
            <h1 className={`text-xl font-bold transition-colors ${
              shouldShowLight ? 'text-white' : 'text-tech-dark'
            }`}>
              {t("Ahmed Mo Kireldin", "أحمد مو كريلدين")}
            </h1>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {isHomePage && sectionLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className={`font-medium transition-colors hover:text-tech-blue ${
                  shouldShowLight ? 'text-white/90' : 'text-tech-dark/80'
                }`}
                data-testid={`link-nav-${link.href.replace('#', '')}`}
              >
                {link.label}
              </a>
            ))}
            {pageLinks.map((link) => (
              <Link 
                key={link.href}
                to={link.href} 
                className={`font-medium transition-colors hover:text-tech-blue flex items-center gap-1.5 ${
                  location.pathname === link.href 
                    ? 'text-tech-blue' 
                    : shouldShowLight ? 'text-white/90' : 'text-tech-dark/80'
                }`}
                data-testid={`link-nav-${link.href.replace('/', '')}`}
              >
                <link.icon size={16} />
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-3">
              <a 
                href="mailto:ahmedmokireldin@gmail.com" 
                className={`p-2 rounded-lg transition-colors ${
                  shouldShowLight 
                    ? 'hover:bg-white/10 text-white' 
                    : 'hover:bg-gray-100 text-tech-dark'
                }`}
                data-testid="link-email"
              >
                <Mail size={18} />
              </a>
              <a 
                href="tel:+201004101309" 
                className={`p-2 rounded-lg transition-colors ${
                  shouldShowLight 
                    ? 'hover:bg-white/10 text-white' 
                    : 'hover:bg-gray-100 text-tech-dark'
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
                  shouldShowLight 
                    ? 'hover:bg-white/10 text-white' 
                    : 'hover:bg-green-100 text-green-600'
                }`}
                data-testid="link-whatsapp"
              >
                <MessageSquare size={18} />
              </a>
            </div>
            
            <Button 
              onClick={toggleLanguage} 
              variant={shouldShowLight ? "ghost" : "outline"}
              size="sm"
              className={`flex items-center gap-2 ${
                shouldShowLight && 'border-white/30 text-white hover:bg-white/10'
              }`}
              data-testid="button-language-toggle"
            >
              <Globe size={16} />
              <span>{language === "en" ? "العربية" : "English"}</span>
            </Button>
          </div>

          <button 
            className={`lg:hidden p-2 rounded-lg ${
              shouldShowLight ? 'text-white' : 'text-tech-dark'
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
              {isHomePage && sectionLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                    shouldShowLight 
                      ? 'text-white hover:bg-white/10' 
                      : 'text-tech-dark hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid={`link-mobile-nav-${link.href.replace('#', '')}`}
                >
                  {link.label}
                </a>
              ))}
              {pageLinks.map((link) => (
                <Link 
                  key={link.href}
                  to={link.href} 
                  className={`py-2 px-4 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    location.pathname === link.href
                      ? 'text-tech-blue bg-tech-blue/10'
                      : shouldShowLight 
                        ? 'text-white hover:bg-white/10' 
                        : 'text-tech-dark hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid={`link-mobile-nav-${link.href.replace('/', '')}`}
                >
                  <link.icon size={16} />
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200/20">
              <div className="flex items-center gap-2">
                <a href="mailto:ahmedmokireldin@gmail.com" className={`p-2 rounded-lg ${shouldShowLight ? 'text-white' : 'text-tech-dark'}`}>
                  <Mail size={18} />
                </a>
                <a href="tel:+201004101309" className={`p-2 rounded-lg ${shouldShowLight ? 'text-white' : 'text-tech-dark'}`}>
                  <Phone size={18} />
                </a>
                <a href="https://wa.me/201006334062" className={`p-2 rounded-lg ${shouldShowLight ? 'text-white' : 'text-green-600'}`}>
                  <MessageSquare size={18} />
                </a>
              </div>
              <Button 
                onClick={toggleLanguage} 
                variant="outline"
                size="sm"
                className={`flex items-center gap-2 ${shouldShowLight && 'border-white/30 text-white'}`}
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
