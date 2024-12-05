"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useAppContext } from "../../../app/context";
import ForwardButton from "../../widgets/ForwardButton/ForwardButton";
import Logo from "../../widgets/Logo/Logo";
import Navigation from "../../widgets/Navigation/Navigation";
import ThemeToggler from "../../widgets/ThemeToggler/ThemeToggler";
import style from "./Header.module.css";

export default function Header() {
  // * Only set header to be fixed it will be showing over a background photo
  // * e.g home page with hero section that has a photo
  // TODO: implement header `fixed-top` ensuring that Header widgets e.g navlinks are set color correctly...
  // TODO: ... since the background image can either have a light or dark hue

  const headerRef = useRef(null);
  const pathname = usePathname();
  const [background, setBackground] = useState("bg-body");
  const [border, setBorder] = useState("border-bottom");
  const { windowHeight } = useAppContext();
  const [headerPosition, setHeaderPosition] = useState("sticky-top");

  // Set header position based on path
  useEffect(() => {
    setHeaderPosition("sticky-top");
  }, [setHeaderPosition]);

  // Set background color and border-bottom based on path
  useEffect(() => {
    setBackground(pathname.startsWith("/auth") ? "" : "bg-body");
    setBorder(pathname.startsWith("/auth") ? "" : "border-bottom");
  }, [pathname]);

  // Set the background color and border on scroll or on resize
  useEffect(() => {
    const headerElement = headerRef.current;

    const handleScrollorResize = () => {
      if (window.scrollY > 10 || windowHeight <= 555) {
        headerElement?.classList.add(`bg-body`);
        headerElement?.classList.add(`border-bottom`);
      } else {
        headerElement?.classList.remove(background === "" && "bg-body");
        headerElement?.classList.remove(border === "" && "border-bottom");
      }
    };

    handleScrollorResize();
    window.addEventListener("scroll", handleScrollorResize);

    return () => {
      window.removeEventListener("scroll", handleScrollorResize);
    };
  }, [background, border, windowHeight]);

  // Set the box shadow on scroll or on resize
  useEffect(() => {
    const headerElement = headerRef.current;
    const heroElement = document.querySelector("#hero");

    // if hero is present set the shadow after hero
    const heroBottom = heroElement ? heroElement.offsetHeight : 0;

    const handleScrollorResize = () => {
      if (window.scrollY > heroBottom || windowHeight <= 555) {
        headerElement?.classList.add(`${style.shadow_bottom}`);
      } else {
        headerElement?.classList.remove(`${style.shadow_bottom}`);
      }
    };

    handleScrollorResize();
    window.addEventListener("scroll", handleScrollorResize);

    return () => {
      window.removeEventListener("scroll", handleScrollorResize);
    };
  }, [windowHeight]);

  return (
    <header
      ref={headerRef}
      id="header"
      className={`w-100 m-0 ${style.header} ${headerPosition} ${background} ${border}`}
    >
      <Container fluid>
        <Row className="align-items-center">
          {/* Logo */}
          <Col xs={3} className="d-flex justify-content-start">
            <Logo />
          </Col>

          {/* Navbar */}
          <Col xs={6} className="d-none d-lg-flex justify-content-center">
            {!pathname.startsWith("/dashboard") &&
              !pathname.startsWith("/auth") && <Navigation type="header" />}
          </Col>

          {/* Mobile Nav Toggle */}
          <Col xs={6} className="d-flex d-lg-none justify-content-center">
            {!pathname.startsWith("/dashboard") &&
              !pathname.startsWith("/auth") && <Navigation type="mobile" />}
          </Col>

          {/* Forward Btn */}
          <Col xs={3} className="d-flex justify-content-end align-items-center">
            {/* Forward Button */}
            <div>
              <ForwardButton />
            </div>

            {/* ThemeToggler */}
            <div className={`position-relative ${style.shiftthemetoggler}`}>
              <ThemeToggler />
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
}
