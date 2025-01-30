"use client";

import { useRef, useState } from "react";
import { mail } from "../../base/management/actions";
import { baseApiURL } from "../../base/utils";
import Btn from "../buttons/Button";
import { Control, Feedback, Form } from "./Form";
import styles from "./styles.module.css";

export default function MailUsForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const endpoint = `${baseApiURL}/mail/us/`;

  // Refs for form fields
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Refs and their associated error keys
    const fieldRefs = [
      { ref: nameRef, key: "name" },
      { ref: emailRef, key: "email" },
      { ref: subjectRef, key: "subject" },
      { ref: messageRef, key: "message" },
    ];

    // Remove is-invalid class from all fields initially
    fieldRefs.forEach(({ ref }) => {
      ref.current?.classList.remove(styles["is-invalid"]);
    });

    // Clear previous form states
    setError("");
    setSuccess("");

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add(styles["was-validated"]);
    } else {
      setLoading(true);

      try {
        const result = await mail({
          name,
          email,
          subject,
          message,
          endpoint,
        });

        if (result.success) {
          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
          setSuccess(result.message);
        } else {
          // Add is-invalid class to fields with errors
          fieldRefs.forEach(({ ref, key }) => {
            if (result.error.includes(key)) {
              ref.current?.classList.add(styles["is-invalid"]);
            }
          });
          setError(result.message);
          throw new Error(result.error);
        }
      } catch (error) {
        console.error("Error sending email:", error);
      } finally {
        form.classList.remove(styles["was-validated"]);
        setLoading(false);
      }
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      method="post"
      id="mailusform"
      className={styles.mailusform}
      success={success}
      error={error}
      loading={loading}
    >
      <div className="flex flex-col gap-y-6">
        <div className="flex gap-x-3">
          <div className="basis-1/2">
            <Control
              type="text"
              className={`form-control ${styles.input}`}
              id="mail-us-name"
              ref={nameRef}
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              placeholder="Your Name"
              required
            />
            <Feedback type="invalid">Enter your name.</Feedback>
          </div>

          <div className="basis-1/2">
            <Control
              type="email"
              className={`form-control ${styles.input}`}
              id="mail-us-email"
              ref={emailRef}
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              placeholder="Your Email"
              required
            />
            <Feedback type="invalid">Enter a valid email.</Feedback>
          </div>
        </div>

        <div>
          <Control
            type="text"
            className={`form-control ${styles.input}`}
            id="mail-us-subject"
            ref={subjectRef}
            value={subject}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSubject(e.target.value)
            }
            placeholder="Subject"
            required
          />
          <Feedback type="invalid">Enter a subject.</Feedback>
        </div>

        <div className="mb-4">
          <Control
            variant="textarea"
            className={`form-control ${styles.textarea}`}
            id="mail-us-message"
            ref={messageRef}
            rows={6}
            value={message}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setMessage(e.target.value)
            }
            placeholder="Message"
            required
          />
          <Feedback type="invalid">Enter a message.</Feedback>
        </div>

        <div className="flex justify-center">
          <Btn type="submit" disabled={loading}>
            Send Message
          </Btn>
        </div>
      </div>
    </Form>
  );
}
