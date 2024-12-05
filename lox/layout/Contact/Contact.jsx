"use client";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import MailForm from "../../widgets/MailForm/MailForm";
import SectionTitle from "../../widgets/SectionTitle/SectionTitle";
import style from "./Contact.module.css";
import { useContactContext } from "./context";

const version = process.env.NEXT_PUBLIC_CONTACT_VERSION || "V1";

export default function Contact({ sectioninmain, type }) {
  const { contact } = useContactContext();

  if (!contact) return <></>;

  if (type === "call&email") {
    return (
      <div className="mb-3">
        <CallDetails type={type} />
        <br />
        <EmailDetails type={type} />
      </div>
    );
  }

  let contactsection;

  switch (version) {
    case "V1":
      contactsection = (
        <Row className="gy-4">
          <Col xs={12} lg={6}>
            <Row className="gy-4 justify-content-center">
              <Col xs={12} md={6}>
                <div className={style.V1} data-aos="fade" data-aos-delay="200">
                  <Address />
                </div>
              </Col>

              <Col xs={12} md={6}>
                <div className={style.V1} data-aos="fade" data-aos-delay="300">
                  <CallDetails />
                </div>
              </Col>

              <Col xs={12} md={6}>
                <div className={style.V1} data-aos="fade" data-aos-delay="400">
                  <EmailDetails />
                </div>
              </Col>

              <Col xs={12} md={6}>
                <div className={style.V1} data-aos="fade" data-aos-delay="500">
                  <OpenHours />
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={12} lg={6}>
            <MailForm />
          </Col>
        </Row>
      );
      break;

    case "V2":
      contactsection = (
        <>
          <Row className="justify-content-center">
            <Col lg={6} xl={3} className="mt-4" data-aos="fade-up">
              <div className={style.V2}>
                <Address />
              </div>
            </Col>

            <Col
              lg={6}
              xl={3}
              className="mt-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className={style.V2}>
                <EmailDetails />
              </div>
            </Col>
            <Col
              lg={6}
              xl={3}
              className="mt-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className={style.V2}>
                <CallDetails />
              </div>
            </Col>
            <Col
              lg={6}
              xl={3}
              className="mt-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className={style.V2}>
                <OpenHours />
              </div>
            </Col>
          </Row>

          <Row
            className="justify-content-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <Col lg={12} xl={9} className="mt-4">
              <MailForm />
            </Col>
          </Row>
        </>
      );
      break;

    case "V3":
      contactsection = (
        <Row className="align-items-center">
          <Col lg={4}>
            <div className={style.V3}>
              <div className={style.address}>
                <Address />
              </div>

              <div className={style.email}>
                <EmailDetails />
              </div>

              <div className={style.phone}>
                <CallDetails />
              </div>

              <div className={style.phone}>
                <OpenHours />
              </div>
            </div>
          </Col>

          <Col lg={8} className="mt-5 mt-lg-0">
            <MailForm />
          </Col>
        </Row>
      );
      break;

    default:
      break;
  }

  return (
    <>
      <SectionTitle h2="Contact" h3="Contact Us" p="Get In Touch" />
      <section id="contact" className={`${sectioninmain}`}>
        <Container>
          {contact.map && (
            <div className="mb-5">
              <iframe
                className={style.map}
                src={contact.map}
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
          )}

          {contactsection}
        </Container>
      </section>
    </>
  );
}

function Address() {
  const { contact } = useContactContext();

  // format address function
  const formatAddress = (city_name, PO_box) => {
    const parts = [city_name, PO_box].filter(Boolean);
    return parts.join(", ");
  };

  return (
    <>
      <i className="bi bi-geo-alt"></i>
      <h3>
        {version === "V1" && "Address"}
        {version === "V2" && "Our Address"}
        {version === "V3" && "Location:"}
      </h3>
      <p className="mb-0">{formatAddress(contact.street, contact.PO_box)}</p>
      <p className="mb-0">{contact.city_name}</p>
    </>
  );
}

function CallDetails({ type }) {
  const { contact } = useContactContext();

  return (
    <>
      {type === "call&email" ? (
        <>
          <strong>Call:</strong>
          <br />
        </>
      ) : (
        <>
          <i className="bi bi-telephone"></i>
          <h3>{version === "V3" ? "Call:" : "Call Us"}</h3>
        </>
      )}

      <p className="mb-0">
        <a href={`tel:${contact.primary_phone}`} className="text-reset">
          {contact.primary_phone}
        </a>
      </p>
      <p className="mb-0">
        <a href={`tel:${contact.secondary_phone}`} className="text-reset">
          {contact.secondary_phone}
        </a>
      </p>
    </>
  );
}

function EmailDetails({ type }) {
  const { contact } = useContactContext();

  return (
    <>
      {type === "call&email" ? (
        <>
          <strong>Email:</strong>
          <br />
        </>
      ) : (
        <>
          <i className="bi bi-envelope"></i>
          <h3>{version === "V3" ? "Email:" : "Email Us"}</h3>
        </>
      )}

      <p className="mb-0">
        <a href={`mailto:${contact.primary_email}`} className="text-reset">
          {contact.primary_email}
        </a>
      </p>
      <p className="mb-0">
        <a href={`mailto:${contact.secondary_email}`} className="text-reset">
          {contact.secondary_email}
        </a>
      </p>
    </>
  );
}

function OpenHours() {
  const { contact } = useContactContext();

  return (
    <>
      <i className="bi bi-clock"></i>
      <h3>{version === "V3" ? "Hours:" : "Open Hours"}</h3>
      <p
        className="mb-0"
        dangerouslySetInnerHTML={{
          __html: contact.open_hours,
        }}
      />
    </>
  );
}
