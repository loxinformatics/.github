"use server";

import fetchData from "../../utils/fetchData";
import type { CallToActionData } from "./types";

export default async function FetchCallToAction(
  detail: string
): Promise<CallToActionData> {
  const data = await fetchData<CallToActionData>({
    endpoint: `${process.env.DJANGO_URL}/cta/`,
    extra_action: detail,
  });

  return data as CallToActionData;
}
