import {
  About,
  CTA,
  Contact,
  FooterBottombar,
  HeaderHero,
  ListDescriptions,
} from "@lox-informatics/olyv/base/app";

import {
  fetchAbout,
  fetchCTA,
  fetchContact,
  fetchHeaderHero,
  fetchListDescriptions,
} from "@lox-informatics/olyv/base/app/server";

import {
  AboutResponse,
  CTAResponse,
  ContactResponse,
  HeaderHeroResponse,
  ListDescriptionsResponse,
} from "@lox-informatics/olyv/base/app/types";

// import { Preloader } from "../../olyv/base/widgets/spinners";

export default async function Page() {
  const headerHero: HeaderHeroResponse = await fetchHeaderHero("page_1");
  const about: AboutResponse = await fetchAbout("page_1");
  const cta: CTAResponse = await fetchCTA("page_1");
  const contact: ContactResponse = await fetchContact("page_1");
  const listdescriptions: ListDescriptionsResponse =
    await fetchListDescriptions("page_1");

  return (
    <>
      
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
