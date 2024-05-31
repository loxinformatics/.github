"use client";

import { useBaseContext } from "@/app/context";
import Link from "next/link";
import { BsGeoAlt, BsEnvelope, BsPhone } from "react-icons/bs";
import "./Contact.css"

import Title from "@/components/widgets/Title/Title"
import MailUsForm from "@/components/forms/MailUsForm/MailUsForm";

function ContactInfo() {
    const { data, isLoading } = useBaseContext();

    if (isLoading) return data;  // data here is the loading/error/no data component

    return (
        <div className="info">

            {data.city_name && (
                <div className="address">
                    <div className="icon"><BsGeoAlt /></div>
                    <h4>Location:</h4>
                    <p>{data.city_name}</p>
                </div>
            )}

            {data.primary_email && data.secondary_email && (
                <div className="email">
                    <div className="icon"><BsEnvelope /></div>
                    <h4>Email:</h4>
                    <Link href={`mailto:${data.primary_email}`}>
                        <p>{data.primary_email}</p>
                    </Link>
                    <Link href={`mailto:${data.secondary_email}`}>
                        <p>{data.secondary_email}</p>
                    </Link>
                </div>
            )}

            {data.primary_phone && data.secondary_phone && (
                <div className="phone">
                    <div className="icon"><BsPhone /></div>
                    <h4>Call:</h4>
                    <Link href={`tel:${data.primary_phone}`}>
                        <p>{data.primary_phone}</p>
                    </Link>
                    <Link href={`tel:${data.secondary_phone}`}>
                        <p>{data.secondary_phone}</p>
                    </Link>
                </div>
            )}

        </div>
    )
}

export default function Contact() {
    return (
        <section id="contact" className="contact">
            <div className="container" data-aos="fade-up">

                <Title heading="Contact" paragraph="Contact Us" />

                <div className="row mt-5">

                    <div className="col-lg-4">
                        <ContactInfo />
                    </div>

                    <div className="col-lg-8 mt-5 mt-lg-0">
                        <MailUsForm />
                    </div>

                </div>

            </div>
        </section>
    );
}