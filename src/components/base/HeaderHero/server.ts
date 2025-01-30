"use server";

import fetchData from "../../utils/fetchData";
import type { HeaderHero } from "./types";

export default async function FetchHeaderHero(
  detail: string
): Promise<HeaderHero> {
  const data = await fetchData<HeaderHero>({
    endpoint: `${process.env.DJANGO_URL}/headerhero/`,
    extra_action: detail,
  });

  return data as HeaderHero;
}
