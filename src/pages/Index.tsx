
import React, { useEffect } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import DetailedPlans from "@/components/DetailedPlans";
import IntegratedPlatforms from "@/components/IntegratedPlatforms";
import TestimonialsSection from "@/components/TestimonialsSection";
import NotesSection from "@/components/NotesSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Set the page title
    document.title = "Tech Services - Professional Technical Solutions";
    
    // Add smooth scrolling for anchor links
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

    // Scroll to section if URL contains hash
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
          <ServicesSection />
          <IntegratedPlatforms />
          <PricingSection />
          <DetailedPlans />
          <TestimonialsSection />
          <NotesSection />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
