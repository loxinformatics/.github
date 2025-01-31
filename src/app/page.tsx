import {
  About,
  CTA,
  Contact,
  FooterBottombar,
  HeaderHero,
  ListDescriptions,
} from "@/components/base/app";
import {
  fetchAbout,
  fetchCallToAction,
  fetchContact,
  fetchHeaderHero,
  fetchList,
} from "@/components/base/app/server";
import Preloader from "@/components/base/widgets/loaders/Preloader";

export default async function Page() {
  const headerHero = await fetchHeaderHero("page_1");
  const about = await fetchAbout("page_1");
  const cta = await fetchCallToAction("page_1");
  const contact = await fetchContact("page_1");
  const listdescriptions = await fetchList("page_1");

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
