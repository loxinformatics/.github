"use client";

import { default as NextLink } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { use_Auth } from "../../../../_auth/app/_Auth";
import { useBase } from "../../../app";

export default function Link({
  href,
  id,
  className,
  children,
}: {
  href?: string;
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, privateRoutes } = use_Auth();
  const {
    isNavModalOpen,
    setIsNavModalOpen,
    asideExists,
    isAsideOpen,
    setIsAsideOpen,
  } = useBase();

  const scroll_to = (el: string) => {
    const header: HTMLElement | null =
      document.querySelector<HTMLElement>('[id^="header_"]');
    const element = document.querySelector<HTMLElement>(el);
    const offset = header?.offsetHeight || 0;
    const elementPos = element?.offsetTop || 0;
    const currentScrollPos =
      window.scrollY || document.documentElement.scrollTop;

    if (Math.abs(currentScrollPos - (elementPos - offset)) > 1) {
      window.scrollTo({
        top: elementPos - offset,
        behavior: "smooth",
      });
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Handle aside and nav modal state
    asideExists && isAsideOpen && setIsAsideOpen(false);
    isNavModalOpen && setIsNavModalOpen(false);

    if (!href) return;

    // Handle hash navigation
    const hashIndex = href.indexOf("#");
    if (hashIndex !== -1) {
      const hash = href.slice(hashIndex);
      if (hash !== "#") {
        const targetElement = document.querySelector<HTMLElement>(hash);
        if (targetElement) {
          e.preventDefault();
          scroll_to(hash);
          window.history.pushState({ scrollTarget: hash }, "", hash);
          return;
        }
      } else {
        e.preventDefault();
        return;
      }
    }

    // Handle private route navigation
    const isInPrivateRoutes = privateRoutes.some((route: string) =>
      href.startsWith(route)
    );

    if (isInPrivateRoutes && !user) {
      e.preventDefault();
      const param = `?callbackUrl=${pathname}`;
      router.push(href + param);
    }
  };

  if (!href) {
    return (
      <span id={id} className={className}>
        {children}
      </span>
    );
  }
  return (
    <NextLink
      {...((href.startsWith("http") || href.startsWith("https")) && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
      href={href}
      onClick={handleLinkClick}
      id={id}
      className={className}
    >
      {children}
    </NextLink>
  );
}
