"use server";

import { fetchData } from "../management/utils";
import type { ContactData } from "./types";

export default async function fetchContact(
  detail: string
): Promise<ContactData> {
  const data = await fetchData<ContactData>({
    endpoint: `${process.env.DJANGO_URL}/contact/`,
    extra_action: detail,
  });

  return data as ContactData;
}
