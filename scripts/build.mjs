import { rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { findNextDevProcesses } from "./next-processes.mjs";

const devProcesses = findNextDevProcesses();

if (devProcesses.length > 0) {
  console.error("Refusing to run `next build` while `next dev` is running for this project.");
  console.error("Stop the dev server first, then run `npm run build`.");
  process.exit(1);
}

rmSync(".next", { force: true, recursive: true });
rmSync("node_modules/.cache", { force: true, recursive: true });

const result = spawnSync(process.execPath, ["node_modules/next/dist/bin/next", "build"], {
  stdio: "inherit"
});

process.exit(result.status ?? 1);
