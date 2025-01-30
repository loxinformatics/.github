"use client";

import Image from "next/image";
import { useBase } from "../management";
import Btn from "../widgets/buttons/Button";
import Section from "../widgets/section/Section";
import Heading from "../widgets/text/Heading";
import baseStyles from "./styles.module.css";
import type { CTAData } from "./types";

export default function CTA({
  section_instance,
  section_version,
  cta_heading,
  cta_paragraph,
  cta_button_text,
  cta_button_href,
  cta_button_icon,
  cta_image,
}: CTAData) {
  const { bgPrimaryAfter50 } = useBase();

  const sectionId = section_instance || "";
  const sectionVersion = section_version || "V1";
  const ctaHeading = cta_heading || "";
  const ctaParagraph = cta_paragraph || "";
  const ctaButtonText = cta_button_text || "";
  const ctaButtonHref = cta_button_href || "";
  const ctaButtonIcon = cta_button_icon || "";
  const ctaImage = cta_image || "/cta.png";

  const hasContainer = sectionVersion === "V2";
  const render =
    !!ctaHeading &&
    !!ctaParagraph &&
    !!ctaButtonText &&
    !!ctaButtonHref &&
    !!ctaImage;

  return (
    render && (
      <Section
        id={`cta_${sectionId}`}
        container={hasContainer}
        padding={false}
        className={`
          ${baseStyles[`${sectionVersion}_cta`]}
          ${
            sectionVersion === "V1" &&
            "before:absolute before:content-[''] before:inset-0 before:bg-black/50 before:z-10"
          }`}
      >
        {/* V1  */}
        {sectionVersion === "V1" && (
          <div className="relative py-12 text-white">
            <Image
              src={ctaImage}
              alt="Call To Action background image"
              fill
              className="object-cover"
              style={{ maxWidth: "100%" }}
              priority
            />
            <div className={`${baseStyles.container} relative z-10`}>
              <div
                className="flex justify-center"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <div className="w-full xl:w-5/6">
                  <div className="flex flex-col items-center">
                    <Heading
                      variant="h3"
                      className={`${baseStyles.title} font-bold text-3xl`}
                      dangerouslySetInnerHTML={{
                        __html: ctaHeading,
                      }}
                    />
                    <p
                      className="my-3"
                      dangerouslySetInnerHTML={{
                        __html: ctaParagraph,
                      }}
                    />
                    <Btn
                      className="mt-4 mb-1"
                      href={ctaButtonHref}
                      size="lg"
                      outline
                    >
                      <span>{ctaButtonText}</span>
                      {ctaButtonIcon && (
                        <i className={`${ctaButtonIcon} ml-2`}></i>
                      )}
                    </Btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* V2 */}
        {sectionVersion === "V2" && (
          <div
            className={`${baseStyles.cta_container} p-20 bg-body-secondary dark:bg-body-secondary-reverse rounded-lg`}
          >
            <div className="flex flex-col md:flex-row gap-12">
              <div
                className={`${baseStyles.content} md:basis-1/2 lg:basis-2/3 flex flex-col justify-center order-last md:order-first`}
              >
                <Heading variant="h3" className={baseStyles.title}>
                  <span
                    className={`
                    relative
                     after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[8px] after:h-[5px] ${bgPrimaryAfter50}
                    `}
                    dangerouslySetInnerHTML={{
                      __html: ctaHeading,
                    }}
                  />
                </Heading>
                <p
                  className="text-color dark:text-color-reverse"
                  dangerouslySetInnerHTML={{
                    __html: ctaParagraph,
                  }}
                />
                <Btn className="self-start mt-4" href={ctaButtonHref} size="lg">
                  <span>{ctaButtonText}</span>
                  {ctaButtonIcon && (
                    <i className={`${ctaButtonIcon} ms-2 text-white`}></i>
                  )}
                </Btn>
              </div>

              <div className="md:basis-1/2 lg:basis-2/3 order-first md:order-last flex items-center">
                <div
                  className={`${baseStyles.img} before:bg-body/50 dark:before:bg-body-reverse/50 after:bg-body/90 dark:after:bg-body-reverse/90`}
                >
                  {ctaImage && (
                    <Image
                      src={ctaImage}
                      alt="call to action image"
                      width={344}
                      height={256}
                      className="relative z-10 rounded-[15px]"
                      priority
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Section>
    )
  );
}
