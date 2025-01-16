import { Preloader } from "@/olyv/app/base/Preloader";
import { AboutSection, fetchAbout } from "@/olyv/app/core/About";
import { CallToActionSection, fetchCallToAction } from "@/olyv/app/core/CallToAction";
import { ContactSection, fetchContact } from "@/olyv/app/core/Contact";
import { FooterBottombarSection } from "@/olyv/app/core/FooterBottombar";
import { HeaderHeroSection, fetchHeaderHero } from "@/olyv/app/core/HeaderHero";
import { ListSection, fetchList } from "@/olyv/app/core/List";

export default async function Page() {
  const headerHero = await fetchHeaderHero("page_1");
  const about = await fetchAbout("page_1");
  const cta = await fetchCallToAction("page_1");
  const contact = await fetchContact("page_1");
  const listdescriptions = await fetchList("page_1");

  return (
    <>
      <Preloader />
      <HeaderHeroSection component="headerhero" {...headerHero} />
      <main>
        <AboutSection {...about} />
        <CallToActionSection {...cta} />
        <ListSection {...listdescriptions} />
        <ContactSection {...contact} />
      </main>
      <FooterBottombarSection />
    </>
  );
}
