import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./zeytinus/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        // color
        color: "#212529",
        "color-reverse": "#dee2e6",
        "color-secondary": "rgba(33, 37, 41, 0.75)",
        "color-secondary-reverse": "rgba(222, 226, 230, 0.75)",
        "color-tertiary": "rgba(33, 37, 41, 0.3)",
        "color-tertiary-reverse": "rgba(222, 226, 230, 0.3)",
        // body
        body: "#fff",
        "body-reverse": "#212529",
        "body-secondary": "#e9ecef",
        "body-secondary-reverse": "#343a40",
        "body-tertiary": "#f8f9fa",
        "body-tertiary-reverse": "#2b3035",
        // codes
        success: "#198754",
        info: "#0dcaf0",
        warning: "#ffc107",
        danger: "#dc3545",
        // themes
        primary: "#e84545",
        "primary-reverse": "#f06565",
      },
      boxShadow: {
        reverse: "0px 4px 15px rgba(255, 255, 255, 0.15)",
      },
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
  plugins: [],
};

export default config;
