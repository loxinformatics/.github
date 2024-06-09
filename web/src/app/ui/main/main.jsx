"use client";

import { useEffect, useState } from 'react';

export default function Main({ children, fit = false, background }) {
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

            if (fit && header) {
                headerHeight = header.offsetHeight;
            }

            if (fit && bottombar) {
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
    }, [fit, background]);

    const mainContent = fit ? (
        <main id="main" style={{ height: contentHeight }} className="position-relative d-flex flex-column flex-grow-1">
            <div className="overflow-y-auto h-100">
                {children}
            </div>
        </main>
    ) : (
        <main id="main" className="position-relative">
            {children}
        </main>
    );

    return mainContent;
}
