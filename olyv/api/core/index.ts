"use server";

import type {
  AboutResponse,
  CallToActionResponse,
  ContactResponse,
  HeaderHeroResponse,
  ListResponse,
} from "../../types/core";
import { coreApiURL } from "../../utils/core";
import { fetchData } from "../base";

export async function fetchAbout(detail: string): Promise<AboutResponse> {
  const data = await fetchData<AboutResponse>({
    endpoint: `${coreApiURL}/about/`,
    extra_action: detail,
  });

  return data as AboutResponse;
}

export async function fetchCallToAction(
  detail: string
): Promise<CallToActionResponse> {
  const data = await fetchData<CallToActionResponse>({
    endpoint: `${coreApiURL}/cta/`,
    extra_action: detail,
  });

  return data as CallToActionResponse;
}

export async function fetchContact(detail: string): Promise<ContactResponse> {
  const data = await fetchData<ContactResponse>({
    endpoint: `${coreApiURL}/contact/`,
    extra_action: detail,
  });

  return data as ContactResponse;
}

export async function fetchHeaderHero(
  detail: string
): Promise<HeaderHeroResponse> {
  const data = await fetchData<HeaderHeroResponse>({
    endpoint: `${coreApiURL}/headerhero/`,
    extra_action: detail,
  });

  return data as HeaderHeroResponse;
}

export async function fetchList(detail: string): Promise<ListResponse> {
  const data = await fetchData<ListResponse>({
    endpoint: `${coreApiURL}/listdescriptions/`,
    extra_action: detail,
  });

  return data as ListResponse;
}
