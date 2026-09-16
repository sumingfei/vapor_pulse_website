export type NavLink = {
  href: string;
  label: string;
};

/** Primary navigation, shared by the header, mobile drawer and footer. */
export const mainNav: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/rewards", label: "Rewards" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const footerNav: NavLink[] = [
  { href: "/products", label: "Products" },
  { href: "/rewards", label: "Rewards" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export const legalNav: NavLink[] = [
  { href: "/age-policy", label: "Age Policy" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];
