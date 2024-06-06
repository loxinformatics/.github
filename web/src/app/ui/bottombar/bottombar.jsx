"use client";

import styles from "./bottombar.module.css";
import Link from "next/link";
import {
    BsTwitterX,
    BsFacebook,
    BsLinkedin,
    BsWhatsapp,
    BsInstagram
} from "react-icons/bs";
import BaseContext, { useBaseContext } from "@/app/context";
import ContactContext, { useContactContext } from "@/app/contact/context";


export default function BottomBar({ children }) {
    return (
        <BaseContext>
            <ContactContext>
                <section className={`bg-black text-white text-center pt-4 pb-3`}>
                    {children}
                </section>
            </ContactContext>
        </BaseContext>
    );
}

export function Copyright() {
    const { base } = useBaseContext();
    const name = base?.name;

    return (
        name ? (
            <div className={styles.copyright}>
                &copy; Copyright <strong><span>{name}</span></strong>. All Rights Reserved
            </div>
        ) : (
            <div className={styles.copyright}>
                &copy; Copyright <strong><span>Your company</span></strong>. All Rights Reserved
            </div>
        )
    );
}

export function SocialLinks() {
    const { contact_info } = useContactContext();
    const facebook = contact_info?.facebook;
    const twitter_x = contact_info?.twitter_x;
    const instagram = contact_info?.instagram;
    const whatsapp = contact_info?.whatsapp;
    const linkedin = contact_info?.linkedin;

    return (
        <>
            {facebook && (
                <Link href={facebook} target="_blank" className={`${styles.socialLink} facebook`}>
                    <BsFacebook />
                </Link>
            )}
            {twitter_x && (
                <Link href={twitter_x} target="_blank" className={`${styles.socialLink} twitter`}>
                    <BsTwitterX />
                </Link>
            )}
            {instagram && (
                <Link href={instagram} target="_blank" className={`${styles.socialLink} instagram`}>
                    <BsInstagram />
                </Link>
            )}
            {whatsapp && (
                <Link href={whatsapp} target="_blank" className={`${styles.socialLink} whatsapp`}>
                    <BsWhatsapp />
                </Link>
            )}
            {linkedin && (
                <Link href={linkedin} target="_blank" className={`${styles.socialLink} linkedin`}>
                    <BsLinkedin />
                </Link>
            )}
        </>
    );
}
