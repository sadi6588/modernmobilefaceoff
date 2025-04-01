
import React, { useState, useEffect } from "react";
import { X, Menu, Smartphone, LineChart, Download, Info } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileMenuProps {
  onInstallClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onInstallClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Close menu when switching to desktop view
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);
  
  // Prevent scroll when menu is open on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, isMobile]);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const menuLinks = [
    { name: "Phones", icon: <Smartphone className="h-5 w-5" />, href: "#phones" },
    { name: "Compare", icon: <LineChart className="h-5 w-5" />, href: "#compare" },
    { name: "Install Database", icon: <Download className="h-5 w-5" />, onClick: onInstallClick },
    { name: "About", icon: <Info className="h-5 w-5" />, href: "#about" }
  ];
  
  return (
    <>
      {/* Hamburger Button */}
      <button 
        className="fixed top-4 right-4 z-50 p-3 glass-card rounded-full"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <div className="flex flex-col gap-1.5 justify-center items-center">
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </div>
        )}
      </button>
      
      {/* Menu Overlay */}
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
                {link.onClick ? (
                  <button 
                    onClick={() => {
                      link.onClick();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 text-xl group"
                  >
                    <span className="text-neon-blue group-hover:text-neon-purple transition-colors">
                      {link.icon}
                    </span>
                    <span className="group-hover:text-neon-blue transition-colors">
                      {link.name}
                    </span>
                  </button>
                ) : (
                  <a 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-xl group"
                  >
                    <span className="text-neon-blue group-hover:text-neon-purple transition-colors">
                      {link.icon}
                    </span>
                    <span className="group-hover:text-neon-blue transition-colors">
                      {link.name}
                    </span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      {/* Desktop Navigation */}
      {!isMobile && (
        <div className="fixed top-0 left-0 w-full z-30 bg-black/50 backdrop-blur-md border-b border-white/5">
          <div className="container mx-auto py-4 flex justify-between items-center">
            <a href="#" className="text-2xl font-bold neon-text">ModernMobile</a>
            <nav>
              <ul className="flex items-center gap-8">
                {menuLinks.map((link, index) => (
                  <li key={index}>
                    {link.onClick ? (
                      <button 
                        onClick={link.onClick}
                        className="hover:text-neon-blue transition-colors flex items-center gap-2"
                      >
                        {link.icon}
                        {link.name}
                      </button>
                    ) : (
                      <a 
                        href={link.href}
                        className="hover:text-neon-blue transition-colors flex items-center gap-2"
                      >
                        {link.icon}
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
