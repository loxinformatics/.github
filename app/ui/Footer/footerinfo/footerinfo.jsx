"use client";

import styles from "./footerinfo.module.css"

import { useFootercontext } from "@/app/ui/footer/footer";


export default function FooterInfo() {
    const {
        name,
        description,
        primary_phone,
        secondary_phone,
        primary_email,
        secondary_email
    } = useFootercontext();

    return (
        <>
            {name && (<h3 className={styles.h3}>{name}<span className="text-primary">.</span></h3>)}
            {/* {description && (<p className={styles.p}>{description}</p>)} */}

            <div className="mb-3">
                {primary_phone && secondary_phone && (
                    <>
                        <strong>Call:</strong><br />
                        <div>{primary_phone}</div>
                        <div>{secondary_phone}</div><br />
                    </>
                )}
                {primary_email && (
                    <>
                        <strong>Email:</strong><br />
                        <div>{primary_email}</div>
                        {secondary_email && (<div>{secondary_email}</div>)}
                    </>
                )}
            </div>
        </>
    );
}