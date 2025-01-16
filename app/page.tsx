import { Preloader } from "@/zeytinus/ui/base/Preloader";
import { AboutSection, fetchAbout } from "@/zeytinus/ui/core/About";
import { CallToActionSection, fetchCallToAction } from "@/zeytinus/ui/core/CallToAction";
import { ContactSection, fetchContact } from "@/zeytinus/ui/core/Contact";
import { FooterBottombarSection } from "@/zeytinus/ui/core/FooterBottombar";
import { HeaderHeroSection, fetchHeaderHero } from "@/zeytinus/ui/core/HeaderHero";
import { ListSection, fetchList } from "@/zeytinus/ui/core/List";

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
