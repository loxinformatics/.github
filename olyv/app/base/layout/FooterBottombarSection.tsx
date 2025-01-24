"use client";

import { useBase } from "../../../context/base";
import type {
  BottombarProps,
  FooterBottombarProps,
  FooterNavProps,
  NavLink,
} from "../../../types/base";
import { createNavLinks } from "../../../utils/base";
import ThemeToggler from "../widgets/buttons/ThemeToggler";
import Anchor from "../widgets/links/Anchor";
import SocialMediaLinks from "../widgets/links/SocialMediaLinks";
import Container from "../widgets/sections/Container";
import Section from "../widgets/sections/Section";
import Heading from "../widgets/text/Heading";
import baseStyles from "./styles.module.css";

export default function FooterBottombarSection({
  themeToggler,
  component,
}: FooterBottombarProps) {
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

function Footer() {
  const { fullName, textPrimary, navLinksMap } = useBase();

  const navLinks_1 = createNavLinks(navLinksMap.footer_1);
  const navLinks_2 = createNavLinks(navLinksMap.footer_2);

  return (
    <footer
      id="footer"
      className={`
        ${baseStyles.footer} relative
          
          bg-body-secondary dark:bg-body-secondary-reverse
          border-t border-t-color-tertiary dark:border-t-color-tertiary-reverse
        `}
    >
      <Container className="pt-16 py-10 tracking-wide">
        <div id="footer-links">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row gap-y-10 lg:gap-y-0 lg:gap-x-10">
              {/* Footer Main */}
              <div className="lg:basis-1/3 flex flex-col items-center lg:items-start">
                <Heading variant="h3">
                  {fullName}
                  <span className={textPrimary}>.</span>
                </Heading>
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
      </Container>
    </footer>
  );
}

function FooterNav({ links }: FooterNavProps) {
  const { textPrimary, textColorHover } = useBase();

  // Find the heading link
  const headingLink = links?.find((link) => link.type === "heading");
  // Filter out the heading link from the rest
  const otherLinks = links?.filter((link) => link.type !== "heading");

  return (
    <div
      className={`${baseStyles.footer_nav} sm:basis-1/2 flex flex-col items-center`}
    >
      <div>
        {/* Display heading if it exists */}
        {headingLink && (
          <Heading variant="h6" className="relative mb-4">
            {headingLink.text}
          </Heading>
        )}
        <nav className="text-sm tracking-wider">
          <ul>
            {otherLinks?.map((link: NavLink, index: number) => (
              <li key={index} className={baseStyles.footerlinks_li}>
                <i
                  className={`bi bi-chevron-right text-base ${textPrimary} pr-[2px]`}
                ></i>
                <Anchor
                  href={link.href || "#"}
                  className={`${textColorHover} transition-colors duration-200`}
                >
                  {link.text}
                </Anchor>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

function BottomBar({ themeToggler }: BottombarProps) {
  const { fullName } = useBase();

  const hasThemeToggler =
    themeToggler !== null ? (themeToggler === false ? false : true) : true;

  return (
    <Section
      container={false}
      padding={false}
      id="bottombar"
      className="mt-auto border-t border-t-color-tertiary dark:border-t-color-tertiary-reverse py-4 px-4"
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="lg:basis-1/4 flex justify-center lg:justify-start">
          {hasThemeToggler && <ThemeToggler />}
        </div>
        <div className="lg:basis-1/2 flex justify-center mt-2 lg:mt-0">
          <p className="text-xs">
            ©️ Copyright <strong>{fullName}</strong>. All Rights Reserved
          </p>
        </div>
        <div className="lg:basis-1/4 flex justify-center lg:justify-end mt-2 lg:mt-0"></div>
      </div>
    </Section>
  );
}
