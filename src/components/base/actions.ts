"use server";

import chalk from "chalk";
import type {
  AboutResponse,
  BaseResponse,
  CallToActionResponse,
  ContactResponse,
  DataRequestOptions,
  FormResponse,
  HeaderHeroResponse,
  ListResponse,
  MailRequest,
  ManifestResponse,
  MetadataResponse,
} from "./types";
import { baseApiURL } from "./utils";

export async function mail({
  name,
  email,
  subject,
  message,
  endpoint,
}: MailRequest): Promise<FormResponse> {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
      }),
    });

    const data = await response.json();

    if (response.ok)
      return {
        success: true,
        message: data.detail || "Email sent successfully",
      };
    else if (
      response.status === 400 &&
      data.name &&
      data.email &&
      data.subject &&
      data.message
    ) {
      return {
        success: false,
        message: `${data.name[0]}\n${data.email[0]}\n${data.subject[0]}\n${data.message[0]}`,
        error: `name: ${data.name[0]}\nemail: ${data.email[0]}\nsubject: ${data.subject[0]}\nmessage: ${data.message[0]}`,
      };
    } else if (response.status === 400 && data.name) {
      return {
        success: false,
        message: data.name[0],
        error: `name: ${data.name[0]}`,
      };
    } else if (response.status === 400 && data.email) {
      return {
        success: false,
        message: data.email[0],
        error: `email: ${data.email[0]}`,
      };
    } else if (response.status === 400 && data.subject) {
      return {
        success: false,
        message: data.subject[0],
        error: `subject: ${data.subject[0]}`,
      };
    } else if (response.status === 400 && data.message) {
      return {
        success: false,
        message: data.message[0],
        error: `message: ${data.message[0]}`,
      };
    } else {
      return {
        success: false,
        message: data.detail,
        error: `detail: ${data.detail}`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Internal server error",
      error: "Internal server error",
    };
  }
}

export async function fetchData<T>(
  options: DataRequestOptions
): Promise<T | null> {
  const { endpoint, extra_action } = options;
  const revalidate =
    options.revalidate ?? (process.env.ENVIRONMENT === "development" ? 0 : 300);

  try {
    const response = await fetch(
      `${endpoint}${extra_action ? extra_action + "/" : ""}`,
      {
        next: { revalidate },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint} data`);
    }

    const data = await response.json();
    return (data as T) || null;
  } catch (error) {
    console.warn(chalk.yellow(error));
    return null;
  }
}

export async function fetchBase(): Promise<BaseResponse> {
  const data = await fetchData<BaseResponse>({
    endpoint: `${baseApiURL}/`,
  });

  return data as BaseResponse;
}

export async function fetchMetadata(): Promise<MetadataResponse> {
  const data = await fetchData<MetadataResponse>({
    endpoint: `${baseApiURL}/`,
    extra_action: "metadata",
  });

  return data as MetadataResponse;
}

export async function fetchManifest(): Promise<ManifestResponse> {
  const data = await fetchData<ManifestResponse>({
    endpoint: `${baseApiURL}/`,
    extra_action: "manifest",
  });

  return data as ManifestResponse;
}

export async function fetchAbout(detail: string): Promise<AboutResponse> {
  const data = await fetchData<AboutResponse>({
    endpoint: `${baseApiURL}/about/`,
    extra_action: detail,
  });

  return data as AboutResponse;
}

export async function fetchCallToAction(
  detail: string
): Promise<CallToActionResponse> {
  const data = await fetchData<CallToActionResponse>({
    endpoint: `${baseApiURL}/cta/`,
    extra_action: detail,
  });

  return data as CallToActionResponse;
}

export async function fetchContact(detail: string): Promise<ContactResponse> {
  const data = await fetchData<ContactResponse>({
    endpoint: `${baseApiURL}/contact/`,
    extra_action: detail,
  });

  return data as ContactResponse;
}

export async function fetchHeaderHero(
  detail: string
): Promise<HeaderHeroResponse> {
  const data = await fetchData<HeaderHeroResponse>({
    endpoint: `${baseApiURL}/headerhero/`,
    extra_action: detail,
  });

  return data as HeaderHeroResponse;
}

export async function fetchList(detail: string): Promise<ListResponse> {
  const data = await fetchData<ListResponse>({
    endpoint: `${baseApiURL}/list/`,
    extra_action: detail,
  });

  return data as ListResponse;
}
