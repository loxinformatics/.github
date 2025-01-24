import {
  fetchAbout,
  fetchCallToAction,
  fetchContact,
  fetchHeaderHero,
  fetchList,
} from "@/olyv/api/base";
import {
  AboutSection,
  CallToActionSection,
  ContactSection,
  FooterBottombarSection,
  HeaderHeroSection,
  ListSection,
} from "@/olyv/app/base/layout";
import { Preloader } from "@/olyv/app/base/widgets";
import type {
  AboutResponse,
  CallToActionResponse,
  ContactResponse,
  HeaderHeroResponse,
  ListResponse,
} from "@/olyv/types/base";

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
