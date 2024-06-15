"use client";

import styles from "./Preloader.module.css";

export default function Preloader() {
  return (
    <div
      id="preloader"
      className={`${styles.preloader} z-3 position-fixed bg-white top-0 end-0 bottom-0 start-0 overflow-hidden`}
    ></div>
  );
}

// export default function Preloader() {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const handleLoad = () => {
//       setIsLoading(false);
//     };

//     // Check if the document is already loaded
//     if (document.readyState === "complete") {
//       setIsLoading(false);
//     } else {
//       window.addEventListener("load", handleLoad);
//     }

//     return () => {
//       window.removeEventListener("load", handleLoad);
//     };
//   }, []);

//   return isLoading ? (
//     <div
//       id="preloader"
//       className={`${styles.preloader} z-3 position-fixed bg-white top-0 end-0 bottom-0 start-0 overflow-hidden`}
//     ></div>
//   ) : null;
// }
