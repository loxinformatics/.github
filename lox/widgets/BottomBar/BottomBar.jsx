"use client";

import { useAppContext } from "@/app/context";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import SocialLinks from "../SocialLinks/SocialLinks";
import style from "./BottomBar.module.css";

export default function BottomBar() {
  const bottombarRef = useRef(null);
  const pathname = usePathname();
  const [background, setBackground] = useState("bg-body");
  const [border, setBorder] = useState("border-top");
  const { windowHeight } = useAppContext();

  // Set background color and border-top based on path
  useEffect(() => {
    setBackground(pathname.startsWith("/auth") ? "" : "bg-body");
    setBorder(pathname.startsWith("/auth") ? "" : "border-top");
  }, [pathname]);

  // Set the background color and border on resize
  useEffect(() => {
    const bottombarElement = bottombarRef.current;

    const handleScrollorResize = () => {
      if (windowHeight <= 555) {
        bottombarElement?.classList.add(`bg-body`);
        bottombarElement?.classList.add(`border-top`);
      } else {
        bottombarElement?.classList.remove(background === "" && "bg-body");
        bottombarElement?.classList.remove(border === "" && "border-top");
      }
    };

    handleScrollorResize();
    window.addEventListener("scroll", handleScrollorResize);

    return () => {
      window.removeEventListener("scroll", handleScrollorResize);
    };
  }, [background, border, windowHeight]);

  return (
    <div
      ref={bottombarRef}
      id="bottombar"
      className={`${style.bottombar} ${background} ${border} position-relative py-3`}
    >
      <Container>
        <Row className="align-items-center">
          <Col
            xs={12}
            lg={3}
            className="d-flex justify-content-center justify-content-lg-start"
          >
            <SocialLinks />
          </Col>

          <Col
            xs={12}
            lg={6}
            className="d-flex justify-content-center mt-2 mt-lg-0"
          >
            <div className={style.copyright}>
              &copy; Copyright{" "}
              <strong>
                <span>{process.env.NEXT_PUBLIC_FULL_NAME}</span>
              </strong>
              . All Rights Reserved
            </div>
          </Col>

          <Col
            xs={12}
            lg={3}
            className="d-flex justify-content-center justify-content-lg-end mt-2 mt-lg-0"
          ></Col>
        </Row>
      </Container>
    </div>
  );
}
