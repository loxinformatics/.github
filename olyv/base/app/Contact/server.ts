"use server";

import { BaseDjangoURL, fetchData } from "../../management/utils";
import type { ContactResponse } from "./types";

export default async function fetchContact(
  detail: string
): Promise<ContactResponse> {
  const data = await fetchData<ContactResponse>({
    endpoint: `${BaseDjangoURL}/contact/`,
    extra_action: detail,
  });

  return data as ContactResponse;
}
