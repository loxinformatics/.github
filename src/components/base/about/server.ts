"use server";

import { fetchData } from "../management/utils";
import type { AboutData } from "./types";

export default async function fetchAbout(detail: string): Promise<AboutData> {
  const data = await fetchData<AboutData>({
    endpoint: `${process.env.DJANGO_URL}/about/`,
    extra_action: detail,
  });

  return data as AboutData;
}
