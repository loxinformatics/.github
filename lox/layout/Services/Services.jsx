"use client";

import Image from "next/image";
import Link from "next/link";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import SectionTitle from "../../widgets/SectionTitle/SectionTitle";
import style from "./Services.module.css";
import { useServicesContext } from "./context";

const version = process.env.NEXT_PUBLIC_SERVICES_VERSION || "V1";

export default function Services({ sectioninmain }) {
  const { services } = useServicesContext();

  if (!services || services.length === 0) return null;

  return (
    <>
      <SectionTitle h2="Services" h3="Our Services" p="Check our Services" />
      <section id="services" className={`services ${sectioninmain}`}>
        <Container>
          <Row>
            {services.map((service) => {
              switch (version) {
                case "V3":
                  return (
                    <Col
                      key={service.id}
                      xs={12}
                      md={6}
                      xl={4}
                      data-aos="zoom-in"
                      data-aos-delay="100"
                    >
                      <div className={style["V3_services"]}>
                        <div className={style.img}>
                          <Image
                            src={service.image || "/img/default_about.jpg"}
                            className="img-fluid"
                            alt=""
                            width={800}
                            height={600}
                          />
                        </div>
                        <div className={`${style.details} position-relative`}>
                          <div className={style.icon}>
                            <i className={service.icon}></i>
                          </div>
                          <a href="#" className="stretched-link">
                            <h4 className={style.heading}>{service.heading}</h4>
                          </a>
                          <p className={style.description}>
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </Col>
                  );

                default:
                  return (
                    <Col
                      key={service.id}
                      xs={12}
                      md={version === "V1" ? 6 : 12}
                      lg={version === "V1" ? 4 : 6}
                      className="d-flex align-items-stretch mt-4"
                      data-aos={version === "V2" ? "fade-up" : "zoom-in"}
                      data-aos-delay="100"
                    >
                      <div
                        className={`${style[`${version}_services`]} ${
                          version === "V2" && "d-flex"
                        }`}
                      >
                        <div className={style.icon}>
                          <i className={service.icon}></i>
                        </div>
                        <div>
                          <h4 className={style.heading}>
                            <Link href="" className="pe-none stretched-link">
                              {service.heading}
                            </Link>
                          </h4>
                          <p className={style.description}>
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </Col>
                  );
              }
            })}
          </Row>
        </Container>
      </section>
    </>
  );
}
