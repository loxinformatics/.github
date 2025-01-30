import {
  About,
  CTA,
  Contact,
  FooterBottombar,
  HeaderHero,
  ListDescriptions,
} from "@/components/base";
import {
  fetchAbout,
  fetchCallToAction,
  fetchContact,
  fetchHeaderHero,
  fetchList,
} from "@/components/base/management/server";
import type {
  AboutResponse,
  CallToActionResponse,
  ContactResponse,
  HeaderHeroResponse,
  ListResponse,
} from "@/components/base/management/types";
import Preloader from "@/components/base/widgets/loaders/Preloader";

export default async function Page() {
  const headerHero: HeaderHeroResponse = await fetchHeaderHero("page_1");
  const about: AboutResponse = await fetchAbout("page_1");
  const cta: CallToActionResponse = await fetchCallToAction("page_1");
  const contact: ContactResponse = await fetchContact("page_1");
  const listdescriptions: ListResponse = await fetchList("page_1");

  return (
    <>
      <Preloader />
      <HeaderHero component="headerhero" {...headerHero} />
      <main>
        <About {...about} />
        <CTA {...cta} />
        <ListDescriptions {...listdescriptions} />
        <Contact {...contact} />
      </main>
      <FooterBottombar />
    </>
  );
}
