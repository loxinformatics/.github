"use server";

import { fetchData } from "../../../providers/base/actions";
import { coreApiURL } from "../../../providers/core/config";
import type { ContactData } from "./types";

export default async function fetchContact(
  detail: string
): Promise<ContactData | null> {
  const data = await fetchData<ContactData>({
    endpoint: `${coreApiURL}/contact/`,
    extra_action: detail,
  });

  return data as ContactData | null;
}
