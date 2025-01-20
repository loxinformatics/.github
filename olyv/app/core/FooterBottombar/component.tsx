"use client";

import Link from "next/link";
import { useBase } from "../../../providers/base";
import { useCore } from "../../../providers/core";
import type { NavLink } from "../../../providers/core/types";
import styles from "./styles.module.css";
import type {
  BottombarProps,
  FooterBottombarProps,
  FooterNavProps,
} from "./types";

export default function FooterBottombarSection({
  themeToggler,
  component,
}: FooterBottombarProps) {
  const {
    fullName,
    textPrimary,
    textColorHover,
    ThemeToggler,
    SocialMediaLinks,
  } = useBase();
  const { createNavLinks, navLinksMap } = useCore();

  const Footer = () => {
    const navLinks_1 = createNavLinks(navLinksMap.footer_1);
    const navLinks_2 = createNavLinks(navLinksMap.footer_2);

    const FooterNav = ({ links }: FooterNavProps) => {
      // Find the heading link
      const headingLink = links?.find((link) => link.type === "heading");
      // Filter out the heading link from the rest
      const otherLinks = links?.filter((link) => link.type !== "heading");

      return (
        <div
          className={`${styles.footer_nav} sm:basis-1/2 flex flex-col items-center`}
        >
          <div>
            {/* Display heading if it exists */}
            {headingLink && (
              <h4 className={`${styles.footer_h4} font-semibold`}>
                {headingLink.text}
              </h4>
            )}
            <nav>
              <ul>
                {otherLinks?.map((link: NavLink, index: number) => (
                  <li key={index} className={styles.footerlinks_li}>
                    <i
                      className={`bi bi-chevron-right text-base ${textPrimary} pr-[2px]`}
                    ></i>
                    <Link
                      className={`${textColorHover} transition-colors duration-200`}
                      href={link.href || "#"}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      );
    };

    return (
      <footer
        id="footer"
        className={`${styles.footer} relative border-t border-t-color-tertiary dark:border-t-color-tertiary-reverse`}
      >
        <div
          id="footer-links"
          className={`${styles.footer_main}  bg-body-secondary dark:bg-body-secondary-reverse`}
        >
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row gap-y-10 lg:gap-y-0 lg:gap-x-10">
              {/* Footer Main */}
              <div className="lg:basis-1/3 flex flex-col items-center lg:items-start">
                <h3 className={`${styles.footer_h3}`}>
                  {/* ? Should I reduce heading font size on smaller screens? */}
                  {fullName}
                  <span className={textPrimary}>.</span>
                </h3>
                <SocialMediaLinks />
              </div>

              {/* Links */}
              <div className="lg:basis-2/3 flex flex-col sm:flex-row gap-y-10 lg:gap-y-0 lg:gap-x-10">
                {/* Useful Links */}
                <FooterNav links={navLinks_1} />

                {/* Products / Services Links */}
                <FooterNav links={navLinks_2} />
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };

  const BottomBar = ({ themeToggler }: BottombarProps) => {
    const hasThemeToggler =
      themeToggler !== null ? (themeToggler === false ? false : true) : true;

    return (
      <section
        id="bottombar"
        className="mt-auto border-t border-t-color-tertiary dark:border-t-color-tertiary-reverse py-4 px-4"
      >
        <div className="flex flex-col lg:flex-row lg:items-center">
          <div className="lg:basis-1/4 flex justify-center lg:justify-start">
            {hasThemeToggler && <ThemeToggler />}
          </div>
          <div className="lg:basis-1/2 flex justify-center mt-2 lg:mt-0">
            <span className="text-xs">
              ©️ Copyright{" "}
              <strong>
                <span>{fullName}</span>
              </strong>
              . All Rights Reserved
            </span>
          </div>
          <div className="lg:basis-1/4 flex justify-center lg:justify-end mt-2 lg:mt-0"></div>
        </div>
      </section>
    );
  };

  switch (component) {
    case "footerbottombar":
    default:
      return (
        <div id="footer-bottombar">
          <Footer />
          <BottomBar themeToggler={themeToggler} />
        </div>
      );

    case "footer":
      return <Footer />;

    case "bottombar":
      return <BottomBar themeToggler={themeToggler} />;
  }
}
