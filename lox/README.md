# shared_components

1. npm install the following in the parent project.

```shell
npm i aos@latest bootstrap@latest bootstrap-icons@latest boxicons@latest react-bootstrap@latest jwt-decode@latest --save && npm i sass@latest --save-dev
```

2. .env variable - True or False

``` raw
NEXT_PUBLIC_DEBUG = "False"
```

3. Global.scss file with this minimal custom bootstrap css. Ensure the path to node_modules is correct.

``` scss
// @/app/global.scss

// Custom Bootstrap
// *: https://getbootstrap.com/docs/5.3/customize/sass/

/* Include functions first (so you can manipulate colors, SVGs, calc, etc)
------------------------------*/
@import "../node_modules/bootstrap/scss/functions";

/* Include any default variable overrides here
------------------------------*/
@font-face {
  font-family: "Titillium-Regular";
  src: url("/fonts/Titillium-Regular.otf");
}

$font-sans-serif: "Titillium-Regular", system-ui, -apple-system, "Segoe UI",
  Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

$primary: #ff5751; // custom color  
$link-decoration: none;

/* Include remainder of required Bootstrap stylesheets (including any separate color mode stylesheets)
------------------------------*/
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/variables-dark";

/* Include any default map overrides here
------------------------------*/

/* Include remainder of required parts
------------------------------*/
@import "../node_modules/bootstrap/scss/maps";
@import "../node_modules/bootstrap/scss/mixins";
@import "../node_modules/bootstrap/scss/root";

/* Optionally include any other parts as needed
------------------------------*/
@import "../node_modules/bootstrap/scss/utilities";
@import "../node_modules/bootstrap/scss/reboot";
@import "../node_modules/bootstrap/scss/type";
@import "../node_modules/bootstrap/scss/images";
@import "../node_modules/bootstrap/scss/containers";
@import "../node_modules/bootstrap/scss/grid";
@import "../node_modules/bootstrap/scss/buttons";
@import "../node_modules/bootstrap/scss/forms";
@import "../node_modules/bootstrap/scss/helpers";
@import "../node_modules/bootstrap/scss/spinners";
@import "../node_modules/bootstrap/scss/alert";
@import "../node_modules/bootstrap/scss/nav";
@import "../node_modules/bootstrap/scss/list-group";
@import "../node_modules/bootstrap/scss/card";
@import "../node_modules/bootstrap/scss/modal";

/* Optionally include utilities API last to generate classes based on the Sass map in `_utilities.scss`
------------------------------*/
@import "../node_modules/bootstrap/scss/utilities/api";

/* Add additional custom code here
------------------------------*/
:root {
  --font-size-xxs: 12px;
  --font-size-xs: 14px;
  --font-size-sm: 16px;
  --font-size-md: 20px;
  --font-size-lg: 24px;
  --font-size-xl: 28px;
  --font-size-xxl: 32px;

  /* Define light theme primary colors */
  --bs-primary-light: #{lighten($primary, 5%)};
  --bs-primary-dark: #{darken($primary, 5%)};
  --bs-primary-light-rgb: #{red(lighten($primary, 5%))},
    #{green(lighten($primary, 5%))}, #{blue(lighten($primary, 5%))};
  --bs-primary-dark-rgb: #{red(darken($primary, 5%))},
    #{green(darken($primary, 5%))}, #{blue(darken($primary, 5%))};
}

// Disable aos animation delay on mobile devices
@media screen and (max-width: 767.98px) {
  [data-aos-delay] {
    transition-delay: 0 !important;
  }
}

/* Sections general */
section {
  overflow: hidden;
  margin-bottom: 50px;
}

@media (max-width: 575.98px) {
  section {
    padding: 0 20px;
  }
}

@media (min-width: 576px) {
  section {
    padding: 0 30px;
  }
}

@media (min-width: 768px) {
  section {
    padding: 0 40px;
  }
}

@media (min-width: 992px) {
  section {
    padding: 0 50px;
  }
}

@media (min-width: 1200px) {
  section {
    padding: 0 60px;
  }
}

```


4. Ensure you have this context file in the app directory.

```jsx
// @/app/context.js

"use client";

import ScrollTopButton from "@/shared/widgets/ScrollTopButton/ScrollTopButton";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "boxicons/css/boxicons.min.css";
import { createContext, useContext, useEffect, useState } from "react";
import "./global.scss";

const appContext = createContext(null);

export default function AppContext({ children }) {
  // API URL
  const API_URL =
    process.env.NEXT_PUBLIC_DEBUG === "True"
      ? "http://127.0.0.1:8000/api"
      : "/api";

  // AOS init
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      delay: 200,
    });
  }, []);

  // window width usestate
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  // window height usestate
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 0
  );

  // Monitor Window Width and Height on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Scroll with offset on page load with hash links in the url
  useEffect(() => {
    const handlePageLoad = () => {
      if (window.location.hash) {
        const element = document.querySelector(window.location.hash);
        if (element) {
          scrollto(window.location.hash);
        }
      }
    };

    // Wait for React to render and async content to settle
    const timer = setTimeout(() => {
      handlePageLoad();
    }, 100); // Use a minimal delay to ensure React has processed updates

    return () => clearTimeout(timer);
  }, []);

  // Function to scroll to an element
  const scrollto = (el) => {
    const header = document.querySelector("#header");
    const element = document.querySelector(el);
    const offset = header?.offsetHeight || 0;
    const elementPos = element?.offsetTop || 0;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  const contextData = {
    API_URL,
    windowWidth,
    windowHeight,
    scrollto,
  };

  return (
    <appContext.Provider value={contextData}>
      {children}
      <ScrollTopButton />
    </appContext.Provider>
  );
}

export function useAppContext() {
  return useContext(appContext);
}

```

5. Have it in your layout.jsx file

``` jsx
// @/app/layout.jsx

import AppContext from "@/app/context";

export const metadata = {
  title: "",
  description: "",
  metadataBase: new URL(`https://...`),
};

export default function AppLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppContext>{children}</AppContext>
      </body>
    </html>
  );
}
```

6. Register apps

7. Register urls in urls.py. Ensure you check the API url paths in the components.

8. Register contexts in layout.jsx
