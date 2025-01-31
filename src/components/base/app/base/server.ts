"use server";

import { fetchData } from "../../utils";
import type { BaseData, ManifestData, MetaData } from "./types";

export default async function FetchBase(
  extra_action?: "metadata" | "manifest"
): Promise<BaseData | MetaData | ManifestData> {
  const data = await fetchData<BaseData | MetaData | ManifestData>({
    endpoint: `${process.env.DJANGO_URL}/`,
    extra_action,
  });

  return data as BaseData | MetaData | ManifestData;
}
