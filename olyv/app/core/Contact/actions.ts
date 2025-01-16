"use server";

import { fetchData } from "../../../context/base/actions";
import { coreApiURL } from "../../../context/core/config";
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
