
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TotalDisplayProps {
  total: number;
}

const TotalDisplay: React.FC<TotalDisplayProps> = ({ total }) => {
  const { t } = useLanguage();
  
  return (
    <div className="mt-8 text-right border-t pt-4">
      <p className="text-lg font-bold">
        {t("Total", "المجموع")}: <span className="text-tech-accent">${total}</span>
      </p>
    </div>
  );
};

export default TotalDisplay;
