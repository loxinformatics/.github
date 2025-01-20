// Define images remote patterns
export const imagesRemotePatterns = [
  {
    protocol:
      (process.env.NEXT_PUBLIC_API_PROTOCOL as "http" | "https") || "http",
    hostname:
      process.env.NEXT_PUBLIC_API_HOST?.replace(/\/+$/, "") || "localhost",
    port: process.env.NEXT_PUBLIC_API_PORT || "",
    pathname: "/**",
  },
];

// Define server actions allowed origins
export const serverActionsAllowedOrigins = [
  `localhost:${process.env.NEXT_PUBLIC_WEB_PORT || "3000"}`,
  `127.0.0.1:${process.env.NEXT_PUBLIC_WEB_PORT || "3000"}`,
  process.env.NEXT_PUBLIC_WEB_HOST,
].filter((origin): origin is string => Boolean(origin));

export const apiURL =
  `${process.env.NEXT_PUBLIC_API_PROTOCOL || "http"}://` +
  `${process.env.NEXT_PUBLIC_API_HOST?.replace(/\/+$/, "") || "localhost"}` +
  `${
    process.env.NEXT_PUBLIC_API_PORT
      ? ":" + process.env.NEXT_PUBLIC_API_PORT
      : ""
  }` +
  `${
    !!process.env.NEXT_PUBLIC_API_BASEPATH
      ? "/" + process.env.NEXT_PUBLIC_API_BASEPATH.replace(/^\/+|\/+$/g, "")
      : ""
  }`;

export const baseApiURL = `${apiURL}/base`;

export const homeURL = process.env.NEXT_PUBLIC_HOME_URL || "/";

export const handleHashLinkClick = (
  e: React.MouseEvent,
  href: string
): boolean => {
  const hashIndex = href.indexOf("#");

  if (hashIndex !== -1) {
    const hash = href.slice(hashIndex);
    const element = document.querySelector<HTMLElement>(hash);
    if (element) {
      e.preventDefault();
      scroll_to(hash);
      window.history.pushState(null, "", hash); // Update the URL without causing a page reload
      return true; // (debugging purposes)
    }
  }

  return false; // (debugging purposes)
};

const scroll_to = (el: string) => {
  const header: HTMLElement | null =
    document.querySelector<HTMLElement>('[id^="header_"]');
  const element = document.querySelector<HTMLElement>(el);
  const offset = header?.offsetHeight || 0;
  const elementPos = element?.offsetTop || 0;
  const currentScrollPos = window.scrollY || document.documentElement.scrollTop;

  if (Math.abs(currentScrollPos - (elementPos - offset)) > 1) {
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  }
};
