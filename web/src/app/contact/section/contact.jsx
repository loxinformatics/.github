"use client";

import styles from "./contact.module.css"
import Link from "next/link";
import { useState } from "react";
import { BsGeoAlt, BsEnvelope, BsPhone } from "react-icons/bs";
import ContactContext, { useContactContext } from "@/app/contact/context";
import { apiUrl } from "@/app/context";

export default function ContactSection({ sectionmain, children }) {
    return (
        <ContactContext>
            <section id="contact" className={sectionmain}>
                <div className="container">
                    {children}
                </div>
            </section>
        </ContactContext>
    );
}

export function ContactContent() {
    const { contact_info } = useContactContext();
    const city_name = contact_info?.city_name;
    const primary_email = contact_info?.primary_email;
    const secondary_email = contact_info?.secondary_email;
    const primary_phone = contact_info?.primary_phone;
    const secondary_phone = contact_info?.secondary_phone;

    return (
        <div className={styles.contactcontent_info}>
            <div className="address">
                <div className={styles.contactcontent_icon}><BsGeoAlt className={styles.contactcontent_svg} /></div>
                <h4 className={styles.contactcontent_h4}>Location:</h4>

                {city_name && (<p className={styles.contactcontent_p}>{city_name}</p>)}

            </div>

            <div className={styles.contactcontent_email}>
                <div className={styles.contactcontent_icon}><BsEnvelope className={styles.contactcontent_svg} /></div>
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
                <div className={styles.contactcontent_icon}><BsPhone className={styles.contactcontent_svg} /></div>
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
    );
}

export function MailForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

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
            setLoading((loading) => !loading);

            try {
                const response = await fetch(apiUrl + "/contact/mail/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: name,
                        sender_email: email,
                        subject: subject,
                        message: message,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    setSuccess(data);
                    setName("");
                    setEmail("");
                    setSubject("");
                    setMessage("");
                } else if (response.status === 400) {
                    // An error can possibly occur only in the email field
                    setError(data.sender_email[0]);
                    const emailField = form.querySelector("input[type='email']");
                    emailField.classList.add("is-invalid");
                    throw new Error(data.sender_email[0]);
                } else {
                    setError("Something went wrong");
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                form.classList.remove("was-validated");
                setLoading((loading) => !loading);
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            method="post"
            id="mailusform"
            className="mailusform w-100 bg-white"
            noValidate
        >
            <div className="my-2">
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
            </div>
            <div className="row gy-4">
                <div className="col-6">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        className={`form-control ${styles.mailform_input}`}
                        required
                    />
                    <div className="invalid-feedback name-feedback">
                        Enter your name.
                    </div>
                </div>
                <div className="col-6">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your Email"
                        className={`form-control ${styles.mailform_input}`}
                        required
                    />
                    <div className="invalid-feedback email-feedback">
                        Enter a valid email
                    </div>
                </div>
                <div className="col-md-12">
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Subject"
                        className={`form-control ${styles.mailform_input}`}
                        required
                    />
                    <div className="invalid-feedback subject-feedback">
                        Enter a subject.
                    </div>
                </div>
                <div className="col-md-12">
                    <textarea
                        className={`form-control ${styles.mailform_textarea}`}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows="6"
                        placeholder="Message"
                        required
                    ></textarea>
                    <div className="invalid-feedback message-feedback">
                        Enter a message.
                    </div>
                </div>
                <div className="col-md-12 text-center">
                    <button className={`btn ${styles.mailform_button}`} type="submit" disabled={loading}>
                        Send Message
                    </button>
                </div>
            </div>
        </form>
    );
}
