"use server";

import chalk from "chalk";
import conf from "../../../config";

export async function fetchData<T>(options: {
  endpoint: string;
  extra_action?: string;
  revalidate?: number;
}): Promise<T | null> {
  const { endpoint, extra_action } = options;
  const revalidate = options.revalidate ?? (conf.debug === "true" ? 0 : 300);

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

export const BaseDjangoURL = `${conf.django.url}/olyv/base`;
