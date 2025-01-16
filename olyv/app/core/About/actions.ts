"use server";

import { fetchData } from "../../../context/base/actions";
import { coreApiURL } from "../../../context/core/config";

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
