"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../../context/auth";
import { useCore } from "../../context/core";
import type { AnchorProps } from "../../types/base";

export default function Anchor({ href, id, className, children }: AnchorProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, privateRoutes } = useAuth();
  const { isNavModalOpen, setIsNavModalOpen, asideExists, toggleAside } =
    useCore();

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
    asideExists && toggleAside("closeOnMobile");
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
    <Link
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
    </Link>
  );
}
