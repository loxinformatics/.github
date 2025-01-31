"use server";

import chalk from "chalk";

export async function fetchData<T>(options: {
  endpoint: string;
  extra_action?: string;
  revalidate?: number;
}): Promise<T | null> {
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
