"use server";

import { fetchData } from "../management/utils";
import type { ListDescriptionsData } from "./types";

export default async function fetchListDescriptions(
  detail: string
): Promise<ListDescriptionsData> {
  const data = await fetchData<ListDescriptionsData>({
    endpoint: `${process.env.DJANGO_URL}/list_descriptions/`,
    extra_action: detail,
  });

  return data as ListDescriptionsData;
}
