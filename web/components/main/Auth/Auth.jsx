"use client";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSearchParams } from "next/navigation";
import LoginForm from "../../shared/AuthForm/LoginForm";
import SignupForm from "../../shared/AuthForm/SignupForm";

export default function Auth({ sectionInMain }) {
  const searchParams = useSearchParams();
  const authForm =
    searchParams.get("formType") === "signup" ? <SignupForm /> : <LoginForm />;

  return (
    <section id="auth" className={sectionInMain}>
      <Container>
        <Row>
          <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
            {authForm}
          </Col>
        </Row>
      </Container>
    </section>
  );
}
