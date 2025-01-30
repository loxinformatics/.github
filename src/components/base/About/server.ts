"use server";

import fetchData from "../../utils/fetchData";
import type { AboutData } from "./types";

export default async function FetchAbout(detail: string): Promise<AboutData> {
  const data = await fetchData<AboutData>({
    endpoint: `${process.env.DJANGO_URL}/about/`,
    extra_action: detail,
  });

  return data as AboutData;
}
