import type { NavLinksMap } from "@/olyv/types/core";

const navLinksMap: NavLinksMap = {
  header: [
    { text: "Home", icon: "bi bi-house-door", href: "/#hero_page_1" },
    {
      text: "About",
      icon: "bi bi-info-circle",
      href: "/#about_page_1",
    },
    {
      text: "Services",
      icon: "bi bi-briefcase",
      href: "/#listdescriptions_page_1",
    },
    { text: "Contact", icon: "bi bi-envelope", href: "/#contact_page_1" },
  ],
  footer_1: [
    { text: "Useful Links", type: "heading" },
    { text: "Home", href: "/#hero_page_1" },
    { text: "About us", href: "/#about_page_1" },
    { text: "Our Services", href: "/#list_page_1" },
    { text: "Terms of service", href: "#" },
    { text: "Privacy policy", href: "#" },
  ],
  footer_2: [
  ],
};

export default navLinksMap;
