"use client";

import { forwardRef } from "react";
import { useBase } from "../../app";
import { Container } from "./Container";
import styles from "./styles.module.css";
import type { SectionData } from "./types";

export const Section = forwardRef<
  HTMLDivElement,
  SectionData & {
    container?: boolean;
    padding?: boolean;
    fullscreen?: boolean;
    children?: React.ReactNode;
    ref?: React.RefObject<HTMLDivElement>;
    id?: string;
    className?: string;
    style?: React.CSSProperties;
  }
>(function Section(
  {
    id,
    className,
    style,
    container = true,
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

  const TitleContainer = ({ children }: { children: React.ReactNode }) => (
    <div
      className={`
        ${padding ? "py-10" : "pb-10"}
        ${fullscreen && "flex-initial"}
      `}
    >
      {children}
    </div>
  );

  const ContentContainer = ({ children }: { children: React.ReactNode }) => (
    <div
      className={`
        ${padding && (!hasTitle ? "py-10" : "pb-10")}
        ${fullscreen && "flex-1 flex"} 
      `}
    >
      {children}
    </div>
  );

  return (
    <section
      ref={ref}
      id={id}
      className={`
        relative overflow-hidden 
        bg-body dark:bg-body-reverse
        text-color dark:text-color-reverse
        tracking-wide
        ${fullscreen && "h-screen w-full flex flex-col"} 
        ${className}
      `}
      style={style}
    >
      {hasTitle &&
        (container && !fullscreen ? (
          <Container>
            <TitleContainer>
              <Title
                titleVersion={title_version}
                titleH2={title_h2}
                titleH3={title_h3}
                titleP={title_p}
              />
            </TitleContainer>
          </Container>
        ) : (
          <TitleContainer>
            <Title
              titleVersion={title_version}
              titleH2={title_h2}
              titleH3={title_h3}
              titleP={title_p}
            />
          </TitleContainer>
        ))}

      {container && !fullscreen ? (
        <Container>
          <ContentContainer>{children}</ContentContainer>
        </Container>
      ) : (
        <ContentContainer>{children}</ContentContainer>
      )}
    </section>
  );
});

function Title({
  titleH2,
  titleH3,
  titleP,
  titleVersion,
}: {
  titleH2?: SectionData["title_h2"];
  titleH3?: SectionData["title_h3"];
  titleP?: SectionData["title_p"];
  titleVersion?: SectionData["title_version"];
}) {
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
          <h3
            className={`font-bold ${styles[`${version}_h3`]} 
            ${
              version === "V1" &&
              "text-sm text-color-secondary dark:text-color-secondary-reverse"
            }
            ${version === "V2" && "relative text-4xl"}
            ${
              version === "V3" &&
              `${textPrimary} bg-body-secondary dark:bg-body-secondary-reverse`
            }
             ${bgPrimaryBefore} ${bgPrimaryAfter}`}
          >
            {titleH2}
          </h3>
        )}

        {titleH3 && version === "V3" && (
          <h4 className={`font-bold ${styles[`${version}_h4`]}`}>{titleH3}</h4>
        )}

        {titleP && (
          <p
            className={`
              font-bold
              ${styles[`${version}_p`]}
              ${version === "V1" && "text-4xl m-0"}
            `}
          >
            {titleP}
          </p>
        )}
      </div>
    </div>
  );
}
