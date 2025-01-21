"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAuth } from "../../providers/auth";
import { useBase } from "../../providers/base";
import { useCore } from "../../providers/core";
import type {
  HeaderHeroProps,
  HeaderNavProps,
  HeaderProps,
  HeroProps,
  ModalNavProps,
  NavLink,
} from "../../types/core";
import { handleHashLinkClick } from "../../utils/base";
import { Btn, Logo, Modal, ThemeToggler } from "../../widgets/base";
import { AsideToggler, Nav } from "../../widgets/core";
import styles from "./styles.module.css";

export default function HeaderHeroSection({
  component,
  section_instance,
  header_background,
  logo_version,
  header_nav,
  theme_toggler,
  hero_heading,
  hero_sub_heading,
  hero_paragraph,
  hero_image,
  hero_button_text,
  hero_button_href,
}: HeaderHeroProps) {
  const { textColorHover, bgBodyHover } = useBase();
  const { user, privateRoutes } = useAuth();
  const { createNavLinks, navLinksMap } = useCore();

  const headerProps = {
    section_instance,
    header_background,
    logo_version,
    header_nav,
    theme_toggler,
    hero_button_text,
    hero_button_href,
  };

  const heroProps = {
    section_instance,
    hero_heading,
    hero_sub_heading,
    hero_paragraph,
    hero_image,
    hero_button_text,
    hero_button_href,
  };

  const Header = ({
    headerPosition,
    headerBorder,
    header_background,
    logo_version,
    header_nav,
    theme_toggler,
    hero_button_text,
    hero_button_href,
    section_instance,
  }: HeaderProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const navLinks = createNavLinks(navLinksMap.header);

    const sectionId = section_instance || "";
    const position = headerPosition || "sticky";
    const border =
      headerBorder !== null ? (headerBorder === false ? false : true) : true;
    const headerBackground = header_background || "body";
    const heroButtonText = hero_button_text || "Get Started";
    const heroButtonHref = hero_button_href || "";
    const headerNav =
      header_nav !== null ? (header_nav === false ? false : true) : true;
    const themeToggler = theme_toggler || true;

    const HeaderNav = ({ linkColor }: HeaderNavProps) => {
      const navLinks_color = linkColor || "text-color-reverse dark:text-color";

      const handleLinkClick =
        (href: string | undefined) =>
        (e: React.MouseEvent<HTMLAnchorElement>) => {
          if (!href) return;
          handleHashLinkClick(e, href);

          const isInPrivateRoutes = privateRoutes.some((route: string) =>
            href.startsWith(route)
          );
          if (isInPrivateRoutes && !user) {
            e.preventDefault();
            const param = `?callbackUrl=${pathname}`;
            router.push(href + param);
          }
        };

      const renderLink = (link: NavLink, index: number) => {
        const Icon = link?.icon;
        return (
          <li key={`navbar-link-${index}`}>
            <Link
              className={`${navLinks_color} ${styles.header_navlink} ${textColorHover}`}
              href={link.href || "#"}
              onClick={handleLinkClick(link.href)}
            >
              {Icon && (
                <i className={`${Icon} ${styles.header_navlink_icon}`}></i>
              )}
              {link?.text}
            </Link>
          </li>
        );
      };

      return (
        <Nav
          className={styles.header_nav}
          links={navLinks}
          layout="header"
          renderLink={renderLink}
        />
      );
    };

    const ModalNav = ({ toggleColor }: ModalNavProps) => {
      const [isNavModalOpen, setIsNavModalOpen] = useState<boolean>(false);
      const [asideExists, setAsideExists] = useState<boolean>(false);

      const toggleMobileNavModal = () => {
        setIsNavModalOpen(!isNavModalOpen);
      };

      useEffect(() => {
        setAsideExists(!!document.querySelector("aside"));
      }, []);

      const handleLinkClick =
        (href: string | undefined) =>
        (e: React.MouseEvent<HTMLAnchorElement>) => {
          setIsNavModalOpen(false);
          if (!href) return;
          handleHashLinkClick(e, href);

          const isInPrivateRoutes = privateRoutes.some((route: string) =>
            href.startsWith(route)
          );
          if (isInPrivateRoutes && !user) {
            e.preventDefault();
            const param = `?callbackUrl=${pathname}`;
            router.push(href + param);
          }
        };

      const renderLink = (link: NavLink, index: number) => {
        const Icon = link?.icon;
        return (
          <li key={`modal-link-${index}`}>
            <Link
              className={`${styles.navLink} block px-4 py-2 transition-all ease-in-out duration-150 text-color dark:text-color-reverse ${bgBodyHover}`}
              href={link?.href || "#"}
              onClick={handleLinkClick(link.href)}
            >
              {Icon && <i className={`${Icon} ${styles.navLinkIcon}`}></i>}{" "}
              {link?.text}
            </Link>
          </li>
        );
      };

      return (
        !asideExists && (
          <Modal
            id="mobile-nav-toggle"
            toggleButtonColor={toggleColor}
            isModalOpen={isNavModalOpen}
            toggleModal={toggleMobileNavModal}
          >
            <Nav
              className={styles.modal_nav}
              links={navLinks}
              layout="modal"
              renderLink={renderLink}
            />
          </Modal>
        )
      );
    };

    const useHeaderStyles = (
      sectionId: string,
      headerPosition: string,
      headerBackground: string,
      headerBorder: boolean
    ) => {
      const { theme } = useTheme();
      const [isTransparent, setIsTransparent] = useState(true);
      const [hasShadow, setHasShadow] = useState(false);
      const [hasBorder, setHasBorder] = useState(headerBorder);
      const [showForwardButton, setShowForwardButton] = useState(false);

      useLayoutEffect(() => {
        const hero = document.querySelector<HTMLElement>(`#hero_${sectionId}`);
        const heroButton = document.querySelector<HTMLElement>(
          `#hero_button_${sectionId}`
        );
        const heroBottom = hero?.getBoundingClientRect().height ?? 0;

        const handleScroll = () => {
          setIsTransparent(
            window.scrollY <= 10 &&
              (headerBackground === "transparent" ||
                (!!hero && headerPosition === "fixed"))
          );
          setHasShadow(window.scrollY > heroBottom);
          setHasBorder(!headerBorder ? window.scrollY > heroBottom : true);
          setShowForwardButton(
            !!heroButton &&
              window.scrollY >
                heroButton.getBoundingClientRect().top + window.scrollY
          );
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, [headerPosition, headerBackground]);

      const color = isTransparent
        ? "text-color-reverse"
        : theme === "dark" || headerBackground === "dark"
        ? "text-color-reverse"
        : headerBackground === "body"
        ? "text-color dark:text-color-reverse"
        : "text-color";

      const classes = {
        header: [
          "px-4 transition-all duration-300 ease-in-out",
          isTransparent
            ? "bg-transparent"
            : theme === "dark" || headerBackground === "dark"
            ? "bg-body-reverse"
            : headerBackground === "body"
            ? "bg-body dark:bg-body-reverse"
            : "bg-body",
          headerPosition === "fixed"
            ? "fixed top-0 w-full z-30"
            : "sticky top-0 z-30",
          hasBorder
            ? "border-b border-b-color-tertiary dark:border-b-color-tertiary-reverse"
            : "border-b-transparent",
          hasShadow
            ? "shadow-md shadow-color/10 dark:shadow-color-reverse/10"
            : "shadow-none",
        ].join(" "),
        color,
        showForwardButton,
      };

      return classes;
    };

    const { header, color, showForwardButton } = useHeaderStyles(
      sectionId,
      position,
      headerBackground,
      border
    );

    return (
      <header id={`header_${sectionId}`} className={header}>
        <div className="flex items-center flex-wrap">
          <div className="w-1/4 flex justify-start items-center">
            <Logo logoVersion={logo_version} textColor={color} />
            {headerNav && <ModalNav toggleColor={color} />}
            <AsideToggler />
          </div>

          <div className="w-1/2 flex justify-center items-center">
            {headerNav && <HeaderNav linkColor={color} />}
          </div>

          <div className="w-1/4 flex justify-end items-center">
            {
              // * Note that this forward / redirect button is dependent on the presence of the hero button
              // * It will show only if the hero component, and therefore the hero button, is present
              // * This will only happen if the HeaderHero component is used in a page
              <Btn
                href={heroButtonHref}
                className={`${styles.redirectButton} ${
                  showForwardButton && styles.visible
                }`}
              >
                {heroButtonText}
              </Btn>
            }
            {themeToggler && (
              <div className="ml-2">
                <ThemeToggler toggleColor={color} />
              </div>
            )}
          </div>
        </div>
      </header>
    );
  };

  const Hero = ({
    section_instance,
    hero_heading,
    hero_sub_heading,
    hero_paragraph,
    hero_image,
    hero_button_text,
    hero_button_href,
  }: HeroProps) => {
    const heroRef = useRef<HTMLDivElement | null>(null);
    const [heroHeight, setHeroHeight] = useState<string>("100vh");
    const animation = "fade";

    const sectionId = section_instance || "";
    const heroHeading = hero_heading;
    const heroSubHeading = hero_sub_heading;
    const heroParagraph = hero_paragraph;
    const heroImage = hero_image || "/app/img/hero.png";
    const heroButtonText = hero_button_text || "Get Started";
    const heroButtonHref = hero_button_href || "";

    // Set hero height based on header presence and position
    useLayoutEffect(() => {
      const hero = heroRef.current;
      const header: HTMLElement | null =
        document.querySelector<HTMLElement>('[id^="header_"]');
      const headerHeight = header?.offsetHeight || 0;
      const isHeaderFixed = !!header?.classList.contains("fixed");

      if (header && hero) {
        const heroBottom = hero.getBoundingClientRect().bottom;
        const headerTop = header.getBoundingClientRect().top;

        // Keep hero height as 100vh if header is fixed or it comes below the hero
        setHeroHeight(
          headerTop >= heroBottom
            ? "100vh"
            : isHeaderFixed
            ? "100vh"
            : `calc(100vh - ${headerHeight}px)`
        );
      }
    }, []);

    return (
      <section
        ref={heroRef}
        id={`hero_${sectionId}`}
        className={`${styles.hero} relative w-full before:content-[""] before:absolute before:inset-0 before:bg-black/60`}
        style={{
          height: heroHeight,
          backgroundImage: `url(${heroImage})`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className={styles.hero_container}>
          {heroSubHeading && (
            <h3
              data-aos={animation}
              dangerouslySetInnerHTML={{ __html: heroSubHeading }}
            />
          )}
          {heroHeading && (
            <h1
              data-aos={animation}
              dangerouslySetInnerHTML={{ __html: heroHeading }}
            />
          )}
          {heroParagraph && (
            <h2
              data-aos={animation}
              dangerouslySetInnerHTML={{ __html: heroParagraph }}
            />
          )}
          {heroButtonHref && (
            <Btn
              id={`hero_button_${sectionId}`}
              className={`uppercase font-semibold`}
              href={heroButtonHref}
              outline
              size="lg"
            >
              {heroButtonText}
            </Btn>
          )}
        </div>
      </section>
    );
  };

  switch (component) {
    case "header":
    default:
      return <Header {...headerProps} />;

    case "hero":
      return <Hero {...heroProps} />;

    case "headerhero":
      return (
        <>
          <Header
            {...headerProps}
            headerBorder={false}
            headerPosition="fixed"
          />
          <Hero {...heroProps} />
        </>
      );
  }
}
