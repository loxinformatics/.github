"use client";

import { useState, useEffect } from 'react';

import Logo from '@/components/widgets/Logo/Logo';
import NavBar from '@/components/widgets/NavBar/NavBar';
import ForwardBtn from '@/components/widgets/ForwardBtn/ForwardBtn';
import './Header.css';


export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const headerScrolled = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Check the scroll position on mount and add the event listener
        headerScrolled();
        window.addEventListener('scroll', headerScrolled);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', headerScrolled);
        };
    }, []);

    return (
        <header id="header" className={`fixed-top ${isScrolled ? 'header-scrolled' : ''}`}>
            <div className="container d-flex align-items-center justify-content-lg-between">
                <Logo></Logo>
                <NavBar></NavBar>
                <ForwardBtn name='Get Started' href='#about'></ForwardBtn>
            </div>
        </header>
    )
}
