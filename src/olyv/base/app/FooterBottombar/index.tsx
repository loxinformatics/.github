"use client";

import { useBase } from "..";
import ThemeToggler from "../../widgets/buttons/ThemeToggler";
import SocialMediaLinks from "../../widgets/links/SocialMediaLinks";
import { FooterNav } from "../../widgets/nav";
import { createNavLinks } from "../../widgets/nav/utils";
import { Section } from "../../widgets/section";
import { Container } from "../../widgets/section/Container";
import Heading from "../../widgets/text/Heading";
import baseStyles from "./styles.module.css";

export default function FooterBottombar({
  themeToggler,
  component,
}: {
  themeToggler?: boolean;
  component?: "footerbottombar" | "footer" | "bottombar";
}) {
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

function BottomBar({ themeToggler }: { themeToggler?: boolean }) {
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
