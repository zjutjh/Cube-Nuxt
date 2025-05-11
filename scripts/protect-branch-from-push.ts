import { execSync } from "node:child_process";

const PROTECTED_BRANCHES = ["main"];

const currentBranch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();

if (PROTECTED_BRANCHES.includes(currentBranch)) {
  console.error(`⚠️ Error: 禁止 push 到分支 ${currentBranch}.`);

  process.exit(1);
}
