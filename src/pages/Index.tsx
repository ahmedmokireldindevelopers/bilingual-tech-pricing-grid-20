
import { useEffect } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import DetailedPlans from "@/components/DetailedPlans";
import IntegratedPlatforms from "@/components/IntegratedPlatforms";
import TestimonialsSection from "@/components/TestimonialsSection";
import NotesSection from "@/components/NotesSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import FundingSection from "@/components/FundingSection";
import F6SOffersCarousel from "@/components/F6SOffersCarousel";
import QuoteGenerator from "@/components/QuoteGenerator";

const Index = () => {
  useEffect(() => {
    document.title = "ahmedmokireldin - Professional Technical Solutions";
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    if (window.location.hash) {
      const targetElement = document.querySelector(window.location.hash);
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main>
          <HeroSection />
          <ServicesSection />
          <FundingSection />
          <F6SOffersCarousel />
          <IntegratedPlatforms />
          <PricingSection />
          <DetailedPlans />
          <TestimonialsSection />
          <QuoteGenerator />
          <NotesSection />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
