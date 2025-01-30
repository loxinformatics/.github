"use server";

import { fetchData } from "../management/utils";
import type { HeaderHeroData } from "./types";

export default async function fetchHeaderHero(
  detail: string
): Promise<HeaderHeroData> {
  const data = await fetchData<HeaderHeroData>({
    endpoint: `${process.env.DJANGO_URL}/headerhero/`,
    extra_action: detail,
  });

  return data as HeaderHeroData;
}
