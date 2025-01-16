"use client";

import Image from "next/image";
import { useBase } from "../../../context/base";
import styles from "./styles.module.css";
import type { AboutProps } from "./types";

export default function AboutSection({
  section_instance,
  title_version,
  title_h2,
  title_h3,
  title_p,
  about_content,
  about_image,
  about_video,
  about_alt,
}: AboutProps) {
  const { Section } = useBase();
  const sectionId = section_instance || "";
  const titleVersion = title_version;
  const titleH2 = title_h2 || "About";
  const titleH3 = title_h3 || "About Us";
  const titleP = title_p || "Learn More";
  const aboutContent = about_content || "";
  const aboutImage = about_image || "/app/img/about.png";
  const aboutVideo = about_video || "";
  const aboutMediaAlt = about_alt || "about section media";

  const render = !!aboutContent;

  return (
    render && (
      <Section
        id={`about_${sectionId}`}
        dataAos="fade-up"
        title_version={titleVersion}
        title_h2={titleH2}
        title_h3={titleH3}
        title_p={titleP}
      >
        <div className="flex flex-col lg:flex-row">
          <div
            className={`relative h-80 lg:h-auto ${!aboutImage && "hidden"} ${
              aboutContent
                ? "lg:basis-1/2 lg:order-last"
                : "flex justify-center"
            }`}
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <Image
              src={aboutImage}
              alt={aboutMediaAlt}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1024px) 20rem, auto"
            />
          </div>

          <div
            className={`${!aboutContent && "hidden"} ${
              aboutImage && "lg:basis-1/2 lg:order-first pt-6 lg:pt-0"
            }`}
            data-aos="fade"
            data-aos-delay="200"
          >
            <div
              className={styles["about-content"]}
              dangerouslySetInnerHTML={{ __html: aboutContent }}
            />
          </div>
        </div>
      </Section>
    )
  );
}
