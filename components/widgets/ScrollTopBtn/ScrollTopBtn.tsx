'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link'
import { RiArrowUpLine } from "react-icons/ri";
import './ScrollTopBtn.css';


export default function ScrollTopBtn() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <Link href="#"
            id="scroll-top"
            className={`scroll-top btn position-fixed bg-primary rounded-circle d-flex align-items-center justify-content-center ${isVisible ? 'visible' : 'invisible'}`}
            onClick={scrollToTop}>
            <RiArrowUpLine className="text-white lh-0 fs-3" />
        </Link>
    );
}
