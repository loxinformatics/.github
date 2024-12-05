import style from "./Preloader.module.css";

const version = process.env.NEXT_PUBLIC_PRELOADER_VERSION || "V1";

export default function Preloader() {
  return (
    <div
      id="preloader"
      style={{ transition: "all 0.6s ease-out" }}
      className={`
        ${style[`${version}_preloader`]}
        z-3 bg-body position-fixed top-0 end-0 bottom-0 start-0 overflow-hidden w-100 vh-100
        ${
          version === "V3" && "d-flex align-items-center justify-content-center"
        }
      `}
    >
      {version === "V3" && (
        <>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </>
      )}
    </div>
  );
}

// const [isDocumentReady, setIsDocumentReady] = useState(true);

// useEffect(() => {
//   const handleLoad = () => {
//     setIsDocumentReady(false);
//   };

//   if (document.readyState === "complete") {
//     setIsDocumentReady(false);
//   } else {
//     window.addEventListener("load", handleLoad);
//   }

//   return () => {
//     window.removeEventListener("load", handleLoad);
//   };
// }, []);
