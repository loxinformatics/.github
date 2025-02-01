"use server";

import { BaseDjangoURL, fetchData } from "../../management/utils";
import type { CTAResponse } from "./types";

export default async function fetchCTA(detail: string): Promise<CTAResponse> {
  const data = await fetchData<CTAResponse>({
    endpoint: `${BaseDjangoURL}/cta/`,
    extra_action: detail,
  });

  return data as CTAResponse;
}
