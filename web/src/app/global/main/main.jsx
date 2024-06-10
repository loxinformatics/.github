"use client";

import styles from "./main.module.css";

import React, { useEffect, useState } from 'react';

export default function Main({ children, fixAndCenter = false, background }) {
    const [contentHeight, setContentHeight] = useState('100vh');

    useEffect(() => {
        const calculateHeight = () => {
            let headerHeight = 0;
            let bottombarHeight = 0;

            const header = document.querySelector('#header');
            const bottombar = document.querySelector('#bottombar');

            if (background) {
                document.body.classList.add(background);
            }

            if (fixAndCenter && header) {
                headerHeight = header.offsetHeight;
            }

            if (fixAndCenter && bottombar) {
                bottombarHeight = bottombar.offsetHeight;
            }

            const totalHeight = `calc(100vh - ${headerHeight}px - ${bottombarHeight}px)`;
            setContentHeight(totalHeight);
        };

        calculateHeight();

        const observer = new MutationObserver(() => {
            calculateHeight();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        window.addEventListener('resize', calculateHeight);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', calculateHeight);
            if (background) {
                document.body.classList.remove(background);
            }
        };
    }, [fixAndCenter, background]);

    // Apply the fit class conditionally based on the fit prop
    const mainClass = fixAndCenter ? `position-relative ${styles.fixedMain}` : "position-relative";

    return (
        <main id="main" style={{ height: contentHeight }} className={mainClass}>
            {React.Children.map(children, child => {
                // Clone each child and pass down the fitInMain className directly or via prop if in a section component. 
                return React.cloneElement(child, { sectionmain: fixAndCenter ? styles.centeredSection : styles.section });
            })}
        </main>
    );
}
