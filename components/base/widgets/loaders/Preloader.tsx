"use client";

import { useEffect, useState } from "react";
import { useBase } from "../../context";
import styles from "./styles.module.css";
import type { PreloaderProps } from "./types";

export default function Preloader({
  version = "V3",
  indefinite,
}: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { bgPrimary, borderPrimaryBefore, borderPrimaryAfter } = useBase();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  // Show loader if either internal loading is true or isLoading prop is true
  const shouldShowLoader = indefinite ?? isLoading;

  return (
    <div>
      {shouldShowLoader && (
        <div
          id="preloader"
          style={{ transition: "all 0.6s ease-out" }}
          className={`
            bg-body dark:bg-body-reverse fixed top-0 end-0 bottom-0 start-0 h-screen w-full overflow-hidden z-50
            ${styles[`${version}_preloader`]}
            ${
              version === "V1" &&
              `before:border-[6px] ${borderPrimaryBefore} before:border-t-color-reverse dark:before:border-t-color before:border-b-color-reverse dark:before:border-b-color before:rounded-full`
            }
            ${
              version === "V2" &&
              `before:border-4 ${borderPrimaryBefore} after:border-4 ${borderPrimaryAfter}`
            }
            ${version === "V3" && "flex justify-center items-center"}
          `}
        >
          {version === "V3" && (
            <>
              <div className={bgPrimary}></div>
              <div className={bgPrimary}></div>
              <div className={bgPrimary}></div>
              <div className={bgPrimary}></div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
