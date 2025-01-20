"use server";

import { fetchData } from "../../../providers/base/actions";
import { coreApiURL } from "../../../providers/core/config";
import type { HeaderHeroData } from "./types";

export default async function fetchHeaderHero(
  detail: string
): Promise<HeaderHeroData | null> {
  const data = await fetchData<HeaderHeroData>({
    endpoint: `${coreApiURL}/headerhero/`,
    extra_action: detail,
  });

  return data as HeaderHeroData | null;
}
