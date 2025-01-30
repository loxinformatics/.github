"use server";

import fetchData from "../../utils/fetchData";
import type { ListData } from "./types";

export default async function FetchList(detail: string): Promise<ListData> {
  const data = await fetchData<ListData>({
    endpoint: `${process.env.DJANGO_URL}/list/`,
    extra_action: detail,
  });

  return data as ListData;
}
