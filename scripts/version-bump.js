import { execSync } from "child_process";
import fs from "fs";
import path from "path";

// Get the last commit message
const commitMsg = execSync("git log -1 --pretty=%B").toString().trim();

// Determine version bump type
let bumpType = "patch";
if (commitMsg.includes("MAJOR")) {
  bumpType = "major";
} else if (commitMsg.includes("MINOR")) {
  bumpType = "minor";
}

// Read package.json
const packageJsonPath = path.resolve(process.cwd(), "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

// Bump version
try {
  execSync(`npm version ${bumpType} --no-git-tag-version`, {
    stdio: "inherit",
  });
  console.log(`Version bumped to ${bumpType}`);
} catch (error) {
  console.error("Failed to bump version:", error.message);
  process.exit(1);
}
