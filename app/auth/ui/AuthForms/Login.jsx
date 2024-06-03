"use client";

import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/auth/context";
import styles from "./styles.module.css";
import { useRoot } from "@/app/context";


export default function LoginForm() {
    const { apiUrl } = useRoot();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { setAuthTokens, setUser } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

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
                // Send form data to backend to authenticate user
                const response = await fetch(apiUrl + "/auth/token/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                        role: "USER",
                    }),
                });

                const responseData = await response.json();

                // Handle success
                if (responseData.access) {
                    setSuccess("Login Successful!");
                    setAuthTokens(responseData);
                    setUser(jwtDecode(responseData.access));
                    localStorage.setItem("authTokens", JSON.stringify(responseData));

                    // Reset form fields
                    setUsername("");
                    setPassword("");

                    // Redirect to the originally requested page or home page
                    const next = searchParams.get("next") || "/";
                    router.replace(next);
                }

                // Handle error
                else if (responseData.non_field_errors) {
                    setError(responseData.non_field_errors[0]);
                    const usernameField = form.querySelector("#login_username");
                    const passwordField = form.querySelector("#login_password");

                    passwordField.classList.add("is-invalid");
                    responseData.non_field_errors[0] === "No active account found with the given credentials" && usernameField.classList.add("is-invalid");

                    throw new Error(responseData.non_field_errors);
                } else {
                    setError("Something went wrong");
                    throw new Error("Something went wrong");
                }

            }

            catch (error) {
                console.error("Error:", error);
            }

            finally {
                form.classList.remove("was-validated");
                setLoading((loading) => !loading);
            }

        }

    };

    return (
        <form id="loginform" className={`row ${styles.authform}`} method="post" onSubmit={handleSubmit} noValidate>

            <div className="pb-2 w-100">

                <div className="d-flex align-items-center justify-content-between">
                    <h5 className="d-block mx-auto fw-bold text-center fs-4">Login to Your Account</h5>
                </div>
                <p className="text-center small">Enter your email & password to login</p>
            </div>

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

            <div className="col-12 form-floating mb-3">
                <input
                    type="text"
                    id="login_username"
                    onChange={(e) => setUsername(e.target.value)}
                    className={`form-control ${styles.input}`}
                    placeholder="name@example.com"
                    required
                    autoFocus
                />
                <label htmlFor="login_username" className={`form-label ${styles.label}`}>Your Username</label>
                <div className="invalid-feedback">Please enter a valid username</div>
            </div>


            <div className="col-12 form-floating mb-3">
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    id="login_password"
                    className={`form-control ${styles.input}`}
                    placeholder="Your password"
                    autoComplete="current-password"
                    required
                />
                <label htmlFor="login_password" className={`form-label ${styles.label}`}>Your password</label>
                <div className="invalid-feedback">Please enter your password</div>
            </div>
            {/* 
            <div className={`col-12 recaptcha px-5 py-1 d-flex justify-content-sm-between align-items-center ${styles.recaptcha}`}>
                <div
                    className="g-recaptcha"
                    data-sitekey=""
                    data-callback="enableBtn"
                    data-expired-callback="disableBtn"
                ></div>
            </div> */}

            <div className="col-12 btns d-flex flex-column flex-sm-row justify-content-center align-items-center mb-3">
                <button type="submit" className={`btn btn-primary text-white text-uppercase w-100 mb-3 mb-sm-0 ${styles.button}`} disabled={loading}>Login</button>
            </div>

            <div className="mt-4 col-12 d-sm-table text-center">
                <div className="d-sm-table-cell mb-2 mb-sm-0 border-end border-secondary">
                    <span className="form-text">Don&apos;t have an account? <Link className={styles.link} href="/auth/signup">Sign up here</Link></span>
                </div>
                <div className="d-sm-table-cell">
                    <span className="form-text">Request <Link className={styles.link} href="">Password Reset</Link></span>
                </div>
            </div>

        </form>
    );
}
