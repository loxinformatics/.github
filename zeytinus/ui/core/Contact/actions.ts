"use server";

import type { ContactData } from "./types";

import { fetchData } from "../../base/context/utils";
import { coreApiURL } from "../context/utils";

export default async function fetchContact(detail: string): Promise<ContactData | null> {
  const data = await fetchData<ContactData>({
    endpoint: `${coreApiURL}/contact/`,
    extra_action: detail,
  });

  return data as ContactData | null;
}
