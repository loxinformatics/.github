"use client";

import { useAppContext } from "@/app/context";
import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Logo from "../../widgets/Logo/Logo";
import navlinks from "../../widgets/Navigation/links";
import Navigation from "../../widgets/Navigation/Navigation";
import ThemeToggler from "../../widgets/ThemeToggler/ThemeToggler";
import style from "./Aside.module.css";
import { useAsideContext } from "./context";

export default function Aside() {
  const asideRef = useRef(null);

  const { windowWidth } = useAppContext();
  const [top, setTop] = useState(0);
  const { isAsideOpen, setIsAsideOpen } = useAsideContext();

  const isDesktopView = windowWidth >= 992;

  // Monitor Desktop Width
  useEffect(() => {
    setIsAsideOpen(isDesktopView);
  }, [isDesktopView, setIsAsideOpen]);

  // Set Top
  useEffect(() => {
    const asideElement = asideRef.current;
    const headerElement = document.querySelector("#header");
    setTop(asideElement && headerElement?.offsetHeight);
    asideElement.style.top = `${top}px`;
  }, [top]);

  // Add Transition property to the shifted elements
  useEffect(() => {
    const asideElement = asideRef.current;
    const sections = document.querySelectorAll("section");

    asideElement.style.transition = "margin-left 0.3s ease-in-out";
    
    sections.forEach((section) => {
      section.style.transition = "margin-left 0.3s ease-in-out";
    });

    return () => {
      sections.forEach((section) => {
        section.style.transition = "";
      });
    };
  }, []);

  // Shift Aside and Elements when toggled
  useEffect(() => {
    const asideElement = asideRef.current;
    const sections = document.querySelectorAll("section");
    const bottomBarElement = document.querySelector("#bottombar");
    const footerElement = document.querySelector("#footer");

    if (asideElement) {
      if (isAsideOpen) {
        asideElement.classList.add(style.asideOpen);
        asideElement.classList.remove(style.asideClose);

        if (isDesktopView) {
          // Aside will shift these elements to the right
          sections.forEach((section) => {
            section.classList.add(style.mainWhenAsideOpen);
            section.classList.remove(style.mainWhenAsideClose);
          });
          bottomBarElement?.classList.add(style.mainWhenAsideOpen);
          bottomBarElement?.classList.remove(style.mainWhenAsideClose);
          footerElement?.classList.add(style.mainWhenAsideOpen);
          footerElement?.classList.remove(style.mainWhenAsideClose);
        } else {
          // Aside will open over these elements
          sections.forEach((section) => {
            section.classList.remove(style.mainWhenAsideOpen);
            section.classList.add(style.mainWhenAsideClose);
          });
          bottomBarElement?.classList.remove(style.mainWhenAsideOpen);
          bottomBarElement?.classList.add(style.mainWhenAsideClose);
          footerElement?.classList.remove(style.mainWhenAsideOpen);
          footerElement?.classList.add(style.mainWhenAsideClose);
        }
      } else {
        asideElement.classList.add(style.asideClose);
        asideElement.classList.remove(style.asideOpen);

        sections.forEach((section) => {
          section.classList.add(style.mainWhenAsideClose);
          section.classList.remove(style.mainWhenAsideOpen);
        });
        bottomBarElement?.classList.add(style.mainWhenAsideClose);
        bottomBarElement?.classList.remove(style.mainWhenAsideOpen);
        footerElement?.classList.add(style.mainWhenAsideClose);
        footerElement?.classList.remove(style.mainWhenAsideOpen);
      }
    }

    return () => {
      if (asideElement) {
        asideElement.classList.remove(style.asideOpen);
        asideElement.classList.remove(style.asideClose);
      }

      sections.forEach((section) => {
        section.classList.remove(style.mainWhenAsideOpen);
        section.classList.remove(style.mainWhenAsideClose);
      });
      bottomBarElement?.classList.remove(style.mainWhenAsideOpen);
      bottomBarElement?.classList.remove(style.mainWhenAsideClose);
      footerElement?.classList.remove(style.mainWhenAsideOpen);
      footerElement?.classList.remove(style.mainWhenAsideClose);
    };
  }, [isAsideOpen, isDesktopView]);

  return (
    <aside
      ref={asideRef}
      id="aside"
      className={`${style.aside} position-fixed z-1 start-0 bottom-0 border-end`}
    >
      <Container>
        <Row className="py-2">
          {/* Logo & Title */}
          <Col xs={12} className="d-flex align-items-center border-bottom">
            <div>
              <Logo />
              <ThemeToggler />
            </div>

            <div>
              {navlinks.aside.map(
                (link, index) =>
                  index === 0 && (
                    <h1 key={link.name} className={`ms-1 ${style["title"]}`}>
                      {link.name}
                    </h1>
                  )
              )}
            </div>
            {!isAsideOpen && (
              <div className={`ms-auto ${style["retractedLogo"]}`}>
                <Logo />
              </div>
            )}
          </Col>

          {/* Toggle Button */}
          {!isAsideOpen ? (
            <Col
              xs={12}
              className="d-flex justify-content-end border-bottom py-2"
            >
              <Button
                variant="outline-primary"
                className={`${style["toggleBtn"]} position-relative`}
                onClick={() => {
                  setIsAsideOpen(!isAsideOpen);
                }}
              >
                <i
                  className={`bi bi-list ${style["toggleIcon"]} position-absolute start-50 top-50 translate-middle`}
                ></i>
              </Button>
            </Col>
          ) : (
            <Button
              variant="outline-primary"
              className={`${style["toggleBtn"]} ${style["toggleBtnWhenSidebarOpen"]} position-absolute`}
              onClick={() => {
                setIsAsideOpen(!isAsideOpen);
              }}
            >
              <i
                className={`bi bi-list ${style["toggleIcon"]} position-absolute start-50 top-50 translate-middle`}
              ></i>
            </Button>
          )}

          {/* NavLinks */}
          <Col xs={12} className="mt-3">
            <Navigation type="aside" />
          </Col>
        </Row>
      </Container>
    </aside>
  );
}
