"use client";

import { useBase } from "@/olyv/context/base";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { forwardRef, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import type {
  AlertProps,
  ButtonProps,
  FormProps,
  FormStatusProps,
  LogoProps,
  ModalProps,
  SectionProps,
  SocialMediaLinkProps,
  SpinnerProps,
  ThemeTogglerProps,
  TitleProps,
} from "./types";

export const Btn = ({
  id,
  className,
  disabled = false,
  type = "button",
  outline = false,
  size = "md",
  href,
  onClick,
  children,
}: ButtonProps) => {
  const { bgPrimary, borderPrimary, bgBodyHover, bgPrimaryHover } = useBase();

  const sizeClasses = {
    sm: "px-4 py-1 text-xs",
    md: "px-6 py-2 text-sm",
    lg: "px-[40px] py-[12px] text-base",
  };

  const commonClasses = `
    ${sizeClasses[size]} 
    ${!!outline ? "border-2" : bgPrimary}
    ${outline === true && "border-white"}
    ${outline === "primary" && borderPrimary}
    ${!!outline ? `${bgBodyHover} hover:border-transparent` : bgPrimaryHover}
    disabled:bg-gray-400 disabled:cursor-not-allowed
    text-white whitespace-nowrap rounded font-medium
    flex items-center justify-center  
    transition duration-300
    tracking-wider 
    ${className}
  `;

  const component = !!href ? "link" : "button";

  switch (component) {
    case "button":
    default:
      return (
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          id={id}
          className={commonClasses}
        >
          {children}
        </button>
      );

    case "link":
      const isExternalLink =
        href?.startsWith("http") || href?.startsWith("https");
      return (
        <Link
          href={href || "#"}
          onClick={onClick}
          id={id}
          className={commonClasses}
          {...(isExternalLink && {
            target: "_blank",
            rel: "noopener noreferrer",
          })}
        >
          {children}
        </Link>
      );
  }
};

export const Spinner = ({ borderSize, borderColor }: SpinnerProps) => {
  const { borderPrimary } = useBase();
  const color = borderColor || borderPrimary;

  const sizeClasses = {
    small: "w-4 h-4 border-2",
    medium: "w-8 h-8 border-4",
    large: "w-12 h-12 border-4",
  };

  const size = sizeClasses[borderSize || "medium"];

  return (
    <div
      className={`${size} ${color} border-t-transparent dark:border-t-transparent rounded-full animate-spin`}
      aria-label="Loading spinner"
    ></div>
  );
};

export const Alert = ({ children, status }: AlertProps) => {
  let border;
  let textColor;
  let bg;

  /*
   * border colors I used for example bootstrap's '--bs-danger-border-subtle' for the light and dark,
   * text color - --bs-success-text-emphasis,
   */

  switch (status) {
    case "success":
      border = "border border-[#a3cfbb] dark:border-[#0f5132]";
      textColor = "text-[#0a3622] dark:text-[#75b798]";
      bg = "bg-[#d1e7dd] dark:bg-[#051b11]";
      break;

    case "error":
      border = "border border-[#f1aeb5] dark:border-[#842029]";
      textColor = "text-[#58151c] dark:text-[#ea868f]";
      bg = "bg-[#f8d7da] dark:bg-[#2c0b0e]";

      break;

    default:
      border = "";
      textColor = "";
      bg = "";
      break;
  }
  return (
    <div
      className={`relative p-4 rounded-md text-center ${border} ${textColor} ${bg}`}
    >
      {children}
    </div>
  );
};

export const Modal = ({
  id,
  toggleButtonColor,
  isModalOpen,
  toggleModal,
  children,
}: ModalProps) => {
  const toggle_color =
    toggleButtonColor || "text-color dark:text-color-reverse";

  return (
    <div
      id={id}
      className={
        isModalOpen
          ? `fixed overflow-hidden z-40 inset-0 bg-black/90 transition duration-300`
          : "lg:hidden"
      }
    >
      {/* Modal */}
      <div
        className={` ${
          isModalOpen ? "block" : "hidden"
        } absolute overflow-y-auto bg-body dark:bg-body-reverse top-[55px] right-[15px] bottom-[15px] left-[15px] py-2.5 transition-all duration-300`}
      >
        {children}
      </div>
      {/* Toggle button */}
      <button className="bg-transparent border-0" onClick={toggleModal}>
        {isModalOpen ? (
          <i
            className={`bi bi-x text-white absolute top-[15px] end-[15px] text-3xl border-0 cursor-pointer transition duration-500`}
          ></i>
        ) : (
          <i
            className={`bi bi-list ${toggle_color} text-3xl border-0 cursor-pointer transition duration-500`}
          ></i>
        )}
      </button>
    </div>
  );
};

export const FormStatus = ({ success, error, loading }: FormStatusProps) => {
  return (
    <div className="status-messages">
      {success && <Alert status="success">{success}</Alert>}
      {error && <Alert status="error">{error}</Alert>}
      {loading && (
        <div className="loading flex justify-center items-center">
          <Spinner />
          <div className="sr-only">Loading...</div>
        </div>
      )}
    </div>
  );
};

export const Form = ({
  children,
  onSubmit,
  success,
  error,
  loading,
}: FormProps) => {
  return (
    <form className="mt-12" onSubmit={onSubmit} noValidate>
      <div className="grid grid-cols-1 gap-4 px-12">
        <FormStatus success={success} error={error} loading={loading} />

        {children}

        <div className="pb-12">
          <Btn type="submit" className="mt-4" disabled={loading}>
            Submit
          </Btn>
        </div>
      </div>
    </form>
  );
};

export const ThemeToggler = ({ toggleColor }: ThemeTogglerProps) => {
  const [icon, setIcon] = useState<"moon" | "sun">("moon");
  const { theme, setTheme } = useTheme();
  const { textColorHover } = useBase();
  const color = toggleColor || "text-color dark:text-color-reverse";

  useEffect(() => {
    setIcon(theme === "dark" ? "sun" : "moon");
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <button
      id="themeTogglerBtn"
      className={`bg-transparent border-0 ${color} ${textColorHover}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <i className={`bi bi-${icon}-fill`}></i>
    </button>
  );
};

export const Logo = ({ logoVersion, textColor }: LogoProps) => {
  const { coloredLogoFullImage, fullName, shortName, textPrimary, homeURL } =
    useBase();
  const version = logoVersion || "logo_image";
  const color = textColor || "text-color dark:text-color-reverse";

  return (
    <Link id="logo" href={homeURL} className="py-2">
      {version === "logo_image" ? (
        // TODO: Have an option for choosing whether to either differentiate which images should be showing based on screen size or theme is dark, or if just one image should be used irrespective of screen size or theme.
        <Image
          src={coloredLogoFullImage}
          width={55}
          height={55}
          alt="logo"
          priority
        />
      ) : (
        <h1 className={`${color} font-bold text-3xl py-2`}>
          {version === "app_full_name" && fullName}
          {version === "app_short_name" && shortName}
          <span className={textPrimary}>.</span>
        </h1>
      )}
    </Link>
  );
};

export const SocialMediaLinks = () => {
  const {
    socialMediaLinksVersion,
    facebook,
    twitterX,
    instagram,
    linkedin,
    spotify,
    bgBodyHover,
    borderColorHover,
    textColorHover,
    bgPrimary,
    bgPrimaryHover,
  } = useBase();
  const socialLinks = [
    {
      href: facebook || "",
      className: "facebook",
      iconClass: "bi-facebook",
    },
    {
      href: twitterX || "",
      className: "twitter_x",
      iconClass: "bi-twitter-x",
    },
    {
      href: instagram || "",
      className: "instagram",
      iconClass: "bi-instagram",
    },
    {
      href: linkedin || "",
      className: "linkedin",
      iconClass: "bi-linkedin",
    },
    {
      href: spotify || "",
      className: "spotify",
      iconClass: "bi-spotify",
    },
  ];

  const SocialMediaLink = ({
    href,
    version,
    className,
    iconClass,
  }: SocialMediaLinkProps) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles[`${version}_socialMediaLink`]} ${className}

        ${version === "V1" && bgBodyHover}
        
        ${
          version === "V2" &&
          `border border-color/50 dark:border-color-reverse/50 ${borderColorHover}
          text-color/50 dark:text-color-reverse/50 ${textColorHover}`
        }

        ${version === "V3" && `text-white ${bgPrimary} ${bgPrimaryHover}`}
      `}
      >
        <i className={`bi ${iconClass}`}></i>
      </a>
    );
  };

  return (
    <div className="flex">
      {socialLinks.map(
        (link, index) =>
          link.href && (
            <SocialMediaLink
              key={index}
              href={link.href}
              version={socialMediaLinksVersion}
              className={link.className}
              iconClass={link.iconClass}
            />
          )
      )}
    </div>
  );
};

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  function Section(
    {
      id,
      className,
      style,
      dataAos,
      container = true,
      center = true,
      padding = true,
      fullscreen = false,
      children,
      title_version,
      title_h2,
      title_h3,
      title_p,
    },
    ref
  ) {
    // Check if any title-related props are provided
    const hasTitle = title_h2 || title_h3 || title_p;

    // TODO: Remove ClassName, and put custom props
    return (
      <section
        ref={ref}
        id={id}
        className={`relative overflow-hidden ${className}
          ${fullscreen && "h-screen w-full flex flex-col"}
        `}
        style={style}
        {...(dataAos && { "data-aos": dataAos })}
      >
        {hasTitle && (
          <div
            className={`
                 ${container && "container"}
                 ${center && `mx-auto`}
                 ${padding ? "py-10" : "pb-10"}
                 ${fullscreen && "flex-initial"}
                `}
          >
            <Title
              titleVersion={title_version}
              titleH2={title_h2}
              titleH3={title_h3}
              titleP={title_p}
            />
          </div>
        )}

        <div
          className={`
            ${container && `container`}
            ${center && `mx-auto`}
            ${padding && (!hasTitle ? "py-10" : "pb-10")}
            ${fullscreen && "flex-1 flex"} 
          `}
          // TODO: For fullscreen add the option of making it 'flex flex-row', 'flex flex-col' 'or 'grid and the number of grid rows.'
        >
          {children}
        </div>
      </section>
    );
  }
);

