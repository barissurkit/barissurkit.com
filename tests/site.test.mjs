import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => readFileSync(join(root, file), "utf8");

function htmlFiles(dir = root) {
  const out = [];
  for (const name of readdirSync(dir)) {
    if (name === ".git" || name === "node_modules" || name === "tests") continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...htmlFiles(full));
    else if (name.endsWith(".html")) out.push(full);
  }
  return out;
}

const pages = htmlFiles();
const rel = (file) => file.slice(root.length + 1).replaceAll("\\", "/");

test("the site has the homepage, projects index, case studies and 404 page", () => {
  const found = pages.map(rel);
  for (const expected of [
    "index.html",
    "404.html",
    "projects/index.html",
    "projects/ai-search-engine/index.html",
    "projects/devlens/index.html",
  ]) {
    assert.ok(found.includes(expected), `${expected} bulunamadı`);
  }
});

test("every public page declares a language and a non-empty title", () => {
  for (const file of pages.filter((f) => !rel(f).startsWith("cv-source/"))) {
    const html = readFileSync(file, "utf8");
    assert.match(html, /<html[^>]*\slang="[a-z]{2}"/i, `${rel(file)}: lang yok`);
    assert.match(html, /<title[^>]*>\s*\S[^<]*<\/title>/i, `${rel(file)}: title yok`);
  }
});

test("local links and assets referenced from public pages exist", () => {
  const attr = /(?:href|src)="([^"]+)"/g;
  for (const file of pages.filter((f) => !rel(f).startsWith("cv-source/"))) {
    const html = readFileSync(file, "utf8");
    for (const [, target] of html.matchAll(attr)) {
      if (/^(https?:|mailto:|tel:|#|data:)/.test(target)) continue;
      const path = target.split("#")[0].split("?")[0];
      if (!path) continue;
      const resolved = path.startsWith("/") ? join(root, path) : join(dirname(file), path);
      assert.ok(existsSync(resolved), `${rel(file)}: ${target} bulunamadı`);
    }
  }
});

test("sitemap lists only pages that exist", () => {
  const urls = [...read("sitemap.xml").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.ok(urls.length > 0);
  for (const url of urls) {
    assert.ok(url.startsWith("https://barissurkit.com/"), `${url} beklenmeyen alan adı`);
    const path = new URL(url).pathname;
    const file = path.endsWith("/") ? join(root, path, "index.html") : join(root, path);
    assert.ok(existsSync(file), `${url} için sayfa yok`);
  }
});

test("robots.txt points to the sitemap and CNAME holds the custom domain", () => {
  assert.match(read("robots.txt"), /Sitemap: https:\/\/barissurkit\.com\/sitemap\.xml/);
  assert.equal(read("CNAME").trim(), "barissurkit.com");
});

test("script.js is syntactically valid JavaScript", () => {
  execFileSync(process.execPath, ["--check", join(root, "script.js")]);
});

test("every data-i18n and data-i18n-content key used in the pages has a Turkish translation", () => {
  const script = read("script.js");
  const keys = new Set();
  for (const file of pages.filter((f) => !rel(f).startsWith("cv-source/"))) {
    const html = readFileSync(file, "utf8");
    for (const [, key] of html.matchAll(/data-i18n(?:-content)?="([^"]+)"/g)) keys.add(key);
  }
  assert.ok(keys.size > 0);
  const missing = [...keys].filter((key) => !script.includes(`"${key}"`));
  assert.deepEqual(missing, []);
});
