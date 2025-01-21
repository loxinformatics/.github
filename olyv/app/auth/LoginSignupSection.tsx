"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useRef, useState } from "react";
import { authenticate, login } from "../../api/auth";
import { useAuth } from "../../context/auth";
import { useBase } from "../../context/base";
import authStyles from "../../styles/auth.module.css";
import type { LoginSignupProps } from "../../types/auth";
import { authApiURL } from "../../utils/auth";
import { homeURL } from "../../utils/core";
import { Btn, FormStatus, Section } from "../../widgets/base";
import { Preloader } from "../../widgets/core";

export default function LoginSignupSection({ component }: LoginSignupProps) {
  const router = useRouter();
  const { borderPrimaryFocus } = useBase();
  const { setUser, loginRedirectURL } = useAuth();

  const Login = () => {
    const SigninForm = () => {
      const searchParams = useSearchParams();
      const [username, setUsername] = useState<string>("");
      const [password, setPassword] = useState<string>("");
      const [loading, setLoading] = useState<boolean>(false);
      const [error, setError] = useState<string | null>(null);
      const [success, setSuccess] = useState<string | null>(null);

      // Refs for form fields
      const usernameRef = useRef<HTMLInputElement>(null);
      const passwordRef = useRef<HTMLInputElement>(null);

      async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Clear previous status messages and remove validation classes
        [usernameRef, passwordRef].forEach((ref) => {
          ref.current?.classList.remove("is-valid", "is-invalid");
        });
        setError(null);
        setSuccess(null);

        try {
          setLoading(true);
          const result = await authenticate(username, password);

          if (result.success) {
            // Login
            const user = await login({
              accessToken: result.accessToken,
              refreshToken: result.refreshToken,
            });

            setUser(user);
            setUsername("");
            setPassword("");
            setSuccess(result.message);

            // Redirect
            const nextUrl = searchParams.get("nextUrl");
            const redirectUrl = nextUrl || loginRedirectURL;
            router.replace(redirectUrl);
          } else {
            // Handle form field errors
            const usernameValidity = result.error.includes("username")
              ? "is-invalid"
              : !result.error.includes("detail") &&
                !result.error.includes("Internal server error") &&
                "is-valid";

            const passwordValidity = result.error.includes("password")
              ? "is-invalid"
              : !result.error.includes("detail") &&
                !result.error.includes("Internal server error") &&
                "is-valid";

            if (usernameValidity)
              usernameRef.current?.classList.add(usernameValidity);
            if (passwordValidity)
              passwordRef.current?.classList.add(passwordValidity);

            setError(result.message);
            throw new Error(result.error);
          }
        } catch (error) {
          console.error("Error during login:", error);
        } finally {
          setLoading(false);
        }
      }

      const callbackUrl = searchParams.get("callbackUrl") || homeURL;

      return (
        <form
          id="loginform"
          className={`
            ${authStyles.authform} w-full flex flex-col gap-4 p-6 
            border border-color-tertiary dark:border-color-tertiary-reverse 
            shadow-2xl dark:shadow-reverse
          `}
          onSubmit={handleSubmit}
          noValidate
        >
          <div>
            <div className="flex items-center justify-between">
              <h5 className="mx-auto font-bold text-center  text-sm">
                Login to Your Account
              </h5>
            </div>
            <p className="text-center text-sm">
              Enter your username & password to login
            </p>
          </div>

          <FormStatus success={success} error={error} loading={loading} />

          {/* Username */}
          <div>
            <div className="form-floating">
              <input
                type="text"
                className={`form-control ${authStyles.input} ${borderPrimaryFocus}`}
                id="login_username"
                name="username"
                placeholder="Your Username"
                required
                ref={usernameRef}
                value={username}
                disabled={loading || !!success}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="login_username" className={authStyles.label}>
                Your Username
              </label>
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="form-floating">
              <input
                type="password"
                className={`form-control ${authStyles.input} ${borderPrimaryFocus}`}
                id="login_password"
                placeholder="Your Password"
                ref={passwordRef}
                value={password}
                disabled={loading || !!success}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="login_password" className={authStyles.label}>
                Your Password
              </label>
            </div>
          </div>

          {/* Login and Back Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Btn
              className="w-full sm:w-1/2"
              type="submit"
              disabled={loading || !!success}
            >
              {loading ? "Logging in..." : "Login"}
            </Btn>

            {loading || success ? (
              <Btn className="w-full sm:w-1/2" disabled>
                {callbackUrl === homeURL ? "Home" : "Back"}
              </Btn>
            ) : (
              <Btn className="w-full sm:w-1/2" href={callbackUrl}>
                {callbackUrl === homeURL ? "Home" : "Back"}
              </Btn>
            )}
          </div>
        </form>
      );
    };

    return (
      <Section container center id="login" fullscreen>
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8">
          <div className="basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 max-w-sm">
            <Suspense fallback={<Preloader />}>
              <SigninForm />
            </Suspense>
          </div>
        </div>
      </Section>
    );
  };

  const Signup = () => {
    const SignupForm = () => {
      const [full_name, setFullName] = useState<string>("");
      const [username, setUsername] = useState<string>("");
      const [email, setEmail] = useState<string>("");
      const [password, setPassword] = useState<string>("");
      const [has_agreed, setHasAgreed] = useState<boolean | null>(null);
      const [loading, setLoading] = useState<boolean>(false);
      const [error, setError] = useState<string | null>(null);
      const [success, setSuccess] = useState<string | null>(null);
      const { borderPrimaryFocus, borderPrimaryChecked, bgPrimaryChecked } =
        useBase();

      const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        setError(null); // clear previous
        setSuccess(null); // clear previous

        if (!form.checkValidity()) {
          e.stopPropagation();
          form.classList.add("was-validated");
        } else {
          try {
            setLoading(true);

            // Prepare form data
            const formData = new FormData();
            formData.append("full_name", full_name);
            formData.append("email", email);
            formData.append("username", username);
            formData.append("password", password);

            // Send form data to backend
            const signupResponse = await fetch(`${authApiURL}/signup/`, {
              method: "POST",
              body: formData,
            });
            const responseData = await signupResponse.json();

            if (responseData.message) {
              setSuccess(responseData.message); // Handle success

              // Reset form fields
              setFullName("");
              setEmail("");
              setUsername("");
              setPassword("");
              setHasAgreed(null);

              form.classList.remove("was-validated");
            } else if (responseData.errors) {
              setError(responseData.errors.email[0].message); // Handle error
              form.classList.add("was-validated");
            } else {
              throw new Error("Failed to read 'message' or 'errors' field");
            }

            setLoading(false);
          } catch (error) {
            setError("Failed to send email");
            console.error("Error sending email:", error);
          }
        }
      };

      return (
        <form
          id="signupform"
          className={`row ${authStyles.authform}`}
          onSubmit={handleSubmit}
          method="post"
          noValidate
        >
          <div className="pb-2">
            <div className="flex items-center justify-content-between">
              <h5 className="d-block mx-auto font-bold text-center fs-4">
                Create an account
              </h5>
            </div>
            <p className="text-center text-xs">
              Enter your personal details to create an account
            </p>
          </div>

          <div className="my-2">
            <FormStatus success={success} error={error} loading={loading} />
          </div>

          {/* Full Name */}

          <div className="col-6 mb-4">
            <label
              htmlFor="signup_full_name"
              className={`forlabel ${authStyles.label}`}
            >
              Your Name
            </label>

            <input
              type="text"
              id="signup_full_name"
              value={full_name}
              onChange={(e) => setFullName(e.target.value)}
              className={`forcontrol ${authStyles.input} ${borderPrimaryFocus}`}
              required
            />

            <div className="invalid-feedback">Please enter your full name!</div>
          </div>

          {/* Email */}

          <div className="col-6 mb-4">
            <label
              htmlFor="signup_email"
              className={`forlabel ${authStyles.label}`}
            >
              Your Email
            </label>

            <input
              type="email"
              id="signup_email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`forcontrol ${authStyles.input} ${borderPrimaryFocus}`}
              required
            />

            <div className="invalid-feedback">
              Please enter a valid Email address!
            </div>
          </div>

          {/* Username */}

          <div className="col-6 mb-4">
            <label
              htmlFor="signup_username"
              className={`forlabel ${authStyles.label}`}
            >
              Username
            </label>

            <input
              type="text"
              id="signup_username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`forcontrol ${authStyles.input} ${borderPrimaryFocus}`}
              required
            />

            <div className="invalid-feedback">Please choose a username.</div>
          </div>

          {/* Password */}

          <div className="col-6 mb-4">
            <label
              htmlFor="signup_password"
              className={`forlabel ${authStyles.label}`}
            >
              Password
            </label>

            <input
              type="password"
              id="signup_password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`forcontrol ${authStyles.input} ${borderPrimaryFocus}`}
              required
            />

            <div className="invalid-feedback">Please enter your password!</div>
          </div>

          {/* Has Agreed */}

          <div className="col-12 mb-4">
            <div className="forcheck">
              <input
                type="checkbox"
                id="signup_agreeterms"
                checked={has_agreed || false}
                onChange={(e) => setHasAgreed(e.target.checked)}
                className={`forcheck-input ${authStyles.checkInput} ${borderPrimaryFocus} ${borderPrimaryChecked} ${bgPrimaryChecked}`}
                required
              />

              <label
                className={`forcheck-label ms-3 ${authStyles.label}`}
                htmlFor="signup_agreeterms"
              >
                I agree and accept the{" "}
                <Link href="#">terms and conditions</Link>
              </label>

              <div className="invalid-feedback">
                You must agree before submitting.
              </div>
            </div>
          </div>

          {/* Submit */}

          {/* <div className="col-12 d-stable text-center">
        <div className="d-stable-cell border-r">
          <span className="fortext">
            Already have an account?{" "}
            <Link className={styles.link} href="/auth/login">
              Login here
            </Link>
          </span>
        </div>
      </div> */}
        </form>
      );
    };

    return (
      <Section id="signup">
        <SignupForm />
      </Section>
    );
  };

  switch (component) {
    case "login":
    default:
      return <Login />;

    case "signup":
      return <Signup />;
  }
}
