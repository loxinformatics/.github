"use client";

import { useBase } from "../../context/base";
import coreStyles from "../../styles/core.module.css";
import type { ContactItemProps, ContactProps } from "../../types/core";
import { Heading, Section } from "../../widgets/base";
import { MailUsForm } from "../../widgets/core";

export default function ContactSection({
  section_instance,
  section_version,
  title_version,
  title_h2,
  title_h3,
  title_p,
  map: hasMap,
}: ContactProps) {
  const {
    cityName,
    primaryPhone,
    primaryEmail,
    openDays,
    openHours,
    street,
    POBox,
    secondaryPhone,
    secondaryEmail,
    map,
    textPrimary,
    borderPrimary,
    bgBodyHover,
  } = useBase();

  const sectionId = section_instance || "";
  const sectionVersion = section_version || "V1";
  const titleVersion = title_version;
  const titleH2 = title_h2 || "Contact";
  const titleH3 = title_h3 || "Contact Us";
  const titleP = title_p || "Get In Touch";
  const has_map = hasMap !== null ? (hasMap === false ? false : true) : true;

  const render =
    !!cityName && !!primaryPhone && !!primaryEmail && !!openDays && !!openHours;

  const ContactItem = ({
    icon,
    title,
    lines,
    linkPrefix,
  }: ContactItemProps) => (
    <>
      <i
        className={`bi bi-${icon} ${textPrimary} float-left
          ${
            sectionVersion === "V2" &&
            `border-2 border-dotted ${borderPrimary} rounded-full text-[27px] py-1 px-3`
          }
          ${
            sectionVersion === "V3" &&
            `bg-body-secondary dark:bg-body-secondary-reverse hover:text-white ${bgBodyHover} flex justify-center items-center`
          }   
        `}
      ></i>
      <Heading variant="h5" className={`${coreStyles.heading} `}>
        {title[`${sectionVersion}` as keyof typeof title]}
      </Heading>
      {lines.filter(Boolean).map((line, index) => (
        <p key={index}>
          {linkPrefix ? <a href={`${linkPrefix}${line}`}>{line}</a> : line}
        </p>
      ))}
    </>
  );

  const Address = () => {
    const formatAddress = (street?: string, PO_box?: string) =>
      [street, PO_box].filter(Boolean).join(", ");

    return (
      <ContactItem
        icon="geo-alt"
        title={{ V1: "Address", V2: "Our Address", V3: "Location:" }}
        lines={[formatAddress(street, POBox), cityName]}
      />
    );
  };

  const CallDetails = () => (
    <ContactItem
      icon="telephone"
      title={{ V1: "Call Us", V2: "Call Us", V3: "Call:" }}
      lines={[primaryPhone, secondaryPhone]}
      linkPrefix="tel:"
    />
  );

  const EmailDetails = () => (
    <ContactItem
      icon="envelope"
      title={{ V1: "Email Us", V2: "Email Us", V3: "Email:" }}
      lines={[primaryEmail, secondaryEmail]}
      linkPrefix="mailto:"
    />
  );

  const OpenDaysAndHours = () => (
    <ContactItem
      icon="clock"
      title={{ V1: "Open Hours", V2: "Open Hours", V3: "Hours:" }}
      lines={[openDays, openHours]}
    />
  );

  return (
    render && (
      <Section
        id={`contact_${sectionId}`}
        title_version={titleVersion}
        title_h2={titleH2}
        title_h3={titleH3}
        title_p={titleP}
        className={coreStyles.contact}
      >
        {has_map && map && (
          <div className="mb-12 mt-4">
            <iframe
              className={coreStyles.map}
              src={map}
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* V1 */}
        {sectionVersion === "V1" && (
          <div className="flex flex-col lg:flex-row gap-8 break-words">
            <div className="lg:basis-1/2">
              <div className="grid gap-6 md:grid-cols-2">
                <div
                  className={`${coreStyles.V1} bg-color/[0.03] dark:bg-color-reverse/[0.03]`}
                  data-aos="fade"
                  data-aos-delay="50"
                >
                  <Address />
                </div>

                <div
                  className={`${coreStyles.V1} bg-color/[0.03] dark:bg-color-reverse/[0.03]`}
                  data-aos="fade"
                  data-aos-delay="100"
                >
                  <CallDetails />
                </div>

                <div
                  className={`${coreStyles.V1} bg-color/[0.03] dark:bg-color-reverse/[0.03]`}
                  data-aos="fade"
                  data-aos-delay="150"
                >
                  <EmailDetails />
                </div>

                <div
                  className={`${coreStyles.V1} bg-color/[0.03] dark:bg-color-reverse/[0.03]`}
                  data-aos="fade"
                  data-aos-delay="200"
                >
                  <OpenDaysAndHours />
                </div>
              </div>
            </div>
            <div className="lg:basis-1/2">
              <MailUsForm />
            </div>
          </div>
        )}

        {/* V2 */}
        {sectionVersion === "V2" && (
          <>
            <div className="flex flex-col xl:flex-row justify-center gap-6">
              <div className="flex flex-col md:flex-row xl:flex-1 gap-6">
                <div className="flex-1" data-aos="fade-up">
                  <div
                    className={`${coreStyles.V2} text-color dark:text-color-reverse shadow-lg shadow-color-secondary/20 dark:shadow-color-secondary-reverse/20 p-5 rounded`}
                  >
                    <Address />
                  </div>
                </div>

                <div className="flex-1" data-aos="fade-up" data-aos-delay="50">
                  <div
                    className={`${coreStyles.V2} text-color dark:text-color-reverse shadow-lg shadow-color-secondary/20 dark:shadow-color-secondary-reverse/20 p-5  rounded`}
                  >
                    <EmailDetails />
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row xl:flex-1 gap-6">
                <div className="flex-1" data-aos="fade-up" data-aos-delay="100">
                  <div
                    className={`${coreStyles.V2} text-color dark:text-color-reverse shadow-lg shadow-color-secondary/20 dark:shadow-color-secondary-reverse/20 p-5 rounded`}
                  >
                    <CallDetails />
                  </div>
                </div>

                <div className="flex-1" data-aos="fade-up" data-aos-delay="150">
                  <div
                    className={`${coreStyles.V2} text-color dark:text-color-reverse shadow-lg shadow-color-secondary/20 dark:shadow-color-secondary-reverse/20 p-5 rounded`}
                  >
                    <OpenDaysAndHours />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="flex flex-row justify-center"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <div className="basis-full xl:basis-3/4 mt-6">
                <MailUsForm />
              </div>
            </div>
          </>
        )}

        {/* V3 */}
        {sectionVersion === "V3" && (
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/3">
              <div className={`${coreStyles.V3} w-full`}>
                <div className={coreStyles.address}>
                  <Address />
                </div>

                <div className={coreStyles.email}>
                  <EmailDetails />
                </div>

                <div className={coreStyles.phone}>
                  <CallDetails />
                </div>

                <div className={coreStyles.phone}>
                  <OpenDaysAndHours />
                </div>
              </div>
            </div>

            <div className="w-full lg:w-2/3 mt-12 lg:mt-0">
              <MailUsForm />
            </div>
          </div>
        )}
      </Section>
    )
  );
}
