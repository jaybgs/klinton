import { execFileSync } from "node:child_process";
import path from "node:path";

const cwd = process.cwd();
const escapedCwd = cwd.replaceAll("\\", "\\\\");

export function findNextDevProcesses() {
  let output = "";

  try {
    output = execFileSync("ps", ["-axo", "pid=,command="], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });
  } catch {
    return [];
  }

  return output
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^(\d+)\s+(.+)$/);
      return match ? { pid: Number(match[1]), command: match[2] } : null;
    })
    .filter(Boolean)
    .filter(({ pid, command }) => {
      if (pid === process.pid || pid === process.ppid) return false;
      const isNextDev =
        command.includes("next dev") ||
        command.includes("node_modules/next/dist/bin/next dev") ||
        command.includes("node_modules/.bin/next dev");
      const isThisProject =
        command.includes(cwd) ||
        command.includes(escapedCwd) ||
        command.includes(path.join(cwd, "node_modules", ".bin", "next")) ||
        command.includes(path.join(cwd, "node_modules", "next", "dist", "bin", "next")) ||
        command.includes("node_modules/next/dist/bin/next dev") ||
        command.includes("node_modules/.bin/next dev");

      return isNextDev && isThisProject;
    });
}

export function killProcesses(processes) {
  for (const processInfo of processes) {
    try {
      process.kill(processInfo.pid, "SIGTERM");
    } catch {
      // The process may already have exited.
    }
  }
}
