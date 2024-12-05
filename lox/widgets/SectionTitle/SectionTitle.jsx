"use client";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import style from "./SectionTitle.module.css";

const version = process.env.NEXT_PUBLIC_SECTION_TITLE_VERSION || "V1";

export default function SectionTitle({ h2, h3, p }) {
  return (
    <div className={`${style[`${version}_section-title`]}`}>
      <Container>
        <Row>
          <Col>
            <h2 className={style[`${version}_h2`]}>{h2}</h2>
            {version === "V3" && (
              <h3 className={style[`${version}_h3`]}>{h3}</h3>
            )}
            <p className={style[`${version}_p`]}>{p}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
