/**
 * Generate statewide trade pillar pages: /blog/local-seo-for-{industry}-texas
 */
const fs = require("fs");
const path = require("path");
const industries = require("./data/industry_templates");
const pillarCopy = require("./data/trade_pillar_copy");
const consolidation = require("./data/seo_consolidation");
const { blogMetaHtml } = require("./lib/blog_meta");

const ROOT = path.resolve(__dirname, "..");
const BLOG = path.join(ROOT, "blog");

const FOOTER_SOCIAL = fs
  .readFileSync(path.join(ROOT, "blog", "what-is-local-seo.html"), "utf8")
  .match(/<div class="footer-social"[\s\S]*?<\/div>\s*<\/div>/)[0]
  .replace(/^ {6}/gm, "        ");

function fill(template, industry) {
  return template
    .replace(/\{service\}/g, industry.service)
    .replace(/\{servicePlural\}/g, industry.servicePlural)
    .replace(/\{searchKey\}/g, industry.searchKey)
    .replace(/\{customerLabel\}/g, industry.customerLabel);
}

function survivorLinks(industryKey) {
  const keepers = consolidation.keepTradeCity.filter((k) => k.industry === industryKey);
  if (!keepers.length) return "";
  const links = keepers
    .map((k) => {
      const cityName = k.city
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      return `<a href="/blog/local-seo-for-${industryKey}-${k.city}-tx">${cityName}</a>`;
    })
    .join(" · ");
  return `<p>City deep dives: ${links}.</p>`;
}

function renderPillar(industry) {
  const copy = pillarCopy[industry.key];
  if (!copy) throw new Error(`Missing pillar copy for ${industry.key}`);

  const slug = `local-seo-for-${industry.key}-texas`;
  const title = fill(copy.title, industry);
  const description = fill(copy.description, industry);
  const lead = fill(copy.lead, industry);
  const eyebrow = fill(copy.eyebrow, industry);

  const sectionsHtml = copy.sections
    .map((s) => {
      return `      <section class="section${copy.sections.indexOf(s) % 2 === 0 ? " section-light" : ""}">
        <div class="container">
          <h2>${fill(s.h2, industry)}</h2>
          ${fill(s.html, industry)}
        </div>
      </section>`;
    })
    .join("\n");

  const cta = `      <section class="section">
        <div class="container">
          <div class="blog-cta-box">
            <h3>Want a plain-English look at how you rank in Texas?</h3>
            <p>I work with ${industry.servicePlural} and other home service businesses across North Texas. Limited roster. No long-term contracts.</p>
            <a href="/contact" class="btn btn-primary">Apply Now</a>
          </div>
          ${survivorLinks(industry.key)}
          <p class="text-links"><a href="/services/local-seo">Local SEO services</a> · <a href="/blog/what-is-local-seo">What local SEO means</a> · <a href="/locations">North Texas cities</a></p>
        </div>
      </section>`;

  const tags = [industry.key, "texas", "local-seo"];

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-QG3FTP7PC3"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-QG3FTP7PC3');
    </script>
    <title>${title}</title>
    <meta name="description" content="${description.replace(/"/g, "&quot;")}" />
    <link rel="canonical" href="https://bluebonnetgrowth.com/blog/${slug}" />
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": ${JSON.stringify(title)},
      "description": ${JSON.stringify(description)},
      "author": { "@type": "Person", "name": "Travis", "url": "https://bluebonnetgrowth.com/about" },
      "publisher": { "@type": "Organization", "name": "Bluebonnet Growth", "url": "https://bluebonnetgrowth.com" },
      "mainEntityOfPage": "https://bluebonnetgrowth.com/blog/${slug}"
    }
    </script>
    <link rel="icon" href="/assets/favicon-32x32.png" type="image/png" />
    <link rel="apple-touch-icon" href="/assets/favicon-32x32.png" />
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body class="blog-post">
    <nav class="nav" aria-label="Primary navigation">
      <a class="nav-logo" href="/">
        <img src="/assets/bluebonnet-icon.png" alt="Bluebonnet Growth" width="34" height="34" />
        <span class="nav-logo-text">Bluebonnet Growth</span>
      </a>
      <div class="nav-links">
        <a href="/results">Results</a>
        <a href="/services">Services</a>
        <a href="/how-it-works">How it works</a>
        <a href="/about">About</a>
        <a href="/blog" class="is-active">Blog</a>
      </div>
      <a href="/contact" class="nav-cta">Apply Now</a>
      <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" data-nav-toggle>
        <span></span><span></span><span></span>
      </button>
    </nav>
    <div class="nav-drawer" data-nav-drawer aria-label="Mobile navigation">
      <a href="/results">Results</a>
      <a href="/services">Services</a>
      <a href="/how-it-works">How it works</a>
      <a href="/about">About</a>
      <a href="/blog" class="is-active">Blog</a>
      <a href="/contact">Apply Now</a>
    </div>
    <main>
      <section class="page-hero">
        <div class="container">
          <span class="eyebrow">${eyebrow}</span>
          <h1>${title}</h1>
          <p class="lead">${lead}</p>
          ${blogMetaHtml({ category: "industry-guide", tags })}
        </div>
      </section>
${sectionsHtml}
${cta}
      <section class="section section-light">
        <div class="container">
          <h2>North Texas cities we focus on</h2>
          <p>I am based in Melissa and work deepest in DFW growth corridors — not every ZIP in the state equally.</p>
          <nav class="location-strip" aria-label="North Texas cities">
            <a class="location-tag" href="/melissa">Melissa</a>
            <a class="location-tag" href="/mckinney">McKinney</a>
            <a class="location-tag" href="/anna">Anna</a>
            <a class="location-tag" href="/locations/frisco-tx">Frisco</a>
            <a class="location-tag" href="/plano">Plano</a>
            <a class="location-tag" href="/locations/allen-tx">Allen</a>
            <a class="location-tag" href="/prosper">Prosper</a>
            <a class="location-tag" href="/dallas">Dallas</a>
            <a class="location-tag" href="/fort-worth">Fort Worth</a>
          </nav>
          <p class="text-links"><a href="/locations">All locations</a> · <a href="/services/local-seo">Local SEO</a> · <a href="/contact">Apply now</a></p>
        </div>
      </section>
    </main>
    <footer>
      <div>
        <div class="footer-brand-row">
          <img src="/assets/bluebonnet-icon.png" alt="Bluebonnet Growth" width="28" height="28" />
          <div class="footer-brand">Bluebonnet Growth</div>
        </div>
        <div class="footer-meta">Based in Melissa, TX · Local SEO for Texas home service businesses</div>
        ${FOOTER_SOCIAL}
      </div>
      <div class="footer-links">
        <a href="/results">Results</a>
        <a href="/services">Services</a>
        <a href="/how-it-works">How it works</a>
        <a href="/about">About</a>
        <a href="/blog">Blog</a>
        <a href="/locations">Locations</a>
        <a href="/contact">Apply Now</a>
      </div>
    </footer>
    <script src="/script.js" defer></script>
  </body>
</html>
`;
}

const slugs = [];
for (const industry of industries) {
  const slug = `local-seo-for-${industry.key}-texas`;
  const html = renderPillar(industry);
  fs.writeFileSync(path.join(BLOG, `${slug}.html`), html, "utf8");
  slugs.push(slug);
  console.log("pillar:", slug);
}

fs.writeFileSync(
  path.join(ROOT, "scripts", "data", "trade_pillar_slugs.json"),
  JSON.stringify(slugs, null, 2) + "\n",
  "utf8"
);
console.log(`Wrote ${slugs.length} trade pillars`);
