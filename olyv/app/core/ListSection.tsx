"use client";

import Image from "next/image";
import Link from "next/link";
import { Section, useBase } from "../../providers/base";
import coreStyles from "../../styles/core.module.css";
import type { ListDescriptionsProps } from "../../types/core";

export default function ListSection({
  section_instance,
  section_version,
  title_version,
  title_h2,
  title_h3,
  title_p,
  items,
}: ListDescriptionsProps) {
  const {
    borderColorHover,
    bgPrimary,
    borderColorGroupHover,
    textColorGroupHover,
    bgPrimaryBefore30,
    bgPrimaryAfter,
  } = useBase();
  const sectionId = section_instance || "";
  const sectionVersion = section_version || "V1";
  const titleVersion = title_version;
  const titleH2 = title_h2 || "Services";
  const titleH3 = title_h3 || "Our Services";
  const titleP = title_p || "Check our Services";
  const descriptions = items;

  if (!descriptions || descriptions.length === 0) return null;

  return (
    <Section
      id={`list_${sectionId}`}
      title_version={titleVersion}
      title_h2={titleH2}
      title_h3={titleH3}
      title_p={titleP}
      className={coreStyles.list}
    >
      <div className="flex flex-wrap mx-4">
        {descriptions.map((item: any, index: number) => {
          const itemId = item.id || index;
          const itemImage = item.image || "/app/img/list_item.png";
          const itemIcon = item.icon || "";
          const itemTitle = item.title || "";
          const itemDescription = item.description || "";

          switch (sectionVersion) {
            case "V1":
            default:
              return (
                <div
                  key={itemId}
                  className={`px-4 my-4 sm:w-1/2 lg:w-1/3 flex items-stretch`}
                  data-aos="zoom-in"
                  data-aos-delay="100"
                >
                  <Link
                    href=""
                    className={`group ${coreStyles.V1_services}
                      py-[80px] px-[20px] block text-center  
                      border border-solid border-color-tertiary dark:border-color-tertiary-reverse ${borderColorHover} 
                      shadow-xl dark:shadow-reverse hover:shadow-none
                      hover:transform hover:-translate-y-[-10px]
                      transition-all ease-in-out duration-300 
                    `}
                  >
                    <div
                      className={`mx-auto mb-[20px] w-[64px] h-[64px] ${bgPrimary} rounded-[4px] flex items-center justify-center transition duration-300`}
                    >
                      <i
                        className={`${itemIcon} text-[28px] text-white transition ease-in-out duration-300`}
                      ></i>
                    </div>
                    <div>
                      <h4
                        className={`${coreStyles.heading} text-color dark:text-color-reverse ${textColorGroupHover} transition-colors ease-in-out duration-300`}
                      >
                        {itemTitle}
                      </h4>
                      <p
                        className={`${coreStyles.description} text-color dark:text-color-reverse`}
                      >
                        {itemDescription}
                      </p>
                    </div>
                  </Link>
                </div>
              );

            case "V2":
              return (
                <div
                  key={itemId}
                  className={`w-full px-4 sm:w-full lg:w-1/2 mt-4 mb-6 flex items-stretch`}
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <Link
                    href=""
                    className={`group ${coreStyles.V2_services} flex pt-[40px]
                    before:bg-color/10 dark:before:bg-color-reverse/10 ${bgPrimaryAfter}
                    border-r-[5px] after:border-r-body dark:after:border-r-body-reverse
                  `}
                  >
                    <div
                      className={`${bgPrimaryBefore30} ${coreStyles.icon} before:z-10`}
                    >
                      <i
                        className={`${itemIcon} text-color/70 dark:text-color-reverse/70 z-20`}
                      ></i>
                    </div>
                    <div>
                      <h4
                        className={`${coreStyles.heading} text-color dark:text-color-reverse ${textColorGroupHover} transition-colors ease-in-out duration-300 my-[15px]`}
                      >
                        {itemTitle}
                      </h4>
                      <p className={coreStyles.description}>
                        {itemDescription}
                      </p>
                    </div>
                  </Link>
                </div>
              );

            case "V3":
              return (
                <div
                  key={itemId}
                  className="w-full sm:w-1/2 md:w-1/2 xl:w-1/3 px-4"
                  data-aos="zoom-in"
                  data-aos-delay="100"
                >
                  <Link href="" className={`group ${coreStyles.V3_services}`}>
                    <div className={coreStyles.img}>
                      <Image
                        src={itemImage}
                        className="w-full"
                        alt=""
                        width={800}
                        height={600}
                      />
                    </div>
                    <div
                      className={`${coreStyles.details} relative
                      bg-body/90 dark:bg-body-reverse/90
                      shadow-lg dark:shadow-reverse
                      `}
                    >
                      <div
                        className={`${coreStyles.icon} text-white
                          ${bgPrimary} group-hover:bg-body dark:group-hover:bg-body-reverse
                          border-[6px] border-body dark:border-body-reverse group-hover:border-[2px] ${borderColorGroupHover}
                        `}
                      >
                        <i className={`${itemIcon} ${textColorGroupHover}`}></i>
                      </div>
                      <h4
                        className={`${coreStyles.heading}
                        text-color dark:text-color-reverse ${textColorGroupHover}
                        `}
                      >
                        {itemTitle}
                      </h4>
                      <p className={coreStyles.description}>
                        {itemDescription}
                      </p>
                    </div>
                  </Link>
                </div>
              );
          }
        })}
      </div>
    </Section>
  );
}
