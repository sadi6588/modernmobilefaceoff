
import React from "react";
import { X } from "lucide-react";
import { MenuLink } from "@/types/navigation";
import MenuLinkComponent from "./MenuLink";

interface MobileNavigationProps {
  isOpen: boolean;
  menuLinks: MenuLink[];
  onClose: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  menuLinks,
  onClose,
}) => {
  return (
    <div 
      className={`fixed inset-0 bg-black/80 backdrop-blur-lg z-40 transition-all duration-500 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <nav className="h-full flex flex-col items-center justify-center">
        <ul className="flex flex-col items-center gap-8">
          {menuLinks.map((link, index) => (
            <li 
              key={index}
              className="opacity-0 animate-fade-in"
              style={{ 
                animationDelay: `${index * 0.1 + 0.2}s`,
                animationFillMode: "forwards"
              }}
            >
              <MenuLinkComponent 
                link={link} 
                onClick={onClose} 
                className="flex items-center gap-3 text-xl group"
              />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MobileNavigation;
