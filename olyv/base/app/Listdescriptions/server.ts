"use server";

import { BaseDjangoURL, fetchData } from "../../management/utils";
import type { ListDescriptionsResponse } from "./types";

export default async function fetchListDescriptions(
  detail: string
): Promise<ListDescriptionsResponse> {
  const data = await fetchData<ListDescriptionsResponse>({
    endpoint: `${BaseDjangoURL}/list_descriptions/`,
    extra_action: detail,
  });

  return data as ListDescriptionsResponse;
}
