/**
 * `@supabase/supabase-js` is imported by `services/api`, and those files resolve modules by
 * walking up from `services/api` to the repository root. A Vercel install of this app puts
 * packages in `apps/web/node_modules`, which that walk never visits.
 *
 * Locally the package is already at the repository root. On Vercel it is not, so install
 * just that one package there before `next build`. `--no-save` leaves the root manifest
 * untouched.
 */
import { access } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const installed = join(root, "node_modules", "@supabase", "supabase-js", "package.json");

try {
  await access(installed);
} catch {
  const result = spawnSync(
    "npm",
    [
      "install",
      "--prefix",
      root,
      "--no-save",
      "--package-lock=false",
      "--ignore-scripts",
      "--no-audit",
      "--no-fund",
      "@supabase/supabase-js@^2.112.3",
    ],
    { stdio: "inherit" },
  );
  if (result.status !== 0) process.exit(result.status ?? 1);
}
