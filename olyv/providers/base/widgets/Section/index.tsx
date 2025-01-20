"use client";

import { forwardRef } from "react";
import { useBase } from "../..";
import styles from "../../styles.module.css";
import type { SectionProps, TitleProps } from "../../types";

const Section = forwardRef<HTMLDivElement, SectionProps>(
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

export default Section