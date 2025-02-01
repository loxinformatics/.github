"use server";

import { BaseDjangoURL, fetchData } from "../../management/utils";
import type { AboutResponse } from "./types";

export default async function fetchAbout(
  detail: string
): Promise<AboutResponse> {
  const data = await fetchData<AboutResponse>({
    endpoint: `${BaseDjangoURL}/about/`,
    extra_action: detail,
  });

  return data as AboutResponse;
}
