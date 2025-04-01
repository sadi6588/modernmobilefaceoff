
import React from "react";
import { Phone } from "@/data/phonesData";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface PhoneCardProps {
  phone: Phone;
  onSelect?: () => void;
  selected?: boolean;
}

const PhoneCard: React.FC<PhoneCardProps> = ({ phone, onSelect, selected = false }) => {
  return (
    <Card 
      className={`glass-card transition-all duration-500 h-full ${
        selected ? "neon-border animate-pulse-neon" : "hover:neon-border"
      }`}
      onClick={onSelect}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium">
          <span className="text-sm text-neutral-400">{phone.brand}</span>
          <div className="flex items-center justify-between">
            <span>{phone.name}</span>
            <span className="text-neon-blue">{phone.price}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4 flex justify-center">
        <div className="h-48 relative">
          <img 
            src={phone.image} 
            alt={phone.name} 
            className="h-full object-contain drop-shadow-lg"
          />
        </div>
      </CardContent>
      <CardFooter>
        <button 
          className="btn-neon w-full"
          onClick={(e) => {
            e.stopPropagation();
            onSelect && onSelect();
          }}
        >
          {selected ? "Selected" : "Select for Comparison"}
        </button>
      </CardFooter>
    </Card>
  );
};

export default PhoneCard;
