import {
  About,
  CTA,
  Contact,
  FooterBottombar,
  HeaderHero,
  ListDescriptions,
} from "@/olyv/base/app";

import {
  fetchAbout,
  fetchCTA,
  fetchContact,
  fetchHeaderHero,
  fetchListDescriptions,
} from "@/olyv/base/app/server";

import {
  AboutData,
  CTAData,
  ContactData,
  HeaderHeroData,
  ListDescriptionsData,
} from "@/olyv/base/app/types";

import Preloader from "@/olyv/base/widgets/loaders/Preloader";

export default async function Page() {
  const headerHero: HeaderHeroData = await fetchHeaderHero("page_1");
  const about: AboutData = await fetchAbout("page_1");
  const cta: CTAData = await fetchCTA("page_1");
  const contact: ContactData = await fetchContact("page_1");
  const listdescriptions: ListDescriptionsData = await fetchListDescriptions(
    "page_1"
  );

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
