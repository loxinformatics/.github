"use client";

import { useRef, useState } from "react";
import { Btn, FormStatus } from ".";
import { mail } from "../../api/base";
import baseStyles from "../../styles/base.module.css";
import { baseApiURL } from "../../utils/base";

export default function MailUsForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const endpoint = `${baseApiURL}/mail/us/`;

  // Refs for form fields
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Remove is-invalid class from all fields initially
    [nameRef, emailRef, subjectRef, messageRef].forEach((ref) => {
      ref.current?.classList.remove("is-invalid");
    });

    // Clear previous form states
    setError(null);
    setSuccess(null);

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add("was-validated");
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
          result.error.includes("name") &&
            nameRef.current?.classList.add("is-invalid");
          result.error.includes("email") &&
            emailRef.current?.classList.add("is-invalid");
          result.error.includes("subject") &&
            subjectRef.current?.classList.add("is-invalid");
          result.error.includes("message") &&
            messageRef.current?.classList.add("is-invalid");
          setError(result.message);
          throw new Error(result.error);
        }
      } catch (error) {
        console.error("Error sending email:", error);
      } finally {
        form.classList.remove("was-validated");
        setLoading(false);
      }
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      method="post"
      id="mailusform"
      className={baseStyles.mailusform}
    >
      <div className="flex flex-col gap-y-6">
        <FormStatus success={success} error={error} loading={loading} />

        <div className="flex gap-x-3">
          <div className="basis-1/2">
            <input
              type="text"
              className={`form-control ${baseStyles.input}`}
              id="mail-us-name"
              ref={nameRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
            />
            <div className="invalid-feedback">Enter your name.</div>
          </div>

          <div className="basis-1/2">
            <input
              type="email"
              className={`form-control ${baseStyles.input}`}
              id="mail-us-email"
              ref={emailRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              required
            />
            <div className="invalid-feedback">Enter a valid email.</div>
          </div>
        </div>

        <div>
          <input
            type="text"
            className={`form-control ${baseStyles.input}`}
            id="mail-us-subject"
            ref={subjectRef}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            required
          />
          <div className="invalid-feedback">Enter a subject.</div>
        </div>

        <div className="mb-4">
          <textarea
            className={`form-control ${baseStyles.textarea}`}
            id="mail-us-message"
            ref={messageRef}
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            required
          ></textarea>
          <div className="invalid-feedback">Enter a message.</div>
        </div>

        <div className="flex justify-center">
          <Btn type="submit" disabled={loading}>
            Send Message
          </Btn>
        </div>
      </div>
    </form>
  );
}
