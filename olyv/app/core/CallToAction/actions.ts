"use server";

import { fetchData } from "../../../providers/base/actions";
import { coreApiURL } from "../../../providers/core/config";
import type { CallToActionData } from "./types";

export default async function fetchCallToAction(
  detail: string
): Promise<CallToActionData | null> {
  const data = await fetchData<CallToActionData>({
    endpoint: `${coreApiURL}/cta/`,
    extra_action: detail,
  });

  return data as CallToActionData | null;
}
