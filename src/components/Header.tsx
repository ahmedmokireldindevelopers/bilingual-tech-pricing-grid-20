import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone, Globe, MessageSquare, Menu, X, ShoppingBag, Tag, Calendar, Building2, ChevronDown, Store, Zap } from "lucide-react";

const Header = () => {
  const { t, toggleLanguage, language, isRtl } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pageLinks = [
    { href: "/store", label: t("Digital Store", "المتجر الرقمي"), icon: Store },
    { href: "/micwa-system", label: t("N8N Systems", "نظم الأتمتة"), icon: Zap },
    { href: "/products", label: t("Products", "المنتجات"), icon: ShoppingBag },
    { href: "/offers", label: t("Offers", "العروض"), icon: Tag },
    { href: "/real-estate", label: t("Real Estate", "العقارات"), icon: Building2 },
    { href: "/booking", label: t("Book Now", "احجز الآن"), icon: Calendar },
  ];

  const shouldShowLight = isHomePage && !isScrolled;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || !isHomePage
        ? 'bg-white shadow-sm border-b border-gray-100' 
        : 'bg-white/5 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto">
        <div className={`flex items-center justify-between py-2.5 px-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <Link to="/" className={`flex items-center gap-2 group ${isRtl ? 'flex-row-reverse' : ''}`} data-testid="link-logo">
            <div className="relative">
              <img 
                src="/attached_assets/my_logo_ahmed_1768850090136.png" 
                alt="Ahmed Mo Kireldin" 
                className="h-8 w-auto"
              />
            </div>
            <div className={`${isRtl ? 'text-right' : 'text-left'}`}>
              <h1 className={`text-base font-bold transition-colors leading-tight ${
                shouldShowLight ? 'text-white' : 'text-gray-900'
              }`}>
                Ahmed Mo Kireldin
              </h1>
            </div>
          </Link>

          <nav className={`hidden lg:flex items-center gap-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
            {pageLinks.map((link) => (
              <Link 
                key={link.href}
                to={link.href} 
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
                  location.pathname === link.href 
                    ? 'bg-blue-50 text-blue-600' 
                    : shouldShowLight 
                      ? 'text-white/90 hover:bg-white/10' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                data-testid={`link-nav-${link.href.replace('/', '')}`}
              >
                <link.icon className="w-3.5 h-3.5" />
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={`hidden md:flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-0.5 px-1 py-0.5 rounded-lg ${shouldShowLight ? 'bg-white/10' : 'bg-gray-50'}`}>
              <a 
                href="mailto:ahmedmokireldin@gmail.com" 
                className={`p-1.5 rounded-md transition-all ${
                  shouldShowLight 
                    ? 'hover:bg-white/20 text-white' 
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                }`}
                title="Email"
                data-testid="link-email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a 
                href="tel:+201004101309" 
                className={`p-1.5 rounded-md transition-all ${
                  shouldShowLight 
                    ? 'hover:bg-white/20 text-white' 
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                }`}
                title="Phone"
                data-testid="link-phone"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a 
                href="https://wa.me/201006334062" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`p-1.5 rounded-md transition-all ${
                  shouldShowLight 
                    ? 'hover:bg-white/20 text-white' 
                    : 'hover:bg-green-50 text-green-600 hover:text-green-700'
                }`}
                title="WhatsApp"
                data-testid="link-whatsapp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
            
            <Button 
              onClick={toggleLanguage} 
              variant="outline"
              size="sm"
              className={`h-8 px-3 text-xs font-medium gap-1.5 ${
                shouldShowLight 
                  ? 'border-white/30 text-white hover:bg-white/10 bg-white/5' 
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
              data-testid="button-language-toggle"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === "en" ? "العربية" : "English"}</span>
            </Button>
          </div>

          <button 
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              shouldShowLight ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className={`lg:hidden border-t ${shouldShowLight ? 'border-white/10 bg-white/5' : 'border-gray-100 bg-white'}`}>
            <nav className="flex flex-col p-2">
              {pageLinks.map((link) => (
                <Link 
                  key={link.href}
                  to={link.href} 
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    location.pathname === link.href
                      ? 'bg-blue-50 text-blue-600'
                      : shouldShowLight 
                        ? 'text-white hover:bg-white/10' 
                        : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid={`link-mobile-nav-${link.href.replace('/', '')}`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className={`flex items-center justify-between p-3 border-t ${shouldShowLight ? 'border-white/10' : 'border-gray-100'}`}>
              <div className="flex items-center gap-1">
                <a
                  href="mailto:ahmedmokireldin@gmail.com"
                  className={`p-2 rounded-lg ${shouldShowLight ? 'text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href="tel:+201004101309"
                  className={`p-2 rounded-lg ${shouldShowLight ? 'text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  aria-label="Phone"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/201006334062"
                  className={`p-2 rounded-lg ${shouldShowLight ? 'text-white' : 'text-green-600 hover:bg-green-50'}`}
                  aria-label="WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>
              <Button 
                onClick={toggleLanguage} 
                variant="outline"
                size="sm"
                className="h-8 px-3 text-xs"
              >
                <Globe className="w-3.5 h-3.5 mr-1.5" />
                {language === "en" ? "العربية" : "English"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
