"use server";

import { fetchData } from "../../base/context/utils";
import { coreApiURL } from "../context/utils";
import type { CallToActionData } from "./types";

export default async function fetchCallToAction(detail: string): Promise<CallToActionData | null> {
  const data = await fetchData<CallToActionData>({
    endpoint: `${coreApiURL}/cta/`,
    extra_action: detail,
  });

  return data as CallToActionData | null;
}
