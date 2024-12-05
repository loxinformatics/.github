"use client";

import Link from "next/link";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import BottomBar from "../BottomBar/BottomBar";
import Contact from "../Contact/Contact";
import style from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <footer
        id="footer"
        className={`${style.footer} position-relative border-top `}
      >
        <Container>
          <Row>
            <Col xs={12} lg={6} className="mb-0 mb-md-4">
              <h3 className={style["footer_h3"]}>
                {process.env.NEXT_PUBLIC_FULL_NAME}
                <span className="text-primary">.</span>
              </h3>
              <Contact type="call&email" />
            </Col>

            {/* Useful Links */}
            <Col xs={12} md={6} lg={3} className="mb-4 mb-lg-0">
              <>
                <h4 className={`${style.footerlinks_h4} fw-semibold`}>
                  Useful Links
                </h4>
                <ul className="list-unstyled m-0 p-0">
                  <li className={style.footerlinks_li}>
                    <i
                      className={`bi bi-chevron-right fs-6 ${style["footerlinks_icon"]}`}
                    ></i>
                    <Link className={style.footerlinks_a} href="/#hero">
                      Home
                    </Link>
                  </li>
                  <li className={style.footerlinks_li}>
                    <i
                      className={`bi bi-chevron-right fs-6 ${style["footerlinks_icon"]}`}
                    ></i>
                    <Link className={style.footerlinks_a} href="/#about">
                      About us
                    </Link>
                  </li>
                  <li className={style.footerlinks_li}>
                    <i
                      className={`bi bi-chevron-right fs-6 ${style["footerlinks_icon"]}`}
                    ></i>
                    <Link className={style.footerlinks_a} href="/#services">
                      Services
                    </Link>
                  </li>
                  {/* <li className={style.footerlinks_li}><BiChevronRight className={style.footerlinks_icon} /> <Link className={style.footerlinks_a} href="#">Terms of service</Link></li> */}
                  {/* <li className={style.footerlinks_li}><BiChevronRight className={style.footerlinks_icon} /> <Link className={style.footerlinks_a} href="#">Privacy policy</Link></li> */}
                </ul>
              </>
            </Col>

            {/* Services Links */}
            <Col xs={12} md={6} lg={3} className="mb-md-4 mb-lg-0">
              <>
                <h4 className={`${style.footerlinks_h4} fw-semibold`}>
                  Our Services
                </h4>
                <ul className="list-unstyled m-0 p-0">
                  <li className={style.footerlinks_li}>
                    <i
                      className={`bi bi-chevron-right fs-6 ${style["footerlinks_icon"]}`}
                    ></i>
                    <Link className={style.footerlinks_a} href="#">
                      Custom Software Solutions
                    </Link>
                  </li>
                  <li className={style.footerlinks_li}>
                    <i
                      className={`bi bi-chevron-right fs-6 ${style["footerlinks_icon"]}`}
                    ></i>
                    <Link className={style.footerlinks_a} href="#">
                      Web Design & Development
                    </Link>
                  </li>
                  <li className={style.footerlinks_li}>
                    <i
                      className={`bi bi-chevron-right fs-6 ${style["footerlinks_icon"]}`}
                    ></i>
                    <Link className={style.footerlinks_a} href="#">
                      Website Analytics
                    </Link>
                  </li>
                  <li className={style.footerlinks_li}>
                    <i
                      className={`bi bi-chevron-right fs-6 ${style["footerlinks_icon"]}`}
                    ></i>
                    <Link className={style.footerlinks_a} href="#">
                      Dashboard Development
                    </Link>
                  </li>
                  <li className={style.footerlinks_li}>
                    <i
                      className={`bi bi-chevron-right fs-6 ${style["footerlinks_icon"]}`}
                    ></i>
                    <Link className={style.footerlinks_a} href="#">
                      Data Analysis
                    </Link>
                  </li>
                  <li className={style.footerlinks_li}>
                    <i
                      className={`bi bi-chevron-right fs-6 ${style["footerlinks_icon"]}`}
                    ></i>
                    <Link className={style.footerlinks_a} href="#">
                      Support & Maintenance
                    </Link>
                  </li>
                </ul>
              </>
            </Col>
          </Row>
        </Container>
      </footer>
      <BottomBar />
    </>
  );
}
