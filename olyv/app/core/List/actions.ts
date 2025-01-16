"use server";

import { fetchData } from "../../../context/base/actions";
import { coreApiURL } from "../../../context/core/config";
import type { ListDescriptionsData } from "./types";

export default async function fetchList(
  detail: string
): Promise<ListDescriptionsData | null> {
  const data = await fetchData<ListDescriptionsData>({
    endpoint: `${coreApiURL}/listdescriptions/`,
    extra_action: detail,
  });

  return data as ListDescriptionsData | null;
}
