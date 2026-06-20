const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BASE = "https://bluebonnetgrowth.com";
const SKIP_DIRS = new Set(["preview", "incoming", "resources", "components", "scripts", ".git", "assets", "node_modules"]);

const PRIORITY = {
  "/": "1.0",
  "/services/local-seo": "0.9",
  "/services/web-design": "0.9",
  "/contact": "0.9",
  "/services": "0.8",
  "/results": "0.8",
  "/how-it-works": "0.8",
  "/about": "0.8",
  "/locations": "0.8",
  "/blog": "0.7",
};

const CITY_PAGES = [
  "/mckinney", "/melissa", "/plano", "/anna", "/sherman", "/fort-worth",
  "/prosper", "/celina", "/wylie", "/murphy", "/sachse", "/lucas",
  "/van-alstyne", "/gunter", "/denison", "/howe",
  "/locations/frisco-tx", "/locations/allen-tx",
];

const BLOG_SLUGS = [
  "what-to-do-when-phone-stops-ringing",
  "how-to-get-more-google-reviews",
  "why-competitor-ranks-higher",
  "how-long-does-local-seo-take",
  "do-you-need-a-website-for-local-seo",
  "google-maps-not-showing-up",
  "what-is-local-seo",
  "website-traffic-no-calls",
  "is-your-seo-company-working",
  "google-business-profile-checklist",
];

function changefreq(url) {
  if (url === "/" || url === "/blog") return "weekly";
  if (url.startsWith("/blog/")) return "yearly";
  return "monthly";
}

function priority(url) {
  if (PRIORITY[url]) return PRIORITY[url];
  if (CITY_PAGES.includes(url)) return "0.7";
  if (url.startsWith("/blog/")) return "0.5";
  return "0.6";
}

const urls = new Set([
  "/",
  "/services",
  "/services/local-seo",
  "/services/web-design",
  "/results",
  "/how-it-works",
  "/about",
  "/contact",
  "/locations",
  "/blog",
  "/conversion-optimization",
  "/pricing",
  "/faq",
  "/proof",
  ...CITY_PAGES,
  ...BLOG_SLUGS.map((s) => `/blog/${s}`),
]);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...urls].sort().map((url) => `  <url>
    <loc>${BASE}${url}</loc>
    <changefreq>${changefreq(url)}</changefreq>
    <priority>${priority(url)}</priority>
  </url>`).join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(ROOT, "sitemap.xml"), xml, "utf8");
console.log(`Wrote sitemap.xml with ${urls.size} URLs.`);
