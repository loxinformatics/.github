"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { useBase } from "../../../../base/app";
import { Button } from "../../../../base/widgets/buttons";
import { Control, Form } from "../../../../base/widgets/forms/Form";
import { Heading } from "../../../../base/widgets/text";
import olyvConfig from "../../../../config";
import { useAuth } from "../../../app/Auth";
import { authenticate, login } from "../../../app/Auth/server";
import baseStyles from "../../../base/widgets/forms/styles.module.css";
import styles from "./styles.module.css";

export default function LoginSignupForm({
  variant,
}: {
  variant: "LoginForm" | "SignupForm";
}) {
  switch (variant) {
    case "LoginForm":
    default:
      return <LoginForm />;

    // case "SignupForm":
    //   return <SignupForm />;
  }
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const { borderPrimaryFocus } = useBase();
  const { setUser } = useAuth();

  // Refs for form fields
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous status messages and remove validation classes
    [usernameRef, passwordRef].forEach((ref) => {
      ref.current?.classList.remove(
        baseStyles["is-valid"],
        baseStyles["is-invalid"]
      );
    });
    setError("");
    setSuccess("");

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
        router.replace(nextUrl || olyvConfig.endpoints.loginRedirect);
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
  };

  const callbackUrl =
    searchParams.get("callbackUrl") || olyvConfig.endpoints.home;

  return (
    <Form
      id="loginform"
      className={`
            ${styles.authform} w-full flex flex-col gap-4 p-6 
            border border-color-tertiary dark:border-color-tertiary-reverse 
            shadow-2xl dark:shadow-reverse
          `}
      onSubmit={handleSubmit}
      success={success}
      error={error}
      loading={loading}
      method="post"
    >
      <div className="text-center">
        <Heading variant="h5" className="mb-3">
          Login to Your Account
        </Heading>
        <p>Enter your username & password to login</p>
      </div>

      {/* Username */}
      <div>
        <label className="mb-1 block" htmlFor="login_username">
          Enter your Username:
        </label>
        <Control
          type="text"
          className={`${styles.input} ${borderPrimaryFocus}`}
          id="login_username"
          name="username"
          required
          ref={usernameRef}
          value={username}
          disabled={loading || !!success}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {/* Password */}
      <div>
        <label className="mb-1 block" htmlFor="login_password">
          Enter your Password:
        </label>
        <Control
          type="password"
          className={`${styles.input} ${borderPrimaryFocus}`}
          id="login_password"
          ref={passwordRef}
          value={password}
          disabled={loading || !!success}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Login and Back Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <Button
          className="w-full sm:w-1/2"
          type="submit"
          disabled={loading || !!success}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        {loading || success ? (
          <Button className="w-full sm:w-1/2" disabled>
            {callbackUrl === olyvConfig.endpoints.home ? "Home" : "Back"}
          </Button>
        ) : (
          <Button className="w-full sm:w-1/2" href={callbackUrl}>
            {callbackUrl === olyvConfig.endpoints.home ? "Home" : "Back"}
          </Button>
        )}
      </div>
    </Form>
  );
}

// export function SignupForm() {
//   const [full_name, setFullName] = useState<string>("");
//   const [username, setUsername] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [has_agreed, setHasAgreed] = useState<boolean | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>("");
//   const [success, setSuccess] = useState<string>("");
//   const { borderPrimaryFocus, borderPrimaryChecked, bgPrimaryChecked } =
//     useBase();

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const form = e.currentTarget;

//     setError(""); // clear previous
//     setSuccess(""); // clear previous

//     if (!form.checkValidity()) {
//       e.stopPropagation();
//       form.classList.add("was-validated");
//     } else {
//       try {
//         setLoading(true);

//         // Prepare form data
//         const formData = new FormData();
//         formData.append("full_name", full_name);
//         formData.append("email", email);
//         formData.append("username", username);
//         formData.append("password", password);

//         // Send form data to backend
//         const signupResponse = await fetch(`${authApiURL}/signup/`, {
//           method: "POST",
//           body: formData,
//         });
//         const responseData = await signupResponse.json();

