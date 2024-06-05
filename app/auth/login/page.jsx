"use client";

import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";
import LoginForm from "@/app/auth/ui/section/authform/loginform";


export default function Login() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false
        });
    }, []);

    return (
        <div className="col-12 col-sm-10 col-md-8 col-lg-6" data-aos="fade-in">
            <div className="card">
                <div className="card-body py-4">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}