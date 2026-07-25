/**
 * One-shot SEO consolidation:
 * - delete thin trade×city + non-keeper city pages
 * - add 301 redirects
 * - shrink location strips
 * - regenerate sitemap with lastmod
 * - redirect /proof → /results
 */
const fs = require("fs");
const path = require("path");
const cities = require("./data/texas_cities");
const industries = require("./data/industry_templates");
const consolidation = require("./data/seo_consolidation");
const guideCities = require("./data/industry_guide_cities");

const ROOT = path.resolve(__dirname, "..");
const BLOG = path.join(ROOT, "blog");
const BASE = "https://bluebonnetgrowth.com";
const today = new Date().toISOString().slice(0, 10);

const keepCities = new Set(consolidation.keepCitySlugs);
const keepTrade = new Set(consolidation.keepTradeCity.map((k) => `${k.industry}::${k.city}`));

function cityPath(city) {
  return cities.getPath(city);
}

function addRedirect(redirects, existing, source, destination) {
  if (existing.has(source)) {
    const idx = redirects.findIndex((r) => r.source === source);
    if (idx >= 0) redirects[idx].destination = destination;
    return;
  }
  redirects.push({ source, destination, permanent: true });
  existing.add(source);
}

function deleteIfExists(file) {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    return true;
  }
  return false;
}

