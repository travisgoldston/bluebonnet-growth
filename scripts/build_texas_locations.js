const fs = require("fs");
const path = require("path");
const cities = require("./data/texas_cities");
const consolidation = require("./data/seo_consolidation");
const { extraSections } = require("./lib/city_page_extra");

const ROOT = path.resolve(__dirname, "..");
const BASE = "https://bluebonnetgrowth.com";
const keepCitySlugs = new Set(consolidation.keepCitySlugs);
const keepCities = cities.filter((c) => keepCitySlugs.has(c.slug));


const FOOTER_SOCIAL = `        <div class="footer-social" aria-label="Social media">
          <a href="https://facebook.com/bluebonnetdotco" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="footer-social-link"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
          <a href="https://x.com/bluebonnetgr" target="_blank" rel="noopener noreferrer" aria-label="X" class="footer-social-link"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
          <a href="https://www.instagram.com/bluebonnetgrowth/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="footer-social-link"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
          <a href="https://youtube.com/@bluebonnetdotco" target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="footer-social-link"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
        </div>`;

function cityPath(city) {
  return cities.getPath(city);
}

function cityFile(city) {
  const p = cityPath(city);
  if (p.startsWith("/locations/")) {
    return path.join(ROOT, "locations", path.basename(p) + ".html");
  }
  return path.join(ROOT, `${city.slug}.html`);
}

function nearbyLinks(city) {
  return (city.nearby || [])
    .map((slug) => cities.getBySlug(slug))
    .filter(Boolean)
    .map((c) => `<a href="${cityPath(c)}">${c.name}</a>`)
    .join(", ");
}

function locationStripHtml() {
  return [...keepCities]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((c) => `            <a class="location-tag" href="${cityPath(c)}">${c.name}</a>`)
    .join("\n");
}

function texasInterlinkSection() {
  return `      <section class="section section-light">
        <div class="container">
          <h2>Local SEO across North Texas</h2>
          <p>I focus on DFW growth markets where I know how people actually search. Explore local SEO by city:</p>
          <nav class="location-strip" aria-label="North Texas cities">
${locationStripHtml()}
          </nav>
          <p class="text-links"><a href="/locations">View locations</a> · <a href="/services/local-seo">Local SEO services</a> · <a href="/contact">Apply now</a></p>
        </div>
      </section>`;
}

