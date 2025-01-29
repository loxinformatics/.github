"use server";

import { fetchData } from "../../actions";
import { baseApiURL } from "../../utils";
import type { HeaderHeroResponse } from "./types";

export async function fetchHeaderHero(
  detail: string
): Promise<HeaderHeroResponse> {
  const data = await fetchData<HeaderHeroResponse>({
    endpoint: `${baseApiURL}/headerhero/`,
    extra_action: detail,
  });

  return data as HeaderHeroResponse;
}
