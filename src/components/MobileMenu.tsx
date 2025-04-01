
import React, { useState, useEffect } from "react";
import { X, Menu, Smartphone, LineChart, Download, Info, Users, Settings } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import { useAdminAuth } from "@/hooks/use-admin-auth";

interface MobileMenuProps {
  onInstallClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onInstallClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const { admin } = useAdminAuth();
  
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
  
  // Regular menu links for all users
  const regularLinks = [
    { name: "Phones", icon: <Smartphone className="h-5 w-5" />, href: "#phones" },
    { name: "Compare", icon: <LineChart className="h-5 w-5" />, href: "#compare" },
    { name: "Install Database", icon: <Download className="h-5 w-5" />, onClick: onInstallClick },
    { name: "About", icon: <Info className="h-5 w-5" />, href: "#about" }
  ];
  
  // Admin links - only visible when logged in as admin
  const adminLinks = admin ? [
    { name: "Admin Dashboard", icon: <Settings className="h-5 w-5" />, href: "/admin/dashboard" },
    { name: "Phone Management", icon: <Smartphone className="h-5 w-5" />, href: "/admin/dashboard?tab=phones" }
  ] : [];
  
  // Combine all links, with a login link if not logged in
  const menuLinks = [
    ...regularLinks,
    ...adminLinks,
    // Add login link if not logged in
    ...(admin ? [] : [{ name: "Admin Login", icon: <Users className="h-5 w-5" />, href: "/admin/login" }])
  ];
  
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
                  <Link 
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-xl group"
                  >
                    <span className="text-neon-blue group-hover:text-neon-purple transition-colors">
                      {link.icon}
                    </span>
                    <span className="group-hover:text-neon-blue transition-colors">
                      {link.name}
                    </span>
                  </Link>
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
              <ul className="flex items-center gap-6">
                {regularLinks.map((link, index) => (
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
                
                {/* Admin section for desktop */}
                {admin ? (
                  <>
                    <li>
                      <div className="border-l h-6 mx-2 border-white/20"></div>
                    </li>
                    {adminLinks.map((link, index) => (
                      <li key={`admin-${index}`}>
                        <Link
                          to={link.href}
                          className="hover:text-neon-purple transition-colors flex items-center gap-2"
                        >
                          {link.icon}
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </>
                ) : (
                  <li>
                    <Link
                      to="/admin/login"
                      className="hover:text-neon-purple transition-colors flex items-center gap-2"
                    >
                      <Users className="h-5 w-5" />
                      Admin Login
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