function loadIndustryGuidesByCity() {
  const file = path.join(ROOT, "scripts", "data", "industry_guides_by_city.json");
  if (!fs.existsSync(file)) return {};
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function industryGuidesSection(city) {
  const byCity = loadIndustryGuidesByCity();
  const guides = byCity[city.slug] || city.industryGuides || [];
  if (!guides.length) return "";
  const items = guides
    .map((g) => `            <li><a href="/blog/${g.slug}">How to rank for "${g.title}"</a></li>`)
    .join("\n");
  return `      <section class="section section-light">
        <div class="container">
          <h2>Local SEO guides for ${city.name} businesses</h2>
          <p>Plain-English guides for the searches your customers actually type, like "${guides[0].title.toLowerCase()}" and similar phrases.</p>
          <ul>
${items}
          </ul>
          <p><a href="/blog">See all blog guides</a></p>
        </div>
      </section>`;
}

function nearbySection(city) {
  const links = nearbyLinks(city);
  if (!links) return "";
  return `      <section class="section section-light">
        <div class="container">
          <h2>Nearby areas we also serve</h2>
          <p>Local search does not stop at city limits. I also help businesses in ${links}.</p>
          <p><a href="/locations">See all Texas cities</a></p>
        </div>
      </section>`;
}

function renderCityPage(city) {
  const urlPath = cityPath(city);
  const canonical = `${BASE}${urlPath}`;
  const problemParas = city.problem.map((p) => `          <p>${p}</p>`).join("\n");
  const contextParas = city.context.map((p) => `          <p>${p}</p>`).join("\n");
  const guidesByCity = loadIndustryGuidesByCity();
  const extra = extraSections(city, {
    getPath: cityPath,
    getBySlug: cities.getBySlug,
    guidesByCity,
  });

  const pageTitle =
    city.title ||
    `Local SEO ${city.name}, TX | More Calls from Google Maps | Bluebonnet Growth`;
  const metaDescription =
    city.metaDescription ||
    `Local SEO for ${city.name}, TX home service businesses. Rank on Google Maps for HVAC, plumbing, roofing, and trades. Free visibility check. Limited to 5 clients.`;
  const h1 = city.h1 || `Local SEO for ${city.name} Home Service Businesses`;

  const schema = `    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Local SEO in ${city.name}, TX",
      "provider": {
        "@type": "ProfessionalService",
        "name": "Bluebonnet Growth",
        "url": "https://bluebonnetgrowth.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Melissa",
          "addressRegion": "TX",
          "addressCountry": "US"
        }
      },
      "areaServed": { "@type": "City", "name": "${city.name}", "containedInPlace": { "@type": "State", "name": "Texas" } },
      "url": "${canonical}",
      "description": "${metaDescription.replace(/"/g, '\\"')}"
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "${BASE}/" },
        { "@type": "ListItem", "position": 2, "name": "Locations", "item": "${BASE}/locations" },
        { "@type": "ListItem", "position": 3, "name": "${city.name}", "item": "${canonical}" }
      ]
    }
    </script>`;

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
    <title>${pageTitle}</title>
    <meta name="description" content="${metaDescription}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${pageTitle}" />
    <meta property="og:description" content="${metaDescription}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${BASE}/assets/bluebonnet-icon.png" />
    <meta name="twitter:card" content="summary" />
${schema}
    <link rel="icon" href="/assets/favicon-32x32.png" type="image/png" />
    <link rel="apple-touch-icon" href="/assets/favicon-32x32.png" />
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
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
        <a href="/blog">Blog</a>
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
      <a href="/blog">Blog</a>
      <a href="/contact">Apply Now</a>
    </div>
    <main>
      <section class="page-hero">
        <div class="container">
          <span class="eyebrow">For ${city.name} home service businesses</span>
          <h1>${h1}</h1>
          <p class="lead">${city.lead}</p>
          <p class="section-cta">
            <a href="/contact" class="btn btn-primary">Get a Free Local Search Audit</a>
          </p>
        </div>
      </section>

      <section class="section section-light">
        <div class="container">
          <h2>${city.problemTitle}</h2>
${problemParas}
        </div>
      </section>

${extra.beforeWhatIDo}

      <section class="section">
        <div class="container">
          <h2>What I do for ${city.name} businesses</h2>
          <p>I focus on the work that moves someone from searching to calling you, without a pile of jargon in between.</p>
          <ul>
            <li><strong>Local SEO:</strong> I tune your Google Business Profile and website so you show up for ${city.name} searches that lead to real jobs. <a href="/services/local-seo">Learn more about local SEO</a>.</li>
            <li><strong>Google Business Profile:</strong> I fix categories, photos, services, and reviews so Google trusts your listing. <a href="/services/google-business-profile">See profile optimization</a>.</li>
            <li><strong>SEO content:</strong> I build service and city pages that match what customers search. <a href="/services/seo-content">See SEO content</a>.</li>
            <li><strong>Trade-specific SEO:</strong> <a href="/industries/hvac-seo">HVAC</a>, <a href="/industries/plumber-seo">plumbing</a>, <a href="/industries/roofer-seo">roofing</a>, <a href="/industries/electrician-seo">electrical</a>, and <a href="/industries/landscaping-seo">landscaping</a>.</li>
            <li><strong>Ongoing tuning:</strong> I watch rankings, calls, and form fills, then make steady changes.</li>
          </ul>
          <p>Related reading: <a href="/blog/what-is-local-seo">What is local SEO?</a> and <a href="/blog/how-to-get-more-google-reviews">how to get more Google reviews</a>.</p>
        </div>
      </section>

${extra.afterWhatIDo}

      <section class="section section-dark">
        <div class="container">
          <h2>${city.contextTitle}</h2>
${contextParas}
        </div>
      </section>

${extra.beforeFaq}

      <section class="section">
        <div class="container">
          <h2>Questions ${city.name} owners often ask</h2>
          <div class="faq-list" data-faq>
            <article class="faq-item">
              <button class="faq-question" type="button">
                <span>Can you help a ${city.name} business if you are not based here?</span>
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer">
                <p>Yes. Local SEO is about your business location and service area, not where your SEO partner sits. I work remotely with ${city.name} owners every week and focus on what Google needs to trust your listing.</p>
              </div>
            </article>
            <article class="faq-item">
              <button class="faq-question" type="button">
                <span>How long until I see more ${city.name} leads from Google?</span>
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer">
                <p>Quick wins on a broken profile can help in weeks. Steady ranking gains usually take a few months depending on competition. Before you commit, I will tell you what is realistic for your category in ${city.name}.</p>
              </div>
            </article>
            <article class="faq-item">
              <button class="faq-question" type="button">
                <span>Do I need a new website?</span>
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer">
                <p>Not always. Sometimes clearer service pages and a tap-to-call button are enough. Other times rebuilding is simpler. I will show you both paths in plain language and tie it back to leads.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

${industryGuidesSection(city)}
${nearbySection(city)}
${texasInterlinkSection()}

      <section class="section section-dark final-cta">
        <div class="container final-cta-grid">
          <div class="final-cta-copy">
            <span class="eyebrow">Next step</span>
            <h2>See where you are losing Google leads in ${city.name}</h2>
            <p>I will look at how you show up on Google today, who ranks above you, and what I would change first.</p>
            <p>You can use that insight on your own, with your current provider, or with me if it feels like the right fit. I take on 5 clients at a time.</p>
            <p><strong>Serving home service businesses in ${city.name} and across Texas.</strong></p>
          </div>
          <div class="final-cta-actions">
            <a href="/contact" class="btn btn-primary">Get a Free Local Search Audit</a>
            <a href="/contact" class="btn btn-outline">Apply Now</a>
          </div>
        </div>
      </section>
    </main>
    <footer>
      <div>
        <div class="footer-brand-row">
          <img src="/assets/bluebonnet-icon.png" alt="Bluebonnet Growth" width="28" height="28" />
          <div class="footer-brand">Bluebonnet Growth</div>
        </div>
        <div class="footer-tagline">Ranking Texas local businesses on Google. One operator. Direct access. Real results.</div>
${FOOTER_SOCIAL}
      </div>
      <div>
        <div class="footer-col-title">Pages</div>
        <ul class="footer-links">
          <li><a href="/results">Results</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/industries">Industries</a></li>
          <li><a href="/how-it-works">How it works</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/locations">Locations</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Ready for more calls?</div>
        <div class="footer-cta-text">I take on 5 clients at a time. Apply to see if there is a spot open for your business.</div>
        <a href="/contact" class="footer-btn">Get a Free Local Search Audit</a>
      </div>
    </footer>
    <div class="copyright">
      <span>© 2026 Bluebonnet Growth. All rights reserved.</span>
      <span>Based in Melissa, TX · Serving Texas</span>
    </div>
    <script src="/script.js" defer></script>
  </body>
</html>
`;
}

function regionSlug(region) {
  return region.toLowerCase().replace(/\s+/g, "-");
}

const REGION_BLURBS = {
  "Dallas-Fort Worth": "McKinney, Frisco, Dallas, Fort Worth, and the northern suburbs",
  "Central Texas": "Austin, Round Rock, Waco, and the I-35 corridor",
  "Houston Area": "Houston, The Woodlands, Galveston, and the Gulf Coast",
  "San Antonio Area": "San Antonio and South Central Texas",
  "West Texas": "Lubbock, Midland, El Paso, and the Permian Basin",
  "South Texas": "Corpus Christi, McAllen, and the Rio Grande Valley",
  "East Texas": "Tyler and the East Texas regional market",
};

const REGION_ORDER = [
  "Dallas-Fort Worth",
  "Central Texas",
  "Houston Area",
  "San Antonio Area",
  "West Texas",
  "South Texas",
  "East Texas",
];

function renderRegionNav() {
  const byRegion = cities.byRegion();
  const links = REGION_ORDER.filter((r) => byRegion[r])
    .map((r) => `            <a href="#${regionSlug(r)}" class="region-jump-link">${r}</a>`)
    .join("\n");
  return `          <nav class="region-jump-nav" aria-label="Jump to region">
${links}
          </nav>`;
}

function homepageRegionsSection() {
  return `      <section class="section section-light">
        <div class="container">
          <h2>Local SEO across North Texas</h2>
          <p>Based in Melissa. I work deepest with home service businesses in DFW growth corridors — McKinney, Frisco, Plano, Allen, Prosper, Celina, Dallas, Fort Worth, and nearby towns.</p>
          <nav class="location-strip" aria-label="North Texas cities">
${locationStripHtml()}
          </nav>
          <p class="text-links"><a href="/locations">Browse locations</a> · <a href="/blog?category=industry-guide">Trade guides</a> · <a href="/services/local-seo">Local SEO services</a></p>
        </div>
      </section>`;
}

function patchHomepage() {
  const file = path.join(ROOT, "index.html");
  let html = fs.readFileSync(file, "utf8");
  const section = homepageRegionsSection();
  // Remove every regions hub variant (fixes historic duplicate sections)
  html = html.replace(
    /<section class="section section-light">\s*<div class="container">\s*<h2>(?:Local SEO in cities across Texas|Serving businesses across Texas|Serving North Texas and beyond|Local SEO across North Texas)<\/h2>[\s\S]*?<\/section>/g,
    ""
  );
  html = html.replace(
    /(<section class="final-cta"[\s\S]*?<\/section>)/,
    `$1\n\n    ${section.trim()}\n`
  );
  fs.writeFileSync(file, html, "utf8");
  console.log("Homepage: regions hub");
}

function renderLocationsGrid() {
  const byRegion = cities.byRegion();

  return REGION_ORDER.filter((r) => byRegion[r])
    .map((region) => {
      const cards = byRegion[region]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(
          (c) => `            <article class="card">
              <h3><a href="${cityPath(c)}">${c.name}</a></h3>
              <p>${c.cardBlurb}</p>
            </article>`
        )
        .join("\n");
      return `          <h3 class="locations-region" id="${regionSlug(region)}">${region}</h3>
          <div class="locations-grid">
${cards}
          </div>`;
    })
    .join("\n\n");
}

function patchLocationStrip(filePath) {
  let html = fs.readFileSync(filePath, "utf8");
  const strip = `          <nav class="location-strip" aria-label="Texas cities">\n${locationStripHtml()}\n          </nav>`;
  if (/<(?:nav|div) class="location-strip"[\s\S]*?<\/(?:nav|div)>/.test(html)) {
    html = html.replace(/<(?:nav|div) class="location-strip"[\s\S]*?<\/(?:nav|div)>/, strip);
  } else if (html.includes("<h2>Areas we serve</h2>")) {
    html = html.replace(
      /(<h2>Areas we serve<\/h2>\s*<p>)[\s\S]*?(<\/div>\s*<\/div>\s*<\/section>)/,
      `$1We help small businesses across Texas get found on Google. See what local SEO looks like in your area:</p>\n${strip}\n        $2`
    );
  } else {
    return false;
  }
  html = html.replace(/across North Texas get found/g, "across Texas get found");
  fs.writeFileSync(filePath, html, "utf8");
  return true;
}

function patchSiteWideLinks() {
  const dirs = [ROOT, path.join(ROOT, "blog"), path.join(ROOT, "services")];
  let count = 0;
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir)) {
      if (!name.endsWith(".html")) continue;
      const file = path.join(dir, name);
      let html = fs.readFileSync(file, "utf8");
      const orig = html;
      html = html.replace(
        /<p class="section-cta"><a href="\/locations">View all Texas cities we serve<\/a> · <a href="\/services\/local-seo">Local SEO services<\/a> · <a href="\/contact">Apply now<\/a><\/p>/g,
        '<p class="text-links"><a href="/locations">View all Texas cities we serve</a> · <a href="/services/local-seo">Local SEO services</a> · <a href="/contact">Apply now</a></p>'
      );
      html = html.replace(/\s*style="color: var\(--color-yellow\);"/g, "");
      if (html !== orig) {
        fs.writeFileSync(file, html, "utf8");
        count++;
      }
    }
  }
  if (count) console.log(`Patched link visibility on ${count} HTML files`);
}

function patchBlogPosts() {
  const blogDir = path.join(ROOT, "blog");
  const marker = "Local SEO across North Texas";
  const section = texasInterlinkSection();
  for (const name of fs.readdirSync(blogDir)) {
    if (!name.endsWith(".html")) continue;
    const file = path.join(blogDir, name);
    let html = fs.readFileSync(file, "utf8");
    if (html.includes(marker) || html.includes('aria-label="North Texas cities"')) continue;
    // Replace legacy strip section if present
    if (/Local SEO in cities across Texas/.test(html)) {
      html = html.replace(
        /<section class="section section-light">\s*<div class="container">\s*<h2>Local SEO in cities across Texas<\/h2>[\s\S]*?<\/section>/,
        section.trim()
      );
      fs.writeFileSync(file, html, "utf8");
      continue;
    }
    if (html.includes("</main>")) {
      html = html.replace("</main>", `${section}\n    </main>`);
    } else if (html.includes("<footer>")) {
      html = html.replace("<footer>", `${section}\n\n    <footer>`);
    } else continue;
    fs.writeFileSync(file, html, "utf8");
    console.log("blog interlink:", name);
  }
}

function patchCorePages() {
  const coreFiles = [
    "about.html",
    "contact.html",
    "results.html",
    "how-it-works.html",
    "services.html",
    "pricing.html",
    "faq.html",
  ];
  const section = texasInterlinkSection();
  const marker = "Local SEO across North Texas";

  for (const rel of coreFiles) {
    const file = path.join(ROOT, rel);
    if (!fs.existsSync(file)) continue;
    let html = fs.readFileSync(file, "utf8");
    if (html.includes(marker) || html.includes('aria-label="North Texas cities"')) {
      // still refresh strip contents
      html = html.replace(
        /<(?:nav|div) class="location-strip"[\s\S]*?<\/(?:nav|div)>/,
        `          <nav class="location-strip" aria-label="North Texas cities">\n${locationStripHtml()}\n          </nav>`
      );
      fs.writeFileSync(file, html, "utf8");
      continue;
    }
    if (/Local SEO in cities across Texas/.test(html)) {
      html = html.replace(
        /<section class="section section-light">\s*<div class="container">\s*<h2>Local SEO in cities across Texas<\/h2>[\s\S]*?<\/section>/,
        section.trim()
      );
    } else if (html.includes("</main>")) {
      html = html.replace("</main>", `${section}\n    </main>`);
    } else if (html.includes("<footer>")) {
      html = html.replace("<footer>", `${section}\n\n    <footer>`);
    } else {
      continue;
    }
    html = html.replace(/Based in Melissa, TX · Serving (?:North )?Texas/g, "Based in Melissa, TX · Local SEO for Texas home service businesses");
    fs.writeFileSync(file, html, "utf8");
    console.log("core interlink:", rel);
  }
}

function renderKeepCitiesGrid() {
  return `          <h3 class="locations-region" id="dallas-fort-worth">Dallas-Fort Worth</h3>
          <div class="locations-grid">
${[...keepCities]
  .sort((a, b) => a.name.localeCompare(b.name))
  .map(
    (c) => `            <article class="card">
              <h3><a href="${cityPath(c)}">${c.name}</a></h3>
              <p>${c.cardBlurb}</p>
            </article>`
  )
  .join("\n")}
          </div>`;
}

function updateLocationsPage() {
  let html = fs.readFileSync(path.join(ROOT, "locations.html"), "utf8");
  html = html.replace(
    /<title>[\s\S]*?<\/title>/,
    "<title>Local SEO Locations Texas | North Texas, Boerne &amp; Georgetown | Bluebonnet Growth</title>"
  );
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="Local SEO for home service businesses across North Texas, plus Boerne and Georgetown where search demand supports real pages. Not a thin statewide city farm." />`
  );
  html = html.replace(
    /<h1>[\s\S]*?<\/h1>/,
    "<h1>Local SEO across Texas — quality over page count</h1>"
  );
  html = html.replace(
    /<p class="lead">[\s\S]*?<\/p>/,
    `<p class="lead">
            I am based in Melissa and work deepest with home service businesses across DFW. I also publish dedicated pages for Boerne and Georgetown where Search Console shows real demand. Every city page has to earn its place.
          </p>`
  );
  html = html.replace(
    /<h2>Cities across Texas<\/h2>[\s\S]*?<section class="section">/,
    `<h2>Cities we publish for</h2>
          <p>
            These pages cover markets I focus on — plus Texas cities with clear commercial search demand. Most clients serve several of them. That is normal.
          </p>
${renderKeepCitiesGrid()}
        </div>
      </section>

      <section class="section">`
  );
  if (!html.includes("/industries")) {
    html = html.replace(
      "</main>",
      `      <section class="section section-light">
        <div class="container">
          <h2>Also explore by trade</h2>
          <p class="text-links"><a href="/industries">Industry SEO pages</a> · <a href="/services/local-seo">Local SEO services</a> · <a href="/contact">Get a free local search audit</a></p>
        </div>
      </section>
    </main>`
    );
  }
  fs.writeFileSync(path.join(ROOT, "locations.html"), html, "utf8");
}

