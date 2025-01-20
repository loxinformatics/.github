"use server";

import { fetchData } from "../../../providers/base/actions";
import { coreApiURL } from "../../../providers/core/config";

import type { AboutData } from "./types";

export default async function fetchAbout(
  detail: string
): Promise<AboutData | null> {
  const data = await fetchData<AboutData>({
    endpoint: `${coreApiURL}/about/`,
    extra_action: detail,
  });

  return data as AboutData | null;
}
