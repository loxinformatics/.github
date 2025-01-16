"use server";

import type {
  BaseData,
  BaseManifest,
  BaseMetadata,
  FetchBaseDetailPropOptions,
  FormResponse,
  MailProps,
} from "./types";
import { baseApiURL, fetchData } from "./utils";

export default async function fetchBase(
  detail?: FetchBaseDetailPropOptions
): Promise<BaseData | BaseMetadata | BaseManifest> {
  const data = await fetchData<BaseData | BaseMetadata | BaseManifest>({
    endpoint: `${baseApiURL}/`,
    extra_action: detail === "base" ? "" : detail,
    revalidate: detail === "manifest" ? 300 : undefined,
  });

  return data as BaseData | BaseMetadata | BaseManifest;
}

export async function mail({
  name,
  email,
  subject,
  message,
  endpoint,
}: MailProps): Promise<FormResponse> {
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
    else if (response.status === 400 && data.name && data.email && data.subject && data.message) {
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