// --- Delete non-keeper city pages ---
let deletedCities = 0;
for (const city of cities) {
  if (keepCities.has(city.slug)) continue;
  const file = path.join(ROOT, city.path ? city.path.replace(/^\//, "") + ".html" : `${city.slug}.html`);
  // city.path is like /locations/frisco-tx — file is locations/frisco-tx.html
  let target;
  if (city.path) {
    target = path.join(ROOT, city.path.replace(/^\//, "") + ".html");
  } else {
    target = path.join(ROOT, `${city.slug}.html`);
  }
  if (deleteIfExists(target)) {
    deletedCities++;
    console.log("deleted city:", path.relative(ROOT, target));
  }
}

// Stale root duplicates for Frisco/Allen
for (const stale of ["frisco.html", "allen.html"]) {
  if (deleteIfExists(path.join(ROOT, stale))) {
    deletedCities++;
    console.log("deleted stale:", stale);
  }
}

// --- Delete thin trade×city posts (keep survivors + never delete general/pillars here) ---
let deletedPosts = 0;
const survivorSlugs = new Set(
  consolidation.keepTradeCity.map((k) => `local-seo-for-${k.industry}-${k.city}-tx`)
);
const pillarSlugs = new Set(industries.map((i) => `local-seo-for-${i.key}-texas`));
const generalSlugs = new Set(consolidation.generalBlogSlugs);

for (const name of fs.readdirSync(BLOG)) {
  if (!name.endsWith(".html")) continue;
  const slug = name.replace(/\.html$/, "");
  if (generalSlugs.has(slug) || pillarSlugs.has(slug) || survivorSlugs.has(slug)) continue;
  if (!slug.startsWith("local-seo-for-")) continue;
  if (deleteIfExists(path.join(BLOG, name))) {
    deletedPosts++;
    console.log("deleted post:", slug);
  }
}

// --- Templates: noindex if still present ---
for (const t of ["master-template.html", "city-lander-template.html"]) {
  const file = path.join(ROOT, t);
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, "utf8");
  if (!/name="robots"/.test(html)) {
    html = html.replace(/<head>/i, '<head>\n    <meta name="robots" content="noindex, nofollow" />');
  } else {
    html = html.replace(/content="index,\s*follow"/i, 'content="noindex, nofollow"');
  }
  fs.writeFileSync(file, html, "utf8");
  console.log("noindex:", t);
}

// --- vercel redirects ---
const vercelPath = path.join(ROOT, "vercel.json");
const config = JSON.parse(fs.readFileSync(vercelPath, "utf8"));
if (!config.redirects) config.redirects = [];
const existing = new Set(config.redirects.map((r) => r.source));

addRedirect(config.redirects, existing, "/proof", "/results");
addRedirect(config.redirects, existing, "/proof.html", "/results");

for (const city of cities) {
  if (keepCities.has(city.slug)) continue;
  const dest =
    consolidation.cityRedirectOverrides[city.slug] || consolidation.cityRedirectFallback;
  const sources = [`/${city.slug}`, `/${city.slug}.html`];
  if (city.path) {
    sources.push(city.path, `${city.path}.html`);
  }
  for (const src of sources) {
    addRedirect(config.redirects, existing, src, dest);
  }
}

// All industry×city combinations that are not survivors → trade pillar
const guideCitySlugs = new Set([
  ...guideCities.map((c) => c.slug),
  // historical guide cities that may still have URLs
  "houston",
  "austin",
  "san-antonio",
  "the-woodlands",
  "round-rock",
  "celina",
  "sherman",
  "van-alstyne",
  "fort-worth",
  "plano",
  "prosper",
  "allen",
  "dallas",
  "melissa",
  "mckinney",
  "anna",
  "frisco",
]);

for (const industry of industries) {
  const pillar = `/blog/local-seo-for-${industry.key}-texas`;
  for (const citySlug of guideCitySlugs) {
    if (keepTrade.has(`${industry.key}::${citySlug}`)) continue;
    const slug = `local-seo-for-${industry.key}-${citySlug}-tx`;
    addRedirect(config.redirects, existing, `/blog/${slug}`, pillar);
    addRedirect(config.redirects, existing, `/blog/${slug}.html`, pillar);
  }
}

fs.writeFileSync(vercelPath, JSON.stringify(config, null, 2) + "\n", "utf8");
console.log("Updated vercel.json redirects");

// --- Location strip: keep cities only ---
function dfwStrip() {
  return [...keepCities]
    .map((s) => cities.getBySlug(s))
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((c) => `            <a class="location-tag" href="${cityPath(c)}">${c.name}</a>`)
    .join("\n");
}

const stripHtml = `          <nav class="location-strip" aria-label="North Texas cities">\n${dfwStrip()}\n          </nav>`;
const stripSection = `      <section class="section section-light">
        <div class="container">
          <h2>Local SEO across North Texas</h2>
          <p>I focus on DFW growth markets where I know how people actually search. Explore local SEO by city:</p>
${stripHtml}
          <p class="text-links"><a href="/locations">View locations</a> · <a href="/services/local-seo">Local SEO services</a> · <a href="/contact">Apply now</a></p>
        </div>
      </section>`;

function patchFile(file) {
  if (!fs.existsSync(file)) return false;
  let html = fs.readFileSync(file, "utf8");
  const orig = html;
  if (/<(?:nav|div) class="location-strip"[\s\S]*?<\/(?:nav|div)>/.test(html)) {
    html = html.replace(/<(?:nav|div) class="location-strip"[\s\S]*?<\/(?:nav|div)>/, stripHtml.trim());
  }
  html = html.replace(
    /<h2>Local SEO in cities across Texas<\/h2>\s*<p>I help small businesses get found on Google statewide\. Explore local SEO by city:<\/p>/g,
    `<h2>Local SEO across North Texas</h2>\n          <p>I focus on DFW growth markets where I know how people actually search. Explore local SEO by city:</p>`
  );
  if (html !== orig) {
    fs.writeFileSync(file, html, "utf8");
    return true;
  }
  return false;
}

let stripPatched = 0;
for (const dir of [ROOT, BLOG, path.join(ROOT, "services")]) {
  if (!fs.existsSync(dir)) continue;
  for (const name of fs.readdirSync(dir)) {
    if (!name.endsWith(".html")) continue;
    if (patchFile(path.join(dir, name))) stripPatched++;
  }
}
console.log(`Location strips patched: ${stripPatched}`);

// --- Sitemap ---
const industrySlugs = JSON.parse(
  fs.readFileSync(path.join(ROOT, "scripts", "data", "industry_blog_slugs.json"), "utf8")
);
const keepCityUrls = consolidation.keepCitySlugs.map((slug) => {
  const c = cities.getBySlug(slug);
  return c ? cityPath(c) : `/${slug}`;
});

const core = [
  "/",
  "/services",
  "/services/local-seo",
  "/services/google-business-profile",
  "/services/seo-content",
  "/results",
  "/how-it-works",
  "/about",
  "/contact",
  "/locations",
  "/blog",
  "/pricing",
  "/faq",
];

const urls = [
  ...new Set([...core, ...keepCityUrls, ...industrySlugs.map((s) => `/blog/${s}`), ...consolidation.generalBlogSlugs.map((s) => `/blog/${s}`)]),
].sort();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((url) => {
    const pri =
      url === "/" ? "1.0" : url.startsWith("/blog/") ? "0.6" : keepCityUrls.includes(url) ? "0.7" : "0.8";
    return `  <url>
    <loc>${BASE}${url}</loc>
    <lastmod>${today}</lastmod>
    <priority>${pri}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), xml, "utf8");
console.log(`Sitemap: ${urls.length} URLs`);

console.log(
  `\nConsolidation summary: deleted ${deletedCities} city pages, ${deletedPosts} thin posts, ${urls.length} sitemap URLs`
);
