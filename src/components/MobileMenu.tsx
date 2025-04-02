
import React, { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { useNavigationLinks } from "@/hooks/use-navigation-links";
import MobileNavigation from "./navigation/MobileNavigation";
import DesktopNavigation from "./navigation/DesktopNavigation";

interface MobileMenuProps {
  onInstallClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onInstallClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const { admin } = useAdminAuth();
  
  const { regularLinks, adminLinks, menuLinks } = useNavigationLinks({ 
    admin, 
    onInstallClick 
  });
  
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
  
  const toggleMenu = () => {
    console.log("Toggling menu, current state:", isOpen);
    setIsOpen(!isOpen);
  };
  
  const closeMenu = () => setIsOpen(false);
  
  return (
    <>
      {/* Hamburger Button - Always visible in mobile mode */}
      {isMobile && (
        <button 
          className="fixed top-4 right-4 z-50 p-3 glass-card rounded-full bg-black/30 backdrop-blur-md border border-white/10 hover:bg-black/40 transition-colors"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
      )}
      
      {/* Mobile Navigation */}
      {isMobile && (
        <MobileNavigation 
          isOpen={isOpen} 
          menuLinks={menuLinks} 
          onClose={closeMenu}
        />
      )}
      
      {/* Desktop Navigation */}
      {!isMobile && (
        <DesktopNavigation 
          regularLinks={regularLinks} 
          adminLinks={adminLinks} 
          admin={admin}
        />
      )}
    </>
  );
};

export default MobileMenu;
