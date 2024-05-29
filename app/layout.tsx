import './globals.scss';

import type { Metadata } from "next";
import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer/Footer'
import Preloader from '@/components/widgets/Preloader/Preloader';
import ScrollTopBtn from '@/components/widgets/ScrollTopBtn/ScrollTopBtn';


export const metadata: Metadata = {
  title: "Lox Informatics",
  description: "Transforming Retail & E-Commerce Landscapes: Innovative Solutions and Insights for Success",
  metadataBase: new URL('https://www.loxinformatics.com'),
};


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr">
      <body>
      <Header></Header>
        {children}
      <Footer></Footer>
        <ScrollTopBtn></ScrollTopBtn>
        <Preloader></Preloader>
      </body>
    </html>
  );
}