const Title = ({ titleH2, titleH3, titleP, titleVersion }: TitleProps) => {
  const { textPrimary, bgPrimaryBefore, bgPrimaryAfter } = useBase();
  const version = titleVersion || "V1";

  return (
    <div
      className={`${styles.title} ${
        version !== "V1" ? "text-center" : "text-start"
      }`}
    >
      <div>
        {titleH2 && (
          <h2
            className={`${styles[`${version}_h2`]} 
            ${
              version === "V1" &&
              "text-color-secondary dark:text-color-secondary-reverse"
            }
            ${
              version === "V3" &&
              `${textPrimary} bg-body-secondary dark:bg-body-secondary-reverse`
            }
             ${bgPrimaryBefore} ${bgPrimaryAfter}`}
          >
            {titleH2}
          </h2>
        )}

        {titleH3 && version === "V3" && (
          <h3 className={styles[`${version}_h3`]}>{titleH3}</h3>
        )}

        {titleP && <p className={styles[`${version}_p`]}>{titleP}</p>}
      </div>
    </div>
  );
};

export const MailUsForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { mail, baseApiURL } = useBase();

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
      className={styles.mailusform}
    >
      <div className="flex flex-col gap-y-6">
        <FormStatus success={success} error={error} loading={loading} />

        <div className="flex gap-x-3">
          <div className="basis-1/2">
            <input
              type="text"
              className={`form-control ${styles.input}`}
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
              className={`form-control ${styles.input}`}
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
            className={`form-control ${styles.input}`}
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
            className={`form-control ${styles.textarea}`}
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
          <Btn
            className={`${styles.mailform_button}`}
            type="submit"
            disabled={loading}
          >
            Send Message
          </Btn>
        </div>
      </div>
    </form>
  );
};
