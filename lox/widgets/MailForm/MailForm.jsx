"use client";

import { useAppContext } from "@/app/context";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import style from "./MailForm.module.css";

export default function MailForm() {
  const [name, setName] = useState("");
  const [sender_email, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { API_URL } = useAppContext();

  // post mail url
  const post_url = `${API_URL}/mail/`;

  // Send Mail function
  async function sendMail({ post_url, name, sender_email, subject, message }) {
    const response = await fetch(post_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        sender_email,
        subject,
        message,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: data.success }; // Assuming the success message is under data.success
    } else if (response.status === 400) {
      return {
        error: data.sender_email ? data.sender_email[0] : "Invalid data",
      };
    } else {
      throw new Error("Something went wrong");
    }
  }

  // handle submit functiom
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    setError(null); // clear previous
    setSuccess(null); // clear previous

    // Remove is-invalid class from all fields initially
    const formFields = form.querySelectorAll(".form-control");
    formFields.forEach((field) => {
      field.classList.remove("is-invalid");
    });

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add("was-validated");
    } else {
      setLoading(true);

      try {
        const result = await sendMail({
          post_url,
          name,
          sender_email,
          subject,
          message,
        });

        if (result.success) {
          setSuccess(result.success);
          setName("");
          setSenderEmail("");
          setSubject("");
          setMessage("");
        } else if (result.error) {
          setError(result.error);
          const emailField = form.querySelector("input[type='email']");
          emailField.classList.add("is-invalid");
        }
      } catch (error) {
        console.error("Error:", error);
        setError(error.message || "Something went wrong");
      } finally {
        form.classList.remove("was-validated");
        setLoading(false);
      }
    }
  };

  return (
    <Form
      noValidate
      onSubmit={handleSubmit}
      method="post"
      id="mailusform"
      className="mailusform w-100"
    >
      <Row className="gy-4">
        <Col xs={12}>
          {success && (
            <div className="alert alert-success text-center">{success}</div>
          )}
          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}
          {loading && (
            <div className="loading text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </Col>
        <Form.Group as={Col} xs={6} controlId="nameInput">
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className={`${style.mailform_input}`}
            required
          />
          <Form.Control.Feedback type="invalid">
            Enter your name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} xs={6} controlId="emailInput">
          <Form.Control
            type="email"
            value={sender_email}
            onChange={(e) => setSenderEmail(e.target.value)}
            placeholder="Your Email"
            className={`${style.mailform_input}`}
            required
          />
          <Form.Control.Feedback type="invalid">
            Enter a valid email
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} xs={12} controlId="subjectInput">
          <Form.Control
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className={`${style.mailform_input}`}
            required
          />
          <Form.Control.Feedback type="invalid">
            Enter a subject.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} xs={12} controlId="messageInput">
          <Form.Control
            as="textarea"
            rows={6}
            className={`${style.mailform_textarea}`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            required
          />
          <Form.Control.Feedback type="invalid">
            Enter a message.
          </Form.Control.Feedback>
        </Form.Group>
        <Col xs={12} className="text-center">
          <Button
            className={`${style.mailform_button} px-4 py-2 text-white`}
            type="submit"
            disabled={loading}
          >
            Send Message
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