function updateVercelRedirects() {
  const vercelPath = path.join(ROOT, "vercel.json");
  const config = JSON.parse(fs.readFileSync(vercelPath, "utf8"));
  const existing = new Set(config.redirects.map((r) => r.source));

  for (const city of keepCities) {
    const dest = cityPath(city);
    for (const src of [`/seo-${city.slug}`, `/seo-${city.slug}.html`]) {
      if (!existing.has(src)) {
        config.redirects.push({ source: src, destination: dest, permanent: true });
        existing.add(src);
      } else {
        const row = config.redirects.find((r) => r.source === src);
        if (row) row.destination = dest;
      }
    }
  }

  for (const city of cities) {
    if (keepCitySlugs.has(city.slug)) continue;
    const dest =
      consolidation.cityRedirectOverrides[city.slug] || consolidation.cityRedirectFallback;
    for (const src of [`/seo-${city.slug}`, `/seo-${city.slug}.html`, `/${city.slug}`, `/${city.slug}.html`]) {
      if (!existing.has(src)) {
        config.redirects.push({ source: src, destination: dest, permanent: true });
        existing.add(src);
      } else {
        const row = config.redirects.find((r) => r.source === src);
        if (row && (row.destination === `/${city.slug}` || row.destination === cityPath(city))) {
          row.destination = dest;
        }
      }
    }
  }

  fs.writeFileSync(vercelPath, JSON.stringify(config, null, 2) + "\n", "utf8");
  console.log("Updated vercel.json redirects");
}

