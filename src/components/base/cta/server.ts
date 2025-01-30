"use server";

import { fetchData } from "../management/utils";
import type { CTAData } from "./types";

export default async function fetchCallToAction(
  detail: string
): Promise<CTAData> {
  const data = await fetchData<CTAData>({
    endpoint: `${process.env.DJANGO_URL}/cta/`,
    extra_action: detail,
  });

  return data as CTAData;
}
