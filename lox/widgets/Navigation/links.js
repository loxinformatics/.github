// links.js
const navlinks = {
  header: [
    {
      name: "Home",
      href: "/#hero",
      icon: "bi bi-house-door",
      hashlink: true,
    },
    {
      name: "About",
      href: "/#about",
      icon: "bi bi-info-circle",
      hashlink: true,
    },
    {
      name: "Services",
      href: "/#services",
      icon: "bi bi-tools",
      hashlink: true,
    },
    {
      name: "Contact",
      href: "/#contact",
      icon: "bi bi-envelope",
      hashlink: true,
    },
    // {
    //   name: "Schools",
    //   href: "/dashboard",
    //   icon: "bi bi-mortarboard",
    //   hashlink: false,
    // },
  ],
  aside: [
    { name: "Dashboard", href: "/dashboard", icon: "bi bi-mortarboard" },
    { name: "Home", href: "/", icon: "bi bi-house-door" },
    {
      name: "Login",
      href: "/auth?formType=login",
      icon: "bi bi-lock",
      hashlink: false,
    },
  ],
  footer: [
    { name: "Contact", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    // Add more links as needed
  ],
  // Add other sections as needed
};


export default navlinks;