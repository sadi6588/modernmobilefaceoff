
import React from "react";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import { MenuLink } from "@/types/navigation";
import MenuLinkComponent from "./MenuLink";
import { Admin } from "@/data/phonesData";

interface DesktopNavigationProps {
  regularLinks: MenuLink[];
  adminLinks: MenuLink[];
  admin: Admin | null;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  regularLinks,
  adminLinks,
  admin
}) => {
  return (
    <div className="fixed top-0 left-0 w-full z-30 bg-black/50 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold neon-text">ModernMobile</a>
        <nav>
          <ul className="flex items-center gap-6">
            {regularLinks.map((link, index) => (
              <li key={index}>
                <MenuLinkComponent 
                  link={link}
                  className="hover:text-neon-blue transition-colors flex items-center gap-2"
                />
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
                    <MenuLinkComponent
                      link={link}
                      className="hover:text-neon-purple transition-colors flex items-center gap-2"
                    />
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
  );
};

export default DesktopNavigation;
