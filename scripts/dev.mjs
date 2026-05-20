import { rmSync } from "node:fs";
import { spawn } from "node:child_process";
import { setTimeout as wait } from "node:timers/promises";
import { findNextDevProcesses, killProcesses } from "./next-processes.mjs";

const oldDevProcesses = findNextDevProcesses();

if (oldDevProcesses.length > 0) {
  console.log(`Stopping ${oldDevProcesses.length} stale Next dev process...`);
  killProcesses(oldDevProcesses);
  await wait(900);
}

rmSync(".next", { force: true, recursive: true });
rmSync("node_modules/.cache", { force: true, recursive: true });

const nextBin = "node_modules/next/dist/bin/next";
const args = [nextBin, "dev", ...process.argv.slice(2)];
const child = spawn(process.execPath, args, { stdio: "inherit" });

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
