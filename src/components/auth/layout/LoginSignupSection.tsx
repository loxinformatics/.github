"use client";

import { Suspense } from "react";
import Preloader from "../../widgets/loaders/Preloader";
import Section from "../../widgets/sections/Section";
import type { LoginSignupProps } from "../types";
import { LoginForm } from "../widgets/forms/LoginSignupForm";

export default function LoginSignupSection({ component }: LoginSignupProps) {
  switch (component) {
    case "login":
    default:
      return <Login />;

    // case "signup":
    //   return <Signup />;
  }
}

function Login() {
  return (
    <Section container id="login" fullscreen>
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 max-w-sm">
          <Suspense fallback={<Preloader />}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </Section>
  );
}

// function Signup() {
//   return (
//     <Section id="signup">
//       <SignupForm />
//     </Section>
//   );
// }
