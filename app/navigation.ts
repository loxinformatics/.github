import type { NavLinksMap } from "@/components/base/types";
import { apiURL, createNavDropdown, homeURL } from "@/components/base/utils";

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
      href: "/#list_page_1",
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
  footer_2: [],
  aside: [
    {
      type: "dropdown",
      text: "Schools",
      icon: "bi bi-shop",
      href: "#",
      children: createNavDropdown([
        { text: "Overview", href: "/dashboard" },
        { text: "Foundation", href: "/dashboard/schools/foundation" },
        { text: "Baptism", href: "/dashboard/schools/baptism" },
        { text: "Evangelism", href: "/dashboard/schools/evangelism" },
        {
          text: "Ministry",
          href: "/dashboard/schools/ministry",
          authorized: ["STAFF"],
        },
      ]),
    },
    { type: "heading", text: "Pages", href: "" },
    { text: "Home", icon: "bi bi-house", href: homeURL },
    {
      text: "Admin",
      icon: "bi bi-shield-lock",
      href: `${apiURL}/admin`,
      authorized: ["STAFF"],
    },
    { text: "Profile", href: "#", authorized: ["USER"], icon: "bi bi-person" },
    {
      type: "login/logout",
      loginText: "Login",
      logoutText: "Logout",
      icon: "bi bi-box-arrow-right",
      href: "#",
    },
  ],
};

export default navLinksMap;
