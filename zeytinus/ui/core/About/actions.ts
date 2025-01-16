"use server";

import { fetchData } from "../../base/context/utils";
import { coreApiURL } from "../context/utils";

import type { AboutData } from "./types";

export default async function fetchAbout(detail: string): Promise<AboutData | null> {
  const data = await fetchData<AboutData>({
    endpoint: `${coreApiURL}/about/`,
    extra_action: detail,
  });

  return data as AboutData | null;
}
