"use server";

import fetchData from "../../utils/fetchData";
import type {
  BaseResponse,
  FormResponse,
  MailRequest,
  ManifestResponse,
  MetadataResponse,
} from "./types";

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

export async function fetchBase(): Promise<BaseResponse> {
  const data = await fetchData<BaseResponse>({
    endpoint: `${process.env.DJANGO_URL}/`,
  });

  return data as BaseResponse;
}

export async function fetchMetadata(): Promise<MetadataResponse> {
  const data = await fetchData<MetadataResponse>({
    endpoint: `${process.env.DJANGO_URL}/`,
    extra_action: "metadata",
  });

  return data as MetadataResponse;
}

export async function fetchManifest(): Promise<ManifestResponse> {
  const data = await fetchData<ManifestResponse>({
    endpoint: `${process.env.DJANGO_URL}/`,
    extra_action: "manifest",
  });

  return data as ManifestResponse;
}