function updateSitemap() {
  const industrySlugs = fs.existsSync(path.join(ROOT, "scripts", "data", "industry_blog_slugs.json"))
    ? JSON.parse(fs.readFileSync(path.join(ROOT, "scripts", "data", "industry_blog_slugs.json"), "utf8"))
    : [];
  const BLOG_SLUGS = [...new Set([...industrySlugs, ...consolidation.generalBlogSlugs])];
  const cityUrls = keepCities.map((c) => cityPath(c));
  const industryUrls = [
    "/industries",
    "/industries/hvac-seo",
    "/industries/plumber-seo",
    "/industries/roofer-seo",
    "/industries/electrician-seo",
    "/industries/landscaping-seo",
  ];
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
    ...industryUrls,
  ];
  const today = new Date().toISOString().slice(0, 10);
  const urls = [...new Set([...core, ...cityUrls, ...BLOG_SLUGS.map((s) => `/blog/${s}`)])].sort();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((url) => {
    const pri =
      url === "/"
        ? "1.0"
        : url.startsWith("/industries")
          ? "0.85"
          : url.startsWith("/blog/")
            ? "0.6"
            : cityUrls.includes(url)
              ? "0.7"
              : "0.8";
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
}

function updateIndexSchema() {
  const file = path.join(ROOT, "index.html");
  let html = fs.readFileSync(file, "utf8");
  const areaServed = keepCities
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((c) => `        "${c.name}, TX"`)
    .join(",\n");

  const schema = `    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Bluebonnet Growth",
      "url": "https://bluebonnetgrowth.com",
      "email": "hello@bluebonnetgrowth.com",
      "description": "Local SEO for Texas home service businesses. Google Maps, profile optimization, and SEO content focused on North Texas.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Melissa",
        "addressRegion": "TX",
        "addressCountry": "US"
      },
      "areaServed": [
${areaServed}
      ],
      "serviceType": ["Local SEO", "Google Business Profile Optimization", "SEO Content"]
    }
    </script>`;

  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, schema);
  html = html.replace(
    /<p class="final-cta-note">[\s\S]*?<\/p>/,
    `<p class="final-cta-note">Melissa · McKinney · Frisco · Plano · Allen · Dallas · Fort Worth · and <a href="/locations">North Texas</a></p>`
  );
  html = html.replace(
    /Based in Melissa, TX · Serving Texas/g,
    "Based in Melissa, TX · Local SEO for Texas home service businesses"
  );
  fs.writeFileSync(file, html, "utf8");
}

// Main — skip full regen when PATCH_ONLY=1
const patchOnly = process.env.PATCH_ONLY === "1";

if (!patchOnly) {
  let wrote = 0;
  for (const city of keepCities) {
    const file = cityFile(city);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, renderCityPage(city), "utf8");
    console.log("city page:", path.relative(ROOT, file));
    wrote++;
  }
  updateLocationsPage();
  console.log("Updated locations.html");
  console.log(`Generated ${wrote} city pages (keepers only).`);
}

const stripTargets = [
  "services/local-seo.html",
  "services/google-business-profile.html",
  "services/seo-content.html",
].map((f) => path.join(ROOT, f));

for (const f of stripTargets) {
  if (fs.existsSync(f) && patchLocationStrip(f)) {
    console.log("location strip:", path.relative(ROOT, f));
  }
}

updateSitemap();
updateIndexSchema();
updateVercelRedirects();
patchHomepage();
patchSiteWideLinks();
patchCorePages();
patchBlogPosts();

console.log("\nDone. Texas city pages interlinked statewide.");
