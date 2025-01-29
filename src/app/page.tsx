import {
  fetchAbout,
  fetchCallToAction,
  fetchContact,
  fetchHeaderHero,
  fetchList,
} from "@/src/components/base/actions";
import {
  AboutSection,
  CallToActionSection,
  ContactSection,
  FooterBottombarSection,
  HeaderHeroSection,
  ListSection,
} from "@/src/components/base/layout";
import type {
  AboutResponse,
  CallToActionResponse,
  ContactResponse,
  HeaderHeroResponse,
  ListResponse,
} from "@/src/components/base/types";
import Preloader from "@/src/components/base/widgets/loaders/Preloader";

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