//         if (responseData.message) {
//           setSuccess(responseData.message); // Handle success

//           // Reset form fields
//           setFullName("");
//           setEmail("");
//           setUsername("");
//           setPassword("");
//           setHasAgreed(null);

//           form.classList.remove("was-validated");
//         } else if (responseData.errors) {
//           setError(responseData.errors.email[0].message); // Handle error
//           form.classList.add("was-validated");
//         } else {
//           throw new Error("Failed to read 'message' or 'errors' field");
//         }

//         setLoading(false);
//       } catch (error) {
//         setError("Failed to send email");
//         console.error("Error sending email:", error);
//       }
//     }
//   };

//   return (
//     <Form
//       id="signupform"
//       className={`row ${styles.authform}`}
//       onSubmit={handleSubmit}
//       method="post"
//       success={success}
//       error={error}
//       loading={loading}
//     >
//       <div className="text-center">
//         <Heading variant="h5" className="mb-3">
//           Create an account
//         </Heading>
//         <p>Enter your personal details to create an account</p>
//       </div>

//       {/* Full Name */}

//       <div className="col-6 mb-4">
//         <label
//           htmlFor="signup_full_name"
//           className={`forlabel ${styles.label}`}
//         >
//           Your Name
//         </label>

//         <input
//           type="text"
//           id="signup_full_name"
//           value={full_name}
//           onChange={(e) => setFullName(e.target.value)}
//           className={`forcontrol ${styles.input} ${borderPrimaryFocus}`}
//           required
//         />

//         <div className="invalid-feedback">Please enter your full name!</div>
//       </div>

//       {/* Email */}

//       <div className="col-6 mb-4">
//         <label htmlFor="signup_email" className={`forlabel ${styles.label}`}>
//           Your Email
//         </label>

//         <input
//           type="email"
//           id="signup_email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className={`forcontrol ${styles.input} ${borderPrimaryFocus}`}
//           required
//         />

//         <div className="invalid-feedback">
//           Please enter a valid Email address!
//         </div>
//       </div>

//       {/* Username */}

//       <div className="col-6 mb-4">
//         <label htmlFor="signup_username" className={`forlabel ${styles.label}`}>
//           Username
//         </label>

//         <input
//           type="text"
//           id="signup_username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className={`forcontrol ${styles.input} ${borderPrimaryFocus}`}
//           required
//         />

//         <div className="invalid-feedback">Please choose a username.</div>
//       </div>

//       {/* Password */}

//       <div className="col-6 mb-4">
//         <label htmlFor="signup_password" className={`forlabel ${styles.label}`}>
//           Password
//         </label>

//         <input
//           type="password"
//           id="signup_password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className={`forcontrol ${styles.input} ${borderPrimaryFocus}`}
//           required
//         />

//         <div className="invalid-feedback">Please enter your password!</div>
//       </div>

//       {/* Has Agreed */}

//       <div className="col-12 mb-4">
//         <div className="forcheck">
//           <input
//             type="checkbox"
//             id="signup_agreeterms"
//             checked={has_agreed || false}
//             onChange={(e) => setHasAgreed(e.target.checked)}
//             className={`forcheck-input ${styles.checkInput} ${borderPrimaryFocus} ${borderPrimaryChecked} ${bgPrimaryChecked}`}
//             required
//           />

//           <label
//             className={`forcheck-label ms-3 ${styles.label}`}
//             htmlFor="signup_agreeterms"
//           >
//             I agree and accept the{" "}
//             <Anchor href="#">terms and conditions</Anchor>
//           </label>

//           <div className="invalid-feedback">
//             You must agree before submitting.
//           </div>
//         </div>
//       </div>

//       {/* Submit */}

//       {/* <div className="col-12 d-stable text-center">
//         <div className="d-stable-cell border-r">
//           <span className="fortext">
//             Already have an account?{" "}
//             <Anchor className={styles.link} href="/auth/login">
//               Login here
//             </Anchor>
//           </span>
//         </div>
//       </div> */}
//     </Form>
//   );
// }
