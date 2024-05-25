'use client';

import { useState, useEffect } from 'react';
import '@/app/components/Header/Header.css';

import Logo from '@/app/components/Logo/Logo';
import Navigation from '@/app/components/Navigation/Navigation';
import ForwardBtn from '@/app/components/ForwardBtn/ForwardBtn';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const headerScrolled = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', headerScrolled);
        return () => {
            window.removeEventListener('scroll', headerScrolled);
        };
    }, []);

    return (
        <header id="header" className={`fixed-top ${isScrolled ? 'header-scrolled' : ''}`}>
            <div className="container d-flex align-items-center justify-content-lg-between">
                <Logo></Logo>
                <Navigation></Navigation>
                <ForwardBtn name='Get Started' href='#about'></ForwardBtn>
            </div>
        </header>
    )
}

export default Header;
