"use server";

import { BaseDjangoURL, fetchData } from "../../management/utils";
import type { HeaderHeroResponse } from "./types";

export default async function fetchHeaderHero(
  detail: string
): Promise<HeaderHeroResponse> {
  const data = await fetchData<HeaderHeroResponse>({
    endpoint: `${BaseDjangoURL}/headerhero/`,
    extra_action: detail,
  });

  return data as HeaderHeroResponse;
}
