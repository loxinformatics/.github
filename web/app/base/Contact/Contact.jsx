"use client";

import styles from "./Contact.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import { useBaseContext } from "@/app/base/context";
import { BsGeoAlt, BsEnvelope, BsPhone } from "react-icons/bs";
import MailForm from "../../../components/forms/MailForm/MailForm";
import SectionTitle from "@/components/widgets/SectionTitle/SectionTitle";

export default function Contact({ sectionInMain }) {
  const { base } = useBaseContext();
  const city_name = base?.city_name;
  const primary_email = base?.primary_email;
  const secondary_email = base?.secondary_email;
  const primary_phone = base?.primary_phone;
  const secondary_phone = base?.secondary_phone;

  return (
    <section id="contact" className={`${sectionInMain}`}>
      <Container>
        <SectionTitle
          heading="Contact"
          paragraph="Contact Us"
          dataAOS="fade-in"
        />
        <Row>
          <Col lg={4} data-aos="fade-up">
            <div>
              <div className="address">
                <div className={styles.contactcontent_icon}>
                  <BsGeoAlt className={styles.contactcontent_svg} />
                </div>
                <h4 className={styles.contactcontent_h4}>Location:</h4>

                {city_name && (
                  <p className={styles.contactcontent_p}>{city_name}</p>
                )}
              </div>

              <div className={styles.contactcontent_email}>
                <div className={styles.contactcontent_icon}>
                  <BsEnvelope className={styles.contactcontent_svg} />
                </div>
                <h4 className={styles.contactcontent_h4}>Email:</h4>

                {primary_email && (
                  <Link href={`mailto:${primary_email}`}>
                    <p className={styles.contactcontent_p}>{primary_email}</p>
                  </Link>
                )}

                {secondary_email && (
                  <Link href={`mailto:${secondary_email}`}>
                    <p className={styles.contactcontent_p}>{secondary_email}</p>
                  </Link>
                )}
              </div>

              <div className={styles.contactcontent_phone}>
                <div className={styles.contactcontent_icon}>
                  <BsPhone className={styles.contactcontent_svg} />
                </div>
                <h4 className={styles.contactcontent_h4}>Call:</h4>

                {primary_phone && (
                  <Link href={`tel:${primary_phone}`}>
                    <p className={styles.contactcontent_p}>{primary_phone}</p>
                  </Link>
                )}

                {secondary_phone && (
                  <Link href={`tel:${secondary_phone}`}>
                    <p className={styles.contactcontent_p}>{secondary_phone}</p>
                  </Link>
                )}
              </div>
            </div>
          </Col>

          <Col lg={8} className="mt-5 mt-lg-0" data-aos="fade-up">
            <MailForm />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
