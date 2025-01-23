import {
  fetchAbout,
  fetchCallToAction,
  fetchContact,
  fetchHeaderHero,
  fetchList,
} from "@/olyv/api/core";
import {
  AboutSection,
  CallToActionSection,
  ContactSection,
  FooterBottombarSection,
  HeaderHeroSection,
  ListSection,
} from "@/olyv/app/core";
import type {
  AboutResponse,
  CallToActionResponse,
  ContactResponse,
  HeaderHeroResponse,
  ListResponse,
} from "@/olyv/types/core";
import Preloader from "@/olyv/widgets/core/Preloader";

export default async function Page() {
  const headerHero: HeaderHeroResponse = await fetchHeaderHero("page_1");
  const about: AboutResponse = await fetchAbout("page_1");
  const cta: CallToActionResponse = await fetchCallToAction("page_1");
  const contact: ContactResponse = await fetchContact("page_1");
  const listdescriptions: ListResponse = await fetchList("page_1");

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
