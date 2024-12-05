"use client";

import SectionTitle from "@/lox/widgets/SectionTitle/SectionTitle";
import Image from "next/image";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import style from "./About.module.css";
import { useAboutContext } from "./context";

export default function About({ sectioninmain }) {
  const { about } = useAboutContext();

  if (!about) return <></>;

  return (
    <>
      <SectionTitle h2="About" h3="About Us" p="Learn More" />
      <section id="about" className={`${sectioninmain} about`}>
        <Container data-aos="fade-up">
          <Row>
            {about.image && (
              <Col
                lg={6}
                className="order-1 order-lg-2"
                data-aos="fade-left"
                data-aos-delay="100"
              >
                <Image
                  src={about.image}
                  className="img-fluid"
                  alt=""
                  width={500}
                  height={355}
                  priority={true}
                />
              </Col>
            )}

            <Col
              lg={about.image ? 6 : 12}
              className="pt-4 pt-lg-0 order-2 order-lg-1"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <div
                className={style["about-content"]}
                dangerouslySetInnerHTML={{ __html: about.content }}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
