"use server";

import fetchData from "../../utils/fetchData";
import type { ContactData } from "./types";

export default async function FetchContact(
  detail: string
): Promise<ContactData> {
  const data = await fetchData<ContactData>({
    endpoint: `${process.env.DJANGO_URL}/contact/`,
    extra_action: detail,
  });

  return data as ContactData;
}
