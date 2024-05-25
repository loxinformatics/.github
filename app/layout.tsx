import type { Metadata } from "next";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'boxicons/css/boxicons.min.css';
import 'remixicon/fonts/remixicon.css';
import '@/app/globals.scss';

import Header from '@/app/components/Header/Header'
import Hero from '@/app/components/Hero/Hero'
import Footer from '@/app/components/Footer/Footer'
import Preloader from '@/app/components/Preloader/Preloader';
import ScrollTopBtn from '@/app/components/ScrollTopBtn/ScrollTopBtn';

export const metadata: Metadata = {
  title: "Lox Informatics",
  description: "Transforming Retail & E-Commerce Landscapes: Innovative Solutions and Insights for Success",
  metadataBase: new URL('https://www.loxinformatics.com'),
};


function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <Header></Header>
        <Hero></Hero>
        {children}
        <Footer></Footer>
        <ScrollTopBtn></ScrollTopBtn>
        <Preloader></Preloader>
      </body>
    </html>
  );
}

export default RootLayout;
