import {
  About,
  CTA,
  Contact,
  FooterBottombar,
  HeaderHero,
  Listdescriptions,
} from "@treeolyv/web/base/app";

import {
  fetchAbout,
  fetchCTA,
  fetchContact,
  fetchFooterBottombar,
  fetchHeaderHero,
  fetchListdescriptions,
} from "@treeolyv/web/base/app/server";

import {
  AboutResponse,
  CTAResponse,
  ContactResponse,
  HeaderHeroResponse,
  ListdescriptionsResponse,
} from "@treeolyv/web/base/app/types";

import { Preloader } from "@treeolyv/web/base/widgets/spinners";

export default async function Page() {
  const headerHero: HeaderHeroResponse = await fetchHeaderHero("page_1");
  const about: AboutResponse = await fetchAbout("page_1");
  const cta: CTAResponse = await fetchCTA("page_1");
  const contact: ContactResponse = await fetchContact("page_1");
  const listdescriptions: ListdescriptionsResponse =
    await fetchListdescriptions("page_1");
  const footerBottombar = await fetchFooterBottombar("page_1");

  return (
    <>
      <Preloader />
      <HeaderHero component="headerhero" {...headerHero} />
      <main>
        <About {...about} />
        <CTA {...cta} />
        <Listdescriptions {...listdescriptions} />
        <Contact {...contact} />
      </main>
      <FooterBottombar {...footerBottombar} />
    </>
  );
}
