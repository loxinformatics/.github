"use client";

import { createElement, forwardRef } from "react";
import Alert from "../alerts/Alert";
import Spinner from "../loaders/Spinner";
import styles from "./styles.module.css";
import type { ControlProps, FeedbackProps, FormProps } from "./types";

export const Control = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  ControlProps
>(
  (
    {
      variant = "input",
      type,
      id,
      value,
      onChange,
      placeholder,
      name,
      disabled = false,
      className = "",
      required = false,
      rows,
    },
    ref
  ) => {
    const baseClass = `${styles["form-control"]} block text-sm w-full rounded text-color dark:text-color-reverse 
      bg-body dark:bg-body-reverse disabled:bg-body-secondary dark:disabled:bg-body-secondary-reverse 
      bg-clip-padding appearance-none border border-color-tertiary dark:border-color-tertiary-reverse 
      focus:border-primary-reverse focus:outline-none focus:ring-0 focus:ring-primary/25 
      dark:focus:ring-primary-reverse/25 py-[0.375rem] px-3 transition-all ease-in-out duration-150 
      disabled:cursor-not-allowed`;

    return createElement(variant, {
      type: variant === "input" ? type : undefined,
      id,
      ref,
      value,
      onChange,
      placeholder,
      name,
      required,
      disabled,
      rows: variant === "textarea" ? rows : undefined,
      className: `${baseClass} ${className}`.trim(),
    });
  }
);

Control.displayName = "Control";


export function Floating(){

  return (
    <div className={`${styles["form-floating" ]}`}>

    </div>
  );
}

export function Feedback({ type, children }: FeedbackProps) {
  const feedbackClass =
    type === "valid"
      ? "text-success dark:text-success-reverse"
      : "text-danger dark:text-danger-reverse";

  return (
    <div className={`${styles[`${type}-feedback`]} ${feedbackClass}`}>
      {children}
    </div>
  );
}

export function Form({
  children,
  noValidate = true,
  onSubmit,
  method = "get",
  id,
  className = "",
  success,
  error,
  loading,
}: FormProps) {
  return (
    <form
      id={id}
      className={`text-sm ${className}`.trim()}
      noValidate={noValidate}
      onSubmit={onSubmit}
      method={method}
    >
      <div className="mb-5">
        {success && <Alert status="success">{success}</Alert>}
        {error && <Alert status="error">{error}</Alert>}
        {loading && (
          <div className="loading flex justify-center items-center">
            <Spinner />
            <div className="sr-only">Loading...</div>
          </div>
        )}
      </div>

      {children}
    </form>
  );
}
