"use client";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSearchParams } from "next/navigation";
import { LoginForm, SignupForm } from "@/widgets/AuthForm/AuthForm";

export default function AuthSection({ sectionmain }) {
  const searchParams = useSearchParams();
  const authForm =
    searchParams.get("formType") === "signup" ? <SignupForm /> : <LoginForm />;

  return (
    <section id="auth" className={sectionmain}>
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
