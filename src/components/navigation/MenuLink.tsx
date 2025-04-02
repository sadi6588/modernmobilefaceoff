
import React from "react";
import { Link } from "react-router-dom";
import { MenuLink, isClickableLink } from "@/types/navigation";

interface MenuLinkProps {
  link: MenuLink;
  onClick?: () => void; // Optional callback when link is clicked (e.g., to close menu)
  className?: string;
}

const MenuLinkComponent: React.FC<MenuLinkProps> = ({ link, onClick, className }) => {
  if (isClickableLink(link)) {
    return (
      <button 
        onClick={() => {
          link.onClick();
          if (onClick) onClick();
        }}
        className={className}
      >
        <span className="text-neon-blue group-hover:text-neon-purple transition-colors">
          {link.icon}
        </span>
        <span className="group-hover:text-neon-blue transition-colors">
          {link.name}
        </span>
      </button>
    );
  }

  return (
    <Link 
      to={link.href}
      onClick={onClick}
      className={className}
    >
      <span className="text-neon-blue group-hover:text-neon-purple transition-colors">
        {link.icon}
      </span>
      <span className="group-hover:text-neon-blue transition-colors">
        {link.name}
      </span>
    </Link>
  );
};

export default MenuLinkComponent;
