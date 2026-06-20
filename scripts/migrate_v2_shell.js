const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SKIP_FILES = new Set([
  "master-template.html",
  "city-lander-template.html",
  "index.html",
  "services.html",
  "results.html",
  "how-it-works.html",
  "about.html",
  "contact.html",
  "blog.html",
]);
const SKIP_DIRS = new Set(["preview", "incoming", "resources", "components", "scripts", ".git", "assets", "node_modules"]);

const GTAG = `    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-QG3FTP7PC3"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-QG3FTP7PC3');
    </script>`;

function fixEmDashes(text) {
  return text
    .replace(/<title>([^<]*)<\/title>/gi, (_, t) => `<title>${t.replace(/ — /g, " | ").replace(/—/g, " | ")}</title>`)
    .replace(/ — /g, ", ")
    .replace(/—/g, ", ")
    .replace(/, ,/g, ",");
}

function extractTag(pattern, html) {
  const m = html.match(pattern);
  return m ? m[1].trim() : null;
}

function extractMain(html) {
  const m = html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i);
  return m ? m[0] : null;
}

function activeSlug(filePath) {
  const name = path.basename(filePath, ".html");
  const parent = path.basename(path.dirname(filePath));
  if (parent === "blog") return "blog";
  const map = {
    "local-seo": "services",
    "web-design": "services",
    "conversion-optimization": "services",
    proof: "about",
    pricing: "services",
    locations: "about",
    "frisco-tx": "about",
    "allen-tx": "about",
  };
  return map[name] || name;
}

function navHtml(active) {
  const links = [
    ["results", "Results"],
    ["services", "Services"],
    ["how-it-works", "How it works"],
    ["about", "About"],
    ["blog", "Blog"],
  ];
  const items = links
    .map(([slug, label]) => `        <a href="/${slug}"${slug === active ? ' class="is-active"' : ""}>${label}</a>`)
    .join("\n");
  return `    <nav class="nav" aria-label="Primary navigation">
      <a class="nav-logo" href="/">
        <img src="/assets/bluebonnet-icon.png" alt="Bluebonnet Growth" width="34" height="34" />
        <span class="nav-logo-text">Bluebonnet Growth</span>
      </a>
      <div class="nav-links">
${items}
      </div>
      <a href="/contact" class="nav-cta">Apply Now</a>
      <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" data-nav-toggle>
        <span></span><span></span><span></span>
      </button>
    </nav>
    <div class="nav-drawer" data-nav-drawer aria-label="Mobile navigation">
${items}
      <a href="/contact">Apply Now</a>
    </div>`;
}

function footerHtml() {
  return `    <footer>
      <div>
        <div class="footer-brand-row">
          <img src="/assets/bluebonnet-icon.png" alt="Bluebonnet Growth" width="28" height="28" />
          <div class="footer-brand">Bluebonnet Growth</div>
        </div>
        <div class="footer-tagline">Ranking North Texas local businesses on Google. One operator. Direct access. Real results.</div>
      </div>
      <div>
        <div class="footer-col-title">Pages</div>
        <ul class="footer-links">
          <li><a href="/results">Results</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/how-it-works">How it works</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/locations">Locations</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Ready to rank?</div>
        <div class="footer-cta-text">Limited to 5 clients at a time. Apply to see if there is a spot open for your business.</div>
        <a href="/contact" class="footer-btn">Apply Now</a>
      </div>
    </footer>

    <div class="copyright">
      <span>© 2026 Bluebonnet Growth. All rights reserved.</span>
      <span>Based in Melissa, TX · Serving North Texas</span>
    </div>`;
}

function headHtml(original) {
  const title = extractTag(/<title>(.*?)<\/title>/is, original) || "Bluebonnet Growth";
  const description = extractTag(/<meta\s+name="description"\s+content="([^"]*)"/i, original);
  const canonical = extractTag(/<link\s+rel="canonical"\s+href="([^"]*)"/i, original);
  const extra = ["og:type", "og:title", "og:description", "og:url", "og:image"]
    .map((prop) => {
      const val = extractTag(new RegExp(`<meta\\s+property="${prop}"\\s+content="([^"]*)"`, "i"), original);
      return val ? `    <meta property="${prop}" content="${val}" />` : "";
    })
    .filter(Boolean)
    .join("\n");
  return `  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
${GTAG}
    <title>${title}</title>
${description ? `    <meta name="description" content="${description}" />` : ""}
${canonical ? `    <link rel="canonical" href="${canonical}" />` : ""}
${extra}
    <link rel="icon" href="/assets/favicon-32x32.png" type="image/png" />
    <link rel="apple-touch-icon" href="/assets/favicon-32x32.png" />
    <link rel="stylesheet" href="/styles.css" />
  </head>`;
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith(".html") && !SKIP_FILES.has(entry.name)) files.push(full);
  }
  return files;
}

let updated = 0;
let skipped = 0;

for (const filePath of walk(ROOT).sort()) {
  const original = fs.readFileSync(filePath, "utf8");
  const main = extractMain(original);
  if (!main) {
    console.log(`skip (no main): ${path.relative(ROOT, filePath)}`);
    skipped++;
    continue;
  }
  const active = activeSlug(filePath);
  const page = fixEmDashes(`<!DOCTYPE html>
<html lang="en">
${headHtml(original)}
  <body>
${navHtml(active)}
${main}
${footerHtml()}
    <script src="/script.js" defer></script>
  </body>
</html>
`);
  fs.writeFileSync(filePath, page, "utf8");
  console.log(`updated: ${path.relative(ROOT, filePath)}`);
  updated++;
}

console.log(`\nDone. Updated ${updated}, skipped ${skipped}.`);
