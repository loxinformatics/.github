"use client";

import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";
import styles from "./footerlinks.module.css"


export default function ServicesLinks() {
    return (
        <>
            <h4 className={styles.h4}>Our Services</h4>
            <ul className="list-unstyled m-0 p-0">
                <li className={styles.list}>
                    <BiChevronRight className={styles.svg} /> <Link className={styles.link} href="#">Custom Software Solutions</Link>
                </li>
                <li className={styles.list}>
                    <BiChevronRight className={styles.svg} /> <Link className={styles.link} href="#">Web Design & Development</Link></li>
                <li className={styles.list}>
                    <BiChevronRight className={styles.svg} /> <Link className={styles.link} href="#">Website Analytics</Link>
                </li>
                <li className={styles.list}>
                    <BiChevronRight className={styles.svg} /> <Link className={styles.link} href="#">Dashboard Development</Link>
                </li>
                <li className={styles.list}>
                    <BiChevronRight className={styles.svg} /> <Link className={styles.link} href="#">Data Analysis</Link>
                </li>
                <li className={styles.list}>
                    <BiChevronRight className={styles.svg} /> <Link className={styles.link} href="#">Support & Maintenance</Link>
                </li>
            </ul>
        </>
    );
}