"use server";

import { BaseDjangoURL, fetchData } from "../../management/utils";
import type { BaseResponse, ManifestResponse, MetadataResponse } from "./types";

export default async function fetchBase(
  extra_action?: "metadata" | "manifest"
): Promise<BaseResponse | MetadataResponse | ManifestResponse> {
  const data = await fetchData<
    BaseResponse | MetadataResponse | ManifestResponse
  >({
    endpoint: `${BaseDjangoURL}/`,
    extra_action,
  });

  return data as BaseResponse | MetadataResponse | ManifestResponse;
}
