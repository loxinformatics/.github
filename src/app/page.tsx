import { Preloader } from "@/zeytinus/app/base/Preloader";
import { AboutSection, fetchAbout } from "@/zeytinus/app/core/About";
import { CallToActionSection, fetchCallToAction } from "@/zeytinus/app/core/CallToAction";
import { ContactSection, fetchContact } from "@/zeytinus/app/core/Contact";
import { FooterBottombarSection } from "@/zeytinus/app/core/FooterBottombar";
import { HeaderHeroSection, fetchHeaderHero } from "@/zeytinus/app/core/HeaderHero";
import { ListSection, fetchList } from "@/zeytinus/app/core/List";

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
