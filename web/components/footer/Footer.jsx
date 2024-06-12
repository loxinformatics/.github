"use client";

import styles from "./Footer.module.css";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useBaseContext } from "../../app/base/context";
import { BiChevronRight } from "react-icons/bi";

export default function Footer() {
  const { base } = useBaseContext();
  const name = base?.name;
  const motto = base?.motto;
  const primary_phone = base?.primary_phone;
  const secondary_phone = base?.secondary_phone;
  const primary_email = base?.primary_email;
  const secondary_email = base?.secondary_email;

  return (
    <footer id="footer" className={`${styles.footer} position-relative`}>
      <Container>
        <Row>
          <Col lg={3} md={6} className="mb-0 mb-md-4">
            <h3 className={styles.footercontent_h3}>
              {name ? name : <span>Your Company</span>}
              <span className="text-primary">.</span>
            </h3>

            {/* {motto && (<p className={styles.footercontent_p}>{motto}</p>)} */}

            <div className="mb-3">
              <strong>Call:</strong>
              <br />
              {primary_phone && <div>{primary_phone}</div>}
              {secondary_phone && <div>{secondary_phone}</div>}

              <br />

              <strong>Email:</strong>
              <br />
              {primary_email && <div>{primary_email}</div>}
              {secondary_email && <div>{secondary_email}</div>}
            </div>
          </Col>

          <Col lg={2} md={6} className="mb-4 mb-lg-0">
            <h4 className={styles.footerlinks_h4}>Useful Links</h4>
            <ul className="list-unstyled m-0 p-0">
              <li className={styles.footerlinks_li}>
                <BiChevronRight className={styles.footerlinks_svg} />{" "}
                <Link className={styles.footerlinks_a} href="/#hero">
                  Home
                </Link>
              </li>
              <li className={styles.footerlinks_li}>
                <BiChevronRight className={styles.footerlinks_svg} />{" "}
                <Link className={styles.footerlinks_a} href="/#about">
                  About us
                </Link>
              </li>
              <li className={styles.footerlinks_li}>
                <BiChevronRight className={styles.footerlinks_svg} />{" "}
                <Link className={styles.footerlinks_a} href="/#services">
                  Services
                </Link>
              </li>
              {/* <li className={styles.footerlinks_li}><BiChevronRight className={styles.footerlinks_svg} /> <Link className={styles.footerlinks_a} href="#">Terms of service</Link></li> */}
              {/* <li className={styles.footerlinks_li}><BiChevronRight className={styles.footerlinks_svg} /> <Link className={styles.footerlinks_a} href="#">Privacy policy</Link></li> */}
            </ul>
          </Col>

          <Col lg={3} md={6} className="mb-md-4 mb-lg-0">
            <h4 className={styles.footerlinks_h4}>Our Services</h4>
            <ul className="list-unstyled m-0 p-0">
              <li className={styles.footerlinks_li}>
                <BiChevronRight className={styles.footerlinks_svg} />{" "}
                <Link className={styles.footerlinks_a} href="#">
                  Custom Software Solutions
                </Link>
              </li>
              <li className={styles.footerlinks_li}>
                <BiChevronRight className={styles.footerlinks_svg} />{" "}
                <Link className={styles.footerlinks_a} href="#">
                  Web Design & Development
                </Link>
              </li>
              <li className={styles.footerlinks_li}>
                <BiChevronRight className={styles.footerlinks_svg} />{" "}
                <Link className={styles.footerlinks_a} href="#">
                  Website Analytics
                </Link>
              </li>
              <li className={styles.footerlinks_li}>
                <BiChevronRight className={styles.footerlinks_svg} />{" "}
                <Link className={styles.footerlinks_a} href="#">
                  Dashboard Development
                </Link>
              </li>
              <li className={styles.footerlinks_li}>
                <BiChevronRight className={styles.footerlinks_svg} />{" "}
                <Link className={styles.footerlinks_a} href="#">
                  Data Analysis
                </Link>
              </li>
              <li className={styles.footerlinks_li}>
                <BiChevronRight className={styles.footerlinks_svg} />{" "}
                <Link className={styles.footerlinks_a} href="#">
                  Support & Maintenance
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
