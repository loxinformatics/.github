"use client";

import { useState } from "react";
import { useRootcontext } from "@/app/context";
import styles from "./styles.module.css";

export default function MailUsForm() {
	const { apiUrl } = useRootcontext();
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
				const response = await fetch(apiUrl + "/mail-us/", {
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
						className={`form-control ${styles.input}`}
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
						className={`form-control ${styles.input}`}
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
						className={`form-control ${styles.input}`}
						required
					/>
					<div className="invalid-feedback subject-feedback">
						Enter a subject.
					</div>
				</div>
				<div className="col-md-12">
					<textarea
						className={`form-control ${styles.textarea}`}
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
					<button className={`btn ${styles.button}`} type="submit" disabled={loading}>
						Send Message
					</button>
				</div>
			</div>
		</form>
	);
}
