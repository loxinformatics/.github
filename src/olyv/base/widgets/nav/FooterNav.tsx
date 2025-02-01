"use client";

import { useBase } from "../../app";
import { Link } from "../links";
import { Heading } from "../text";
import styles from "./styles.module.css";
import type { FooterNavProps } from "./types";

export default function FooterNav({ links }: FooterNavProps) {
  const { textPrimary, textColorHover } = useBase();

  // Find the heading link
  const headingLink = links?.find((link) => link.type === "heading");
  // Filter out the heading link from the rest
  const otherLinks = links?.filter((link) => link.type !== "heading");

  return (
    <div
      className={`${styles.footer_nav} sm:basis-1/2 flex flex-col items-center`}
    >
      <div>
        {/* Display heading if it exists */}
        {headingLink && (
          <Heading variant="h6" className="relative mb-4">
            {headingLink.text}
          </Heading>
        )}
        <nav className="text-sm tracking-wider">
          <ul>
            {otherLinks?.map((link, index: number) => (
              <li key={index} className={styles.footerlinks_li}>
                <i
                  className={`bi bi-chevron-right text-base ${textPrimary} pr-[2px]`}
                ></i>
                <Link
                  href={link.href || "#"}
                  className={`${textColorHover} transition-colors duration-200`}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
