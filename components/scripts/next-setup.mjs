#!/usr/bin/env node

import chalk from "chalk";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const main = async () => {
  const scripts = [
    { name: "Copy Navigation File", fn: checkAndCopyNavigationFile },
    // Add more scripts here:
    // { name: "Another Script", fn: anotherScriptFunction }
  ];

  for (const { name, fn } of scripts) {
    try {
      await fn();
    } catch (err) {
      console.error(chalk.red(`Error in "${name}":`, err.message));
    }
  }
};

// Function to check and copy navigation.ts file
const checkAndCopyNavigationFile = async () => {
  const sourceDir = path.resolve(process.cwd(), "app", "navigation.ts");
  const destinationDir = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "..",
    "base",
    "navigation.ts",
  );

  await fs.access(sourceDir); // check if file exists
  await fs.copyFile(sourceDir, destinationDir); // copy file
};

// Call main
main();
