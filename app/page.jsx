import About from "@/custom/About/About";
import Contact from "@/lox/layout/Contact/Contact";
import Footer from "@/lox/layout/Footer/Footer";
import Header from "@/lox/layout/Header/Header";
import Services from "@/lox/layout/Services/Services";
import Hero from "@/lox/layout/Hero/Hero";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
