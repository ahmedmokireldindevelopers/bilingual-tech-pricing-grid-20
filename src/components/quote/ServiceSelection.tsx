
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Service {
  id: string;
  name: string;
  price: number;
}

interface ServiceSelectionProps {
  services: Service[];
  selectedServices: string[];
  onServiceToggle: (serviceId: string) => void;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({ 
  services, 
  selectedServices, 
  onServiceToggle 
}) => {
  const { isRtl } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {services.map(service => (
        <div key={service.id} className="flex items-start space-x-3 rtl:space-x-reverse">
          <Checkbox 
            id={service.id}
            checked={selectedServices.includes(service.id)}
            onCheckedChange={() => onServiceToggle(service.id)}
          />
          <div className="flex flex-col">
            <Label 
              htmlFor={service.id}
              className="font-medium cursor-pointer"
            >
              {service.name}
            </Label>
            <span className="text-sm text-muted-foreground">${service.price}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceSelection;
