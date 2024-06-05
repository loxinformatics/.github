"use client";

import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";
import styles from "./footerlinks.module.css"


export default function UsefulLinks() {
    return (
        <>
            <h4 className={styles.h4}>Useful Links</h4>
            <ul className="list-unstyled m-0 p-0">
                <li className={styles.list}><BiChevronRight className={styles.svg} /> <Link className={styles.link} href="/#hero">Home</Link></li>
                <li className={styles.list}><BiChevronRight className={styles.svg} /> <Link className={styles.link} href="/#about">About us</Link></li>
                <li className={styles.list}><BiChevronRight className={styles.svg} /> <Link className={styles.link} href="/#services">Services</Link></li>
                {/* <li className={styles.list}><BiChevronRight className={styles.svg} /> <Link className={styles.link} href="#">Terms of service</Link></li> */}
                {/* <li className={styles.list}><BiChevronRight className={styles.svg} /> <Link className={styles.link} href="#">Privacy policy</Link></li> */}
            </ul>
        </>
    );
}