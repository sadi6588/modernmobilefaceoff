
import { ReactNode } from "react";

export interface BaseMenuLink {
  name: string;
  icon: ReactNode;
}

export interface ClickableMenuLink extends BaseMenuLink {
  onClick: () => void;
  href?: never; // Ensure onClick and href are mutually exclusive
}

export interface NavigationMenuLink extends BaseMenuLink {
  href: string;
  onClick?: never; // Ensure onClick and href are mutually exclusive
}

export type MenuLink = ClickableMenuLink | NavigationMenuLink;

// Helper function to check if a link is clickable (has onClick handler)
export const isClickableLink = (link: MenuLink): link is ClickableMenuLink => {
  return 'onClick' in link;
};
