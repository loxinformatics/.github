"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useBase } from "../context";
import type {
  HeaderHeroProps,
  HeaderNavProps,
  HeaderProps,
  HeroProps,
  ModalNavProps,
  NavLink,
} from "../types";
import { createNavLinks } from "../utils";
import Btn from "../widgets/buttons/Button";
import SidebarToggler from "../widgets/buttons/SidebarToggler";
import ThemeToggler from "../widgets/buttons/ThemeToggler";
import Anchor from "../widgets/links/Anchor";
import Logo from "../widgets/links/Logo";
import Nav from "../widgets/links/Nav";
import Modal from "../widgets/modals/Modal";
import Section from "../widgets/sections/Section";
import Heading from "../widgets/text/Heading";
import baseStyles from "./styles.module.css";

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

function Header({
  headerPosition,
  headerBorder,
  header_background,
  logo_version,
  header_nav,
  theme_toggler,
  hero_button_text,
  hero_button_href,
  section_instance,
}: HeaderProps) {
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

  const { color, showForwardButton, otherStyles } = useHeaderStyles(
    sectionId,
    position,
    headerBackground,
    border
  );

  return (
    <header
      id={`header_${sectionId}`}
      className={`${baseStyles.header} ${otherStyles}`}
    >
      <div className="flex items-center flex-wrap">
        <div className="w-1/4 flex justify-start items-center">
          <Logo logoVersion={logo_version} textColor={color} />
          <div className="ml-3" />
          {headerNav && <ModalNav toggleColor={color} />}
          <SidebarToggler />
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
              className={`${baseStyles.redirectButton} ${
                showForwardButton && baseStyles.visible
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
}

function HeaderNav({ linkColor }: HeaderNavProps) {
  const { textColorHover, navLinksMap } = useBase();

  const navLinks = createNavLinks(navLinksMap.header);
  const navLinks_color = linkColor || "text-color-reverse dark:text-color";

  const renderLink = (link: NavLink, index: number) => {
    const Icon = link?.icon;
    return (
      <li key={`navbar-link-${index}`}>
        <Anchor
          className={`${navLinks_color} ${baseStyles.header_navlink} ${textColorHover}`}
          href={link.href || "#"}
        >
          {Icon && (
            <i className={`${Icon} ${baseStyles.header_navlink_icon}`}></i>
          )}
          {link?.text}
        </Anchor>
      </li>
    );
  };

  return (
    <Nav
      className={`text-sm tracking-wider ${baseStyles.header_nav}`}
      links={navLinks}
      layout="header"
      renderLink={renderLink}
    />
  );
}

function ModalNav({ toggleColor }: ModalNavProps) {
  const {
    bgBodyHover,
    navLinksMap,
    setAsideExists,
    asideExists,
    isNavModalOpen,
    setIsNavModalOpen,
  } = useBase();

  const navLinks = createNavLinks(navLinksMap.header);

  const toggleMobileNavModal = () => {
    setIsNavModalOpen(!isNavModalOpen);
  };

  useEffect(() => {
    setAsideExists(!!document.querySelector("aside"));
  }, []);

  const renderLink = (link: NavLink, index: number) => {
    const Icon = link?.icon;
    return (
      <li key={`modal-link-${index}`}>
        <Anchor
          className={`${baseStyles.navLink} block px-4 py-2 transition-all ease-in-out duration-150 text-color dark:text-color-reverse ${bgBodyHover}`}
          href={link?.href || "#"}
        >
          {Icon && <i className={`${Icon} ${baseStyles.navLinkIcon}`}></i>}{" "}
          {link?.text}
        </Anchor>
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
          className={baseStyles.modal_nav}
          links={navLinks}
          layout="modal"
          renderLink={renderLink}
        />
      </Modal>
    )
  );
}

function useHeaderStyles(
  sectionId: string,
  headerPosition: string,
  headerBackground: string,
  headerBorder: boolean
) {
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
    otherStyles: [
      "px-4 transition-all duration-300 ease-in-out",
      isTransparent
        ? "bg-transparent"
        : theme === "dark" || headerBackground === "dark"
        ? "bg-body-reverse"
        : headerBackground === "body"
        ? "bg-body dark:bg-body-reverse"
        : "bg-body",
      headerPosition === "fixed"
        ? "fixed top-0 w-full z-20"
        : "sticky top-0 z-20",
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
}

function Hero({
  section_instance,
  hero_heading,
  hero_sub_heading,
  hero_paragraph,
  hero_image,
  hero_button_text,
  hero_button_href,
}: HeroProps) {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [heroHeight, setHeroHeight] = useState<string>("100vh");

  const sectionId = section_instance || "";
  const heroHeading = hero_heading;
  const heroSubHeading = hero_sub_heading;
  const heroParagraph = hero_paragraph;
  const heroImage = hero_image || "/hero.png";
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
    <Section
      ref={heroRef}
      id={`hero_${sectionId}`}
      className={`text-white w-full ${baseStyles.hero}`}
      style={{ height: heroHeight }}
    >
      <div className="fixed inset-0">
        <Image
          src={heroImage}
          alt="Hero background"
          fill
          priority
          quality={90}
          className={baseStyles.hero_image}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className={`${baseStyles.hero_container} `} data-aos="fade">
        {heroSubHeading && (
          <Heading
            variant="h2"
            className="
                bg-white/10 rounded-full
                tracking-wider
                py-2 px-7
                mb-8 lg:mb-12
              "
            dangerouslySetInnerHTML={{ __html: heroSubHeading }}
          />
        )}
        {heroHeading && (
          <Heading
            variant="h1"
            className="mb-3 lg:mb-4"
            dangerouslySetInnerHTML={{ __html: heroHeading }}
          />
        )}
        {heroParagraph && (
          <p
            className={`lg:text-lg
                md:px-32 lg:px-40
                mt-3 lg:mt-4
                mb-8 lg:mb-12
              `}
            dangerouslySetInnerHTML={{ __html: heroParagraph }}
          />
        )}
        {heroButtonHref && (
          <Btn
            id={`hero_button_${sectionId}`}
            className={`uppercase`}
            href={heroButtonHref}
            outline
            size="lg"
          >
            {heroButtonText}
          </Btn>
        )}
      </div>
    </Section>
  );
}
