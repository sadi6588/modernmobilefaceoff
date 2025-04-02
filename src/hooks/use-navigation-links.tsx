
import React from "react";
import { Smartphone, LineChart, Download, Info, Users, Settings } from "lucide-react";
import { MenuLink } from "@/types/navigation";
import { Admin } from "@/data/phonesData";
import { isDatabaseInstalled } from "@/lib/databaseStatus";

interface UseNavigationLinksProps {
  admin: Admin | null;
  onInstallClick: () => void;
}

export const useNavigationLinks = ({
  admin,
  onInstallClick
}: UseNavigationLinksProps) => {
  // Check if database is installed
  const dbInstalled = isDatabaseInstalled();
  
  // Regular menu links for all users
  const regularLinks: MenuLink[] = [
    { name: "Phones", icon: <Smartphone className="h-5 w-5" />, href: "#phones" },
    { name: "Compare", icon: <LineChart className="h-5 w-5" />, href: "#compare" },
    // Only show install database if not installed
    ...(dbInstalled ? [] : [
      { 
        name: "Install Database", 
        icon: <Download className="h-5 w-5" />, 
        onClick: onInstallClick 
      }
    ]),
    { name: "About", icon: <Info className="h-5 w-5" />, href: "#about" }
  ];
  
  // Admin links - only visible when logged in as admin
  const adminLinks: MenuLink[] = admin ? [
    { name: "Admin Dashboard", icon: <Settings className="h-5 w-5" />, href: "/admin/dashboard" },
    { name: "Phone Management", icon: <Smartphone className="h-5 w-5" />, href: "/admin/dashboard?tab=phones" }
  ] : [];
  
  // Combine all links, with a login link if not logged in
  const menuLinks: MenuLink[] = [
    ...regularLinks,
    ...adminLinks,
    // Add login link if not logged in
    ...(admin ? [] : [{ name: "Admin Login", icon: <Users className="h-5 w-5" />, href: "/admin/login" }])
  ];

  return {
    regularLinks,
    adminLinks, 
    menuLinks
  };
};
